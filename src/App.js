import React from 'react';
import './App.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Tree } from './features/nodes/Tree';
import { MenuButtons } from './features/menu/MenuButtons';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                <MenuButtons />
                <p>Goal tracker</p>
                <Tree />
                <ToastContainer 
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar
                />
            </div>
        </DndProvider>
    );
}

export default App;
