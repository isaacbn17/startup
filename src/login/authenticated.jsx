import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

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
            <Button onClick={() => navigate('/publishedSurvey')}>
                Published Survey
            </Button>
            <Button onClick={() => logout()}>
                Logout
            </Button>
        </div>
    );
}