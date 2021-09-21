import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import styles from './Parents.module.css';

export function ParentArea(props) {
    return (
        <div className={styles.parentArea}>
            {props.parents.map(parent => 
                <div className={styles.parentIndicator} key={parent.id}></div>
            )}
            <div className={styles.parentIndicator}>➕</div>
        </div>
    )
}