import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from '../features/nodes/nodesSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import { AUTOSAVE, saveState } from './localstorage';
import { throttle } from 'lodash';

export const store = configureStore({
    reducer: {
        nodes: nodesReducer,
        navigation: navigationReducer, // NB not currently persisted
    },
})

const throttledSave = throttle(() => saveState(store.getState().nodes, AUTOSAVE), 1000) // autosave interval

store.subscribe(throttledSave)