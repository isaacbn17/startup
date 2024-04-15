import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
        })
        .catch(() => {
            // If the logout fails.
        })
        .finally(() => {
            localStorage.removeItem('userName');
            props.onLogout();
        })
    }

    return (
        <div>
            <div className='playerName'>{props.userName}</div>
            <button className="btn btn-light" onClick={() => navigate('/Survey')}>
                Create Survey
            </button>
            <button className="btn btn-light" onClick={() => navigate('/publishedSurvey')}>
                Published Survey
            </button>
            <button className="btn btn-light" onClick={() => navigate('/results')}>
                Results
            </button>
            <button className="btn btn-light" onClick={() => logout()}>
                Logout
            </button>
        </div>
    );
}