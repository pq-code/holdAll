<template>
    <div id="visualLargeScreen"
         class="visualLargeScreen" />
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import Stats from 'three/examples/jsm/libs/stats.module.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
const props = defineProps({
    width: {
        type: Number,
        default: 960,
    },
    height: {
        type: Number,
        default: 552,
    },
});
// 创建场景对象Scene
let scene = new THREE.Scene();
// let stats = new Stats(); // 性能查看插件

// 窗口数据
let width = props.width ? props.width : window.innerWidth; //窗口宽度
let height = props.height ? props.height : window.innerHeight; //窗口高度
let k = width / height; //窗口宽高比
let s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大

// 创建渲染器对象
let renderer = new THREE.WebGLRenderer({
    antialias: true, // true/false表示是否开启反锯齿
    alpha: false, // true/false 表示是否可以设置背景色透明
    precision: 'highp', // highp/mediump/lowp 表示着色精度选择
    premultipliedAlpha: true, // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
    preserveDrawingBuffer: true, // true/false 表示是否保存绘图缓冲
    maxLights: 4, // 最大灯光数
    stencil: false, // false/true 表示是否使用模板字体或图案
});

renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setPixelRatio(window.devicePixelRatio); // 设置设备相数比
// renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
renderer.setAnimationLoop(animation); // 设置动画

// 创建时钟
const clock = new THREE.Clock();


// 初始化透视相机
const camera = new THREE.PerspectiveCamera(s, width / height, 0.1, 1000);
camera.position.set(0, 50, -100); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

let onWindowResize = function (w, h) {
    width = w;
    height = h;
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(width, height);
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
};

// window.addEventListener('resize', onWindowResize);

function animation (time) {
    let mesh = scene.getObjectByName('Earth');
    if (mesh) mesh.rotation.y = time / 2600;
    renderer.render(scene, camera);
    // stats.update();
}

onMounted(() => {
    let trajectoryMotion = document.getElementById('visualLargeScreenThree');
    trajectoryMotion.appendChild(renderer.domElement);
    // stats.dom.style.top = '67px';
    // stats.dom.style.left = '160px';
    // trajectoryMotion.appendChild(stats.dom);
});

let controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
// 启用惯性
controls.enableDamping = true;
// 相机向外移动极限
// controls.maxDistance = 30;
// controls.minDistance = 20;

// 环境光:环境光颜色RGB成分分别和物体材质颜色RGB成分分别相乘
// var ambient = new THREE.AmbientLight(0x444444);
// scene.add(ambient); //环境光对象添加到scene场景中

let light = new THREE.HemisphereLight(0xffffff);
light.position.set(0, 0, 200);
scene.add(light);

// TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
let textureLoader = new THREE.TextureLoader();
// 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
textureLoader.load('map.jpg', texture => {
    let geometry = new THREE.SphereGeometry(60, 100, 100);
    let material = new THREE.MeshLambertMaterial({
        // color: 0x0000ff,
        // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
        map: texture, //设置颜色贴图属性值
        material: 0.5, //透明度 取值0-1；
        transparent: true, //设置是否为透明
        // emissive: 0xffffff,
    }); //材质对象Material
    let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.name = 'Earth';
    let pivotPoint = new THREE.Object3D(); //3d效果
    mesh.add(pivotPoint);
    scene.add(mesh); //网格模型添加到场景中
});

// 经纬度转换为坐标点
const longitudeLatitudeConversion = (longitude, latitude, radius = 60) => {
    let lg = THREE.Math.degToRad(longitude);
    let lt = THREE.Math.degToRad(latitude); // 获取x，y，z坐标
    let temp = radius * Math.cos(lt);
    let x = temp * Math.sin(lg);
    let y = radius * Math.sin(lt);
    let z = temp * Math.cos(lg);
    return new THREE.Vector3(x, y, z);
};

let shapePoint = new THREE.Shape(),
    r = 60;
shapePoint.absarc(0, 0, r, 0, 2 * Math.PI, false);
let arcGeometry = new THREE.ShapeGeometry(shapePoint);
let arcMaterial = new THREE.MeshBasicMaterial({ color: 0x008080 });
let point = new THREE.Mesh(arcGeometry, arcMaterial);
scene.add(point);

// let geometryLine = new THREE.Geometry();
// let arc = new THREE.ArcCurve(0, 0, r, 0, 2 * Math.PI);
// let points = arc.getPoints(40);
// geometryLine.setFromPoints(points);
// let LineMateri = new THREE.LineBasicMaterial({ color: 0x20b2aa });
// let line = new THREE.Line(geometryLine, LineMateri);
// scene.add(line);

defineExpose({
    onWindowResize,
});
</script>

<style scoped>
.visualLargeScreen {
    width: 100%;
    height: 100%;
}
</style>
