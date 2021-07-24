import React from 'react';
import { useSelector } from 'react-redux';
import {} from './nodesSlice';
import styles from './Tree.module.css';
import { Node } from './Node';

export function Tree() {
    const nodes = useSelector(state => state.nodes)

    const getChildrenList = (parent_node) => {
        const children = nodes.filter(node => parent_node ? node.parents.includes(parent_node.id) : !node.parents || !node.parents.length)
        if (!children || children.length === 0) {
            return
        }

        const list_elements = children.map(child => {
            const grandchildren = getChildrenList(child)
            return (<li className={styles.treeElement} key={child.id}>
                <Node key={child.id} id={child.id} />
                {grandchildren}
            </li>)
        })

        return <ul className={styles.treeElement + (!parent_node ? " " + styles.tree : "")}>{list_elements}</ul>
    }

    return (
        <div className={styles.treeContainer}>
            {getChildrenList()}
        </div>
    )
}