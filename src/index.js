import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Homepage from './features/homepage/Homepage';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/projects" element={<Outlet />}>
                        <Route path=":projectId" element={
                            <App />
                        } />
                    </Route>
                    <Route path="*"
                        element={
                            <main style={{ padding: "1rem", textAlign: "center" }}>
                                <h2>Error 404! <Link to="/">Go back</Link></h2>
                            </main>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
