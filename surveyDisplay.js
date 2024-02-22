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