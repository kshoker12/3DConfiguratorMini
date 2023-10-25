import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from '../context/AppContext';


const ConfiguratorMenu = () =>{
    const {dispatch, payload} = useContext(AppContext);
    const {components} = useContext(AppContext);
    const {appState} = useContext(AppContext);
    const {canvasComponents} = useContext(AppContext);
    const {item} = useContext(AppContext);
    const {currItem} = useContext(AppContext);
    const {length} = useContext(AppContext);
    const {angle} = useContext(AppContext);
    const {direction} = useContext(AppContext);
    const [widthMultiplier, setWidthMultiplier] = useState(1);
    const optionsArr = [1,2,3,4,5,6,7,8];
    const anglesArr = [30, 45, 60, 90, 120, 150]
    const directionArr = ["Up/Right", "Down/Left"];
    const {cameraIndex} = useContext(AppContext)

    const CancelButton = () => {
        return (
            <button onClick = {(event)=>{
                if (item != null) {
                    dispatch({
                        type: "CANCEL_ACTION",
                        payload: null
                    })
                }
            }} style = {{ marginLeft: "40px", marginBottom: "10px", background:"#ff0000"}}>Cancel Action</button>
        )
    }

    const UndoButton = () => {
        return (
            <button onClick = {(event)=>{
                if (canvasComponents.length > 1) {
                    dispatch({
                        type: "UNDO_PREVIOUS_ACTION",
                        payload: null
                    })
                }
            }} style = {{ marginLeft: "40px", marginBottom: "10px", background:"#ff0000"}}>Undo Previous Step</button>
        )
    }

    function DisplayWidth() {
        return (
            // <div class="slidecontainer">
            <>
                <label style = {{ marginLeft: "10px", marginRight: "10px"}}>Width Multiplier</label>
                <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value = {widthMultiplier} 
                    class="slider" 
                    step = "1"
                    id="myRange" 
                    onChange={(e)=>{
                        setWidthMultiplier(e.target.value)
                        dispatch({
                            type: "CHANGE_WIDTH",
                            payload: e.target.value
                        })
                    }}
                />
            </>
            
            
        )
    }

    function QuantityDisplay() {
        return (
            <span>
                    # of {components[appState].name}s: {components[appState].quantity}
            </span>
        )
    }

    if (appState === 0) {
        return (
            <div>
                <h1>3D Configurator Mini</h1>
                <div className='alert alert-secondary' style={{height: "50px"}}>
                    <div className='col'>
                        <QuantityDisplay/>
                        <label style = {{marginLeft: "10px"}}>Corner Angle</label>
                        <select id = "select" style = {{width: "100px"}} onChange = {(e)=>{
                                dispatch({
                                    type: "UPDATE_ANGLE",
                                    payload: e.target.value
                                })
                        }}>
                            {anglesArr.map((element)=>{
                                if (element === Math.abs(angle)) {
                                    return <option value = {element} selected>{element}</option>
                                } else {
                                    return <option value = {element}>{element}</option>
                                }
                            })}
                        </select>

                        <label style ={{marginLeft: "10px"}}>Corner Direction: </label>
                        <select id = "select" onChange = {(e)=>{
                            dispatch({
                                type: "UPDATE_DIRECTION",
                                payload: e.target.value
                            })
                        }}>
                            {directionArr.map((element)=>{
                                if (element === direction) {
                                    return <option value = {element} selected>{element}</option>
                                } else {
                                    return <option value = {element}>{element}</option>
                                }
                            })}
                        </select>
                        <CancelButton/>
                        
                    </div>
                    
                </div>
            </div>
        )
    } else if (appState === 1 || appState === 2) {
        return (
            <div>
                <h1>3D Configurator Mini</h1>
                <div className='alert alert-secondary' style={{height: "50px"}}>
                    <div className='col'>
                        <QuantityDisplay/>
                        <label 
                        style = {{ marginLeft: "40px", marginRight: "10px"}}>Leg Length: </label>
                        <select id = "select" style = {{width: "100px"}} onChange = {(e)=>{
                                dispatch({
                                    type: "UPDATE_LENGTH",
                                    payload: e.target.value
                                })
                        }}>
                            {optionsArr.map((len)=>{
                                if (len === length) {
                                    let val = len;
                                    return <option value = {val} selected>{len}</option>
                                } else {
                                    let val = len;
                                    return <option value = {val}>{len}</option>
                                }
                            })}
                        </select>
                        <DisplayWidth/>
                        <CancelButton/>
                    </div>
                    
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>3D Configurator Mini</h1>
                <div className='alert alert-secondary' style={{height: "50px"}}>
                    <div className='col'>
                        <DisplayWidth/>
                        <UndoButton/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfiguratorMenu;