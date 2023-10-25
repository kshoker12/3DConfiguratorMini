import * as react from "react";

 const AppReducer = (state, action) => {

    let feet = 0.305;
    let inch = 0.0254;
    let mm = 0.001;
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
        case "SET_CURRENT_CONFIG":
            action.type = "DONE";
            state.currItem = action.payload;
            return {
                ...state
            }
        case "UPDATE_TYPE":
            action.type = "DONE";
            state.item[1].cornerType = action.payload;
            return {
                ...state
            }
        case "UPDATE_ITEM":
            action.type = "DONE";
            state.item.push(action.payload.element);
            state.item.push(action.payload.object);
            state.item.push(action.payload.index);
            state.item.push(action.payload.placement_index);
            return {
                ...state
            }
        case "ATTACH":
            action.type = "DONE";
            state.item[0].connections[state.item[2]] = 1;
            state.item[1].connections[state.item[3]] = 1;
            state.canvasComponents.push(state.item[1]);
            state.item[1].connectedComponents.push(state.item[0]);
            switch (state.item[1].type) {
                case "Corner":
                    state.components[1].quantity++;
                    break;
                case "Leg":
                    state.components[0].quantity++;
                    break;
                case "Endcap":
                    state.components[2].quantity++;
                    break;
                default:
                    break;
            }
            state.item.pop();
            state.item.pop();
            state.item.pop();
            state.item.pop();
            return {
                ...state
            }
        case "CANCEL_ACTION":
            action.type = "DONE";
            state.appState = 3;
            if (state.item[0].type === "Leg") {
                state.item[0].adder += feet;
                state.item[0].dimensions[0] += 2 * feet;
            }
            state.item.pop();
            state.item.pop();
            state.item.pop();
            state.item.pop();
            return {
                ...state
            }
        case "UPDATE_ANGLE":
            action.type = "DONE";
            if (state.direction === "Down/Left") {
                state.angle = -1 * parseInt(action.payload);
            } else {
                state.angle = parseInt(action.payload);
            }
            state.item[1].cor_angle = state.angle;
            return {
                ...state
            }
        case "UPDATE_LENGTH":
            action.type = "DONE";
            let prev_length = state.length;
            let cornerLength = state.components[1].length;
            state.length = parseInt(action.payload);
            if (state.item[0].type === "Endcap") {
                state.item[1].adder = (state.length * feet/ 2) + state.components[2].width / 2;
            } else {
                if (state.item[0].cornerType === "X-Corner") {
                    state.item[1].adder = (state.length * feet/ 2) + state.components[1].length * feet + state.components[1].width * inch / 2;
                } else {
                    state.item[1].adder = (state.length * feet/ 2) + feet; 
                }
                
            }
            state.item[1].dimensions[0] = state.length * feet;
            return {
                ...state
            }
        case "STATE_CHANGE":
            action.type = "DONE";
            state.appState = action.payload;
            console.log(state);
            return {
                ...state
            };
        case "CHANGE_TO_ENDCAP":
            action.type = "DONE";
            state.item[1].type = "Endcap";
            let width = state.components[2].width;
            state.item[1].dimensions = [width, width, width];
            state.item[1].color = "blue";
            state.item[0].dimensions[0] += 2 * feet;
            state.item[0].adder += feet;
            state.item[1].adder = state.item[0].dimensions[0]/ 2 + state.components[2].width/ 2
            
            return {
                ...state
            }
        case "UPDATE_DIRECTION":
            action.type = "DONE";
            state.item[1].cor_angle = state.angle * -1;
            state.angle = state.angle * -1;
            state.direction = action.payload;
            return {
                ...state
            };
        case "SWITCH_CAMERA_INDEX":
            action.type = "DONE";
            state.cameraIndex = action.payload;
            return {
                ...state
            }
        case "CHANGE_WIDTH":
            action.type = "DONE";
            state.components[0].width = state.components[0].og_width * action.payload;
            state.components[1].width = state.components[1].og_width * action.payload;
            console.log("Change")
            console.log(state)
            return {
                ...state
            }
        case "UNDO_PREVIOUS_ACTION":
            action.type = "DONE";
            let lastComponent = state.canvasComponents.pop();
            let element = lastComponent.connectedComponents.pop();
            if (lastComponent.type === "Corner") {
                element.dimensions[0] = element.dimensions[0] + 2 * 0.305;
                element.adder += 0.305;
                
            } 
            element.connections[oppositeIndex(connectedIndex(lastComponent.connections))] = 0;
            switch (lastComponent.type) {
                case "Leg":
                    state.components[0].quantity -= 1;
                    break;
                case "Corner":
                    state.components[1].quantity -= 1;
                    break;
                case "Endcap":
                    state.components[2].quantity -= 1; 
                    break;
                default:
                    break;
            }
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
        {name: "Leg", quantity: 0, width: 2.125, height: 4, og_width: 2.125},
        {name: "Corner", quantity: 0, width: 2.125, height: 4, length: 2, innerR: 88.8, outerR: 190.47, og_width: 2.125},
        {name: "Endcap", quantity: 1, width: 1, height: 0, length:0}
    ],
    // components: [
    //     {name: "Leg", quantity: 0, width: 20.125, height: 4},
    //     {name: "Corner", quantity: 0, width: 20.125, height: 4, length: 2, innerR: 88.8, outerR: 190.47},
    //     {name: "Endcap", quantity: 1, width: 1, height: 0, length:0}
    // ],
    appState: 3, 
    item: [],
    length: 3,
    angle: 45,
    direction: "Up/Right", 
    cameraIndex: 3,
    canvasComponents: [
         {id: 0, dimensions: [1, 1, 1], position: [0,0,0], angle: [0, 0, 0], type: "Endcap", color: "blue", connections: [0, 0, 0, 0, 0, 0], adder: 0, connectedComponents: [], index: 0, mesh: null},
    ]
};

// 2. Creates the context this is the thing our components import and use to get the state
 const AppContext = react.createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
 const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = react.useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                components: state.components,
                appState: state.appState,
                canvasComponents: state.canvasComponents,
                item: state.item,
                angle: state.angle,
                length: state.length,
                direction: state.direction,
                cameraIndex: state.cameraIndex,
                dispatch
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export {AppReducer, AppProvider, AppContext}