import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Tree } from './features/nodes/Tree';
import './App.css';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                <p>Goal tracker</p>
                <Tree />
            </div>
        </DndProvider>
    );
}

export default App;
