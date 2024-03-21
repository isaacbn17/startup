document.addEventListener('DOMContentLoaded', async function () {
    const selectedAnswer = JSON.parse(localStorage.getItem('selectedAnswer'));

    try {
        let allSurveys = []
        // const response = await fetch('/api/results');
        // surveyData = await response.json();
        if (selectedAnswer) {
            [count, surveys] = updateCount(selectedAnswer);
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

async function updateCount(answer) {
    console.log("Participant's answer: ")
    console.log(answer);
    const response = await fetch('/api/publishedSurvey');
    const survey = await response.json();

    survey.resultsCount[answer]++;
    const surveyID = survey._id;
    // Change the count for the most recently published survey
    try {
        const response = await fetch('/api/results', {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(survey),
        });
        allSurveys = await response.json();
    }
    catch (e) {
        console.error('Something went wrong\n' + e);
    }
    // surveyData[surveys.length-1].resultsCount[answer]++;
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