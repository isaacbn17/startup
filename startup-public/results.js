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
};

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
      displayMsg('system', 'game', 'connected');
    };
    socket.onclose = (event) => {
      displayMsg('system', 'game', 'disconnected');
    };
    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === GameEndEvent) {
        displayMsg('player', msg.from, `scored ${msg.value.score}`);
      } else if (msg.type === GameStartEvent) {
        displayMsg('player', msg.from, `started a new game`);
      }
    };
  }

  function displayMsg(cls, from, msg) {
    const notificationText = document.querySelector('#surveyNotifications');
    notificationText.innerHTML =
    `<div class="event"><p>${from} ${msg}</p></div>` + notificationText.innerHTML;
    //   `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + notificationText.innerHTML;
  }

  function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    socket.send(JSON.stringify(event));
  }