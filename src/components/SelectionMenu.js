import * as THREE from 'three';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {Canvas, useFrame, useThree} from "react-three-fiber";
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';
import {AppContext} from '../context/AppContext';
import * as DISPATCHER from "../Dispatcher";
const socket = io('http://localhost:3003', {transports: [ "websocket" ]}); 

const SelectionMenu = () => {
    const [queue, setQueue] = useState([]);

    const pushToQueue = (item) => {
        let tempQueue = [] 
        for (let i = 0; i < queue.length; i++) {
          tempQueue.push(queue[i]);
        }
  
        tempQueue[queue.length] = item;
        setQueue(tempQueue);
      }

    useEffect(() => {
        socket.on("V3D_DATA", (data) => {
            console.log("Recieved")
            pushToQueue(data);
            console.log(queue.length)
            socket.emit("NULLIFY", null)
        });
      }, [socket]);

    return (
        <>
        </>
    )
}

export default SelectionMenu;