import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: "A1",
        label: "A1",
        checked: false,
        parents: [],
    },
    {
        id: "B1",
        label: "B1",
        checked: false,
        parents: ["A1"],
    },
    {
        id: "B2",
        label: "B2",
        checked: false,
        parents: ["A1"],
    },
    {
        id: "B2.5",
        label: "B2.5",
        checked: false,
        parents: ["A1"],
    },
    {
        id: "C1",
        label: "C1",
        checked: false,
        parents: ["B2"],
    },
    {
        id: "C2",
        label: "C2",
        checked: false,
        parents: ["B2"],
    },
    {
        id: "B3",
        label: "B3",
        checked: false,
        parents: ["A2"],
    }, 
    {
        id: "A2",
        label: "A2",
        checked: false,
        parents: [],
    },
    {
        id: "A3",
        label: "A3",
        checked: false,
        parents: [],
    },
];

export const nodeSlice = createSlice({
    name: 'nodes',
    initialState,

    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = nodeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.node.value)`
export const selectCount = (state) => state.nodes.value;


export default nodeSlice.reducer;
