export class DrawPolygonFn {
    constructor() { }

    static marker (self) {
        self.marker({
            // 同Marker的Option设置
        });
    }
    static polyline (self) {
        self.polyline({
            strokeColor: '#00BBFF',
            strokeOpacity: 1,
            borderWeight: 1, // 线条宽度，默认为 1
            // 同Polyline的Option设置
        });
    }
    static polygon (self) {
        self.polygon({
            fillColor: 'transparent', // 多边形填充颜色
            strokeWeight: 2, // 线条宽度，默认为 1
            strokeColor: '#00BBFF', // 线条颜色
            draggable: true,
            strokeOpacity: 1,
            fillOpacity: 0,
            zIndex: 50,
            // 同Polyline的Option设置
        });
    }
    static rectangle (self) {
        self.rectangle({
            fillColor: '#00b0ff',
            strokeColor: '#80d8ff',
            // 同Polygon的Option设置
        });
    }
    static circle (self) {
        self.circle({
            fillColor: '#00b0ff',
            strokeColor: '#80d8ff',
            // 同Circle的Option设置
        });
    }
}
