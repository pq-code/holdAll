<template>
    <div id="visualLargeScreen" class="visualLargeScreen" />
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import Stats from 'three/examples/jsm/libs/stats.module.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

// 创建场景对象Scene
let scene = new THREE.Scene();
// let stats = new Stats(); // 性能查看插件

// 窗口数据
let width = window.innerWidth; //窗口宽度
let height = window.innerHeight; //窗口高度
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

// 初始化透视相机
const camera = new THREE.PerspectiveCamera(s, width / height, 0.1, 1000);
camera.position.set(0, 10, -180); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

let onWindowResize = function () {
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(width, height);
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
};

window.addEventListener('resize', onWindowResize);

function animation(time) {
    // const mesh = scene.getObjectByName( 'meshKnot' );
    // mesh.rotation.y = time / 1000;
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

const rectLight = new THREE.RectAreaLight(0xffffff, 4, 200, 60);
rectLight.position.set(16, 30, 0);
scene.add(rectLight);

scene.add(new RectAreaLightHelper(rectLight));

RectAreaLightUniformsLib.init();

// 地面
const geoFloor = new THREE.BoxGeometry(2000, 0.1, 2000);
const matStdFloor = new THREE.MeshPhysicalMaterial({
    color: 0x808080,
    roughness: 0.2,
    metalness: 0,
    clearcoat: 6,
});
const mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
scene.add(mshStdFloor);

var geometry = new THREE.BoxGeometry(50, 50, 50);
// 三角形面渲染模式
var material = new THREE.MeshLambertMaterial({
    color: 0x0000ff, //三角面颜色
}); //材质对象
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
mesh.position.set(16, 30, -50);
scene.add(mesh);
</script>

<style scoped>
.visualLargeScreen {
    width: 100%;
    height: 100%;
}
</style>
