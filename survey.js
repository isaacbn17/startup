function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Myster Player';
    }

const userNameEl = document.querySelector('.user-email');
console.log(userNameEl)
userNameEl.textContent = this.getPlayerName();    

// const surveyQuestion = document.querySelector('#question');
// localStorage.setItem('question', surveyQuestion.value);
// const answerOne = document.querySelector('#answer1')
// localStorage.setItem('answer1', answerOne.value);
// const answerTwo = document.querySelector('#answer2');
// localStorage.setItem('answer2', answerTwo);
// const answerThree = document.querySelector('#answer3');
// localStorage.setItem('answer3', answerThree);
// const answerFour = document.querySelector('#answer4');
// localStorage.setItem('answer4', answerFour);

function publishSurvey() {
    const surveyQuestion = document.querySelector('#question');
    const answers = [];
    for (i=1; i<=4; i++) {
        const answer = document.getElementById(`answer${i}`)
        if (answer !== '') {
            answers.push(answer);
        }
    }
    displaySurvey(surveyQuestion, answers)
}

function displaySurvey(question, answers) {
    survey_container = document.getElementById('survey_container');
    survey_container.innerHTML = '';

    const questionElement = document.createElement('h2');
    questionElement.textContent = question;
    survey_container.appendChild(questionElement);

    const answerlist = document.createElement('ul');
    answers.forEach(answer => {
        const answerElement = document.createElement('li');
        answerElement.textContent = answer;
        answerlist.appendChild(answerElement);
        }
    );
    survey_container.appendChild(answerlist);
}