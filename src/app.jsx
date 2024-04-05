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
                        <div className="navbar-brand">Group Voting</div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="index.html">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="survey.html">Create Survey</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="publishedSurvey.html">Published Survey</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="results.html">Results</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="about.html">About</NavLink>
                            </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/survey' element={<createSurvey />} />
                <Route path='/publishedSurvey' element={<publishedSurvey />}/>
                <Route path='/results' element={<Results />}/>
                <Route path='/about' element={<About />}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>

            <footer className="bg-light">
                <p>Created by Isaac Neuenschwander</p>
                <a href="https://github.com/isaacbn17/startup.git">My GitHub Repository</a>
            </footer>
        </div>
    </BrowserRouter>
    );
}

function NotFound() {
    return (
    <div className="bg-success" style={{ "--bs-bg-opacity": 0.5 }}> 
        <div className='container-fluid text-center'>404: Nice try, but that doesn't exist. Return to sender. Address unknown.</div>;
    </div>
    )
  } 