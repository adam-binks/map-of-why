import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useDrag, useDrop } from 'react-dnd';
import { nodeAdded, nodeDeleted, nodeCompleteUpdated, nodeIsValueUpdated, nodeReordered } from './nodesSlice';
import { ValueIcon } from './ValueIcon';
import { ItemTypes } from '../../DragItemTypes';
import { focussedDepthUpdated } from '../navigation/navigationSlice';
import { debounce } from './Tree';
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

            const parentsMatch = node.parents.length && item.parent === node.parents[0]
            if (dragIndex === hoverIndex && parentsMatch) {
                return
            }
            if (parentsMatch) {
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
            dispatch(nodeReordered({
                id: item.id,
                newParentId: newParentId,
                newIndex: hoverIndex
            }))
            item.index = hoverIndex
            item.parent = newParentId
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.NODE,
        item: () => {
            return {
                id: node.id,
                index: props.index,
                parent: node.parents.length ? node.parents[0] : null
            }
        },
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
        <div className={styles.nodeWrapper} style={{ 'zoom': props.zoom }}>
            <button className={styles.addNodeButton}
                onClick={addNode}>➕</button>
            <button className={styles.deleteNodeButton}
                onClick={() => dispatch(nodeDeleted({ id: node.id }))}>❌</button>
            <button className={styles.toggleValueButton}
                onClick={() => dispatch(nodeIsValueUpdated({ id: node.id, isValue: !node.isValue }))}>🔄</button>

            <div
                ref={ref} // drag this
                data-handler-id={handlerId} // dropzone
                className={styles.node + (isDragging ? " " + styles.isDragging : "")}
                style={{ 'width': props.width }}
                onMouseEnter={debounce(() => dispatch(focussedDepthUpdated({ 'focussedDepth': props.depth })), 50)}
            >
                {node.isValue ?
                    <ValueIcon emoji={node.valueIcon} nodeId={node.id} />
                    :
                    <input type="checkbox"
                        checked={node.completed}
                        onChange={(e) => dispatch(nodeCompleteUpdated({ id: node.id, completed: e.currentTarget.checked }))}
                    />}
                {/* <span>{node.displayedChildren}</span> */}
                <span>{node.label}</span>
            </div>
        </div>
    )
}