import { createSlice } from '@reduxjs/toolkit';

// values are incomplete - to be used with spread operator
const getDefaultNode = () => {return {
    label: "New task",
    completed: false,
    isValue: false,
    valueIcon: '⭐',
    displayedChildren: [],
}}

// one deep line
const initialState =  [
    {
      label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      completed: false,
      isValue: true,
      valueIcon: '⭐',
      id: 'A1',
      parents: []
    },
    {
      label: 'B1',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'B1',
      parents: [
        'A1'
      ]
    },
    {
      label: 'B2',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'B2',
      parents: [
        'A1'
      ]
    },
    {
      label: 'B2.5',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'B2.5',
      parents: [
        'A1'
      ]
    },
    {
      label: 'C1',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'C1',
      parents: [
        'B2'
      ]
    },
    {
      label: 'C2',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'C2',
      parents: [
        'B2'
      ]
    },
    {
      label: 'Excepteur sint occaecat cupidatat non proident',
      completed: false,
      isValue: true,
      valueIcon: '⭐',
      id: 'B3',
      parents: [
        'A2'
      ]
    },
    {
      label: 'A2',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'A2',
      parents: []
    },
    {
      label: 'A3',
      completed: false,
      isValue: true,
      valueIcon: '💪',
      id: 'A3',
      parents: []
    },
    {
      label: 'New task',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'gx_7OQAPZHjb-huSw1pdR',
      parents: [
        'C1'
      ]
    },
    {
      label: 'New task',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'LFQn8mAS7BpE-ba4o4JBq',
      parents: [
        'gx_7OQAPZHjb-huSw1pdR'
      ]
    },
    {
      label: 'New task',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'FgJTY7PSqLsKE8uTQui5l',
      parents: [
        'LFQn8mAS7BpE-ba4o4JBq'
      ]
    },
    {
      label: 'New task',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'PfTbGkdu500xS9hkptuas',
      parents: [
        'FgJTY7PSqLsKE8uTQui5l'
      ]
    },
    {
      label: 'New task',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'yuk8zP_3wZvEtSZqBHYLL',
      parents: [
        'PfTbGkdu500xS9hkptuas'
      ]
    },
    {
      label: 'New task',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'pSSQYYvdZUhcAFytjC0X6',
      parents: [
        'B3'
      ]
    },
    {
      label: 'New task',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'sKTXd5_gyP0faNbGHkzyz',
      parents: [
        'pSSQYYvdZUhcAFytjC0X6'
      ]
    },
    {
      label: 'New task',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: '2R8t1hpgC7s5AsGpF9YKs',
      parents: [
        'LFQn8mAS7BpE-ba4o4JBq'
      ]
    },
    {
      label: 'New task',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'LUW0Xe2Gi7NsXlB3UAAIi',
      parents: [
        'sKTXd5_gyP0faNbGHkzyz'
      ]
    },
    {
      label: 'New task',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      id: 'axu9o0XSJLGuhzLEWN_9V',
      parents: [
        'LUW0Xe2Gi7NsXlB3UAAIi'
      ]
    }
  ]

// handwritten one
// const initialState = [
//     {
//         ...getDefaultNode(),
//         id: "A1",
//         label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         parents: [],
//         isValue: true,
//     },
//     {
//         ...getDefaultNode(),
//         id: "B1",
//         label: "B1",
//         parents: ["A1"],
//     },
//     {
//         ...getDefaultNode(),
//         id: "B2",
//         label: "B2",
//         parents: ["A1"],
//     },
//     {
//         ...getDefaultNode(),
//         id: "B2.5",
//         label: "B2.5",
//         parents: ["A1"],
//     },
//     {
//         ...getDefaultNode(),
//         id: "C1",
//         label: "C1",
//         parents: ["B2"],
//     },
//     {
//         ...getDefaultNode(),
//         id: "C2",
//         label: "C2",
//         parents: ["B2"],
//     },
//     {
//         ...getDefaultNode(),
//         id: "B3",
//         label: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//         parents: ["A2"],
//         isValue: true,
//     }, 
//     {
//         ...getDefaultNode(),
//         id: "A2",
//         label: "A2",
//         parents: [],
//     },
//     {
//         ...getDefaultNode(),
//         id: "A3",
//         label: "A3",
//         parents: [],
//         isValue: true,
//         valueIcon: "💪"
//     },
// ]

const getNode = (state, id) => state.find(node => node.id === id)

const updateNodeAttribute = (state, id, attribute, value) => {
    const node = getNode(state, id)
    if (node) {
        node[attribute] = value
    }
}

const initialiseDisplayedChildren = (nodes) => {
    nodes.forEach(node => {
        // need to store this so we can reorder them
        if (!node.displayedChildren) {
            node.displayedChildren = nodes.filter(potentialChild => potentialChild.parents.length > 0 && potentialChild.parents[0] === node.id).map(node => node.id)
        }
    })
    return nodes
}

export const nodeSlice = createSlice({
    name: 'nodes',
    initialState: initialiseDisplayedChildren(initialState), // todo - remove once we are loading from saves properly

    reducers: {
        nodeAdded: (state, action) => {
            const { id, parents } = action.payload
            state.push({
                ...getDefaultNode(),
                id: id,
                parents: parents,
            })

            if (parents.length > 0) {
                getNode(state, parents[0]).displayedChildren.push(id)
            }
        },

        nodeDeleted: (state, action) => {
            const deleteRecursive = (id) => {
                const node = getNode(state, id)
                // remove this node
                state.splice(state.findIndex((n) => n.id === node.id), 1)

                // remove from parent's list of displayedChildren
                if (node.parents.length > 0) {
                    const displayedChildren = getNode(state, node.parents[0]).displayedChildren
                    displayedChildren.splice(displayedChildren.indexOf(node.id), 1)
                }
            }

            deleteRecursive(action.payload.id)
        },

        nodeCompleteUpdated: (state, action) => {
            updateNodeAttribute(state, action.payload.id, 'completed', action.payload.completed)
        },

        nodeIsValueUpdated: (state, action) => {
            updateNodeAttribute(state, action.payload.id, 'isValue', action.payload.isValue)
        },

        valueIconUpdated: (state, action) => {
            const { id, icon } = action.payload

            const node = getNode(state, id)
            if (node) {
                node.valueIcon = icon
            }
        },
    },
})

export const { nodeAdded, nodeDeleted, nodeCompleteUpdated, nodeIsValueUpdated, valueIconUpdated } = nodeSlice.actions

export const selectMaxDepth = (state) => Math.max.apply(null, state.nodes.map(node => {
    var depth = 0
    var visited = [node]
    while (node && node.parents && node.parents.length && !visited.includes(node.parents[0])) {
        node = getNode(state.nodes, node.parents[0])
        visited.push(node)
        depth++
    }
    return depth
}))


export default nodeSlice.reducer
