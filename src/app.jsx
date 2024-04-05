import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { createSurvey } from './survey/survey';
import { publishedSurvey } from './publishedSurvey/publishedSurvey';
import { Results } from './results/results';
import { About } from './about/about';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
    <BrowserRouter>
        <div className="bg-success" style={{ "--bs-bg-opacity": 0.5 }}>
            <header className="container-fluid">
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Group Voting</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="index.html">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="survey.html">Create Survey</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="publishedSurvey.html">Published Survey</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="results.html">Results</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="about.html">About</a>
                            </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className='text-center'>App components go here</main>

            <footer class="bg-light">
                <p>Created by Isaac Neuenschwander</p>
                <a href="https://github.com/isaacbn17/startup.git">My GitHub Repository</a>
            </footer>
        </div>
    </BrowserRouter>
    );
}