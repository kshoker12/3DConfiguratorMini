import React, {useContext} from 'react';
import {AppContext} from '../context/AppContext';

const ConfiguratorMenu = () =>{
    const {dispatch, payload} = useContext(AppContext);
    const {components} = useContext(AppContext);
    const {appState} = useContext(AppContext);

    

    const onChange = (value) => {
        const localVal = Number(value);

        if (localVal > 10) {
            alert("The # of legs cannot exceed 10");
            dispatch({
                type: "UPDATE_LEGS",
                payload: 10,
            })
            return;
        }

        if (localVal < 1) {
            alert("The # of legs cannot be less than 1");
            dispatch({
                type: "UPDATE_LEGS",
                payload: 1,
            })
            return;
        }

        dispatch({
            type: "UPDATE_LEGS",
            payload: localVal,
        })
    }

    const generateComponents = () => {
        dispatch({
            type: "STATE_CHANGE",
            payload: 0
        })
        dispatch({
            type: "GENERATE_COMPONENTS",
            payload: null
        });
    };

    return (
        <div>
            <h1>3D Configurator Mini</h1>
            <div className='alert alert-secondary'>
                <span>
                    # of Legs:
                </span>
                <input
                    type='number'
                    id='Legs'
                    step = "1"
                    value={components[0].quantity}
                    onChange = {(event)=> {
                        onChange(event.target.value);
                        }
                    }
                >
                </input>
                <button onClick = {(event)=>{
                    generateComponents();
                }}>Generate Components</button>
              {appState}
            </div>
        </div>
    );
}


export default ConfiguratorMenu;