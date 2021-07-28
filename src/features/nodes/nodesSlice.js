import { createSlice } from '@reduxjs/toolkit';
import Please from 'pleasejs'

// values are incomplete - to be used with spread operator
const getDefaultNode = () => {
    return {
        label: "New task",
        completed: false,
        isValue: false,
        valueIcon: '⭐',
        displayedChildren: [],
    }
}

const rootNode = {
    label: 'Root',
    id: 'root',
    parents: [],
}

// one deep line
// const initialState = [
//     rootNode,
//     {
//         label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//         completed: false,
//         isValue: true,
//         valueIcon: '⭐',
//         id: 'A1',
//         parents: ['root']
//     },
//     {
//         label: 'B1',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'B1',
//         parents: [
//             'A1'
//         ]
//     },
//     {
//         label: 'B2',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'B2',
//         parents: [
//             'A1'
//         ]
//     },
//     {
//         label: 'B2.5',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'B2.5',
//         parents: [
//             'A1'
//         ]
//     },
//     {
//         label: 'C1',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'C1',
//         parents: [
//             'B2'
//         ]
//     },
//     {
//         label: 'C2',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'C2',
//         parents: [
//             'B2'
//         ]
//     },
//     {
//         label: 'Excepteur sint occaecat cupidatat non proident',
//         completed: false,
//         isValue: true,
//         valueIcon: '⭐',
//         id: 'B3',
//         parents: [
//             'A2'
//         ]
//     },
//     {
//         label: 'A2',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'A2',
//         parents: ['root']
//     },
//     {
//         label: 'A3',
//         completed: false,
//         isValue: true,
//         valueIcon: '💪',
//         id: 'A3',
//         parents: ['root']
//     },
//     {
//         label: 'New task',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'gx_7OQAPZHjb-huSw1pdR',
//         parents: [
//             'C1'
//         ]
//     },
//     {
//         label: 'New task',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'LFQn8mAS7BpE-ba4o4JBq',
//         parents: [
//             'gx_7OQAPZHjb-huSw1pdR'
//         ]
//     },
//     {
//         label: 'New task',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'FgJTY7PSqLsKE8uTQui5l',
//         parents: [
//             'LFQn8mAS7BpE-ba4o4JBq'
//         ]
//     },
//     {
//         label: 'New task',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'PfTbGkdu500xS9hkptuas',
//         parents: [
//             'FgJTY7PSqLsKE8uTQui5l'
//         ]
//     },
//     {
//         label: 'New task',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'yuk8zP_3wZvEtSZqBHYLL',
//         parents: [
//             'PfTbGkdu500xS9hkptuas'
//         ]
//     },
//     {
//         label: 'New task',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'pSSQYYvdZUhcAFytjC0X6',
//         parents: [
//             'B3'
//         ]
//     },
//     {
//         label: 'New task',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'sKTXd5_gyP0faNbGHkzyz',
//         parents: [
//             'pSSQYYvdZUhcAFytjC0X6'
//         ]
//     },
//     {
//         label: 'New task',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: '2R8t1hpgC7s5AsGpF9YKs',
//         parents: [
//             'LFQn8mAS7BpE-ba4o4JBq'
//         ]
//     },
//     {
//         label: 'New task',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'LUW0Xe2Gi7NsXlB3UAAIi',
//         parents: [
//             'sKTXd5_gyP0faNbGHkzyz'
//         ]
//     },
//     {
//         label: 'New task',
//         completed: false,
//         isValue: false,
//         valueIcon: '⭐',
//         id: 'axu9o0XSJLGuhzLEWN_9V',
//         parents: [
//             'LUW0Xe2Gi7NsXlB3UAAIi'
//         ]
//     }
// ]

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

