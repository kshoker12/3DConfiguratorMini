import {AppContext} from './context/AppContext';
import React, {useContext, useEffect, useState, useRef} from 'react';

const SetItem = (item) => {
    const {dispatch, payload} = useContext(AppContext);
    console.log("Hello")
    // dispatch({
    //     type: "UPDATE_ITEM",
    //     payload: item
    // })

    return null;
}

export {SetItem};