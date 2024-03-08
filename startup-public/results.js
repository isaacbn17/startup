document.addEventListener('DOMContentLoaded', async function () {
    const selectedAnswer = JSON.parse(localStorage.getItem('selectedAnswer'));

    try {
        let allSurveys = []
        const response = await fetch('/api/results');
        surveyData = await response.json();
        if (selectedAnswer) {
            [count, surveys] = updateCount(selectedAnswer, surveyData);
            console.log("The updated count is:");
            console.log(count)
            localStorage.removeItem('selectedAnswer');
            console.log('The surveys are: ')
            console.log(surveys)
            try {
                const response = await fetch('/api/results', {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(surveys),
                });
                allSurveys = await response.json();
            }
            catch (e) {
                console.error('Something went wrong\n' + e);
            }
        }
        else {
            console.log("No answer was given.");
            allSurveys = surveyData;
        }
        displayResults(allSurveys);
    }
    catch (e) {
        console.error("It didn't quite work\n" + e)
        // const surveyData = JSON.parse(localStorage.getItem('surveyData'));
    }

});

function updateCount(answer, surveys) {
    console.log("Participant's answer: ")
    console.log(answer);
    // Change the count for the most recently published survey
    surveyData[surveys.length-1].resultsCount[answer]++;
    return [surveyData[surveys.length-1].resultsCount, surveyData];
};

function displayResults(surveyData) {
    const resultsContainer = document.getElementById('resultsContainer');

    surveyData.forEach(survey => {
        console.log("This survey is: ");
        console.log(survey.question);
        console.log(survey.resultsCount);

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