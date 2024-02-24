document.addEventListener('DOMContentLoaded', function getResultsData() {
    const selectedAnswer = JSON.parse(localStorage.getItem('selectedAnswer'));
    const surveyData = JSON.parse(localStorage.getItem('surveyData'));
    if (selectedAnswer) {
        count = updateCount(selectedAnswer);
        displayResults(surveyData, count);
    }
});

function goToResults () {
    window.location.href = 'results.html';
}

function updateCount(answer) {
    console.log('Arrived at updateCount');
    const resultsCount = JSON.parse(localStorage.getItem('resultsCount'));
    resultsCount[answer] = (resultsCount[answer] + 1);
    localStorage.setItem('resultsCount', JSON.stringify(resultsCount));
    console.log(resultsCount);
    return resultsCount;
}

function displayResults(surveyData, count) {
    console.log("Yay! You're figuring this out!");
    console.log(surveyData.question);
    console.log(count);

    const resultsContainer = document.getElementById('resultsContainer');
    const tableRow = document.createElement('tr');

    const question = document.createElement('td');
    question.textContent = surveyData.question;
    console.log(question.textContent);
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