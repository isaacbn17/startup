function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Myster Player';
    }

const userNameEl = document.querySelector('.user-email');
// console.log(userNameEl);
userNameEl.textContent = this.getPlayerName();   

function publishSurvey(event) {
    event.preventDefault();
    const surveyQuestion = document.querySelector('#question').value;
    const answers = [];
    for (i=1; i<=4; i++) {
        const answer = document.getElementById(`answer${i}`).value;
        if (answer !== '') {
            answers.push(answer);
        }
    }

    // Sets surveyData
    const formData = {
        question: surveyQuestion,
        answers: answers
    };
    // console.log(formData.question);
    // console.log(formData.answers);
    // console.log(JSON.stringify(formData.question));
    // console.log(JSON.stringify(formData.answers));
    let surveyData = JSON.parse(localStorage.getItem('surveyData'));
    console.log(surveyData);
    if (surveyData !== null) {
        surveyData.push(formData);
    }
    else {
        surveyData = [];
        console.log('Made a surveyData list.');
        surveyData.push(formData);
        console.log(surveyData);
    }
    console.log(surveyData);
    localStorage.setItem('surveyData', JSON.stringify(surveyData));

    const results = {};
    answers.forEach(answer => {
        results[answer] = 0;
    });
    localStorage.setItem('resultsCount', JSON.stringify(results));
    // console.log(localStorage.getItem('resultsCount'));

    window.location.href = 'publishedSurvey.html';
}