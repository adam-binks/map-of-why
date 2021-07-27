import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    focussedDepth: 0
}

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,

    reducers: {
        focussedDepthUpdated: (state, action) => {
            state.focussedDepth = action.payload.focussedDepth
        },
    },
})

export const { focussedDepthUpdated } = navigationSlice.actions

export const selectMaxDepth = (state) => state.navigation.focussedDepth

export default navigationSlice.reducer
