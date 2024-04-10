import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export function PublishedSurvey() {
    const navigate = useNavigate();
    let [survey, setSurvey] = React.useState({});
    
    React.useEffect(() => {
        fetch('/api/publishedSurvey')
            .then((response) => response.json())
            .then((survey) => {
                setSurvey(survey);
                console.log(survey.question);
                console.log(survey.answers);
                console.log("You did it!")
                survey.answers.map((element, index) => {
                    console.log(`Element at index ${index}: ${element}`);
                    return null; // You need to return something from the map function
                });
            })
            .catch((e) => {
                console.error('Failed to get survey\n' + e);
            })
        }, []); 
        

    function handleAnswerSelect(e) {
        const selectedAnswer = e.target.nextElementSibling.textContent;
        localStorage.setItem('selectedAnswer', selectedAnswer);
    }

    return (
        <main>
            {survey.answers && (
            <div id="survey_container">
                <h2>{survey.question}</h2>
                <ul className="answerPublished">
                    {survey.answers.map((answer, key) => {
                        return (
                        <li id={key}>
                            <input type="radio" className="radioButton" onChange={handleAnswerSelect} />
                            <span className="answerText">{answer}</span>
                        </li>
                        )
                    }
                    )}
                </ul>
            </div>
            )}
            <Button className="btn btn-light" onClick={() => navigate('/results') }>Vote</Button>
        </main>
    )
}

    // const questions = [];
    // const answerElements = [];
    // for (const answer of survey.answers) {
    //     questions.append(answer);
    // }
    // survey.answers.forEach(answer => {
    // })

    // displaySurvey(survey.question, survey.answers);
    // function displaySurvey(question, answers) {    
    //     const answerlist = document.createElement('ul');
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
    //             const username = localStorage.getItem('userName') ?? 'Unkown User';
    //             const userVote = {
    //                 name: username,
    //                 answer: text.textContent,
    //             };
    //             localStorage.setItem('vote', JSON.stringify(userVote));
    //         })
    //     });
    
    //     const submit_button = document.createElement('button');
    //     submit_button.classList.add('btn', 'btn-light');
    //     submit_button.type = 'submit';
    //     submit_button.textContent = 'Submit';
    //     // When someone votes, the vote is sent to the websocket so it can be displayed on the results page
    //     submit_button.addEventListener('click', () => {
    //         // socket.send(`{"name":"${username}", "answer":"${answer}"}`)
    //         window.location.href = 'results.html';
    //     });
    
    //     survey_container.appendChild(answerlist);
    //     survey_container.appendChild(submit_button);
    // }