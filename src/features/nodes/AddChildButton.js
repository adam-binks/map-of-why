import React, { useRef } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { nodeAdded } from './nodesSlice';
import { ItemTypes } from '../../DragItemTypes';
import { throttledReorderNode } from './Node';
import styles from './Tree.module.css';

export function AddChildButton(props) {
    const ref = useRef(null)
    const dispatch = useDispatch()

    const addNode = () => {
        dispatch(nodeAdded({
            id: nanoid(),
            parents: [props.parent],
        }))
    }

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

            if (!monitor.canDrop()) { return }

            throttledReorderNode(dispatch, item, props.parent, props.index)
        },
    })
    drop(ref)

    return (
        <div
            ref={ref}
            className={styles.addChildButton} 
            data-handler-id={handlerId} // drop zone
            style={{ 'zoom': props.zoom, 'width': props.width}}
        >
            <button className='pure-button' onClick={addNode}>➕</button>
        </div>
    )
}