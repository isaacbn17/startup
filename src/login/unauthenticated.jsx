import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState(null);
    const navigate = useNavigate();

    async function loginUser() {
        console.log("You're in loginUser");
        console.log(userName);
        console.log(password);
        loginOrCreate(`/api/auth/login`);
      }
    
      async function signUp() {
        loginOrCreate(`/api/auth/create`);
      }
    
      async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
          method: 'post',
          body: JSON.stringify({email: userName, password: password}),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        if (response.ok) {
          localStorage.setItem('userName', userName);
          props.onLogin(userName);
          navigate('/publishedSurvey')
        } else {
          console.log("Uh oh");
          const errorMessage = await response.json();
          const errorMsgText = errorMessage.msg;
          setErrorMessage(errorMsgText);
        }
      }

    return (
    <>
        <div id="loginDisplay">
            <div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label htmlFor="inputemail" className="col-form-label">Email</label>
                </div>
                <div className="col-auto">
                    <input
                    className="form-control"
                    type="email"
                    id="inputemail"
                    placeholder="example@email.com"
                    required pattern=".*@.*"
                    aria-describedby="passwordHelpInline"
                    onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                
                <div className="col-auto">
                    <label htmlFor="userPassword" className="col-form-label">Password</label>
                </div>
                <div className="col-auto">
                    <input
                    className="form-control"
                    type="password"
                    id="userPassword"
                    placeholder="Password"
                    aria-describedby="passwordHelpInline"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" id="login_button" className="btn btn-light" onClick={() => loginUser()}>Login</button>
                </div>
                <div className="col-auto">
                    <button type="submit" id="create_button" className="btn btn-light" onClick={() => signUp()}>Sign up</button>
                </div>
            </div>
        </div>
        <div>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    </>
    );
}