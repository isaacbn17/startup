(async () => {
    const email = localStorage.getItem('userName');
    if (email) {
        document.querySelector('#userName').textContent = email;
        setDisplay('loginDisplay', 'none');
        setDisplay('surveyDisplay', 'block');
    } else {
        setDisplay('loginDisplay', 'block');
        setDisplay('surveyDisplay', 'none');
    }
})();

async function login () {
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
        localStorage.setItem('userName', email.value);
        window.location.href = 'survey.html';
    }
    else {
        const response = await fetch(`api/auth/create`, {
            method: 'post',
            body: JSON.stringify({ email: email, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
}

function goToSurvey() {
    window.location.href = 'survey.html';
}

function setDisplay(controlID, display) {
    const controlEl = document.querySelector(`#${controlID}`);
    if (controlEl) {
        controlEl.style.display = display;
    }
}