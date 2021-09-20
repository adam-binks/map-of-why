import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from '../features/nodes/nodesSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import { saveState } from './localstorage';
import { throttle } from 'lodash';

export const store = configureStore({
    reducer: {
        nodes: nodesReducer,
        navigation: navigationReducer, // NB not currently persisted
    },
})

export var AUTOSAVE_PROPS = {paused: false}

const throttledSave = throttle(() => {
    if (!AUTOSAVE_PROPS.paused) {
        saveState(store.getState().nodes, store.getState().navigation.activeProject)
    } else {
        console.log("autosave paused")
    }
}, 1000) // autosave interval

store.subscribe(throttledSave)