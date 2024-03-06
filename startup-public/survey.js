function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Unkown User';
    }

const userNameEl = document.querySelector('.user-email');
// console.log(userNameEl);
userNameEl.textContent = this.getPlayerName();   

async function publishSurvey(event) {
    event.preventDefault();
    const surveyQuestion = document.querySelector('#question').value;
    const answers = [];
    for (i=1; i<=4; i++) {
        const answer = document.getElementById(`answer${i}`).value;
        if (answer !== '') {
            answers.push(answer);
        }
    }
    const formData = {
        question: surveyQuestion,
        answers: answers
    };

    // Sets surveyData using backend
    try {
        const response = await fetch('/api/survey', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(formData),
        });

        // Store what the service gave us as the survey
        const surveyData = await response.json();
        localStorage.setItem('surveyData', JSON.stringify(surveyData));
    }
    catch {
        publishSurveyLocal(formData);
    }

    // Sets resultsCount using backend
    try {
        const response = await fetch
    }
    window.location.href = 'publishedSurvey.html';
};


function publishSurveyLocal (formData) {
    localStorage.setItem('currentSurvey', JSON.stringify(formData));
    let surveyData = JSON.parse(localStorage.getItem('surveyData'));
    if (surveyData !== null) {
        surveyData.push(formData);
    }
    else {
        surveyData = [];
        surveyData.push(formData);
    }
    localStorage.setItem('surveyData', JSON.stringify(surveyData));

    let results = JSON.parse(localStorage.getItem('resultsCount'));
    if (results !== null) {
        answers.forEach(answer => {
            results[answer] = 0;
        });
    }
    else {
        results = {};
        answers.forEach(answer => {
            results[answer] = 0;
        });
    }
    localStorage.setItem('resultsCount', JSON.stringify(results));
    window.location.href = 'publishedSurvey.html';
};