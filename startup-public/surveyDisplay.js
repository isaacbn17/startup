document.addEventListener('DOMContentLoaded', async function getSurveyData() {
    let survey = {};

    try {
        const response = await fetch('/api/publishedSurvey');
        const surveys = await response.json();
        console.log(surveys);
        let lengthSurveys = surveys.length;
        // get most recent survey
        survey = surveys[lengthSurveys-1];
        console.log(survey)
    }
    catch (e) {
        console.log("It caught a problem.")
        console.error('Failed to print survey\n' + e)
        // survey = JSON.parse(localStorage.getItem('currentSurvey'));
    }

    if (survey) {
        displaySurvey(survey.question, survey.answers);
    }
    else {
        messageContainer = document.getElementById('no_survey');
        const message = document.createElement('h2');
        message.textContent = 'Your published survey will show up here!'
        messageContainer.appendChild(message);
    }
});

function displaySurvey(question, answers) {
    console.log(question)
    console.log(answers)
    console.log("You did it!")
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
    submit_button.addEventListener('click', () => {
        window.location.href = 'results.html';
    });

    survey_container.appendChild(answerlist);
    survey_container.appendChild(submit_button);
}