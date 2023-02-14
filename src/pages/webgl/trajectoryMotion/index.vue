<template>

  <div id="trajectoryMotion" />

</template>

<script setup >
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {onMounted} from "vue";
import Stats from "three/examples/jsm/libs/stats.module.js";
// import {Stats} from "fs";


    // 创建场景对象Scene
    var scene = new THREE.Scene();
    let stats = new Stats(); // 性能查看插件

    // const url = 'https://cdn.huodao.hk/upload_img/20220621/6bd594e62ea5654c03d7b82718443751.png?proportion=1.99'
    const url = 'https://cdn.huodao.hk/upload_img/20220621/6bd594e62ea5654c03d7b82718443751.png?proportion=1.99'
    const geometry = new THREE.SphereGeometry(5, 32, 32)
    const texture = new THREE.TextureLoader().load(url)
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const sphere = new THREE.Mesh(geometry, material)
    sphere.geometry.scale(1, 1, -1)
    scene.add(sphere)


    // 点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    // 环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);


    // 相机
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 20; //三维场景显示范围控制系数，系数越大，显示的范围越大


    // 创建相机对象
    // 初始化透视相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    // var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(0, 0, 5); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)


    // onresize 事件会在窗口被调整大小时发生
    window.onresize=function(){
        // 重置渲染器输出画布canvas尺寸
        renderer.setSize(window.innerWidth,window.innerHeight);
        // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
        camera.aspect = window.innerWidth/window.innerHeight;
        // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        camera.updateProjectionMatrix ();
    };


    // 创建渲染器对象
    var renderer = new THREE.WebGLRenderer({
        antialias: true, // true/false表示是否开启反锯齿
        alpha: true, // true/false 表示是否可以设置背景色透明
        precision: 'highp', // highp/mediump/lowp 表示着色精度选择
        premultipliedAlpha: true, // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
        preserveDrawingBuffer: true, // true/false 表示是否保存绘图缓冲
        maxLights: 4, // 最大灯光数
        stencil: false, // false/true 表示是否使用模板字体或图案
    });
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

    onMounted(()=>{
        let trajectoryMotion = document.getElementById( 'trajectoryMotion' );
        trajectoryMotion.appendChild( renderer.domElement );
        stats.dom.style.top = '50px';
        stats.dom.style.left = '220px'
        trajectoryMotion.appendChild( stats.dom );
    })

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    // var axisHelper = new THREE.AxisHelper(250);
    // scene.add(axisHelper);

    // 旋转
    let T0 = new Date();//上次时间
    function render() {
        let T1 = new Date();//本次时间
        let t = T1 - T0;//时间差
        T0 = T1;//把本次时间赋值给上次时间
        renderer.render(scene,camera);//执行渲染操作
        // sphere.rotateY(0.001 * t);//旋转角速度0.001弧度每毫秒
        // sphere.rotateZ(0.001 * t);//旋转角速度0.001弧度每毫秒
        requestAnimationFrame(render);
        stats.update();
    }
    render();
    let controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
    // 启用惯性
    controls.enableDamping = true
    // 相机向外移动极限
    controls.maxDistance = 4.5



</script>
