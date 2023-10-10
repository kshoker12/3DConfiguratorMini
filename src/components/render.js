import * as THREE from 'three';
import { useEffect, useRef } from "react";
import React, {useContext, useState} from 'react';
import {AppContext} from '../context/AppContext';
import {Canvas, useThree, useFrame,} from "react-three-fiber";
import { OrbitControls, Stars, PerspectiveCamera} from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { BallCollider, CuboidCollider, RigidBody, quat} from "@react-three/rapier";
// import { Physics } from "@react-three/rapier";
import {Mesh} from 'three';
import { Torus, Sphere, Box, useKeyboardControls, Hud, OrthographicCamera, Environment} from "@react-three/drei";
import { Suspense, useMemo } from "react";
import { useLoader } from '@react-three/fiber'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

let mtlUrl = "models/baran.mtl";
let objUrl = "models/baran.obj";

function Scene() {
  const materials = useLoader(MTLLoader, mtlUrl)
  const object = useLoader(OBJLoader, objUrl, loader => {
    materials.preload()
    loader.setMaterials(materials)
  })
  return <primitive object={object} scale ={[0.01, 0.01, 0.01]}/>
}

function Plane() {
  return (
      <Box position={[0, -1, 0]} args = {[30, 1, 30]} onClick={(event)=>{
      }}>
        <meshStandardMaterial color = "#808080"/>
      </Box>
)
}

function Leg() {
  let mesh = new THREE.Mesh(new THREE.BoxGeometry(3, 0.3, 0.15), new THREE.MeshBasicMaterial("lime"));
  return (
    <primitive object = {mesh}/>
  )
}

function Shape() {
var R =  0.45;
var r =  0.15;
var cx = 0;
var cy = 0;
var sAngle = THREE.MathUtils.degToRad(0);
var eAngle = THREE.MathUtils.degToRad(60);

let shape = new THREE.Shape();

let options = {
  depth: 0.15,
  curveSegments: 64, 
  bevelEnabled: false,
  bevelThickness: 0.1
}

shape.absarc(cx, cy, R, sAngle, eAngle);
shape.absarc(cx, cy, r, eAngle, sAngle, true);


let mesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, options), new THREE.MeshLambertMaterial({color:"lime"}));
mesh.position.x = 0;
mesh.position.y = 0.5;
mesh.position.z = 0;
mesh.rotation.x = 0;
// var mesh = new THREE.ExtrudeGeometry(arcShape, {depth: length, curveSegments: 64, bevelEnabled: false, bevelThickness: 0});
  return (<>
    <primitive object = {mesh}/>
  </>)
}



function Render() {
  return (
    <div className="App" id = "class-container">
      <Canvas style = {{height: "400px", background: "black"}}>
        <Stars/>
        <Plane/>
        <OrbitControls/>
        <ambientLight intensity = {2}/>
        {/* <directionalLight position={[5, 10, 1]} intensity={1}/> */}
        <PerspectiveCamera position = {[10, 10, 10]}/>
        {/* <Scene/> */}
        <Shape/>
        <Leg/>
      </Canvas>
    </div>
  );
}

export default Render;