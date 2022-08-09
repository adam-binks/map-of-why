import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './Node.module.css';
import { nodeAdded, nodeDeleted, nodeLabelUpdated } from './nodesSlice';

export function NodeLabel(props) {
    const dispatch = useDispatch()
    const { node } = props

    const keydownHandler = (event) => {
        // add sibling node on "enter"
        if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey) {
            dispatch(nodeAdded({
                id: nanoid(),
                parents: [node.parents[0]],
                insertAfter: node.id,
            }))
            event.preventDefault()
        }

        // add child node on "ctrl-enter"
        if (event.key === "Enter" && event.ctrlKey) {
            dispatch(nodeAdded({
                id: nanoid(),
                parents: [node.id],
            }))
            event.preventDefault()
        }

        // delete node on backspace (if empty and no children)
        if (event.key === "Backspace" && (!event.target.value || event.target.value === "") && node.displayedChildren.length === 0) {
            dispatch(nodeDeleted({
                id: node.id
            }))
            // TODO: would be nice to focus the previous sibling or parent if no siblings. not sure what the most react-y way to do this is
            event.preventDefault()
        }
    }
    
    return (
        <TextareaAutosize
            className={styles.nodeLabel}
            value={node.label}
            onKeyDown={keydownHandler}
            onChange={(e) => dispatch(nodeLabelUpdated({id: node.id, label: e.target.value}))}
            minRows={1}
            maxRows={5}
            autoFocus={true}
            placeholder={"Enter a " + (node.isValue ? "value" : "task") + "..."}
        />
    )
}