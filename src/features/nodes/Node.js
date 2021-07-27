import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useDrag } from 'react-dnd';
import { nodeAdded, nodeDeleted, nodeCompleteUpdated, nodeIsValueUpdated } from './nodesSlice';
import { ValueIcon } from './ValueIcon';
import { ItemTypes } from '../../DragItemTypes';
import { focussedDepthUpdated } from '../navigation/navigationSlice';
import { debounce } from './Tree';
import styles from './Node.module.css';
import 'emoji-mart/css/emoji-mart.css';

export function Node(props) {
    const node = useSelector(state => state.nodes.find(node => node.id === props.id))
    const dispatch = useDispatch()

    // const [{ isDragging }, drag] = useDrag({
    //     type: ItemTypes.NODE,
    //     item: () => {
    //         return { id: node.id, index: props.index, parent: node.parents.length ? node.parents[0] : null}
    //     }
    // })

    if (!node) {
        return (
            <div className={styles.node}>
                <p>Error: no node with ID '{props.id}'</p>
            </div>
        )
    }

    const addNode = () => {
        dispatch(nodeAdded({
            id: nanoid(),
            parents: [node.id],
        }))
    }

    return (
        <div className={styles.nodeWrapper}  style={{'zoom': props.zoom}}>
            <button className={styles.addNodeButton}
                onClick={addNode}>➕</button>
            <button className={styles.deleteNodeButton}
                onClick={() => dispatch(nodeDeleted({ id: node.id }))}>❌</button>
            <button className={styles.toggleValueButton}
                onClick={() => dispatch(nodeIsValueUpdated({ id: node.id, isValue: !node.isValue }))}>🔄</button>

            <div className={styles.node} style={{'width': props.width}} onMouseEnter={debounce(() => dispatch(focussedDepthUpdated({'focussedDepth': props.depth})), 50)}>
                {node.isValue ?
                    <ValueIcon emoji={node.valueIcon} nodeId={node.id} />
                    :
                    <input type="checkbox"
                        checked={node.completed}
                        onChange={(e) => dispatch(nodeCompleteUpdated({ id: node.id, completed: e.currentTarget.checked }))}
                    />}
                    <span>{node.displayedChildren}</span>
                <span>{node.label}</span>
            </div>
        </div>
    )
}