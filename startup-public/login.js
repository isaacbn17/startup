(async () => {
    const email = localStorage.getItem('userName');
    console.log(email);
    if (email) {
        document.querySelector('#userName').textContent = `User: ${email}`;
        setDisplay('loginDisplay', 'none');
        setDisplay('surveyDisplay', 'block');
    } else {
        setDisplay('loginDisplay', 'block');
        setDisplay('surveyDisplay', 'none');
    }
})();

function setDisplay(controlID, display) {
    const controlEl = document.querySelector(`#${controlID}`);
    if (controlEl) {
        controlEl.style.display = display;
    }
}

async function login() {
    console.log('Arrived at login function')
    const email = document.querySelector('#inputemail').value;
    const password = document.querySelector('#userPassword').value;
    const response = await fetch(`api/auth/login`, {
        method: 'post',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        console.log("Response was ok")
        localStorage.setItem('userName', email);
        window.location.href = 'survey.html';
    }
    else {
        console.log("Response was not ok")
        const response = await fetch(`api/auth/create`, {
            method: 'post',
            body: JSON.stringify({ email: email, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
}

async function logout() {
    localStorage.removeItem('userName');
    fetch(`api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}

function goToSurvey() {
    window.location.href = 'survey.html';
}

function goToPublishedSurvey() {
    window.location.href = 'publishedSurvey.html';
}