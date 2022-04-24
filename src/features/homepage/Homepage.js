import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createFirebaseProject } from '../../app/firebase';
import { getDefaultState } from '../nodes/nodesSlice';
import styles from './homepage.module.css';

export default function Homepage() {
    const navigate = useNavigate()

    const existingProjectId = localStorage.getItem("lastCreatedProject")

    return (
        <>
            <div className={styles.content}>
                <h1>Goal tracker</h1>
                <p>Visualise how your daily to-do list contributes to your ultimate life goals.</p>
                {existingProjectId ? 
                    <button onClick={() => {navigate("/projects/" + existingProjectId)}}>Continue</button>
                :
                    <button onClick={() => {
                        createFirebaseProject(getDefaultState()).then((docRef) => {
                            if (docRef) {
                                navigate("/projects/" + docRef.id)
                            } else {
                                toast("Oops! Couldn't create project", { type: "error" })
                            }
                        })
                    }}>
                        Get started
                    </button>
                }
                <p>This is an early version, it's not feature complete. If you have feedback, <a href="https://twitter.com/adambinks_">DM me on Twitter</a>.</p>
                <p>How to use it: play around and see what works for you.</p>
                <p>I recommend starting by inputting things you value intrinsically on the left,
                    then your big goals or values that contribute to those, then the subgoals, working all the way down to today's to-do list.</p>
            </div>
        </>
    )
}