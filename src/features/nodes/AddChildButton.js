import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { nodeAdded } from './nodesSlice';

export function AddChildButton(props) {
    const dispatch = useDispatch()

    const addNode = () => {
        dispatch(nodeAdded({
            id: nanoid(),
            parents: [props.parent],
        }))
    }

    return (
        <div>
            <button onClick={addNode}>➕</button>
        </div>
    )
}