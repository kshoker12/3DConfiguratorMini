import React, {useContext} from 'react';
import {AppContext} from '../context/AppContext';

const ComponentMenu = () => {
    const {dispatch, payload} = useContext(AppContext);
    const {components} = useContext(AppContext);
    const {appState} = useContext(AppContext);

    const updateLegs = () => {
        if (components[0].quantity === 0) {
            alert("ERROR: No more Legs");
            dispatch({
                type: "UPDATE_LEGS",
                payload: 0,
            })
            return;
        }

        if (components[1].quantity > 0) {
            dispatch({
                type: "STATE_CHANGE",
                payload: 1
            })
        } else {
            dispatch({
                type: "STATE_CHANGE",
                payload: 5
            })
        }

        dispatch({
            type: "UPDATE_LEGS",
            payload: components[0].quantity - 1
        })

    }

    const updateCorners = () => {
        if (components[1].quantity === 0) {
            alert("ERROR: No more Corners");
            dispatch({
                type: "UPDATE_LEGS",
                payload: 0,
            })
            return;
        }

        dispatch({
            type: "STATE_CHANGE",
            payload: 3
        })


        dispatch({
            type: "UPDATE_CORNERS",
            payload: components[1].quantity - 1
        })
    }

    const updateEndcaps = () => {
        if (components[2].quantity === 0) {
            alert("ERROR: No more Endcaps");
            dispatch({
                type: "UPDATE_LEGS",
                payload: 0,
            })
            return;
        }
            dispatch({
                type: "STATE_CHANGE",
                payload: 7
            })


        dispatch({
            type: "UPDATE_ENDCAPS",
            payload: components[2].quantity - 1
        })

    }

    if (appState === 6) {
        return (
            <>
                <h3>Components</h3>
                <br/>
                <div>
                    <h4>Legs: {components[0].quantity} remaining</h4>
                    <button style = {{background: "red"}}>Select</button>
                    <h4>Corners: {components[1].quantity} remaining</h4>
                    <button style = {{background: "red"}}>Select</button>
                    <h4>Endcaps: {components[2].quantity} remaining</h4>
                    <button style = {{background: "#00ff00"}} onClick = {() => {updateEndcaps()}}>Select</button>
                </div>
            </>
        );
    } else if (appState === 2) {
        return (
            <>
                <h3>Components</h3>
                <br/>
                <div>
                    <h4>Legs: {components[0].quantity} remaining</h4>
                    <button style = {{background: "red"}}>Select</button>
                    <h4>Corners: {components[1].quantity} remaining</h4>
                    <button style = {{background: "#00ff00"}} onClick = {() => {updateCorners()}}>Select</button>
                    <h4>Endcaps: {components[2].quantity} remaining</h4>
                    <button style = {{background: "red"}}>Select</button>
                </div>
            </>
        );
    } else if (appState === 0 || appState === 4) {
        return (
            <>
                <h3>Components</h3>
                <br/>
                <div>
                    <h4>Legs: {components[0].quantity} remaining</h4>
                    <button style = {{background: "#00ff00"}} onClick = {() => {updateLegs()}}>Select</button>
                    <h4>Corners: {components[1].quantity} remaining</h4>
                    <button style = {{background: "red"}}>Select</button>
                    <h4>Endcaps: {components[2].quantity} remaining</h4>
                    <button style = {{background: "red"}}>Select</button>
                </div>
            </>
        );
    } else if (appState % 2 === 1 || appState=== 8) {
        return (
            <>
                <h3>Components</h3>
                <br/>
                <div>
                    <h4>Legs: {components[0].quantity} remaining</h4>
                    <button style = {{background: "red"}}>Select</button>
                    <h4>Corners: {components[1].quantity} remaining</h4>
                    <button style = {{background: "red"}}>Select</button>
                    <h4>Endcaps: {components[2].quantity} remaining</h4>
                    <button style = {{background: "red"}}>Select</button>
                </div>
            </>
        );
    }
}

export default ComponentMenu;