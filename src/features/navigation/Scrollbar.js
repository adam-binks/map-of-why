import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMaxDepth } from '../nodes/nodesSlice';
import { focussedDepthUpdated } from './navigationSlice';
import styles from './Scrollbar.module.css';

// Not currently used, maybe useful for debugging

export function Scrollbar() {
    const dispatch = useDispatch()

    const focussedDepth = useSelector(state => state.navigation.focussedDepth)
    const maxDepth = useSelector(selectMaxDepth)

    return (
        <>
            <p>depth {maxDepth}</p>
            <input type="range" min="0" max={maxDepth} className={styles.scollbar} value={focussedDepth} id="scrollbar"
                onChange={(e) => dispatch(focussedDepthUpdated({focussedDepth: e.target.value}))} />
        </>
    )
}