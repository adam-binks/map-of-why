import { createSlice } from '@reduxjs/toolkit';
import { getLastActiveProject, setLastActiveProject } from '../../app/localstorage';

const initialState = {
    focussedDepth: 0,
    activeProject: getLastActiveProject()
}

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,

    reducers: {
        focussedDepthUpdated: (state, action) => {
            state.focussedDepth = action.payload.focussedDepth
        },
        activeProjectUpdated: (state, action) => {
            state.activeProject = action.payload.activeProject
            setLastActiveProject(state.activeProject) // persist this straight away
            action.payload.focussedDepth = 0 // in case the focussed depth exceeds the new max depth
        }
    },
})

export const { focussedDepthUpdated, activeProjectUpdated } = navigationSlice.actions

export const selectMaxDepth = (state) => state.navigation.focussedDepth
export const selectActiveProject = (state) => state.navigation.activeProject

export default navigationSlice.reducer
