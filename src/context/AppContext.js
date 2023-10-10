import React, { createContext, useReducer } from 'react';

export const AppReducer = (state, action) => {

    function print() {
        for (let u = 0; u < state.canvasComponents.length; u++) {
            console.log(state.canvasComponents[u]);
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

  function connectedIndex(connections) {
    for (var t = 0; t < connections.length; t++) {
        if (connections[t] === 1) {
            return t;
        }
    }
  }

    switch (action.type) {
        case "UPDATE_LEGS":
            action.type = "DONE";
            state.components[0].quantity = action.payload;
            return {
                ...state
            }
        case "UPDATE_CORNERS":
                action.type = "DONE";
                state.components[1].quantity = action.payload;
                return {
                    ...state
                }
        case "UPDATE_ENDCAPS":
            action.type = "DONE";
            state.components[2].quantity = action.payload;
            return {
                ...state
            }
        case "GENERATE_COMPONENTS":
            action.type = "DONE";
            let temp = state.components[0].quantity;
            state.components[1].quantity = temp - 1;
            state.components[2].quantity = 1;
            state.appState = 1;
            return {
                ...state
            };
        case "STATE_CHANGE":
            action.type = "DONE";
            state.appState = action.payload;
            print();
            return {
                ...state
            };
        case "REMOVE_COMPONENT":
            action.type = "DONE";
            let tempArr = [];
            for (var i = 0; i < state.canvasComponents.length; i++) {
                if (state.canvasComponents[i].id !== action.payload.id) {
                    tempArr.push(state.canvasComponents[i]);
                } 
            }
            state.canvasComponents = tempArr;
            return {
                ...state
            };
        case "ADD_COMPONENT":
            action.type = "DONE";
            let tempArr1 = state.canvasComponents;
            tempArr1.push(action.payload);
            state.canvasComponents = tempArr1;
            print()
            return {
                ...state
            };
        case "UNDO_PREVIOUS_ACTION":
            action.type = "DONE";
            let lastComponent = state.canvasComponents.pop();
            switch (lastComponent.type) {
                case "Leg":
                    if (state.components[1].quantity === 0) {
                        state.appState = 5;
                    } else {
                        state.appState = 1;
                    }
                    break;
                case "Corner":
                    state.appState = 3
                    let element = state.canvasComponents[state.canvasComponents.length - 1];
                    element.dimensions[0] = element.dimensions[0] + 2 * 0.305;
                    element.adder += 0.305;
                    break;
                case "Endcap":
                    state.appState = 7;
                    break;
                default:
                    break;
            }
            state.canvasComponents[state.canvasComponents.length - 1].connections[oppositeIndex(connectedIndex(lastComponent.connections))] = 0;
            return {
                ...state
            };
        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    components: [
        {id: 0, name: "Leg", quantity: 1, width: 2.125, height: 4},
        {id: 1, name: "Corner", quantity: 0, width: 2.125, height: 4, length: 2, innerR: 88.8, outerR: 190.47},
        {id: 2, name: "Endcap", quantity: 0, width: 1, height: 0, length:0}
    ],
    appState: 8, 
    canvasComponents: [
         {id: 0, dimensions: [1, 1, 1], position: [0,0,0], angle: [0, 0, 0], type: "Endcap", color: "blue", connections: [0, 0, 0, 0, 0, 0], adder: 0},
       
      ]
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                components: state.components,
                dispatch,
                appState: state.appState,
                canvasComponents: state.canvasComponents
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};