// example
const initialState = [
    {
      label: 'Root',
      id: 'root',
      parents: [],
      displayedChildren: [
        'A1',
        'A2',
        'A3'
      ]
    },
    {
      label: 'Reducing suffering of sentient beings as much as possible',
      completed: false,
      isValue: true,
      valueIcon: '⭐',
      id: 'A1',
      parents: [
        'root'
      ],
      displayedChildren: [
        'YdLXxgqxi-7cKVRhToZhI',
        '6Qg1nCzJO6KKPpHPmkqqR'
      ],
      valueColour: [
        '#89e58a'
      ]
    },
    {
      label: 'Stay close to my sister',
      completed: false,
      isValue: true,
      valueIcon: '❤️',
      id: 'B3',
      parents: [
        'A2'
      ],
      displayedChildren: [
        'BE7ChbcSZVPxcHAqQoZAu'
      ],
      valueColour: [
        '#e589af'
      ]
    },
    {
      label: 'Caring for my family and friends',
      completed: false,
      isValue: true,
      valueIcon: '❤️',
      id: 'A2',
      parents: [
        'root'
      ],
      displayedChildren: [
        'B3',
        '8wR54PquFQPmA57WxK5HS'
      ],
      valueColour: [
        '#e589b1'
      ]
    },
    {
      label: 'Staying healthy and happy',
      completed: false,
      isValue: true,
      valueIcon: '💪',
      id: 'A3',
      parents: [
        'root'
      ],
      displayedChildren: [
        'PELRBdnb65s7HdboNuOST',
        'tJAKmZsWI5CN_BTJfdc2H'
      ],
      valueColour: [
        '#89e5a2'
      ]
    },
    {
      label: 'Choose a career path that reduces suffering',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      displayedChildren: [
        'tbwhnEa40aFU_88Ulara1',
        'XTRqy4uIxlo-rClcUpO75',
        '-FYR8oKZnWp6n2dnDFvjF'
      ],
      id: 'YdLXxgqxi-7cKVRhToZhI',
      parents: [
        'A1'
      ]
    },
    {
      label: 'Make a list of plausible career paths ',
      completed: true,
      isValue: false,
      valueIcon: '⭐',
      displayedChildren: [],
      id: 'tbwhnEa40aFU_88Ulara1',
      parents: [
        'YdLXxgqxi-7cKVRhToZhI'
      ]
    },
    {
      label: 'Talk to experts about the impact of each career',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      displayedChildren: [
        'dLgcPMRnel0O3pRYvNn8T',
        'HbNyxe5bv5Whjc2-n5Q7u'
      ],
      id: 'XTRqy4uIxlo-rClcUpO75',
      parents: [
        'YdLXxgqxi-7cKVRhToZhI'
      ]
    },
    {
      label: 'Score each career path based on my estimate of suffering reduced',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      displayedChildren: [],
      id: '-FYR8oKZnWp6n2dnDFvjF',
      parents: [
        'YdLXxgqxi-7cKVRhToZhI'
      ]
    },
    {
      label: 'Talk to Julie',
      completed: false,
      isValue: false,
      valueIcon: '⭐',
      displayedChildren: [],
      id: 'dLgcPMRnel0O3pRYvNn8T',
      parents: [
        'XTRqy4uIxlo-rClcUpO75'
      ]
    },
    {
      label: 'Email Amir',
      completed: true,
      isValue: false,
      valueIcon: '⭐',
      displayedChildren: [],
      id: 'HbNyxe5bv5Whjc2-n5Q7u',
      parents: [
        'XTRqy4uIxlo-rClcUpO75'
      ]
    },
    {
      label: 'Visit my sister',
      completed: false,
      isValue: false,
      valueIcon: '❤️',
      displayedChildren: [
        'qzKIaQIgzZvi61xRSJ1RO',
        'BzASsKGLTdI0WaVSFgH3M'
      ],
      id: 'BE7ChbcSZVPxcHAqQoZAu',
      parents: [
        'B3'
      ]
    },
    {
      label: 'Coordinate a time to visit',
      completed: false,
      isValue: false,
      valueIcon: '❤️',
      displayedChildren: [],
      id: 'qzKIaQIgzZvi61xRSJ1RO',
      parents: [
        'BE7ChbcSZVPxcHAqQoZAu'
      ]
    },
    {
      label: 'Book a train',
      completed: false,
      isValue: false,
      valueIcon: '❤️',
      displayedChildren: [],
      id: 'BzASsKGLTdI0WaVSFgH3M',
      parents: [
        'BE7ChbcSZVPxcHAqQoZAu'
      ]
    },
    {
      label: 'Plan surprise party for mum',
      completed: false,
      isValue: false,
      valueIcon: '❤️',
      displayedChildren: [],
      id: '8wR54PquFQPmA57WxK5HS',
      parents: [
        'A2'
      ]
    },
    {
      label: 'Make donations to highly effective charities',
      completed: false,
      isValue: true,
      valueIcon: '💸',
      displayedChildren: [
        'lYSvsF6cL3UBip4dzI5eS'
      ],
      id: '6Qg1nCzJO6KKPpHPmkqqR',
      parents: [
        'A1'
      ],
      valueColour: [
        '#e58d89'
      ]
    },
    {
      label: 'Set up recurring donation to GiveDirectly',
      completed: false,
      isValue: false,
      valueIcon: '💸',
      displayedChildren: [],
      id: 'lYSvsF6cL3UBip4dzI5eS',
      parents: [
        '6Qg1nCzJO6KKPpHPmkqqR'
      ]
    },
    {
      label: 'Plan a board game night',
      completed: false,
      isValue: false,
      valueIcon: '💪',
      displayedChildren: [],
      id: 'PELRBdnb65s7HdboNuOST',
      parents: [
        'A3'
      ]
    },
    {
      label: 'Improve mental health',
      completed: false,
      isValue: true,
      valueIcon: '🧠',
      displayedChildren: [
        'Trsn4Q7K2jzbDmaCasD30'
      ],
      id: 'tJAKmZsWI5CN_BTJfdc2H',
      parents: [
        'A3'
      ],
      valueColour: [
        '#89e59e'
      ]
    },
    {
      label: 'Read meditation book',
      completed: false,
      isValue: false,
      valueIcon: '🧠',
      displayedChildren: [],
      id: 'Trsn4Q7K2jzbDmaCasD30',
      parents: [
        'tJAKmZsWI5CN_BTJfdc2H'
      ]
    }
  ]

