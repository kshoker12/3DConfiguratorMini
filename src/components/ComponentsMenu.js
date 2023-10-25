import React, {useContext} from 'react';
import {AppContext} from '../context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const ComponentMenu = () => {
    const {dispatch, payload} = useContext(AppContext);
    const {components} = useContext(AppContext);
    const {appState} = useContext(AppContext);
    const {canvasComponents} = useContext(AppContext);

    function CreateButton(args) {
        const updateType = (type) => {
            dispatch({
                type: "UPDATE_TYPE",
                payload: type
            })
        }
        const attach = () => {

            dispatch({
                type: "ATTACH",
                payload: null
            })
        }

        const stateChange = () => {
            dispatch({
                type: "STATE_CHANGE",
                payload: 3 
            });
        }

        return (
            <button style = {{background: "lime", marginBottom: "5px"}} onClick={()=>{
                stateChange();
                if (args.args[1] !== "") {
                    updateType(args.args[1]);
                }
                if (args.args[1] === "Endcap") {
                    dispatch({
                        type: "CHANGE_TO_ENDCAP",
                        payload: null
                    })
                }
                
                attach();
            }}>{args.args[0]}</button>
        )
    }

    function StateOne() {
        return (
            <>
                <h3>Components</h3>
                <div className='row' style = {{padding: "30px", margin: "20px"}}>
                    <CreateButton args = {["Vertical Corner", "Vertical"]}/>
                    <CreateButton args = {["Flat Corner", "Flat"]}/>
                    <CreateButton args = {["T-Shape Corner", "T-Corner"]}/>
                    <CreateButton args = {["Y-Shape Corner", "Y-Corner"]}/>
                    <CreateButton args = {["X-Shape Corner", "X-Corner"]}/>
                    <CreateButton args = {["Plus-Shape Corner", "+-Corner"]}/>
                    <CreateButton args = {["Endcap", "Endcap"]}/>
                </div>
            </>
        )
    }

    function StateTwo() {
        return (
            <>
                <h3>Components</h3>
                <div className='row' style = {{padding: "30px", margin: "20px"}}>
                    <CreateButton args = {["Legs", ""]}/>
                </div>
            </>
        )
    }

    function StateThree() {
        let el = -1;
        return (
            <>
                <h3>Canvas Components</h3>
                <div className='row' style = {{margin: "20px"}}>
                    {canvasComponents.map((element)=> {
                        el++;
                        return (
                            <CreateButton args = {["id: " + el + " - " + element.type, ""]}/>
                        )
                    })}
                </div>
            </>
        );
    }

    if (appState === 0) {
        return (
            <StateOne/>
        );
    } else if (appState === 1 || appState === 2) {
        return (
            <StateTwo/>
        );
    } else {
        return (
            <StateThree/>
        );
    } 
}

export default ComponentMenu;