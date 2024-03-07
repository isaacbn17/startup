document.addEventListener('DOMContentLoaded', async function () {
    const selectedAnswer = JSON.parse(localStorage.getItem('selectedAnswer'));

    try {
        const response = await fetch('/api/results');
        surveyData = await response.json();
        if (selectedAnswer) {
            [count, surveys] = updateCount(selectedAnswer, surveyData);
            console.log("The updated count is:");
            console.log(count)
            localStorage.removeItem('selectedAnswer');
            console.log('The surveys are: ')
            console.log(surveys)
            // try {
            //     const response = await fetch('/api/results', {
            //         method: 'POST',
            //         headers: {'content-type': 'application/json'},
            //         body: JSON.stringify(surveys)
            //     });

            //     const newSurveys = await response.json();
            //     console.log(newSurveys);
            // }
            // catch (e) {
            //     console.error('Something went wrong\n' + e);
            // }
        }
        else {
            console.log("We're at the else part...");
            count = surveyData[surveyData.length-1].resultsCount;
            console.log(count);
        }
        console.log(count);
        displayResults(surveyData, count);
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


// async function updateCount(answer) {
//     try {
//         const response = await fetch('/api/results')
//         surveyData = await response.json();
//         sLength = surveyData.length;
//         console.log(sLength);
//         console.log(surveyData[sLength-1].resultsCount);
//         // Change the count for the most recently published survey
//         surveyData[sLength-1].resultsCount[answer]++;
//         console.log("this order is weird")
//         console.log(surveyData[sLength-1].resultsCount);
//         return surveyData[sLength-1].resultsCount;
//     }
//     catch {
//         const resultsCount = JSON.parse(localStorage.getItem('resultsCount'));
//         resultsCount[answer] = (resultsCount[answer] + 1);
//         localStorage.setItem('resultsCount', JSON.stringify(resultsCount));
//         return resultsCount;
//     }
// };

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