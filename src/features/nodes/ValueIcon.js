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
        <button className={'pure-button ' + styles.valueIcon} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>{props.emoji}</button>

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
                    showSkinTones={false} 
                    recent={['star', 'muscle', 'heart', 'rainbow', 'hugging_face', 'person_climbing', 'family', 'money_with_wings',
                            'sunglasses', 'brain', 'books', 'smile', 'scales', 'small_airplane', 'seedling', 'sleeping', 'dart', 'art']}
                />
            </div>

        }
    </>)
}