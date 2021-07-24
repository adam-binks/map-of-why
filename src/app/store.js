import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from '../features/nodes/nodesSlice';

export const store = configureStore({
  reducer: {
    nodes: nodesReducer,
  },
});
