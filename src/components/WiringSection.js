import Visualizer from '../components/Visualizer'
import * as THREE from 'three';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {Canvas, useFrame, useThree} from "react-three-fiber";
import {OrbitControls, Stars, PerspectiveCamera, Box} from "@react-three/drei";
import { Physics} from "@react-three/cannon";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CameraHelper } from 'three';
import io from 'socket.io-client';
import {AppContext} from '../context/AppContext';
const socket = io('http://localhost:3003', {transports: [ "websocket" ]}); 

const jsonCore = 
{
    "legs": [
        {
            "modules": [
                {
                    "11": {
                        "id": 6,
                        "cs_alias": "D",
                        "cop_nbr_part": "D",
                        "display_name": "D - UNV 120-277V",
                        "element_name": "volt"
                    },
                    "22": {
                        "id": 32,
                        "cs_alias": "8tm",
                        "v3d_width_m": "0.0540",
                        "cop_nbr_part": "08",
                        "display_name": "8ft",
                        "element_name": "ModuleLength",
                        "v3d_height_m": "0.1140",
                        "v3d_length_m": [
                            2.4384
                        ]
                    },
                    "33": {
                        "id": 1,
                        "cs_alias": "W",
                        "cop_nbr_part": "W",
                        "display_name": "W - Standard",
                        "element_name": "finish"
                    },
                    "41": {
                        "id": 15,
                        "cs_alias": "NN",
                        "v3d_show": false,
                        "v3d_class": "sensor",
                        "cop_nbr_part": "NN",
                        "display_name": "NN - No Integral Sensor",
                        "element_name": "controls"
                    },
                    "42": {
                        "id": 8,
                        "cs_alias": "9",
                        "cop_nbr_part": "9",
                        "display_name": "9 - 9\"",
                        "element_name": "size"
                    },
                    "49": {
                        "id": 129,
                        "cs_alias": "0-10Vb",
                        "cop_nbr_part": "E",
                        "display_name": "E - Advance Xitanium 0-10V (1%)",
                        "element_name": "ballastbrand"
                    },
                    "73": {
                        "id": 69,
                        "cs_alias": "Jtm0",
                        "cop_nbr_part": "",
                        "display_name": "Joiner",
                        "element_name": "Joiner"
                    },
                    "301": {
                        "id": 2,
                        "cs_alias": "1",
                        "cop_nbr_part": "1",
                        "display_name": "1 - Single Circuit",
                        "element_name": "Circuit"
                    },
                    "304": {
                        "id": 5,
                        "cs_alias": "G",
                        "v3d_show": true,
                        "v3d_class": "em-option, em-gtd",
                        "cop_nbr_part": "G",
                        "display_name": "G - GTD",
                        "element_name": "EmOption"
                    },
                    "position": 0
                },
                {
                    "11": {
                        "id": 6,
                        "cs_alias": "D",
                        "cop_nbr_part": "D",
                        "display_name": "D - UNV 120-277V",
                        "element_name": "volt"
                    },
                    "22": {
                        "id": 29,
                        "cs_alias": "4tm",
                        "v3d_width_m": "0.0540",
                        "cop_nbr_part": "04",
                        "display_name": "4ft",
                        "element_name": "ModuleLength",
                        "v3d_height_m": "0.1140",
                        "v3d_length_m": [
                            1.2192
                        ]
                    },
                    "33": {
                        "id": 1,
                        "cs_alias": "W",
                        "cop_nbr_part": "W",
                        "display_name": "W - Standard",
                        "element_name": "finish"
                    },
                    "41": {
                        "id": 15,
                        "cs_alias": "NN",
                        "v3d_show": false,
                        "v3d_class": "sensor",
                        "cop_nbr_part": "NN",
                        "display_name": "NN - No Integral Sensor",
                        "element_name": "controls"
                    },
                    "42": {
                        "id": 4,
                        "cs_alias": "2",
                        "cop_nbr_part": "2",
                        "display_name": "2 - Medium",
                        "element_name": "size"
                    },
                    "49": {
                        "id": 129,
                        "cs_alias": "0-10Vb",
                        "cop_nbr_part": "E",
                        "display_name": "E - Advance Xitanium 0-10V (1%)",
                        "element_name": "ballastbrand"
                    },
                    "73": {
                        "id": 69,
                        "cs_alias": "Jtm0",
                        "cop_nbr_part": "",
                        "display_name": "Joiner",
                        "element_name": "Joiner"
                    },
                    "301": {
                        "id": 11,
                        "cs_alias": "V",
                        "cop_nbr_part": "V",
                        "display_name": "V - Single Circuit + 1 Thru Wire (BP Trigger)",
                        "element_name": "Circuit"
                    },
                    "304": {
                        "id": 5,
                        "cs_alias": "G",
                        "v3d_show": true,
                        "v3d_class": "em-option, em-gtd",
                        "cop_nbr_part": "G",
                        "display_name": "G - GTD",
                        "element_name": "EmOption"
                    },
                    "position": 1
                },
                {
                    "11": {
                        "id": 6,
                        "cs_alias": "D",
                        "cop_nbr_part": "D",
                        "display_name": "D - UNV 120-277V",
                        "element_name": "volt"
                    },
                    "22": {
                        "id": 32,
                        "cs_alias": "8tm",
                        "v3d_width_m": "0.0540",
                        "cop_nbr_part": "08",
                        "display_name": "8ft",
                        "element_name": "ModuleLength",
                        "v3d_height_m": "0.1140",
                        "v3d_length_m": [
                            2.4384
                        ]
                    },
                    "33": {
                        "id": 1,
                        "cs_alias": "W",
                        "cop_nbr_part": "W",
                        "display_name": "W - Standard",
                        "element_name": "finish"
                    },
                    "41": {
                        "id": 15,
                        "cs_alias": "NN",
                        "v3d_show": false,
                        "v3d_class": "sensor",
                        "cop_nbr_part": "NN",
                        "display_name": "NN - No Integral Sensor",
                        "element_name": "controls"
                    },
                    "42": {
                        "id": 8,
                        "cs_alias": "9",
                        "cop_nbr_part": "9",
                        "display_name": "9 - 9\"",
                        "element_name": "size"
                    },
                    "49": {
                        "id": 129,
                        "cs_alias": "0-10Vb",
                        "cop_nbr_part": "E",
                        "display_name": "E - Advance Xitanium 0-10V (1%)",
                        "element_name": "ballastbrand"
                    },
                    "73": {
                        "id": 69,
                        "cs_alias": "Jtm0",
                        "cop_nbr_part": "",
                        "display_name": "Joiner",
                        "element_name": "Joiner"
                    },
                    "301": {
                        "id": 2,
                        "cs_alias": "1",
                        "cop_nbr_part": "1",
                        "display_name": "1 - Single Circuit",
                        "element_name": "Circuit"
                    },
                    "304": {
                        "id": 5,
                        "cs_alias": "G",
                        "v3d_show": true,
                        "v3d_class": "em-option, em-gtd",
                        "cop_nbr_part": "G",
                        "display_name": "G - GTD",
                        "element_name": "EmOption"
                    },
                    "position": 2
                },
                {
                    "11": {
                        "id": 6,
                        "cs_alias": "D",
                        "cop_nbr_part": "D",
                        "display_name": "D - UNV 120-277V",
                        "element_name": "volt"
                    },
                    "22": {
                        "id": 32,
                        "cs_alias": "8tm",
                        "v3d_width_m": "0.0540",
                        "cop_nbr_part": "08",
                        "display_name": "8ft",
                        "element_name": "ModuleLength",
                        "v3d_height_m": "0.1140",
                        "v3d_length_m": [
                            2.4384
                        ]
                    },
                    "33": {
                        "id": 1,
                        "cs_alias": "W",
                        "cop_nbr_part": "W",
                        "display_name": "W - Standard",
                        "element_name": "finish"
                    },
                    "41": {
                        "id": 15,
                        "cs_alias": "NN",
                        "v3d_show": false,
                        "v3d_class": "sensor",
                        "cop_nbr_part": "NN",
                        "display_name": "NN - No Integral Sensor",
                        "element_name": "controls"
                    },
                    "42": {
                        "id": 8,
                        "cs_alias": "9",
                        "cop_nbr_part": "9",
                        "display_name": "9 - 9\"",
                        "element_name": "size"
                    },
                    "49": {
                        "id": 129,
                        "cs_alias": "0-10Vb",
                        "cop_nbr_part": "E",
                        "display_name": "E - Advance Xitanium 0-10V (1%)",
                        "element_name": "ballastbrand"
                    },
                    "73": {
                        "id": 69,
                        "cs_alias": "Jtm0",
                        "cop_nbr_part": "",
                        "display_name": "Joiner",
                        "element_name": "Joiner"
                    },
                    "301": {
                        "id": 2,
                        "cs_alias": "1",
                        "cop_nbr_part": "1",
                        "display_name": "1 - Single Circuit",
                        "element_name": "Circuit"
                    },
                    "304": {
                        "id": 5,
                        "cs_alias": "G",
                        "v3d_show": true,
                        "v3d_class": "em-option, em-gtd",
                        "cop_nbr_part": "G",
                        "display_name": "G - GTD",
                        "element_name": "EmOption"
                    },
                    "position": 3
                }
            ],
            "properties": {
                "5": {
                    "id": 13,
                    "cs_alias": "L",
                    "cop_nbr_part": "L",
                    "display_name": "L - LED",
                    "element_name": "lamptype"
                },
                "11": {
                    "id": 6,
                    "cs_alias": "D",
                    "cop_nbr_part": "D",
                    "display_name": "D - UNV 120-277V",
                    "element_name": "volt"
                },
                "22": {
                    "id": 32,
                    "cs_alias": "8tm",
                    "v3d_width_m": "0.0540",
                    "cop_nbr_part": "08",
                    "display_name": "8ft",
                    "element_name": "ModuleLength",
                    "v3d_height_m": "0.1140",
                    "v3d_length_m": [
                        2.4384
                    ]
                },
                "32": {
                    "id": 87,
                    "cs_alias": "Ftm05",
                    "v3d_width_m": "0.0540",
                    "cop_nbr_part": "F",
                    "display_name": "Flat Grooved",
                    "element_name": "endcap",
                    "v3d_height_m": "0.1140",
                    "v3d_length_m": 0.0000
                },
                "33": {
                    "id": 1,
                    "cs_alias": "W",
                    "cop_nbr_part": "W",
                    "display_name": "W - Standard",
                    "element_name": "finish"
                },
                "35": {
                    "id": 24,
                    "cs_alias": "W",
                    "cop_nbr_part": "W",
                    "display_name": "W - Standard White",
                    "element_name": "factorycolors"
                },
                "40": {
                    "id": 1,
                    "cs_alias": "FIN_W_SETUP",
                    "cop_nbr_part": "",
                    "display_name": "Standard Color Setup",
                    "element_name": "finishsetup"
                },
                "42": {
                    "id": 13,
                    "cs_alias": "0susp",
                    "cop_nbr_part": "0",
                    "display_name": "0 - Suspended",
                    "element_name": "size"
                },
                "43": {
                    "id": 39,
                    "cs_alias": "5tm",
                    "cop_nbr_part": "5",
                    "display_name": "5 - Indirect/Direct",
                    "element_name": "distribution"
                },
                "49": {
                    "id": 129,
                    "cs_alias": "0-10Vb",
                    "cop_nbr_part": "E",
                    "display_name": "E - Advance Xitanium 0-10V (1%)",
                    "element_name": "ballastbrand"
                },
                "55": {
                    "id": 1,
                    "cs_alias": "A/C",
                    "cop_nbr_part": "AC",
                    "display_name": "AC - Aircraft Cable",
                    "element_name": "Mount"
                },
                "56": {
                    "id": 1,
                    "cs_alias": "A/C",
                    "cop_nbr_part": "AC",
                    "display_name": "AC - Aircraft Cable",
                    "element_name": "Mount_Type"
                },
                "57": {
                    "id": 2,
                    "cs_alias": "A5wbW",
                    "cop_nbr_part": "",
                    "display_name": "Straight White",
                    "element_name": "Mount_Cord"
                },
                "58": {
                    "id": 1,
                    "cs_alias": "24",
                    "cop_nbr_part": "24",
                    "display_name": "24 - 2' (24\")",
                    "element_name": "Mount_Length"
                },
                "60": {
                    "id": 69,
                    "cs_alias": "TM",
                    "cop_nbr_part": "TM",
                    "display_name": "TM - TruGroove Micro",
                    "element_name": "Series2char"
                },
                "64": {
                    "id": 1,
                    "cs_alias": "A?",
                    "cop_nbr_part": "A?",
                    "display_name": "A? - Don't Know Yet",
                    "element_name": "Mounting"
                },
                "73": {
                    "id": 69,
                    "cs_alias": "Jtm0",
                    "cop_nbr_part": "",
                    "display_name": "Joiner",
                    "element_name": "Joiner"
                },
                "100": {
                    "id": null,
                    "cs_alias": null,
                    "cop_nbr_part": null,
                    "display_name": null,
                    "element_name": null
                },
                "120": {
                    "id": 1,
                    "cs_alias": "sym",
                    "cop_nbr_part": "",
                    "display_name": "Symmetric",
                    "element_name": "LightThrowDn"
                },
                "121": {
                    "id": 1,
                    "cs_alias": "sym",
                    "cop_nbr_part": "",
                    "display_name": "Symmetric",
                    "element_name": "LightThrowUp"
                },
                "122": {
                    "id": 0,
                    "cs_alias": "C",
                    "cop_nbr_part": "",
                    "display_name": "Straight Run",
                    "element_name": "T3Conn"
                },
                "150": {
                    "id": 7,
                    "cs_alias": "Q06",
                    "cop_nbr_part": "Q",
                    "display_name": "Q - Performance Symmetric Batwing Flush MesoOptics Lens",
                    "element_name": "LensDir"
                },
                "151": {
                    "id": 13,
                    "cs_alias": "W06",
                    "cop_nbr_part": "W",
                    "display_name": "W - Performance 20Â° Asymmetric Wall Wash w/MesoOptics",
                    "element_name": "LouverOpt"
                },
                "152": {
                    "id": 3,
                    "cs_alias": "W",
                    "cop_nbr_part": "W",
                    "display_name": "W - White",
                    "element_name": "LouverClr"
                },
                "153": {
                    "id": 2,
                    "cs_alias": "C",
                    "cop_nbr_part": "C",
                    "display_name": "C - 6in Length (3 Cells)",
                    "element_name": "LouverLen"
                },
                "154": {
                    "id": 2,
                    "cs_alias": "1",
                    "cop_nbr_part": "1",
                    "display_name": "1 - One End",
                    "element_name": "LouverPos"
                },
                "155": {
                    "id": 8,
                    "cs_alias": "40",
                    "cop_nbr_part": "40",
                    "display_name": "40 - 4000lm/4ft",
                    "element_name": "LumDir"
                },
                "156": {
                    "id": 2,
                    "cs_alias": "Q",
                    "cop_nbr_part": "Q",
                    "display_name": "Q - Performance Symmetric Lens",
                    "element_name": "OptInd"
                },
                "157": {
                    "id": 14,
                    "cs_alias": "70",
                    "cop_nbr_part": "70",
                    "display_name": "70 - 7000lm/4ft",
                    "element_name": "LumInd"
                },
                "301": {
                    "id": 2,
                    "cs_alias": "1",
                    "cop_nbr_part": "1",
                    "display_name": "1 - Single Circuit",
                    "element_name": "Circuit"
                },
                "302": {
                    "id": 4,
                    "cs_alias": "935",
                    "cop_nbr_part": "935",
                    "display_name": "935 - CRI 90,  3500K",
                    "element_name": "CriClr"
                },
                "304": {
                    "id": 5,
                    "cs_alias": "G",
                    "v3d_show": true,
                    "v3d_class": "em-option, em-gtd",
                    "cop_nbr_part": "G",
                    "display_name": "G - GTD",
                    "element_name": "EmOption"
                },
                "cop": "TM05L935QWWC140Q70-28-D-E-1/V-G-NN-W",
                "extraCOP": "0-28-D-E-1/V-G-NN-W",
                "priceCOP": "TM05L935QWWC140Q70",
                "total4Ft": "7",
                "runLength": 28,
                "customPaint": {
                    "color": "",
                    "customManufacturer": ""
                },
                "customBallast": {
                    "id": 0
                },
                "totalNbrLamps": 0
            }
        }
    ],
    "properties": {
        "newWiring": true
    }
}

