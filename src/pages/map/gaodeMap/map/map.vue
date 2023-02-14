<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import { guid } from "@/utils/index";
import { nextTick } from "vue";
import { DrawPolygonFn } from "./util/drawPolygonFn";

const props = defineProps({
    zoom: {
        type: Number,
        default: 16,
    },
    mapStyle: {
        type: String,
        default: "",
    },
    center: {
        type: Array,
        default() {
            return [120.114195, 30.291225];
        },
    },
    viewMode: {
        type: String,
        default: "3D",
    },
    isOnClick: {
        type: Boolean,
        default: false,
    },
    plugins: {
        type: Array,
        default: () => ["AMap.PolygonEditor", "AMap.MouseTool"],
    },
    parameters: {
        type: Object,
        default() {
            return {};
        },
    },
});

// 地图初始化
let map, AMap, polyEditor, drawRectangle, cuttingLine, selectData;

let uuid = guid();
const initMap = () => {
    AMapLoader.load({
        key: "6b3517521997557d2f7ea5dc8ddf9bb1",
        version: "2.0",
        plugins: props.plugins,
        Loca: {
            // 是否加载 Loca， 缺省不加载
            version: "2.0", // Loca 版本
        },
    }).then((amap) => {
        AMap = amap;
        map = new AMap.Map(uuid, {
            resizeEnable: true, //是否监控地图容器尺寸变化
            zoom: props.zoom, // 级别
            mapStyle: props.mapStyle, // 设置颜色底层
            center: props.center, // 中心点坐标
            viewMode: props.viewMode, // 使用3D视图
            ...props.parameters, // 剩余参数
        });
        drawRectangle = new AMap.MouseTool(map); // 多变形编辑工具
        polyEditor = new AMap.PolygonEditor(map); // 鼠标绘制工具
        cuttingLine = new AMap.MouseTool(map); // 绘制切割图形

        // 绘制多边形
        drawRectangle.on("draw", (e) => {
            eventDinding(e.obj); // 样式绑定
            drawRectangle.close();
            getAllTheData(); // 列表获取数据
        });

        // 裁切
        cuttingLine.on("draw", (e) => {
            cuttingLine.close();
            map.remove(e.obj);
            console.log(e.obj);
            debugger;
            cutting(e.obj.toGeoJSON()); // 切割
        });
    });
};

nextTick(() => {
    initMap();
});

// 绘制
const drawPolygon = () => {
    DrawPolygonFn.polygon(drawRectangle);
};

// 编辑
const polyEditorFn = () => {
    // polyEditor.close();
    // polyEditor.setTarget();
    // polyEditor.open();
    polyEditor.open();
};

// 切割
const cuttingFn = () => {
    DrawPolygonFn.polyline(cuttingLine);
};

// 切割
const cutting = (e) => {
    let overlays = map.getAllOverlays("polygon"); // 获取多边形
    let array = e.geometry.coordinates.slice(0, -1); // 高德地图鼠标工具绘制线段会首尾会闭合
    let line = e;
    line.geometry.coordinates = array;
    // 被裁剪的多边形
    let collectCroppedData = [];
    let collectCroppedDataJson = [];
    overlays.map((item) => {
        let geoJSON = polygonClipping(line, item.toGeoJSON());
        if (geoJSON) {
            collectCroppedData.push(item); // 收集被裁剪的数据
            collectCroppedDataJson = collectCroppedDataJson.concat(geoJSON);
        }
    });
    if (collectCroppedDataJson.length >= 1) {
        map.remove(collectCroppedData);
        drawingAfterCutting(collectCroppedDataJson); // 绘制
    }
};
// 高德地图转换GEOJSON
const drawingAfterCutting = () => {
    const geojsonOverlay = new AMap.GeoJSON({
        geoJSON: e,
        getPolygon: (geojsonOverlay, lnglats) => {
            // 还可以自定义getMarker和getPolyline
            if (this.$turf.getType(geojsonOverlay) === "Polygon") {
                return new AMap.Polygon({
                    path: lnglats,
                    fillColor: "transparent", // 多边形填充颜色
                    strokeWeight: 2, // 线条宽度，默认为 1
                    strokeColor: "#00BBFF", // 线条颜色
                    draggable: true,
                    strokeOpacity: 1,
                    zIndex: 50,
                });
            }
        },
    });
    geojsonOverlay.setMap(this.map);

    setTimeout(() => {
        let a = map.getAllOverlays("polygon");
        a.map((polygon) => {
            eventDinding(polygon); // 选中状态绑定
        });
    }, 0);
    getAllTheData();
};
// 选中样式修改
const eventDinding = (polygon) => {
    polygon.on("mouseover", (e) => {
        console.log(e.target, "移入了", e.target.getExtData().ifSelect);
        if (!e.target.getExtData().ifSelect) {
            e.target.setOptions({
                fillColor: "#529cfd",
                fillOpacity: 0.6,
            });
        }
    });
    polygon.on("mouseout", (e) => {
        console.log(e.target, "移出了", e.target.getExtData().ifSelect);
        if (!e.target.getExtData().ifSelect) {
            e.target.setOptions({
                fillColor: "transparent",
            });
        }
    });
    polygon.on("click", (e) => {
        selectedDataFn(e); // 数据选中
        selectData.map((item) => {
            item.setOptions({
                fillColor: "#529cfd",
                fillOpacity: 0.6,
            });
        });
    });
};
// 选中数据
const selectedDataFn = (e) => {
    if (selectData.length === 0) {
        selectData.push(e.target);
        e.target.setExtData({ ifSelect: true });
    } else {
        let a = "";
        selectData.map((item, index) => {
            if (e.target._amap_id == item._amap_id) {
                selectData.splice(index, 1);
                e.target.setExtData({ ifSelect: false });
                a = "";
            } else {
                a = e.target;
            }
        });
        if (a) {
            selectData.push(a);
            e.target.setExtData({ ifSelect: true });
        }
    }
};

// 获取数据
const getAllTheData = () => {
    let markerOverlays = map.getAllOverlays("marker");
    let polylineOverlays = map.getAllOverlays("polyline");
    let polygonOverlays = map.getAllOverlays("polygon");
    console.log(markerOverlays, polylineOverlays, polygonOverlays);
};

defineExpose({
    drawPolygon,
    polyEditorFn,
    cuttingFn,
});
</script>

<template>
    <div class="map-content"
         :id="uuid"></div>
</template>

<style lang="less" scoped>
.map-content {
    width: 100%;
    height: 100%;
}
</style>
