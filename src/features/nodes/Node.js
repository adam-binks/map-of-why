import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nodeAdded, nodeDeleted, nodeCompleteUpdated } from './nodesSlice';
import styles from './Node.module.css';
import { nanoid } from '@reduxjs/toolkit';
import 'emoji-mart/css/emoji-mart.css';
import { ValueIcon } from './ValueIcon';

export function Node(props) {
    const node = useSelector(state => state.nodes.find(node => node.id === props.id))
    const dispatch = useDispatch()

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
        <div className={styles.nodeWrapper}>
            <button className={styles.addNodeButton}
                onClick={addNode}>+</button>
            <button className={styles.deleteNodeButton}
                onClick={() => dispatch(nodeDeleted({ id: node.id }))}>X</button>

            <div className={styles.node}>
                {node.isValue ?
                    <ValueIcon emoji={node.valueIcon} nodeId={node.id} />
                    :
                    <input type="checkbox"
                        checked={node.completed}
                        onChange={(e) => dispatch(nodeCompleteUpdated({ id: node.id, completed: e.currentTarget.checked }))}
                    />}
                <span>{node.label}</span>
            </div>
        </div>
    )
}