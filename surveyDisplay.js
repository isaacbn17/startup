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
        const button = document.createElement('input');
        button.type = 'radio';

        answerElement.appendChild(text);
        answerElement.appendChild(button);
        answerlist.appendChild(answerElement);
    });
    
    const submit_button = document.createElement('input')
    submit_button.type = 'submit'
    survey_container.appendChild(answerlist);
    survey_container.appendChild(submit_button);
}