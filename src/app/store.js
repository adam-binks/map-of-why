import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from '../features/nodes/nodesSlice';
import navigationReducer from '../features/navigation/navigationSlice';

export const store = configureStore({
  reducer: {
    nodes: nodesReducer,
    navigation: navigationReducer,
  },
});
