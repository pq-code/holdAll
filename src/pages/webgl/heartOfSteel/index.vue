<template>

    <div id="objectRendering" />

</template>

<script setup>
    import { onMounted } from "vue";
    import * as THREE from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
    import Stats from 'three/examples/jsm/libs/stats.module.js';
    import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
    import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';


    // 创建场景对象Scene
    let scene = new THREE.Scene();
    let stats = new Stats(); // 性能查看插件

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

    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setPixelRatio( window.devicePixelRatio );// 设置设备相数比
    // renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    renderer.setAnimationLoop( animation ); // 设置动画


    let onWindowResize = function() {
        // 重置渲染器输出画布canvas尺寸
        renderer.setSize(window.innerWidth,window.innerHeight);
        // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
        camera.aspect = window.innerWidth/window.innerHeight;
        // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        camera.updateProjectionMatrix ();
    };

    window.addEventListener( 'resize', onWindowResize );


    function animation( time ) {
        const mesh = scene.getObjectByName( 'meshKnot' );
        mesh.rotation.y = time / 1000;
        renderer.render( scene, camera );
        stats.update();
    }

    // 初始化透视相机
    const camera = new THREE.PerspectiveCamera(s, width / height, 0.1, 1000)
    // let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set( 0, 16, - 25 ); //设置相机位置
    // camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    onMounted(()=> {
        let trajectoryMotion = document.getElementById( 'objectRendering' );
        trajectoryMotion.appendChild( renderer.domElement );
        stats.dom.style.top = '50px';
        stats.dom.style.left = '220px'
        trajectoryMotion.appendChild( stats.dom );
    })

    const rectLight1 = new THREE.RectAreaLight( 0xff0000, 6, 10, 20 );
    rectLight1.position.set( -12, 10, 5 );
    scene.add( rectLight1 );

    const rectLight2 = new THREE.RectAreaLight( 0x00ff00, 6, 10, 20 );
    rectLight2.position.set( 0, 10, 5 );
    scene.add( rectLight2 );

    const rectLight3 = new THREE.RectAreaLight( 0x0000ff, 6, 10, 20 );
    rectLight3.position.set( 12, 10, 5 );
    scene.add( rectLight3 );

    scene.add( new RectAreaLightHelper( rectLight1 ) );
    scene.add( new RectAreaLightHelper( rectLight2 ) );
    scene.add( new RectAreaLightHelper( rectLight3 ) );

    RectAreaLightUniformsLib.init();

    // 地面
    const geoFloor = new THREE.BoxGeometry( 2000, 0.1, 2000 );
    const matStdFloor = new THREE.MeshPhysicalMaterial( { color: 0x808080, roughness: 0, metalness: 0 ,clearcoat: 0} );
    const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
    scene.add( mshStdFloor );


    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
        steps: 2,  // ui: steps
        depth: 2,  // ui: depth
        bevelEnabled: true,  // ui: bevelEnabled
        bevelThickness: 1,  // ui: bevelThickness
        bevelSize: 1,  // ui: bevelSize
        bevelSegments: 2,  // ui: bevelSegments
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);


    // 模型
    const geoKnot = new THREE.TorusKnotGeometry( 1.5, 0.5, 200, 16 );
    const matKnot = new THREE.MeshPhysicalMaterial( { color: 0xffffff, roughness: 0, metalness: 0 ,clearcoat: 0} );
    const meshKnot = new THREE.Mesh( geometry, matKnot );
    meshKnot.name = 'meshKnot';
    meshKnot.position.set( 0, 10, -10 );
    meshKnot.rotateX(Math.PI/1)
    meshKnot.scale.x = 0.6
    meshKnot.scale.y = 0.6
    meshKnot.scale.z = 0.6
    scene.add( meshKnot );


    let controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
    // 启用惯性
    controls.enableDamping = true
    // 相机向外移动极限
    controls.maxDistance = 30;
    controls.minDistance = 20;


</script>


<script setup lang="ts">








</script>

<style scoped>


</style>