const WiringSection = () => {
    const {dispatch, payload} = useContext(AppContext);
    const [louver, setLouver] = useState([]);
    const [selected, setSelected] = useState(null);
    const [components, setComponents] = useState(null);
    const [hovered, hover] = useState([]);

    useEffect(() => {
        socket.on("V3D_DATA", (data) => {
            console.log("Recieved")
            dispatch({
                type: "SET_CURRENT_CONFIG",
                payload: data
            })
            socket.emit("NULLIFY", null)
        });
      }, [socket]);

    const updateHover = (id, val) => {
      let tarr = [] 
      for (let i = 0; i < hovered.length; i++) {
        tarr.push(hover[i]);
      }

      tarr[id] = val;
      hover(tarr);
    }

    const updateLouver = (id, val) => {
      let tarr = [] 
      for (let i = 0; i < louver.length; i++) {
        tarr.push(louver[i]);
      }

      tarr[id] = val;
      setLouver(tarr);
    }
    let spacer = 0.04

    
    function extractComponents() {
        let temp = jsonCore.legs[0].modules;
        let arr = [];
        let v = 17.7
        for (var h = 0; h < temp.length; h++) {
            let element = {id: h, data: temp[h]["22"], light_throw: "Right", louver: "No", louver_light_throw: "Right"};
            v += element.data.v3d_length_m[0];
            arr.push(element)
        }
        v = -(v + 4 * spacer) / 2
        for (let h = 0; h < arr.length; h++) {
            let element = arr[h];
            v += element.data.v3d_length_m[0] / 2;
            element["pos_x"] = v;
            v += element.data.v3d_length_m[0] / 2 + spacer;
            arr[h] = element;
        }
        setComponents(arr);
        setSelected(arr[0])
    }

    function Plane() {
        return (
            <Box position={[0, -1, 0]} args = {[30, 1, 30]} onClick={(event)=>{
            }}>
              <meshStandardMaterial color = "#808080"/>
            </Box>
      )
    }

    function RenderComponents() {
        if (components !== null) {
            return components.map((element) => {
                let height = parseFloat(element.data.v3d_height_m);
                let width =  8 * parseFloat(element.data.v3d_width_m);
                let length = element.data.v3d_length_m[0];
                let mesh = new THREE.Mesh(new THREE.BoxGeometry(length, height, width), new THREE.MeshStandardMaterial());
                mesh.position.x = element.pos_x;
                mesh.position.y = 1;
                return <primitive 
                    object = {mesh}
                    onClick = {(e)=>{
                        e.stopPropagation();
                        if (selected !== null) {
                            let elementPrev = components[selected.id];
                            elementPrev.light_throw = selected.light_throw;
                            elementPrev.louver = selected.louver;
                            elementPrev.louver_light_throw = selected.louver_light_throw
                            components[selected.id] = elementPrev;
                            console.log(elementPrev);
                        }
                        setSelected(element);
                    }}
                    // onPointerOut={(e) => {
                    //     e.stopPropagation();
                    //     updateHover(element.id, null)
                    // }}
                    // onPointerMove={(e) => {
                    //     e.stopPropagation();
                    //     updateHover(element.id, 1)
                    // }}
                >
                    <meshLambertMaterial color = {selected !== null ? selected.id === element.id ? "red": null: null}/>
                    {/* <meshLambertMaterial color = {selected !== null ? selected.id === element.id ? "red": hovered[element.id] === 1 ? "red": null: null}/> */}
                </primitive>
            })
        }
    }

    function MainPane() {
        if (components === null) {
           extractComponents(); 
        }
        const aspect = 540 / 100;
        const frustumSize = 1000
        const camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000);
        camera.position.set(0, 100, 0);
        camera.zoom = 60;
        return (
            <div style = {{width: "540px", overflowX: "scroll"}}>
                <Canvas 
                    frameloop='demand'
                    style = {{color: "black", width: "1600px", height: "100px", background:"black"}}
                    camera = {camera}
                >
                    <OrbitControls enableRotate = {false} enableZoom = {false} enablePan = {false}/>
                    <ambientLight intensity = {5}/>
                    <directionalLight position={[5, 10, 1]} intensity={1}/>
                    <Plane/>
                    <RenderComponents/>
                </Canvas> 
            </div>
            
        )
    }
    
    function LeftPane() {
        return (
        <div className = "col" style = {{flex: "0 0 auto", marginLeft: "650px", marginTop: "-10px", display: "flex"}}> 
            <table>
                <tr>
                    <td>
                        <label>Light Throw</label>
                    </td>
                    <td>
                        <div class = "row">
                            <label>Left</label>
                            <input  
                            type = "radio" 
                            style = {{}} 
                            name = "Light Throw" 
                            value = "Left" 
                            checked = {selected !== null ? selected.light_throw === "Left" ? true: false: false}
                            onClick={(e)=>{
                                e.stopPropagation();
                                let temp =  {id: selected.id, data: selected.data, light_throw: "Left", louver: selected.louver, louver_light_throw: selected.louver_light_throw}
                                setSelected(temp);
                            }}
                            />
                        </div>
                    </td>
                    <td>
                        <div class = "row">       
                            <label>Right</label>
                            <input 
                                type = "radio" style = {{}} 
                                name = "Light Throw" value = "Right" 
                                checked = {selected !== null ? selected.light_throw === "Right" ? true: false: true}
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    let temp =  {id: selected.id, data: selected.data, light_throw: "Right", louver: selected.louver, louver_light_throw: selected.louver_light_throw}
                                    setSelected(temp);
                                }}
                            /> 
                        </div> 
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Louver</label>
                    </td>
                    <td>
                        <div class = "row">
                            <label>Yes</label>
                            <input  
                                value = "Yes" 
                                type = "radio" 
                                style = {{}} 
                                name = "Louver" 
                                checked = {selected !== null ? selected.louver === "Yes" ? true: false: false} 
                                onClick = {(e)=>{
                                    e.stopPropagation();
                                    let temp =  {id: selected.id, data: selected.data, light_throw: selected.light_throw, louver: "Yes", louver_light_throw: selected.louver_light_throw}
                                    setSelected(temp);
                                }}
                            /> 
                        </div>
                    </td>
                    <td>
                        <div class = "row">
                            <label>No</label>
                            <input 
                            value = "No" 
                            type = "radio" 
                            style = {{}} 
                            name = "Louver" 
                            checked = {selected !== null ? selected.louver === "No" ? true: false: true}
                            onClick = {(e) => {
                               e.stopPropagation();
                               let temp =  {id: selected.id, data: selected.data, light_throw: selected.light_throw, louver: "No", louver_light_throw: selected.louver_light_throw}
                               setSelected(temp);
                            }}
                            /> 
                        </div> 
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Louver Light Throw</label>
                    </td>
                    <td>
                        <div class = "row">
                            <label>Left</label>
                            <input 
                                type = "radio" 
                                style = {{}} 
                                name = "Louver Light-Throw" 
                                checked = {selected !== null ? selected.louver_light_throw === "Left" ? true: false: false} 
                                onClick = {(e)=>{
                                    e.stopPropagation();
                                    let temp =  {id: selected.id, data: selected.data, light_throw: selected.light_throw, louver: selected.louver, louver_light_throw: "Left"}
                                    setSelected(temp);
                                    }}
                                /> 
                        </div>
                    </td>
                    <td>
                        <div class = "row">
                            <label>Right</label>
                            <input 
                                type = "radio" 
                                style = {{}} 
                                name = "Louver Light-Throw" 
                                checked = {selected !== null ? selected.louver_light_throw === "Right" ? true: false: true}
                                onClick = {(e) => {
                                    e.stopPropagation();
                                    let temp =  {id: selected.id, data: selected.data, light_throw: selected.light_throw, louver: selected.louver, louver_light_throw: "Right"}
                                    setSelected(temp);
                                }}
                            /> 
                        </div> 
                    </td>
                </tr>
            </table>
            <MainPane/>
            </div>
        )
    }

    
    return (
        <div style = {{marginTop: "-120px", marginLeft: "-300px"}}>
            <LeftPane/>
        </div>
    )
}

export default WiringSection;