import React from 'react';

export function CreateSurvey( {userName} ) {
    // function getPlayerName() {
    //     return localStorage.getItem('userName') ?? 'Unkown User';
    //     }
    
    // const userNameEl = document.querySelector('.user-email');
    // userNameEl.textContent = this.getPlayerName();   
    
    async function publishSurvey() {
        // event.preventDefault();
        const surveyQuestion = document.querySelector('#question').value;
        const answers = [];
        for (i=1; i<=4; i++) {
            const answer = document.getElementById(`answer${i}`).value;
            if (answer !== '') {
                answers.push(answer);
            }
        }
    
        const results = {};
        answers.forEach(answer => {
            results[answer] = 0;
        });
    
        const formData = {
            question: surveyQuestion,
            answers: answers,
            resultsCount: results
        };
    
        // Sets surveyData using backend
        console.log(formData);
        console.log(JSON.stringify(formData));
        try {
            const response = await fetch('/api/survey', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData),
            });
    
            // Store what the service gave us as the survey
            const surveyData = await response.json();
            console.log(surveyData);
            localStorage.setItem('surveyData', JSON.stringify(surveyData));
        } catch {
            // publishSurveyLocal(formData);
        }
        window.location.href = 'publishedSurvey.html';
    };
    
    function publishSurveyLocal (formData) {
        localStorage.setItem('currentSurvey', JSON.stringify(formData));
        let surveyData = JSON.parse(localStorage.getItem('surveyData'));
        if (surveyData !== null) {
            surveyData.push(formData);
        }
        else {
            surveyData = [];
            surveyData.push(formData);
        }
        localStorage.setItem('surveyData', JSON.stringify(surveyData));
    
        let results = JSON.parse(localStorage.getItem('resultsCount'));
        if (results !== null) {
            formData.answers.forEach(answer => {
                results[answer] = 0;
            });
        }
        else {
            results = {};
            formData.answers.forEach(answer => {
                results[answer] = 0;
            });
        }
        localStorage.setItem('resultsCount', JSON.stringify(results));
        window.location.href = 'publishedSurvey.html';
    }

    return (
        <main className="survey_content">
        <div className="user">
            User: 
            <span className="user-email"> {userName}</span>
        </div>

        <div className="survey">
            <form id="surveyForm" method="post">
                <br />
                <label type="text" className="sinput" htmlFor="question">Question </label>
                <input type="text" className="sinput" id="question" name="question" placeholder="Survey Question" required/>
                <br/>
                <label type="text" className="sinput" htmlFor="answer1">Answer</label>
                <input type="text" className="sinput" id="answer1" name="answer1" placeholder="Survey Answer" required/>
                <br/>
                <label type="text" className="sinput" htmlFor="answer2">Answer</label>
                <input type="text" className="sinput" id="answer2" name="answer2" placeholder="Survey Answer" required/>
                <br/>
                <label type="text" className="sinput" htmlFor="answer3">Answer</label>
                <input type="text" className="sinput" id="answer3" name="answer3" placeholder="Survey Answer"/>
                <br/>
                <label type="text" className="sinput" htmlFor="answer4">Answer</label>
                <input type="text" className="sinput" id="answer4" name="answer4" placeholder="Survey Answer"/>
                <br/>
                <button type="submit" id="publish_button" className="btn btn-light" >Publish</button>
                {/* onclick="publishSurvey(event)" */}

            </form>
        </div>

        {/* <script>
            function handleFormSubmit(event) {
                preventDefault();
                publishSurvey();
            }
            document.getElementById('surveyForm').addEventListener('submit', handleFormSubmit);
        </script> */}
    </main>
    )
}