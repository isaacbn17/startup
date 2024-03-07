// async function loadResults() {
//     let results = [];
//     try {
//         const response = await fetch('/api/results');
//         results = await response.json();

//         localStorage.setItem('surveyResults');
//     } catch {
//         const surveyResultsText = localStorage.getItem('surveyResults');
//         if (surveyDataText) {
//             results = JSON.parse(surveyDataText);
//         }
//     }
//     displayResults(results);
// }

// loadResults();

document.addEventListener('DOMContentLoaded', async function () {
    const selectedAnswer = JSON.parse(localStorage.getItem('selectedAnswer'));
    try {
        const response = await fetch('/api/results')
        surveyData = await response.json();
    }
    catch {
        const surveyData = JSON.parse(localStorage.getItem('surveyData'));
    }
    if (selectedAnswer) {
        count = updateCount(selectedAnswer);
        localStorage.removeItem('selectedAnswer');
        displayResults(surveyData, count);
    }
    else {
        count = JSON.parse(localStorage.getItem('resultsCount'));
        displayResults(surveyData, count);
    }
});

async function updateCount(answer) {
    try {
        const response = await fetch('/api/results')
        surveyData = await response.json();
        surveyData.resultsCount[answer] = (surveyData.resultsCount[answer] + 1);
        return surveyData.resultsCount;
    }
    catch {
        const resultsCount = JSON.parse(localStorage.getItem('resultsCount'));
        resultsCount[answer] = (resultsCount[answer] + 1);
        localStorage.setItem('resultsCount', JSON.stringify(resultsCount));
        return resultsCount;
    }
};

function displayResults(surveyData, count) {
    const resultsContainer = document.getElementById('resultsContainer');

    surveyData.forEach(survey => {
        const tableRow = document.createElement('tr');

        const question = document.createElement('td');
        question.textContent = survey.question;
        tableRow.appendChild(question);
        
        survey.answers.forEach(answer => {
            const answerEl = document.createElement('td');
            answerEl.classList.add('resultAnswer');
            const answerStr = answer + ' - ' + count[answer] + ' votes';
            answerEl.textContent = answerStr;
            tableRow.appendChild(answerEl);
        })
        resultsContainer.appendChild(tableRow);
    });
}