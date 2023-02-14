<template>

    <div id="panoramiciewing" />

</template>

<script setup>
    import { onMounted } from "vue";
    import * as THREE from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
    import Stats from 'three/examples/jsm/libs/stats.module.js';


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
        // const mesh = scene.getObjectByName( 'meshKnot' );
        // mesh.rotation.y = time / 1000;
        renderer.render( scene, camera );
        stats.update();
    }


    /**
     * 创建相机公用方法
     * */
    function makeCamera(fov = 40) {
        const aspect = 2 // the canvas default
        const zNear = 0.1
        const zFar = 1000
        return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar)
        // fov — 摄像机视锥体垂直视野角度
        // aspect — 摄像机视锥体长宽比
        // near — 摄像机视锥体近端面
        // far — 摄像机视锥体远端面
    }
    const camera = makeCamera();
    // .multiplyScalar() 矩阵的每个元素乘以参数。
    camera.position.set(8, 4, 10).multiplyScalar(3);
    // 朝向
    camera.lookAt(0, 0, 0);


    // 方向光
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 20, 0);
    scene.add(light);

    // 方向光
    const light1 = new THREE.DirectionalLight(0xffffff, 1)
    light1.position.set(1, 2, 4)
    scene.add(light1)


    // 初始化透视相机
    // const camera = new THREE.PerspectiveCamera(s, width / height, 0.1, 1000)
    // // let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    // camera.position.set( 0, 16, - 25 ); //设置相机位置
    // // camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    onMounted(()=> {
        let trajectoryMotion = document.getElementById( 'panoramiciewing' );
        trajectoryMotion.appendChild( renderer.domElement );
        stats.dom.style.top = '50px';
        stats.dom.style.left = '220px'
        trajectoryMotion.appendChild( stats.dom );
    })

    let controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
    // 启用惯性
    controls.enableDamping = true;
    // 相机向外移动极限
    // controls.maxDistance = 30;
    // controls.minDistance = 20;


    // 平面几何
    const groundGeometry = new THREE.PlaneGeometry(50, 50)
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xcc8866 })
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
    groundMesh.rotation.x = Math.PI * -0.5
    scene.add(groundMesh)

    const tank = new THREE.Object3D();
    scene.add(tank);
    // 创建底盘
    const carWidth = 4
    const carHeight = 1
    const carLength = 8
    // 几何体
    const bodyGeometry = new THREE.BoxGeometry(carWidth, carHeight, carLength)
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x6688aa })
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
    bodyMesh.position.y = 1.4
    tank.add(bodyMesh)

    const wheelRadius = 1
    const wheelThickness = 0.5
    const wheelSegments = 36
    // 圆柱体
    const wheelGeometry = new THREE.CylinderGeometry(
        wheelRadius, // 圆柱顶部圆的半径
        wheelRadius, // 圆柱底部圆的半径
        wheelThickness, // 高度
        wheelSegments // X轴分成多少段
    )
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 })
    // 根据底盘 定位轮胎位置
    const wheelPositions = [
        [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, carLength / 3],
        [carWidth / 2 + wheelThickness / 2, -carHeight / 2, carLength / 3],
        [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, 0],
        [carWidth / 2 + wheelThickness / 2, -carHeight / 2, 0],
        [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, -carLength / 3],
        [carWidth / 2 + wheelThickness / 2, -carHeight / 2, -carLength / 3]
    ]
    const wheelMeshes = wheelPositions.map((position) => {
        const mesh = new THREE.Mesh(wheelGeometry, wheelMaterial)
        mesh.position.set(...position)
        mesh.rotation.z = Math.PI * 0.5
        bodyMesh.add(mesh)
        return mesh
    })

    // 底盘局部相机
    const tankCameraFov = 75
    const tankCamera = makeCamera(tankCameraFov)
    tankCamera.position.y = 3
    tankCamera.position.z = -6
    tankCamera.rotation.y = Math.PI
    bodyMesh.add(tankCamera)

    // 坦克头
    const domeRadius = 2
    const domeWidthSubdivisions = 12
    const domeHeightSubdivisions = 12
    const domePhiStart = 0
    const domePhiEnd = Math.PI * 2
    const domeThetaStart = 0
    const domeThetaEnd = Math.PI * 0.5
    const domeGeometry = new THREE.SphereGeometry(
        domeRadius,
        domeWidthSubdivisions,
        domeHeightSubdivisions,
        domePhiStart,
        domePhiEnd,
        domeThetaStart,
        domeThetaEnd
    )
    const domeMesh = new THREE.Mesh(domeGeometry, bodyMaterial)
    bodyMesh.add(domeMesh)
    domeMesh.position.y = 0.5

    // 炮干
    const turretWidth = 0.5
    const turretHeight = 0.5
    const turretLength = 5
    const turretGeometry = new THREE.BoxGeometry(turretWidth, turretHeight, turretLength)
    const turretMesh = new THREE.Mesh(turretGeometry, bodyMaterial)
    const turretPivot = new THREE.Object3D()
    turretPivot.position.y = 0.5
    turretMesh.position.z = turretLength * 0.5
    turretPivot.add(turretMesh)
    bodyMesh.add(turretPivot)


    // 目标
    const targetGeometry = new THREE.SphereGeometry(0.5, 36, 36)
    const targetMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, flatShading: true })
    const targetMesh = new THREE.Mesh(targetGeometry, targetMaterial)
    const targetElevation = new THREE.Object3D()
    const targetBob = new THREE.Object3D()
    scene.add(targetElevation)
    targetElevation.position.z = carLength * 2
    targetElevation.position.y = 8
    targetElevation.add(targetBob)
    targetBob.add(targetMesh)

    // 获取目标全局坐标
    const targetPosition = new THREE.Vector3()
    targetMesh.getWorldPosition(targetPosition)
    // 炮台瞄准目标
    turretPivot.lookAt(targetPosition)

    // 目标上的相机
    const targetCamera = makeCamera()
    targetCamera.position.y = 1
    targetCamera.position.z = -2
    targetCamera.rotation.y = Math.PI
    targetBob.add(targetCamera)

    // 绘制移动路径
    const curve = new THREE.SplineCurve([
      new THREE.Vector2(-10, 20),
      new THREE.Vector2(-5, 5),
      new THREE.Vector2(0, 0),
      new THREE.Vector2(5, -5),
      new THREE.Vector2(10, 0),
      new THREE.Vector2(5, 10),
      new THREE.Vector2(-5, 10),
      new THREE.Vector2(-10, -10),
      new THREE.Vector2(-15, -8),
      new THREE.Vector2(-10, 20)
    ])

    const points = curve.getPoints(50)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
    const splineObject = new THREE.Line(geometry, material)
    splineObject.rotation.x = Math.PI * 0.5
    splineObject.position.y = 0.05
    scene.add(splineObject)

    const targetPosition2 = new THREE.Vector3()
    const tankPosition = new THREE.Vector2()
    const tankTarget = new THREE.Vector2()

    const cameras = [
      { cam: camera, desc: '全局相机' },
      { cam: targetCamera, desc: '目标上的相机' },
      { cam: tankCamera, desc: '底盘 局部相机' }
    ]


    function render(time) {
      time *= 0.001

      // 上下移动目标
      targetBob.position.y = Math.sin(time * 2) * 4
      targetMaterial.emissive.setHSL((time * 10) % 1, 1, 0.25)
      targetMaterial.color.setHSL((time * 10) % 1, 1, 0.25)
      // 获取目标全局坐标
      targetMesh.getWorldPosition(targetPosition2)
      // 炮台瞄准目标
      turretPivot.lookAt(targetPosition2)

      // 根据路线移动坦克
      const tankTime = time * 0.05
      curve.getPointAt(tankTime % 1, tankPosition)
      // 获取 路径 坦克前一点坐标 用于坦克头 向前
      curve.getPointAt((tankTime + 0.01) % 1, tankTarget)
      // 位移
      tank.position.set(tankPosition.x, 0, tankPosition.y)
      tank.lookAt(tankTarget.x, 0, tankTarget.y)

      // 切换相机
      const camera1 = cameras[time % cameras.length | 0]
      // 获取坦克的 全局坐标
      tank.getWorldPosition(targetPosition2)
      // 看向坦克
      targetCamera.lookAt(targetPosition2)

      // 加载渲染器 tankCamera targetCamera
      renderer.render(scene, camera1.cam)

      // 加载渲染器
      // renderer.render(scene, camera)
      // 开始动画
      requestAnimationFrame(render)
    }
    // 开始渲染
    requestAnimationFrame(render)

</script>


<style scoped>


</style>
