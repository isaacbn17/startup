document.addEventListener('DOMContentLoaded', function getSurveyData() {
    const surveyData = JSON.parse(localStorage.getItem('surveyData'));
    if (surveyData) {
        displaySurvey(surveyData.question, surveyData.answers);
    }
});

function displaySurvey(question, answers) {
    survey_container = document.getElementById('survey_container');
    survey_container.innerHTML = '';

    const questionElement = document.createElement('h2');
    questionElement.textContent = question;
    survey_container.appendChild(questionElement);

    const answerlist = document.createElement('ul');
    answerlist.classList.add('answerPublished')
    answers.forEach(answer => {
        const answerElement = document.createElement('li');
        answerElement.classList.add('answerEl')

        const button = document.createElement('input');
        button.type = 'radio';
        button.classList.add('radioButton');
        button.name = 'radioButton';
        answerElement.appendChild(button);

        const text = document.createElement('span');
        text.textContent = answer;
        text.classList.add('answerText');
        answerElement.appendChild(text);

        answerlist.appendChild(answerElement);

        button.addEventListener('click', function saveAnswer() {
            localStorage.setItem('selectedAnswer', JSON.stringify(text.textContent))
        })
    });

    const submit_button = document.createElement('button');
    submit_button.classList.add('btn', 'btn-light');
    submit_button.type = 'submit';
    submit_button.textContent = 'Submit';
    submit_button.addEventListener('click', goToResults);

    survey_container.appendChild(answerlist);
    survey_container.appendChild(submit_button);
}