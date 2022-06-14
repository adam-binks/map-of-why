import React, { useEffect } from 'react';
import './App.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Tree } from './features/nodes/Tree';
import { MenuButtons } from './features/menu/MenuButtons';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getFirebaseProjectThunk } from './features/nodes/nodesSlice';
import { Link, Outlet, useParams } from 'react-router-dom';
import { activeProjectUpdated } from './features/navigation/navigationSlice';

function App() {
    const dispatch = useDispatch()
    const params = useParams()
    useEffect(() => {
        dispatch(getFirebaseProjectThunk(params.projectId))
        dispatch(activeProjectUpdated({activeProject: params.projectId}))
        localStorage.setItem("lastCreatedProject", params.projectId)
    })

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className="App">
                    <MenuButtons />
                    <h1><Link style={{textDecoration: 'none'}} to={"/"}>Map of Why</Link></h1>
                    <Tree />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar
                    />
                </div>
            </DndProvider>
            <Outlet />
        </>
    )
}

export default App
