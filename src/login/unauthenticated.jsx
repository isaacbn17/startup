import React from 'react';
import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState(null);

    async function loginUser() {
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
        if (response?.status === 200) {
          localStorage.setItem('userName', userName);
          props.onLogin(userName);
        } else {
          const errorMessage = await response.json();
          const errorMsgText = errorMessage.msg;
          setErrorMessage(errorMsgText);
        }
      }

    return (
    <>
        <div id="loginDisplay">
            <div className="row g-3 align-items-center">
                {/* <div className="col-auto">
                    <label for="inputemail" className="col-form-label">Email</label>
                </div> */}
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
                
                {/* <div className="col-auto">
                    <label for="userPassword" className="col-form-label">Password</label>
                </div> */}
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
                    <Button type="submit" id="login_button" className="btn btn-light" onClick={() => loginUser()}>Login</Button>
                </div>
                <div className="col-auto">
                    <Button type="submit" id="create_button" className="btn btn-light" onClick={() => signUp()}>Sign up</Button>
                </div>
            </div>
        </div>
        <div>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    </>
    );
}