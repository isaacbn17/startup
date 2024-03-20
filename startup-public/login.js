async function login () {
    const emailEl = document.querySelector('#inputemail').value;
    const password = document.querySelector('#userPassword').value;
    const response = await fetch(`api/auth/login`, {
        method: 'post',
        body: JSON.stringify({ email: emailEl, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    // localStorage.setItem('userName', emailEl.value);
    // window.location.href = 'survey.html';
}