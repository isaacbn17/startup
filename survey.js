function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Myster Player';
    }

const userNameEl = document.querySelector('.user-email');
console.log(userNameEl)
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
    const formData = {
        question: surveyQuestion,
        answers: answers
    };
    console.log(formData.question);
    console.log(formData.answers)
    console.log(JSON.stringify(formData.question));
    console.log(JSON.stringify(formData.answers));
    localStorage.setItem('surveyData', JSON.stringify(formData));

    const results = {}
    answers.forEach(answer => {
        results[answer] = 0;
    });
    localStorage.setItem('resultsCount', JSON.stringify(results));

    window.location.href = 'publishedSurvey.html';
}