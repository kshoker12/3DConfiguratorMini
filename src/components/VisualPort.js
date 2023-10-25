import React, {useContext, useState, useRef} from 'react';
import Visualizer from '../components/Visualizer'
import * as THREE from 'three';

const VisualPort = () => {
    const [cameraIndex, setCameraIndex] = useState([0, 1, 2, 3]);
    const aspect = 540 / 288;
    const frustumSize = 1000
    const camera0 = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000);
    camera0.position.set(0, 100, 0);
    camera0.zoom = 20;
    const camera1 = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000);
    camera1.position.set(100, 0, 0);
    camera1.zoom = 20
    const camera2 = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000);
    camera2.position.set(0, 0, 100); 
    camera2.zoom = 20
    const camera3 = new THREE.OrthographicCamera( 540 / - 2, 540 / 2, 288 / 2, 288 / - 2, 1, 1000);
    camera3.position.set(100, 100, 100);
    camera3.zoom = 20

    // const camera3 = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 1, 1000);
    // camera3.position.set(100, 100, 100);
    // camera3.zoom = 20

    // const camera3 = new THREE.PerspectiveCamera(45, 540 / 288, 1, 1000);
    // camera3.position.set(10, 10, 10);
    const controlsTwo = {LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: null}
    const controlsOne = {LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN}

    let cameraArr = [[camera0, false, controlsTwo, "Plan-View"], [camera1, false, controlsTwo, "Side-A"], [camera2, false, controlsTwo, "Side-B"], [camera3, true, controlsOne, "Axonometric-View"]]

    function swap(x, y, list) {
      let arr = [list[0], list[1], list[2], list[3]]
      var a = list[x], b = list[y];
      arr[y] = a;
      arr[x] = b;
      setCameraIndex(arr);
    }
    
    return (
        <>
            {/* <div class="col" style = {{marginLeft: "10px", textAlign: "left"}}>
            <button 
              style = {{marginBottom: "-3px", marginTop: "-7px", width: "150px", height: "20px", fontSize: "12px"}}
              onClick={(e) => {
                swap(0, 3, cameraIndex);
              }}>{cameraArr[cameraIndex[0]][3]}</button>
            <button 
              style = {{marginBottom: "-3px", marginTop: "-7px", width: "150px", height: "20px", fontSize: "12px"}}
              onClick={(e) => {
                swap(1, 3, cameraIndex);
              }}>{cameraArr[cameraIndex[1]][3]}</button>
            <button 
              style = {{marginBottom: "-3px", marginTop: "-7px", width: "150px", height: "20px", fontSize: "12px"}}
              onClick={(e) => {
                swap(2, 3, cameraIndex);
              }}>{cameraArr[cameraIndex[2]][3]}</button>
          </div> */}


            <div class="col" style = {{marginLeft: "10px", textAlign: "left"}}>
            {/* <button 
              style = {{marginBottom: "-3px", marginTop: "-7px", width: "150px", height: "20px", fontSize: "12px"}}
              onClick={(e) => {
                swap(2, 3, cameraIndex);
              }}>{cameraArr[cameraIndex[3]][3]}</button>
            <Visualizer args = {["150px", "80px", cameraArr[cameraIndex[3]][0], cameraArr[cameraIndex[3]][1], cameraArr[cameraIndex[3]][2]]}/> */}
            <button 
              style = {{marginBottom: "-3px", marginTop: "-7px", width: "150px", height: "20px", fontSize: "12px"}}
              onClick={(e) => {
                swap(0, 3, cameraIndex);
              }}>{cameraArr[cameraIndex[0]][3]}</button>
            <Visualizer args = {["150px", "80px", cameraArr[cameraIndex[0]][0], cameraArr[cameraIndex[0]][1], cameraArr[cameraIndex[0]][2]]}/>
            <button 
              style = {{marginBottom: "-3px", marginTop: "-7px", width: "150px", height: "20px", fontSize: "12px"}}
              onClick={(e) => {
                swap(1, 3, cameraIndex);
              }}>{cameraArr[cameraIndex[1]][3]}</button>
            <Visualizer args = {["150px", "80px", cameraArr[cameraIndex[1]][0], cameraArr[cameraIndex[1]][1], cameraArr[cameraIndex[1]][2]]}/>
            <button 
              style = {{marginBottom: "-3px", marginTop: "-7px", width: "150px", height: "20px", fontSize: "12px"}}
              onClick={(e) => {
                swap(2, 3, cameraIndex);
              }}>{cameraArr[cameraIndex[2]][3]}</button>
            <Visualizer args = {["150px", "80px", cameraArr[cameraIndex[2]][0], cameraArr[cameraIndex[2]][1], cameraArr[cameraIndex[2]][2]]}/>
  
          </div>
          <div class = "col">
            <p style = {{marginBottom: "-2px", marginLeft: "-100px", width: "300px"}}>{cameraArr[cameraIndex[3]][3]}</p>
            <Visualizer args = {["540px", "288px", cameraArr[cameraIndex[3]][0], cameraArr[cameraIndex[3]][1], cameraArr[cameraIndex[3]][2]]}/>
          </div>
        </>
    )
}

export default VisualPort;