import { createSlice } from '@reduxjs/toolkit';

// incomplete - to be used with spread operator
const defaultNode = {
    label: "New task",
    completed: false,
    isValue: false,
    valueIcon: '⭐',
}

const initialState = [
    {
        ...defaultNode,
        id: "A1",
        label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        parents: [],
        isValue: true,
    },
    {
        ...defaultNode,
        id: "B1",
        label: "B1",
        parents: ["A1"],
    },
    {
        ...defaultNode,
        id: "B2",
        label: "B2",
        parents: ["A1"],
    },
    {
        ...defaultNode,
        id: "B2.5",
        label: "B2.5",
        parents: ["A1"],
    },
    {
        ...defaultNode,
        id: "C1",
        label: "C1",
        parents: ["B2"],
    },
    {
        ...defaultNode,
        id: "C2",
        label: "C2",
        parents: ["B2"],
    },
    {
        ...defaultNode,
        id: "B3",
        label: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        parents: ["A2"],
        isValue: true,
    }, 
    {
        ...defaultNode,
        id: "A2",
        label: "A2",
        parents: [],
    },
    {
        ...defaultNode,
        id: "A3",
        label: "A3",
        parents: [],
        isValue: true,
        valueIcon: "💪"
    },
];

const getNode = (state, id) => state.find(node => node.id === id)

export const nodeSlice = createSlice({
    name: 'nodes',
    initialState,

    reducers: {
        nodeAdded: (state, action) => {
            const { id, parents } = action.payload
            state.push({
                ...defaultNode,
                id: id,
                parents: parents,
            })
        },

        nodeDeleted: (state, action) => {
            // NB: this doesn't currently delete children. to think about later
            return state.filter(node => node.id !== action.payload.id) // return to update state (so no state mutation allowed in this reducer)
        },

        nodeCompleteUpdated: (state, action) => {
            const { id, completed } = action.payload

            const node = getNode(state, id)
            if (node) {
                node.completed = completed
            }
        },

        valueIconUpdated: (state, action) => {
            const { id, icon } = action.payload

            const node = getNode(state, id)
            if (node) {
                node.valueIcon = icon
            }
        },
    },
});

export const { nodeAdded, nodeDeleted, nodeCompleteUpdated, valueIconUpdated } = nodeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.node.value)`
export const selectCount = (state) => state.nodes.value;


export default nodeSlice.reducer;
