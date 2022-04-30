import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Please from 'pleasejs'
import undoable from 'redux-undo';
import { getFirebaseProject } from '../../app/firebase';
import { getLastActiveProject, loadState } from '../../app/localstorage';

const USE_FIREBASE = true

// values are incomplete - to be used with spread operator
const getDefaultNode = () => {
    return {
        label: "",
        completed: false,
        // isValue: false,
        valueIcon: '⭐',
        displayedChildren: [],
    }
}

const rootNode = {
    label: 'Root',
    id: 'root',
    parents: [],
}

export const getDefaultState = () => {
    return {present: initialiseDisplayedChildren([rootNode])}
}

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

export const getValueAncestors = (nodes, id) => {
    return getAncestors(nodes, id, []).filter(ancestor => ancestor.isValue)
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
        'value': 0.95
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

function getInitialState() {
    var state = undefined
    if (USE_FIREBASE) {
        return "loading"
    }

    state = loadState(getLastActiveProject())
    if (!state) {
        state = getDefaultState()
    }
    return initialiseDisplayedChildren(state)
}

export const getFirebaseProjectThunk = createAsyncThunk("nodes/getFirebaseProject", async (projectId) => {
    return await getFirebaseProject(projectId)
})

export const nodeSlice = createSlice({
    name: 'nodes',
    initialState: getInitialState(),

    reducers: {
        projectLoaded: (_, action) => {
            return action.payload.loadedNodes // replace current state with loaded nodes
        },

        nodeAdded: (state, action) => {
            const { id, parents } = action.payload

            const isValue = action.payload.isValue !== undefined ? action.payload.isValue : (parents.length === 1 && parents[0] === "root")

            var newNode = {
                ...getDefaultNode(),
                id: id,
                parents: parents,
                isValue: isValue,
                valueColour: isValue && getNewNodeColour(state.nodes),
            }
            state.push(newNode)

            if (parents.length > 0) {
                const displayedChildren = getNode(state, parents[0]).displayedChildren
                const insertAfter = action.payload.insertAfter
                if (insertAfter && displayedChildren.indexOf(insertAfter) !== -1) {
                    displayedChildren.splice(displayedChildren.indexOf(insertAfter) + 1, 0, id) // insert at index
                }
                else {
                    displayedChildren.push(id)
                }
            }

            const valueAncestors = getValueAncestors(state, id)
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
    extraReducers(builder) {
        builder.addCase(getFirebaseProjectThunk.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const { nodeAdded, nodeDeleted, nodeCompleteUpdated, nodeIsValueUpdated, valueIconUpdated, nodeReordered, nodeLabelUpdated, projectLoaded } = nodeSlice.actions

export const selectMaxDepth = (state) => state.nodes.present !== "loading" && Math.max.apply(null, state.nodes.present.map(node => {
    var depth = 0
    var visited = [node]
    while (node && node.parents && node.parents.length && !visited.includes(node.parents[0])) {
        node = getNode(state.nodes.present, node.parents[0])
        visited.push(node)
        depth++
    }
    return depth
}))


export default undoable(nodeSlice.reducer)
