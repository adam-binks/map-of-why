import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from '../features/nodes/nodesSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import { saveState } from './localstorage';
import { throttle } from 'lodash';
import { updateFirebaseProject } from './firebase';
import initSubscriber from 'redux-subscriber';

export const store = configureStore({
    reducer: {
        nodes: nodesReducer,
        navigation: navigationReducer, // NB not currently persisted
    },
})

export var AUTOSAVE_PROPS = {paused: false}

// const throttledLocalStorageSave = throttle(() => {
//     if (!AUTOSAVE_PROPS.paused) {
//         saveState(store.getState().nodes, store.getState().navigation.activeProject)
//     }
// }, 1000) // autosave interval
// store.subscribe(throttledLocalStorageSave)

const throttledFirebaseSave = throttle(() => {
    if (!AUTOSAVE_PROPS.paused && store.getState().nodes !== "loading") {
        updateFirebaseProject(store.getState().navigation.activeProject, store.getState().nodes)
    }
}, 5000) // autosave interval

const subscribe = initSubscriber(store)

// only save to firebase when nodes changes 
subscribe('nodes', (state) => {throttledFirebaseSave()})