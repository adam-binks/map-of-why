import React from 'react';
import { useSelector } from 'react-redux';
import {} from './nodesSlice';
import styles from './Tree.module.css';
import { Node } from './Node';

export function Tree() {
    const nodes = useSelector(state => state.nodes)

    const getChildrenList = (parent_node) => {
        console.log('recurse with node ' + parent_node);
        const children = nodes.filter(node => parent_node ? node.parents.includes(parent_node.id) : !node.parents || !node.parents.length)
        if (!children || children.length === 0) {
            console.log('no koids');
            return
        } else {
            console.log(children);
        }

        const list_elements = children.map(child => {
            const grandchildren = getChildrenList(child)
            return (<li>
                <Node id={child.id} />
                {grandchildren}
            </li>)
        })

        return <ul className={!parent_node ? styles.tree : ""}>{list_elements}</ul>
    }

    return (
        <div className={styles.treeContainer}>
            {getChildrenList()}
        </div>
    )
}