document.addEventListener('DOMContentLoaded', async function () {
    const selectedAnswer = JSON.parse(localStorage.getItem('selectedAnswer'));

    try {
        let allSurveys = []
        // If there's an answer chosen, update the survey on MongoDB
        if (selectedAnswer) {
            localStorage.removeItem('selectedAnswer');
            updateCount(selectedAnswer);
            const response = await fetch('/api/results');
            allSurveys = await response.json()
        }
        else {
            console.log("No answer was given.");
            const response = await fetch('/api/results');
            allSurveys = await response.json()
        }
        displayResults(allSurveys);
    }
    catch (e) {
        console.error("It didn't quite work\n" + e)
    }
});

async function updateCount(answer) {
    console.log("Participant's answer: ")
    console.log(answer);
    // Change the count for the most recently published survey
    try {
        console.log('In try block')
        const response = await fetch('/api/results', {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ answer: answer }),
            
        });
    }
    catch (e) {
        console.error('Something went wrong\n' + e);
    }
    return 0;
};

function displayResults(surveyData) {
    const resultsContainer = document.getElementById('resultsContainer');

    surveyData.forEach(survey => {
        // console.log("This survey is: ");
        // console.log(survey.question);
        // console.log(survey.resultsCount);

        const tableRow = document.createElement('tr');

        const question = document.createElement('td');
        question.textContent = survey.question;
        tableRow.appendChild(question);
        
        survey.answers.forEach(answer => {
            const answerEl = document.createElement('td');
            answerEl.classList.add('resultAnswer');
            const answerStr = answer + ' - ' + survey.resultsCount[answer] + ' votes';
            answerEl.textContent = answerStr;
            tableRow.appendChild(answerEl);
        })
        resultsContainer.appendChild(tableRow);
    });
}