const getNode = (state, id) => state.find(node => node.id === id)

const updateNodeAttribute = (state, id, attribute, value) => {
    const node = getNode(state, id)
    if (node) {
        node[attribute] = value
    }
    return node
}

const removeNodeFromParentsDisplayedChildren = (nodes, node) => {
    if (node && node.parents.length) {
        const displayedChildren = getNode(nodes, node.parents[0])?.displayedChildren
        if (displayedChildren) {
            const index = displayedChildren.indexOf(node.id)
            displayedChildren.splice(index, 1)
        }
    }
}

const getAncestors = (nodes, id, ancestors) => {
    const node = getNode(nodes, id)
    if (!node || ancestors.includes(node)) { return ancestors }
    ancestors.push(node)
    node.parents.forEach(parent => getAncestors(nodes, parent, ancestors))

    return ancestors
}

const isDisplayedDescendantOf = (nodes, descendant, ancestor) => {
    if (ancestor === descendant) {
        return true
    }
    if (!descendant.parents.length) {
        return false
    }
    return isDisplayedDescendantOf(nodes, getNode(nodes, descendant.parents[0]), ancestor)
}

const getNewNodeColour = (nodes) => {
    const opt = {
        'value': 0.9
    }
    // const initialPallet = [
    //     'green',
    //     'blue',
    //     'yellow',
    //     'fuchsia',
    //     'olive',
    //     'red',
    // ].map(htmlColor => Please.make_color({...opt, 'base_color': htmlColor }))
    
    // const numValueNodes = nodes.filter(node => node.isValue).length
    // console.log(numValueNodes);
    // if (numValueNodes <= initialPallet.length) {
    //     return initialPallet[numValueNodes - 1]
    // } else {
        return Please.make_color(opt)
    // }
}

const initialiseDisplayedChildren = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // need to store this so we can reorder them
        if (!node.displayedChildren) {
            node.displayedChildren = nodes.filter(potentialChild => potentialChild.parents.length > 0 && potentialChild.parents[0] === node.id).map(node => node.id)
        }

        if (node.isValue && node.valueColour === undefined) {
            node.valueColour = getNewNodeColour(nodes)
        }
    }
    return nodes
}

export const nodeSlice = createSlice({
    name: 'nodes',
    initialState: initialiseDisplayedChildren(initialState), // todo - remove initialiseDisplayedChildren once we are loading from saves properly

    reducers: {
        nodeAdded: (state, action) => {
            const { id, parents } = action.payload
            var newNode = {
                ...getDefaultNode(),
                id: id,
                parents: parents,
            }
            state.push(newNode)

            if (parents.length > 0) {
                getNode(state, parents[0]).displayedChildren.push(id)
            }

            const valueAncestors = getAncestors(state, id, []).filter(ancestor => ancestor.isValue)
            if (valueAncestors.length) {
                newNode.valueIcon = valueAncestors[0].valueIcon
            }
        },

        nodeDeleted: (state, action) => {
            const deleteRecursive = (id) => {
                const node = getNode(state, id)
                node.displayedChildren.slice(0).map(child => deleteRecursive(child)) // slice to copy because we are deleting array elements
                // remove this node
                state.splice(state.findIndex((n) => n.id === node.id), 1)

                removeNodeFromParentsDisplayedChildren(state, node)
            }

            deleteRecursive(action.payload.id)
        },

        nodeReordered: (state, action) => {
            const { id, newParentId, newIndex } = action.payload
            const node = getNode(state, id)

            // disallow reorder if the new parent is a descendant of reordered node (ouroboros)
            if (newParentId) {
                if (isDisplayedDescendantOf(state, getNode(state, newParentId), node)) {
                    return
                }
            }

            removeNodeFromParentsDisplayedChildren(state, node)

            node.parents[0] = newParentId
            if (newParentId) {
                var newParent = getNode(state, newParentId)
                newParent.displayedChildren.splice(newIndex, 0, node.id)
            }
        },

        nodeLabelUpdated: (state, action) => {
            updateNodeAttribute(state, action.payload.id, 'label', action.payload.label)
        },

        nodeCompleteUpdated: (state, action) => {
            updateNodeAttribute(state, action.payload.id, 'completed', action.payload.completed)
        },

        nodeIsValueUpdated: (state, action) => {
            const node = updateNodeAttribute(state, action.payload.id, 'isValue', action.payload.isValue)
            if (node.isValue && node.valueColour === undefined) {
                node.valueColour = getNewNodeColour(state)
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
})

export const { nodeAdded, nodeDeleted, nodeCompleteUpdated, nodeIsValueUpdated, valueIconUpdated, nodeReordered, nodeLabelUpdated } = nodeSlice.actions

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
