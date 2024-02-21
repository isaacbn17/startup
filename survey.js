function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Myster Player';
    }

const userNameEl = document.querySelector('.user-email');
console.log(userNameEl)
userNameEl.textContent = this.getPlayerName();   

function publishSurvey(event) {
    event.preventDefault();
    const surveyQuestion = document.querySelector('#question').value;
    //console.log(surveyQuestion)
    const answers = [];
    for (i=1; i<=4; i++) {
        const answer = document.getElementById(`answer${i}`).value;
        if (answer !== '') {
            answers.push(answer);
        }
    }
    //console.log(answers)
    const formData = {
        data: {
            question: surveyQuestion,
            answers: answers
        }
    };
    console.log(formData.data);
    console.log(JSON.parse(JSON.stringify(formData)).data);

    displaySurvey(surveyQuestion, answers)
}

function displaySurvey(question, answers) {
    window.location.href = 'publishedSurvey.html';
    survey_container = document.getElementById('survey_container');

    const questionElement = document.createElement('h2');
    questionElement.textContent = question;
    survey_container.appendChild(questionElement);

    const answerlist = document.createElement('ul');
    answers.forEach(answer => {
        const answerElement = document.createElement('li');
        const text = document.createElement('span');
        text.textContent = answer;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        answerElement.appendChild(text);
        answerElement.appendChild(checkbox);
        answerlist.appendChild(answerElement);
    });
    survey_container.appendChild(answerlist);

}
