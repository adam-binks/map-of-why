import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useDrag, useDrop } from 'react-dnd';
import TextareaAutosize from 'react-textarea-autosize';
import { throttle } from 'lodash';
import { nodeAdded, nodeDeleted, nodeCompleteUpdated, nodeIsValueUpdated, nodeReordered, nodeLabelUpdated } from './nodesSlice';
import { ValueIcon } from './ValueIcon';
import { ItemTypes } from '../../DragItemTypes';
import { focussedDepthUpdated } from '../navigation/navigationSlice';
import styles from './Node.module.css';
import 'emoji-mart/css/emoji-mart.css';

export function Node(props) {
    const ref = useRef(null)
    const dispatch = useDispatch()
    const node = useSelector(state => state.nodes.find(node => node.id === props.id))

    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.NODE,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = props.index

            if (dragIndex === hoverIndex && (item.newParent ? item.newParent === node.parents[0] : item.parent === node.parents[0])) {
                return
            }
            if (item.parent === node.parents[0]) {
                const hoverBoundingRect = ref.current?.getBoundingClientRect()
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
                const clientOffset = monitor.getClientOffset()
                const hoverClientY = clientOffset.y - hoverBoundingRect.top
                // Only perform the move when the mouse has crossed half of the items height
                // When dragging downwards, only move when the cursor is below 50%
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return
                }
                // When dragging upwards, only move when the cursor is above 50%
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return
                }
            }
            const newParentId = node.parents.length ? node.parents[0] : null

            if (!monitor.canDrop()) { return } // in case the drop target no longer exists

            // throttle it to reduce dancing as layout shifts
            throttledReorderNode(dispatch, item, newParentId, hoverIndex)
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.NODE,
        item: () => {
            return {
                id: node.id,
                index: props.index,
                parent: node.parents.length ? node.parents[0] : null,
            }
        },
        isDragging: (monitor) => node.id === monitor.getItem().id,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

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

    drag(drop(ref))
    return (
        <div 
            className={styles.nodeWrapper + (isDragging ? " " + styles.isDragging : "")}
            style={{ 'zoom': props.zoom}}
        >
            <button className={styles.addNodeButton}
                onClick={addNode}>➕</button>
            <button className={styles.deleteNodeButton}
                onClick={() => dispatch(nodeDeleted({ id: node.id }))}>❌</button>
            <button className={styles.toggleValueButton}
                onClick={() => dispatch(nodeIsValueUpdated({ id: node.id, isValue: !node.isValue }))}>🔄</button>

            <div
                ref={ref} // drag this
                data-handler-id={handlerId} // dropzone
                className={styles.node}
                style={{ 'width': props.width }}
                onMouseEnter={throttle(() => dispatch(focussedDepthUpdated({ 'focussedDepth': props.depth })), 50)}
            >
                {node.isValue ?
                    <ValueIcon emoji={node.valueIcon} nodeId={node.id} />
                    :
                    <input type="checkbox"
                        checked={node.completed}
                        onChange={(e) => dispatch(nodeCompleteUpdated({ id: node.id, completed: e.currentTarget.checked }))}
                    />}
                {/* <p>col:{node.valueColour}</p> */}
                <TextareaAutosize
                    className={styles.nodeLabel}
                    value={node.label}
                    onChange={(e) => dispatch(nodeLabelUpdated({id: node.id, label: e.target.value}))}
                    minRows={1}
                    maxRows={5}
                />
            </div>
        </div>
    )
}


const throttledReorderNode = throttle((dispatch, item, newParentId, hoverIndex) => {
    dispatch(nodeReordered({
        id: item.id,
        newParentId: newParentId,
        newIndex: hoverIndex
    }))
    item.index = hoverIndex
    item.newParent = newParentId
}, 500)