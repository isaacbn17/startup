const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

socket.onopen = (event) => {
  displayMsg('system', 'Websocket', 'connected');
  myLittleFriendHere();
};
socket.onclose = (event) => {
  displayMsg('system', 'Websocket', 'disconnected');
};
socket.onmessage = async (event) => {
  //const msg = JSON.parse(await event.data.text());
  const data = JSON.parse(await event.data.text());
  console.log(data);
  const response = await fetch('/api/results');
  allSurveys = await response.json()
  displayResults(allSurveys);
  displayMsg('user', data.name, `voted ${data.answer}`);
};


function displayMsg(cls, from, msg) {
  const notificationText = document.querySelector('#surveyNotifications');
  notificationText.innerHTML = `<div class="event"><p class=${cls}>${from} ${msg}</p></div>` + notificationText.innerHTML;
}

//document.addEventListener('DOMContentLoaded', async function () {
async function myLittleFriendHere() {
    const selectedAnswer = JSON.parse(localStorage.getItem('selectedAnswer'));

    try {
        let allSurveys = []
        // If there's an answer chosen, update the survey on MongoDB
        if (selectedAnswer) {
          const userVote = localStorage.getItem('vote');
          socket.send(userVote);
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
}
//});

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
    resultsContainer.textContent = "";

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
};