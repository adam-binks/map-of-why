import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { valueIconUpdated } from './nodesSlice';
import styles from './Node.module.css';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

export function ValueIcon(props) {
    const dispatch = useDispatch()
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    return (<>
        <button className={styles.valueIcon} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>{props.emoji}</button>

        {
            showEmojiPicker && <div className={styles.emojiPicker}>
                <Picker
                    onSelect={(emoji) => {
                        dispatch(valueIconUpdated({
                            id: props.nodeId,
                            icon: emoji.native,
                        }))
                        setShowEmojiPicker(false)
                    }}
                    set="google"
                    showPreview={false}
                    showSkinTones={false} />
            </div>

        }
    </>)
}