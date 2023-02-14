<template>
    <World>
        <!--    <Skybox texture="02.jpeg" y={postion.y} />-->
        <!--    <Cube width={9999} depth={9999} y={-100} onClick={handleClick} texture="1.jpeg" textureRepeat={20} />-->
        <!--    <Model-->
        <!--        physics="map"-->
        <!--        ref={modelRef}-->
        <!--        src='StreetScene.fbx'-->
        <!--        scale={16}-->
        <!--        y={720}-->
        <!--    />-->
        <!--    <Model-->
        <!--        y={10}-->
        <!--        src='file.fbx'-->
        <!--        scale={1.2}-->
        <!--        x={-100}-->
        <!--        id="car"-->
        <!--        intersectIds={["orangeBox"]}-->
        <!--    />-->
        <!--    <ThirdPersonCamera active mouseControl>-->
        <!--      <Model-->
        <!--          ref={modelRef}-->
        <!--          src='xbot.fbx'-->
        <!--          physics="character"-->
        <!--          animations={{ idele: "idle.fbx", walk: "walk.fbx" }}-->
        <!--          animation={walking ? "walk" : "idele"}-->
        <!--          intersectIds={["orangeBox","car"]}-->
        <!--          onIntersect={handleIntersect}-->
        <!--      />-->
        <!--    </ThirdPersonCamera>-->
        <!--    <OrbitCamera active z={300} />-->
        <!--    <Cube id="orangeBox" scale={0.2} color="orange" x={postion.x} y={postion.y} z={postion.z} visible={false} />-->
    </World>
</template>

<script setup lang="ts">
import {
    World,
    LingoEditor,
    Model,
    Cube,
    OrbitCamera,
    ThirdPersonCamera,
    Skybox,
} from 'lingo3d-vue';
</script>

<style lang="less" scoped></style>
