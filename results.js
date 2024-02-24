document.addEventListener('DOMContentLoaded', function () {
    const selectedAnswer = JSON.parse(localStorage.getItem('selectedAnswer'));
    const surveyData = JSON.parse(localStorage.getItem('surveyData'));
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

function updateCount(answer) {
    console.log('Arrived at updateCount');
    const resultsCount = JSON.parse(localStorage.getItem('resultsCount'));
    console.log("Results count: ")
    console.log(resultsCount);
    resultsCount[answer] = (resultsCount[answer] + 1);
    localStorage.setItem('resultsCount', JSON.stringify(resultsCount));
    console.log("Results count updated: ")
    console.log(resultsCount);
    return resultsCount;
}

function displayResults(surveyData, count) {
    const resultsContainer = document.getElementById('resultsContainer');
    const tableRow = document.createElement('tr');

    const question = document.createElement('td');
    question.textContent = surveyData.question;
    tableRow.appendChild(question);
    
    // surveyData.answers.forEach(answer => {
    //     const answerEl = document.createElement('td');
    //     answerEl.classList.add('resultAnswer');
    //     answerEl.textContent = answer;

    //     tableRow.appendChild(answerEl);
    // })

    for (const key in count) {
        const ansEl = document.createElement('td');
        const answerStr = key + ' - ' + count[key] + ' votes';
        ansEl.textContent = answerStr;
        tableRow.appendChild(ansEl);
    };

    resultsContainer.appendChild(tableRow);

}


// function displaySurvey(question, answers) {
//     survey_container = document.getElementById('survey_container');
//     survey_container.innerHTML = '';

//     const questionElement = document.createElement('h2');
//     questionElement.textContent = question;
//     survey_container.appendChild(questionElement);

//     const answerlist = document.createElement('ul');
//     answerlist.classList.add('answerPublished')
//     answers.forEach(answer => {
//         const answerElement = document.createElement('li');
//         answerElement.classList.add('answerEl')

//         const button = document.createElement('input');
//         button.type = 'radio';
//         button.classList.add('radioButton');
//         button.name = 'radioButton';
//         answerElement.appendChild(button);

//         const text = document.createElement('span');
//         text.textContent = answer;
//         text.classList.add('answerText');
//         answerElement.appendChild(text);

//         answerlist.appendChild(answerElement);

//         button.addEventListener('click', function saveAnswer() {
//             localStorage.setItem('selectedAnswer', JSON.stringify(text.textContent))
//         })
//     });