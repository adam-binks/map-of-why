import React from 'react';
import GitHubButton from 'react-github-btn';
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
                <h1>Goal tracker</h1>
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
                <p>I would love your feedback - <a href="https://twitter.com/adambinks_">DM me on Twitter</a>.</p>
                <GitHubButton href="https://github.com/adam-binks/goal-tracker" data-size="large" data-show-count="true" 
                    aria-label="Star adam-binks/goal-tracker on GitHub">Star</GitHubButton>

                <h2>How to use it</h2>
                <p>Play around and see what works for you!</p>
                <p>✅ Things like "climb a tree" are tasks, with a checkbox.</p>
                <p>💪 Things like "stay fit" are <i>values</i>. Turn a task into a value by clicking 🔄.</p>
                <p>One recipe for how to use this tool:</p>
                <ol>
                    <li>List the things you value intrinsically</li>
                    <li>Then your add big projects or values that contribute to each intrinsic value, branching off them in the tree</li>
                    <li>Keep adding more subgoals branching off, all the way down to today's to-do list</li>
                </ol>
                <p>Not sure what you value intrinsically? Try <a href="https://programs.clearerthinking.org/intrinsic_values_test.html">this test</a>. Or
                    go for a long walk on the beach.</p>
            </div>
        </>
    )
}