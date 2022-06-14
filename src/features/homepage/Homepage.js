import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createFirebaseProject } from '../../app/firebase';
import { getDefaultState } from '../nodes/nodesSlice';
import styles from './homepage.module.css';

export default function Homepage() {
    const navigate = useNavigate()

    const existingProjectId = localStorage.getItem("lastCreatedProject")

    const createProject = () => {
        createFirebaseProject(getDefaultState()).then((docRef) => {
            if (docRef) {
                navigate("/projects/" + docRef.id)
            } else {
                toast.error("Oops! Couldn't create project")
            }
        })
    }

    return (
        <>
            <div className={styles.content}>
                <h1>Map of Why</h1>
                <p>Visualise how your daily to-do list contributes to your ultimate life goals.</p>
                {existingProjectId ?
                    <>
                        <button className={`pure-button dark-button ${styles.homepageButtonPrimary}`} onClick={() => { navigate("/projects/" + existingProjectId) }}>
                            Continue
                        </button>
                        <br/>
                        <button className={`pure-button dark-button ${styles.homepageButtonSecondary}`} onClick={() => { createProject() }}>Start a new map</button>
                    </>
                    :
                    <button className={`pure-button dark-button ${styles.homepageButtonPrimary}`} onClick={createProject}>
                        Get started
                    </button>
                }
                <p>This is an early version, it's not feature complete. For now, use it on desktop, not mobile.</p>
                <p>No need to log in. To find your map in the future, bookmark your unique map URL which is generated when you get started.</p>
                <p>I would love your feedback - <a href="https://twitter.com/adambinks_">message me on Twitter</a>.</p>
                <p>The <a href="https://github.com/adam-binks/goal-tracker">code is on GitHub</a>.</p>

                <h2>How to use it</h2>
                <p>Play around and see what works for you!</p>
                <p>✅ Things like "climb a tree" are tasks, with a checkbox.</p>
                <p>💪 Things like "be healthy" are <i>values</i>. Turn a task into a value by clicking 🔄.</p>
                <p>One recipe for how to use this tool:</p>
                <ol>
                    <li>List the things you value intrinsically</li>
                    <li>Then your add big projects or values that contribute to each intrinsic value, branching off them in the tree</li>
                    <li>Keep adding more subgoals branching off, all the way down to today's to-do list</li>
                </ol>
                <p>Not sure what you value intrinsically? Try <a href="https://programs.clearerthinking.org/intrinsic_values_test.html">this test</a>. Or
                    go for a long walk on the beach.</p>
                <p style={{textAlign: "center", color: 'grey', fontSize: "150%"}}>Made by <a href="https://adambinks.me">Adam Binks</a>.</p>
            </div>
        </>
    )
}