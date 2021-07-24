import React from 'react';
import { useSelector } from 'react-redux';
import {} from './nodesSlice';
import styles from './Node.module.css';

export function Node(props) {
    const node = useSelector(state => state.nodes.find(node => node.id === props.id))

    if (!node) {
        return (
            <div className={styles.node}>
                <p>Error: no node with ID '{props.id}'</p>
            </div>
        )
    }

    return (
        <div className={styles.node}>
            <input type="checkbox" />
            <p>{node.label}</p>
        </div>
    )
}