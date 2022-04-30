import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Homepage from './features/homepage/Homepage';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { HashRouter, Routes, Route, Link } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route exact path="/projects/:projectId" element={
                        <App />
                    } />
                    <Route path="*"
                        element={
                            <main style={{ padding: "1rem", textAlign: "center" }}>
                                <h2>Error 404! <Link to="/">Go back</Link></h2>
                            </main>
                        }
                    />
                </Routes>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
