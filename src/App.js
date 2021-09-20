import React from 'react';
import './App.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Tree } from './features/nodes/Tree';
import { MenuButtons } from './features/menu/MenuButtons';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                <p>Goal tracker</p>
                <MenuButtons />
                <Tree />
            </div>
        </DndProvider>
    );
}

export default App;
