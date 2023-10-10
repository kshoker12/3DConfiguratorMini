import * as THREE from 'three';
import React, {useContext, useState} from 'react';
import {AppContext} from '../context/AppContext';
import {Canvas} from "react-three-fiber";
import { OrbitControls, Stars, PerspectiveCamera, Box} from "@react-three/drei";
import { Physics} from "@react-three/cannon";


const front = new THREE.TextureLoader().load('models/front.PNG' ); 
const bottom = new THREE.TextureLoader().load('models/bottom.PNG' ); 
const side = new THREE.TextureLoader().load('models/side.PNG' ); 
const top = new THREE.TextureLoader().load('models/top.PNG' ); 

let feet = 0.305;
let inch = 0.0254;
let mm = 0.001;
let subtractor = 2;

const Visualizer = () => {
    const {dispatch, payload} = useContext(AppContext);
    const {components} = useContext(AppContext);
    const {appState} = useContext(AppContext);
    const {canvasComponents} = useContext(AppContext);
    const [length, setLength] = useState(3);
    const [angle, setAngle] = useState(90);
    const [cornerType, setCornerType] = useState("Vertical");

    const legWidth = components[0].width * inch;
    const legHeight = components[0].height * inch;
    const cornerWidth = components[1].width * inch;
    const cornerheight = components[1].height * inch;
    const cornerLength = components[1].length * feet;

    var hoverArr = []
    for (var q = 0; q < canvasComponents.length; q++) {
      hoverArr.push(null);
    }
    const [hovered, hover] = useState(hoverArr);

    const updateHover = (id, val) => {
      let tarr = [] 
      for (let i = 0; i < hovered.length; i++) {
        tarr.push(hover[i]);
      }

      tarr[id] = val;
      hover(tarr);
    }

    const updateState = () => {
        if (appState % 2 === 1) {
            return appState + 1;
        } else {
            return appState;
        }
    }

    function oppositeIndex(index) {
        switch (index) {
          case 0: 
            return 1;
            break;
          case 1:
            return 0;
            break;
          case 2:
            return 3;
            break;
          case 3:
            return 2;
            break;
          case 4:
            return 5;
            break;
          case 5:
            return 4;
            break;
          default: 
            return -1;
            break;
        }
      }

    function assignMesh(element) {
        let mesh = new THREE.Mesh(new THREE.BoxGeometry(element.dimensions[0], element.dimensions[1], element.dimensions[2]), new THREE.MeshStandardMaterial(0xff0000));
        mesh.position.set(element.position[0], element.position[1], element.position[2]);
        mesh.rotation.set(element.angle[0], element.angle[1], element.angle[2]);
        return mesh;
    }

    function createCornerObject(mesh, adder, type, color) {
        let position = [mesh.position.x, mesh.position.y, mesh.position.z];
        let element_angle = [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z];
        let object = {id: canvasComponents.length, dimensions: [cornerLength, cornerheight, cornerWidth], position: position, angle: element_angle, type: type, cornerType: cornerType, color: color, connections: [0, 0, 0, 0, 0, 0],  cor_angle: angle, adder: adder, axis: "X"}
        return object;
    }

    function createEndCapObject( mesh, adder, type, color) {
        let position = [mesh.position.x, mesh.position.y, mesh.position.z];
        let angle = [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z];
        let width = components[2].width;
        let object = {id: canvasComponents.length, dimensions: [width,width,width], position: position, angle: angle, type: type, cornerType: cornerType, color: color, connections: [0, 0, 0, 0, 0, 0],  adder: adder}
        return object;
    }

    function createLegObject(mesh, type, color, adder, rotation, axis, id) {
        let position = [mesh.position.x, mesh.position.y, mesh.position.z];
        let angle = [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z];
        let object = {id: canvasComponents.length + id, dimensions: [length * feet, legHeight, legWidth], position: position, angle: angle, type: type, color: color, connections: [0, 0, 0, 0, 0, 0], rotation: rotation, adder: adder, axis: axis}
        return object;
    }

    function clickEvent(mesh, element, e, adder, id) {
        dispatch({
            type: "STATE_CHANGE",
            payload: updateState() 
        })
        element.connections[e.face.materialIndex] = 1;
        let placement_index = oppositeIndex(e.face.materialIndex);
        let object = createLegObject(mesh, "Leg", "white", adder, 0, "X", id)
        object.connections[placement_index] = 1;
        dispatch({
            type: "ADD_COMPONENT",
            payload: object
        })
    }

    function componentsCalculator(angle, adder) {
        let bool = false;
        let angle_c = null;
        let side_one = cornerLength / 2;
        let side_two = null;
        if (adder === 1) {
            side_two = cornerheight / 2;
        } else {
            side_two = cornerWidth / 2;
        }
        let cornerAngle = Math.atan(side_two/side_one);
        if (angle < 0) {
            bool = true;
            angle_c = cornerAngle * 2 - angle;
        } else {
            angle_c = angle + cornerAngle * 2;
        }
            
        let side_length = Math.sqrt(side_one * side_one + side_two * side_two);
        let side_c = Math.sqrt(2 * (side_length * side_length) - 2 * (side_length * side_length) * Math.cos(angle_c));
        let angle_b = Math.asin(Math.sin(angle_c)/side_c * side_length) + cornerAngle; 
        let x = side_c * Math.cos(angle_b);
        let y = side_c * Math.sin(angle_b);

        if (bool) {
            y = -y;
        }
        return [x, y];
    }

    function TextureWrap(id) {
      id = id.args;
      return (
        <>
            <meshLambertMaterial attach = {"material-0"} map = {front} color={hovered[id] === 0 ? 'lime' : "white"}/>
            <meshLambertMaterial attach = {"material-1"} map = {front} color={hovered[id] === 1 ? 'red' : "white"}/>
            <meshLambertMaterial attach = {"material-2"} map = {top} color={hovered[id] === 2 ? 'red' : "white"}/>
            <meshLambertMaterial attach = {"material-3"} map = {bottom} color={hovered[id] === 3 ? 'red' : "white"}/>
            <meshLambertMaterial attach = {"material-4"} map = {side} color={hovered[id] === 4 ? 'red' : "white"}/>
            <meshLambertMaterial attach = {"material-5"} map = {side} color={hovered[id] === 5 ? 'red' : "white"}/>
        </>
      )
    }

    function CornerTexture() {
        return (
            <>
                <meshStandardMaterial attach = {"material-0"} color = "dark grey"/>
                <meshStandardMaterial attach = {"material-1"} color = "dark grey"/>
                <meshStandardMaterial attach = {"material-2"} color = "dark grey"/>
                <meshStandardMaterial attach = {"material-3"} color = "dark grey"/>
                <meshStandardMaterial attach = {"material-4"} color = "dark grey"/>
                <meshStandardMaterial attach = {"material-5"} color = "dark grey"/>
            </>
        )
    }

    function Shape(sAngle, eAngle, R, r, parentMesh, width, len) {
        
        let shape = new THREE.Shape();
        
        let options = {
          depth: width,
          curveSegments: 64, 
          bevelEnabled: false,
          bevelThickness: 0.1
        }
        
        shape.absarc(0, 0, R, sAngle, eAngle);
        shape.absarc(0, 0, r, eAngle, sAngle, true);
        
        let mesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, options), new THREE.MeshLambertMaterial({color:"lime"}));
        mesh.position.x = parentMesh.position.x;
        mesh.position.y = parentMesh.position.y;
        mesh.position.z = parentMesh.position.z;
        mesh.rotation.x = parentMesh.rotation.x;
        mesh.rotation.y = parentMesh.rotation.y;
        mesh.rotation.z = parentMesh.rotation.z;
        mesh.translateX(len / 2)
        return mesh;
        }

    function Plane() {
        return (
            <Box position={[0, -1, 0]} args = {[30, 1, 30]} onClick={(event)=>{
            }}>
              <meshStandardMaterial color = "#808080"/>
            </Box>
      )
    }

    function TShapeCorner(element) {
        element = element.args;
        let convertedAngle = (90) * Math.PI / 180;
        let mesh2Components = componentsCalculator(convertedAngle, 0);
        let convertedAngle2 = (-90) * Math.PI / 180;
        let mesh3Components = componentsCalculator(convertedAngle2, 0);

        let mesh1 = assignMesh(element);
        mesh1.translateX(element.adder);
        
        let mesh2 = assignMesh(element);
        mesh2.translateX(element.adder + mesh2Components[0]);
        mesh2.translateZ(mesh2Components[1]);
        mesh2.rotateY(convertedAngle + Math.PI);

        let mesh3 = assignMesh(element)
        mesh3.translateX(element.adder + mesh3Components[0]);
        mesh3.translateZ(mesh3Components[1]);
        mesh3.rotateY(convertedAngle2 + Math.PI);

        let options = {
            depth: cornerheight,
            curveSegments: 64, 
            bevelEnabled: false,
            bevelThickness: 0.1
          }

        let squareShape = new THREE.Shape()
                    .moveTo( 0, 0 )
                    .lineTo(cornerWidth, 0)
                    .lineTo( cornerWidth, cornerWidth)
                    .lineTo(0, cornerWidth)
					.lineTo( 0, 0 );
		let mesh4 = new THREE.Mesh( new THREE.ExtrudeGeometry( squareShape, options ), new THREE.MeshPhongMaterial( { color: "Lime" } ) );
		mesh4.position.set( mesh1.position.x, mesh1.position.y, mesh1.position.z);
		mesh4.rotation.set( mesh1.rotation.x, mesh1.rotation.y, mesh1.rotation.z );
        mesh4.rotateX(Math.PI / 2)
        mesh4.translateX(cornerLength / 2)
        mesh4.translateZ(-cornerheight/2)
        mesh4.translateY(-cornerWidth/2)
        
        return (
            <>
                <primitive 
                    object = {mesh1}
                    onPointerOut={(e) => updateHover(element.id, null)}
                    onPointerMove={(e) => updateHover(element.id, e.face.materialIndex)}
                >
                    <TextureWrap args = {[element.id]}/>
                </primitive>

                <primitive 
                    object = {mesh4}
                >
                    <CornerTexture/>
                </primitive>

                <primitive 
                    object = {mesh3}
                    onClick = {(e)=>{
                        if ((appState === 1 || appState === 5) && e.face.materialIndex === 0) {
                            clickEvent(mesh3, element, e, (feet * length / 2) + cornerLength / 2, 2);
                        }
                    }}
                    onPointerOut={(e) => updateHover(element.id + 1, null)}
                    onPointerMove={(e) => updateHover(element.id + 1, e.face.materialIndex)}
                >
                    <TextureWrap args = {[element.id + 1]}/>
                </primitive>

                <primitive 
                    object = {mesh2}
                    onClick = {(e)=>{
                        if ((appState === 1 || appState === 5) && e.face.materialIndex === 0) {
                            clickEvent(mesh2, element, e, (feet * length / 2) + cornerLength / 2, 2);
                        }
                    }}
                    onPointerOut={(e) => updateHover(element.id + 2, null)}
                    onPointerMove={(e) => updateHover(element.id + 2, e.face.materialIndex)}
                >
                    <TextureWrap args = {[element.id + 2]}/>
                </primitive>
            </>
        )
    }

    function YShapeCorner(element) {
        element = element.args;
        let convertedAngle = (120) * Math.PI / 180;
        let mesh2Components = componentsCalculator(convertedAngle, 0);
        let convertedAngle2 = (-120) * Math.PI / 180;
        let mesh3Components = componentsCalculator(convertedAngle2, 0);

        let mesh1 = assignMesh(element);
        mesh1.translateX(element.adder);
        
        let mesh2 = assignMesh(element);
        mesh2.translateX(element.adder + mesh2Components[0]);
        mesh2.translateZ(mesh2Components[1]);
        mesh2.rotateY(convertedAngle + Math.PI);

        let mesh3 = assignMesh(element);
        mesh3.translateX(element.adder + mesh3Components[0]);
        mesh3.translateZ(mesh3Components[1]);
        mesh3.rotateY(convertedAngle2 + Math.PI);

        let options = {
            depth: cornerheight,
            curveSegments: 64, 
            bevelEnabled: false,
            bevelThickness: 0.1
          }

        let squareShape = new THREE.Shape()
                    .moveTo( 0, 0 )
                    .lineTo(cornerWidth * Math.sin(Math.PI / 3), cornerWidth / 2)
                    .lineTo(0, cornerWidth)
		let mesh4 = new THREE.Mesh( new THREE.ExtrudeGeometry( squareShape, options ), new THREE.MeshPhongMaterial( { color: "Lime" } ) );
		mesh4.position.set( mesh1.position.x, mesh1.position.y, mesh1.position.z);
		mesh4.rotation.set( mesh1.rotation.x, mesh1.rotation.y, mesh1.rotation.z );
        mesh4.rotateX(Math.PI / 2)
        mesh4.translateX(cornerLength / 2)
        mesh4.translateZ(-cornerheight/2)
        mesh4.translateY(-cornerWidth/2)

        return (
            <>
                <primitive 
                    object = {mesh1}
                    onPointerOut={(e) => updateHover(element.id, null)}
                    onPointerMove={(e) => updateHover(element.id, e.face.materialIndex)}
                >
                    <TextureWrap args ={[element.id]}/>
                </primitive>

                <primitive 
                    object = {mesh4}
                >
                    <CornerTexture/>
                </primitive>

                <primitive 
                    object = {mesh3}
                    onClick = {(e)=>{
                        if ((appState === 1 || appState === 5) && e.face.materialIndex === 0) {
                            clickEvent(mesh3, element, e, (feet * length / 2) + cornerLength / 2, 2);
                        }
                    }}
                    onPointerOut={(e) => updateHover(element.id + 1, null)}
                    onPointerMove={(e) => updateHover(element.id + 1, e.face.materialIndex)}
                >
                    <TextureWrap args = {[element.id + 1]}/>
                </primitive>

                <primitive 
                    object = {mesh2}
                    onClick = {(e)=>{
                        if ((appState === 1 || appState === 5) && e.face.materialIndex === 0) {
                            clickEvent(mesh2, element, e, (feet * length / 2) + cornerLength / 2, 2);
                        }
                    }}
                    onPointerOut={(e) => updateHover(element.id + 2, null)}
                    onPointerMove={(e) => updateHover(element.id + 2, e.face.materialIndex)}
                >
                  <TextureWrap args = {[element.id + 2]}/>
                </primitive>
            </>
        )
    }

    function PlusShapeCorner(element) {
        element = element.args;
        let convertedAngle = (90) * Math.PI / 180;
        let mesh2Components = componentsCalculator(convertedAngle, 0);
        let convertedAngle2 = (-90) * Math.PI / 180;
        let mesh3Components = componentsCalculator(convertedAngle2, 0);
        
        let mesh1 = assignMesh(element);
        mesh1.translateX(element.adder);
        
        let mesh2 = assignMesh(element);
        mesh2.translateX(element.adder + mesh2Components[0]);
        mesh2.translateZ(mesh2Components[1]);
        mesh2.rotateY(convertedAngle + Math.PI);

        let mesh3 = assignMesh(element);
        mesh3.translateX(element.adder + mesh3Components[0]);
        mesh3.translateZ(mesh3Components[1]);
        mesh3.rotateY(convertedAngle2 + Math.PI);

        let mesh4 = assignMesh(element);
        mesh4.translateX(element.adder + components[1].width * inch + components[1].length * feet);

        let options = {
            depth: cornerheight,
            curveSegments: 64, 
            bevelEnabled: false,
            bevelThickness: 0.1
          }
        let squareShape = new THREE.Shape()
                    .moveTo( 0, 0 )
                    .lineTo(cornerWidth, 0)
                    .lineTo( cornerWidth, cornerWidth)
                    .lineTo(0, cornerWidth)
					.lineTo( 0, 0 );
		let mesh5 = new THREE.Mesh( new THREE.ExtrudeGeometry( squareShape, options ), new THREE.MeshPhongMaterial( { color: "Lime" } ) );
		mesh5.position.set( mesh1.position.x, mesh1.position.y, mesh1.position.z);
		mesh5.rotation.set( mesh1.rotation.x, mesh1.rotation.y, mesh1.rotation.z );
        mesh5.rotateX(Math.PI / 2)
        mesh5.translateX(cornerLength / 2)
        mesh5.translateY(-cornerWidth / 2);
        mesh5.translateZ(-cornerheight / 2)

        return (
            <>
                <primitive 
                    object = {mesh1}
                    onPointerOut={(e) => updateHover(element.id, null)}
                    onPointerMove={(e) => updateHover(element.id, e.face.materialIndex)}
                >
                    <TextureWrap args = {[element.id]}/>
                </primitive>

                <primitive 
                    object = {mesh5}
                >
                    <CornerTexture/>
                </primitive>

                <primitive 
                    object = {mesh3}
                    onClick = {(e)=>{
                        if ((appState === 1 || appState === 5) && e.face.materialIndex === 0) {
                            clickEvent(mesh3, element, e, (feet * length / 2) + cornerLength / 2, 3);
                        }
                    }}
                    onPointerOut={(e) => updateHover(element.id + 1, null)}
                    onPointerMove={(e) => updateHover(element.id + 1, e.face.materialIndex)}
                >
                    <TextureWrap args = {[element.id + 1]}/>
                </primitive>

                <primitive 
                    object = {mesh2}
                    onClick = {(e)=>{
                        if ((appState === 1 || appState === 5) && e.face.materialIndex === 0) {
                            clickEvent(mesh2, element, e, (feet * length / 2) + cornerLength / 2, 3);
                        }
                    }}
                    onPointerOut={(e) => updateHover(element.id + 2, null)}
                    onPointerMove={(e) => updateHover(element.id + 2, e.face.materialIndex)}
                >
                    <TextureWrap args = {[element.id + 2]}/>
                </primitive>

                <primitive 
                    object = {mesh4}
                    onClick = {(e)=>{
                        if ((appState === 1 || appState === 5) && e.face.materialIndex === 0) {
                            clickEvent(mesh4, element, e, (feet * length / 2) + cornerLength / 2, 3);
                        }
                    }}
                    onPointerOut={(e) => updateHover(element.id + 3, null)}
                    onPointerMove={(e) => updateHover(element.id + 3, e.face.materialIndex)}
                >
                    <TextureWrap args = {[element.id + 3]}/>
                </primitive>
            </>
        )
    }

    function XShapeCorner(element) {
        element = element.args;
        let convertedAngle = (120) * Math.PI / 180;
        let mesh1 = new THREE.Mesh(new THREE.BoxGeometry(2 * element.dimensions[0] + cornerWidth, element.dimensions[1], element.dimensions[2]), new THREE.MeshStandardMaterial(0xff0000));
        mesh1.rotation.set(element.angle[0], element.angle[1], element.angle[2]);
        mesh1.position.set(element.position[0], element.position[1], element.position[2]);
        mesh1.translateX(element.adder + cornerLength / 2 + cornerWidth / 2);
        
        let mesh2 = new THREE.Mesh(new THREE.BoxGeometry(2 * element.dimensions[0] + cornerWidth, element.dimensions[1], element.dimensions[2]), new THREE.MeshStandardMaterial(0xff0000));
        mesh2.rotation.set(element.angle[0], element.angle[1], element.angle[2]);
        mesh2.position.set(element.position[0], element.position[1], element.position[2]);
        mesh2.translateX(element.adder + cornerLength / 2 + cornerWidth / 2);
        mesh2.rotateY(convertedAngle + Math.PI);

        return (
            <>
                <primitive 
                    object = {mesh1}
                    onClick = {(e)=>{
                        if ((appState === 1 || appState === 5) && e.face.materialIndex === 0) {
                            clickEvent(mesh1, element, e, (length * feet/ 2) + cornerLength  + cornerWidth / 2, 1);
                        }
                    }}
                    onPointerOut={(e) => updateHover(element.id, null)}
                    onPointerMove={(e) => updateHover(element.id, e.face.materialIndex)}
                >
                    <TextureWrap args = {[element.id]}/>
                </primitive>

                <primitive 
                    object = {mesh2}
                    onClick = {(e)=>{
                        if ((appState === 1 || appState === 5)) {
                            if (e.face.materialIndex === 0) {
                                clickEvent(mesh2, element, e, (length * feet/ 2) + cornerLength  + cornerWidth / 2, 1);
                            } else if (e.face.materialIndex === 1) {
                                let meshclone = mesh2.clone()
                                meshclone.rotateY(Math.PI);
                                clickEvent(meshclone, element, e, (length * feet/ 2) + cornerLength  + cornerWidth / 2, 1)
                            }
                        }
                    }}
                    onPointerOut={(e) => updateHover(element.id + 1, null)}
                    onPointerMove={(e) => updateHover(element.id + 1, e.face.materialIndex)}
                >
                    <meshLambertMaterial attach = {"material-0"} map = {front} color={hovered[element.id + 1] === 0 ? 'lime' : "white"}/>
                    <meshLambertMaterial attach = {"material-1"} map = {front} color={hovered[element.id + 1] === 1 ? 'lime' : "white"}/>
                    <meshLambertMaterial attach = {"material-2"} map = {top} color={hovered[element.id + 1] === 2 ? 'red' : "white"}/>
                    <meshLambertMaterial attach = {"material-3"} map = {bottom} color={hovered[element.id + 1] === 3 ? 'red' : "white"}/>
                    <meshLambertMaterial attach = {"material-4"} map = {side} color={hovered[element.id + 1] === 4 ? 'red' : "white"}/>
                    <meshLambertMaterial attach = {"material-5"} map = {side} color={hovered[element.id + 1] === 5 ? 'red' : "white"}/>
                </primitive>
            </>
        )
    }

    function VerticalCorner(element) {
        element = element.args;
        let convertedAngle = ( - element.cor_angle) * Math.PI / 180;
        let mesh2Components = componentsCalculator(convertedAngle, 1);
        
        let mesh1 = assignMesh(element);
        mesh1.translateX(element.adder);

        let mesh3 = null;
        let inner = components[1].innerR * mm;
        let outer = components[1].outerR * mm
        if (element.cor_angle >= 0) {
            mesh3 = Shape(-Math.PI / 2, convertedAngle - 3 * Math.PI / 2, outer, inner, mesh1, cornerWidth, cornerLength);
            mesh3.translateY(inner + cornerheight / 2);
            mesh3.translateZ(-cornerWidth/2)
            
        } else {
            mesh3 = Shape(-Math.PI / 2, -convertedAngle - 3 * Math.PI / 2, outer, inner, mesh1, cornerWidth, cornerLength);
            mesh3.rotateX(Math.PI);
            mesh3.translateZ(-cornerWidth /2 )
            mesh3.translateY((cornerheight/2 + inner))
        }

        let mesh2 = assignMesh(element);
        
        mesh2.translateX(mesh2Components[0] + element.adder);
        mesh2.translateY(-mesh2Components[1]);
        mesh2.rotateZ(-(Math.PI - convertedAngle));
        if (element.cor_angle >= 0) {
            mesh2.translateX(inner * Math.cos(convertedAngle - 3 * Math.PI / 2));
            mesh2.translateY(-inner * Math.sin(convertedAngle - 3 * Math.PI / 2) - inner)
        } else {
            mesh2.translateX(-inner * Math.cos(convertedAngle - 3 * Math.PI / 2));
            mesh2.translateY(inner * Math.sin(convertedAngle - 3 * Math.PI / 2) + inner)
        }
        
        return (
            <>
                <primitive 
                    object = {mesh1}
                    onPointerOut={(e) => updateHover(element.id, null)}
                    onPointerMove={(e) => updateHover(element.id, e.face.materialIndex)}
                >
                    <TextureWrap args = {[element.id]}/>
                </primitive>
                
                <primitive 
                    object = {mesh2}
                    onClick = {(e)=>{
                        if ((appState === 1 || appState === 5) && e.face.materialIndex === 0) {
                            clickEvent(mesh2, element, e, cornerLength / 2 + length / 2 * feet, 1);
                        }
                    }}
                    onPointerOut={(e) => updateHover(element.id + 1, null)}
                    onPointerMove={(e) => updateHover(element.id + 1, e.face.materialIndex)}
                >
                    <TextureWrap args = {[element.id + 1]}/>
                </primitive>

                <primitive 
                    object = {mesh3}
                >
                    <CornerTexture/>
                </primitive>
            </>
        )

    }

    function FlatCorner(element) {
        element = element.args;
        let convertedAngle = element.cor_angle * Math.PI / 180;
        let mesh2Components = componentsCalculator(convertedAngle, 0)

        let mesh1 = assignMesh(element);
        mesh1.translateX(element.adder);
        
        let mesh2 = assignMesh(element);

        mesh2.translateX(element.adder + mesh2Components[0]);
        mesh2.translateZ(mesh2Components[1]);
        mesh2.rotateY(convertedAngle + Math.PI);

        let options = {
            depth: cornerheight,
            curveSegments: 64, 
            bevelEnabled: false,
            bevelThickness: 0.1
          }

        let firstLine = cornerWidth / Math.tan(convertedAngle/2);
        let squareShape = null;
        if (convertedAngle < 0) {
                    let secondLine_x = firstLine * Math.cos(convertedAngle);
                    let secondLine_y = firstLine * Math.sin(convertedAngle)
                    squareShape = new THREE.Shape()
                    .moveTo( 0, cornerWidth)
                    .lineTo(-firstLine, cornerWidth)
                    .lineTo(-firstLine+secondLine_x, cornerWidth - secondLine_y)
                    .lineTo(0, 0)
        } else {
                    let secondLine_x = firstLine * Math.cos(convertedAngle);
                    let secondLine_y = firstLine * Math.sin(convertedAngle)
                    squareShape = new THREE.Shape()
                    .moveTo( 0, 0 )
                    .lineTo(firstLine, 0)
                    .lineTo( (firstLine - secondLine_x), secondLine_y)
                    .lineTo(0, cornerWidth)
					.lineTo( 0, 0 );
        }
		let mesh3 = new THREE.Mesh( new THREE.ExtrudeGeometry( squareShape, options ), new THREE.MeshPhongMaterial( { color: "Lime" } ) );
		mesh3.position.set( mesh1.position.x, mesh1.position.y, mesh1.position.z);
		mesh3.rotation.set( mesh1.rotation.x, mesh1.rotation.y, mesh1.rotation.z );
        mesh3.rotateX(Math.PI / 2)
        mesh3.translateX(cornerLength / 2)
        mesh3.translateZ(-cornerheight/2)
        mesh3.translateY(-cornerWidth/2)
        
        return (
            <>
                <primitive 
                    object = {mesh1}
                    onPointerOut={(e) => updateHover(element.id, null)}
                    onPointerMove={(e) => updateHover(element.id, e.face.materialIndex)}
                >
                    <TextureWrap args = {[element.id]}/>
                </primitive>

                <primitive 
                    object = {mesh3}
                >
                    <CornerTexture/>
                </primitive>

                <primitive 
                    object = {mesh2}
                    onClick = {(e)=>{
                        if ((appState === 1 || appState === 5) && e.face.materialIndex === 0) {
                            clickEvent(mesh2, element, e, cornerLength / 2 + length / 2 * feet, 1);
                        }
                    }}
                    onPointerOut={(e) => updateHover(element.id + 1, null)}
                    onPointerMove={(e) => updateHover(element.id + 1, e.face.materialIndex)}
                >
                    <TextureWrap args = {[element.id + 1]}/>
                </primitive>
            </>
        )
    }
   
    function Leg(element) {
        element = element.args;
        let mesh = assignMesh(element);

        switch (element.axis) {
            case "X":
                mesh.rotateX(element.rotation);
                break;
            case "Y":
                mesh.rotateY(element.rotation)
                break;
            case "Z":
                mesh.rotateZ(element.rotation)
                mesh.rotateX(Math.PI / 2)
                break;
            default:
        }
        
        mesh.translateX(element.adder)

        return (
                <primitive 
                    object = {mesh}
                    onClick = {(e)=>{
                        if ((appState === 3 || appState === 7) && e.face.materialIndex === 0) {
                            dispatch({
                                type: "STATE_CHANGE",
                                payload: updateState() 
                            });
                            let object = null;
                            element.connections[e.face.materialIndex] = 1;
                            let placement_index = oppositeIndex(e.face.materialIndex);
                            if (appState === 3) {
                                element.dimensions[0] = element.dimensions[0] - subtractor * feet;
                                element.adder -= feet
                                object = createCornerObject(mesh, element.dimensions[0] / 2 + cornerLength / 2 - feet, "Corner", "White")
                            } else {
                                object = createEndCapObject(mesh, element.dimensions[0] / 2 + components[2].width / 2, "Endcap", "blue");
                            }
                            object.connections[placement_index] = 1;
                            dispatch({
                                type: "ADD_COMPONENT",
                                payload: object
                            })
                        }
                    }} 
                    onPointerOut={(e) => updateHover(element.id, null)}
                    onPointerMove={(e) => updateHover(element.id, e.face.materialIndex)}
                >
                    <TextureWrap args = {[element.id]}/>
            </primitive>
        )
    }

    function EndCap(element) {
        element = element.args;
        let mesh = assignMesh(element);

        mesh.translateX(element.adder);

        return (
            <primitive 
                object={mesh}
                rotation = {element.angle}
                onClick={(e)=>{
                    if ((appState === 1 || appState === 5) && element.connections[e.face.materialIndex] !== 1) {
                        dispatch({
                            type: "STATE_CHANGE",
                            payload: updateState() 
                        })
                        element.connections[e.face.materialIndex] = 1;
                        let placement_index = oppositeIndex(e.face.materialIndex);
                        let object = null;
                        let rotation = null;
                        let axis = null;
                        switch (e.face.materialIndex) {
                            case 0: 
                                rotation = 0;
                                axis = "X";
                                break;
                            case 1:
                                rotation = Math.PI;
                                axis = "Y";
                                break;
                            case 2:
                                rotation = Math.PI / 2;
                                axis = "Z";
                                break;
                            case 3: 
                                rotation = -Math.PI / 2;
                                axis = "Z";
                                break;
                            case 4:
                                rotation = -Math.PI / 2;
                                axis = "Y";
                                break;
                            case 5:
                                rotation = Math.PI / 2;
                                axis = "Y";
                                break;
                            default:
                            }
                            object = createLegObject(mesh, "Leg", "white", (length * feet/ 2) + components[2].width/2, rotation, axis, 0);
                            object.connections[placement_index] = 1;
                            dispatch({
                                type: "ADD_COMPONENT",
                                payload: object
                            })
                        }
                    }}
                onPointerOut={(e) => updateHover(element.id, null)}
                onPointerMove={(e) => updateHover(element.id, e.face.materialIndex)}
            >
                {[...Array(6)].map((_, index) => (
                <meshStandardMaterial attach={`material-${index}`} key={index} color={hovered[element.id] === index ? element.connections[index] === 1 ? "red": 'lime' : element.color}/>
              ))}
            </primitive>
        )
    }
    
    function RenderComponents() {
        return canvasComponents.map((element)=>{
            switch (element.type) {
                case "Corner":
                    switch (element.cornerType) {
                        case "Vertical":
                            return <VerticalCorner args = {element}/>;
                        case "Flat":
                            return <FlatCorner args = {element}/>;
                        case "T-Corner":
                            return <TShapeCorner args = {element}/>;
                        case "Y-Corner":
                            return <YShapeCorner args = {element}/>;
                        case "X-Corner":
                            return <XShapeCorner args = {element}/>;
                        case "+-Corner":
                            return <PlusShapeCorner args = {element}/>;
                        default:
                            break;
                        }
                    break;
                case "Leg":
                    return <Leg args = {element}/>;
                case "Endcap":
                    return <EndCap args = {element}/>;
                default:
                }
            }
        )
    }
    const axesHelper = new THREE.AxesHelper( 5 );


    return (
        <>
        <div className = "col">
          <button onClick = {(event)=>{
            if ((appState === 8 && canvasComponents.length > 1) || (appState === 0 && canvasComponents.length > 1) || (appState % 2 === 0 && appState !== 8 && appState !== 0 && canvasComponents.length > 1)) {
              dispatch({
                type: "UNDO_PREVIOUS_ACTION",
                payload: null
              })
            }
          }} style = {{ marginLeft: "-10px", marginBottom: "10px", background:"#ff0000"}}>Undo Previous Step</button>
          <label 
                      style = {{ marginLeft: "10px", marginRight: "10px"}}>Leg Length: </label>
          <select id = "select" style = {{width: "100px"}} onChange = {(e)=>{
            if(appState === 1 || appState === 5) {
              setLength(e.target.value)
            } else {
              let select_element = document.getElementById("select")
              select_element.selectedIndex = length - 2;
            }
          }}>
            <option value = "2">2</option>
            <option value = "3" selected>3 (Default) </option>
            <option value = "4">4</option>
            <option value = "5">5</option>
            <option value = "6">6</option>
            <option value = "7">7</option>
            <option value = "8">8</option>
          </select>
          <label style ={{marginLeft: "10px"}}>Corner Type: </label>
          <select onChange = {(e)=>{
            setCornerType(e.target.value);
          }}>
            <option value = "Vertical" selected>Vertical</option>
            <option value = "Flat">Flat</option>
            <option value = "T-Corner">T-Corner</option>
            <option value = "Y-Corner">Y-Corner</option>
            <option value = "X-Corner">X-Corner</option>
            <option value = "+-Corner">+-Corner</option>
          </select>
          <label style = {{marginLeft: "10px"}}>Corner Angle</label>
          <input
            type='number'
            id='Legs'
            step = "10"
            max = "180"
            value = {angle}
            min = "-180"
            onChange = {(event)=> {
                if (!isNaN(event.target.value)) {
                  setAngle(event.target.value)
                }
              }
            }
          >
          </input>
        </div>
          <Canvas id = "canvas" style = {{color: "black", width: "700px", height: "380px", marginLeft: "10px", marginRight: "20px", background:"black"}}>
                <PerspectiveCamera args = {[10, 10, 10]}/>
                <OrbitControls/>
                <Stars/>
                <ambientLight intensity = {5}/>
                <directionalLight position={[5, 10, 1]} intensity={1}/>
                <Physics>
                    {/* <Plane/> */}
                    <RenderComponents/>
                </Physics>
                <primitive object={axesHelper}/>
              </Canvas>
        </>

    )
}

export default Visualizer;