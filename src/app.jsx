import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { CreateSurvey } from './survey/survey';
import { PublishedSurvey } from './publishedSurvey/publishedSurvey';
import { Results } from './results/results';
import { About } from './about/about';
import { AuthState} from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        
    <BrowserRouter>
        <div /*className="bg-success" style={{ "--bs-bg-opacity": 0.5 }}*/ >
            <header className="container-fluid bg-success" style={{ "--bs-bg-opacity": 0.5}}>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <div className="navbar-brand">Group Voting</div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="">Login</NavLink>
                            </li>
                            {authState === AuthState.Authenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="survey">Create Survey</NavLink>
                            </li>
                            )}
                            {authState === AuthState.Authenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="publishedSurvey">Published Survey</NavLink>
                            </li>
                            )}
                            {authState === AuthState.Authenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="results">Results</NavLink>
                            </li>
                            )}
                            <li className="nav-item">
                                <NavLink className="nav-link" to="about">About</NavLink>
                            </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="bg-success" style={{ "--bs-bg-opacity": 0.5, minHeight: 'calc(100vh - 56px)' }}>
            <Routes>
                <Route path='/' element={
                    <Login 
                        userName={userName}
                        authState={authState}
                        onAuthChange={(userName, authState) => {
                            setAuthState(authState);
                            setUserName(userName);
                        }}
                        />}
                        exact />
                <Route path='/survey' element={<CreateSurvey userName={userName} />} />
                <Route path='/publishedSurvey' element={<PublishedSurvey />}/>
                <Route path='/results' element={<Results />}/>
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />}/>
            </Routes>
            </main>

            <footer className="container-fluid bg-light">
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
        <div className='container-fluid text-center'>404: Return to sender. Address unknown.</div>;
    </div>
    )
  } 