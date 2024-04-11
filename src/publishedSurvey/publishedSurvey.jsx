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
            })
            .catch((e) => {
                console.error('Failed to get survey\n' + e);
            })
        }, []); 
        

    function handleAnswerSelect(e) {
        const selectedAnswer = e.target.nextElementSibling.textContent;
        localStorage.setItem('selectedAnswer', JSON.stringify(selectedAnswer));
        const username = localStorage.getItem('userName') ?? 'Unkown User';
        const userVote = {
            name: username,
            answer: selectedAnswer,
        };
        localStorage.setItem('vote', JSON.stringify(userVote));
        console.log(selectedAnswer);
    }

    return (
        <main>
            {survey.answers && (
            <div id="survey_container">
                <h2>{survey.question}</h2>
                <ul className="answerPublished">
                    {survey.answers.map((answer, key) => {
                        return (
                        <li key={key}>
                            <input type="radio" className="radioButton" name="surveyAnswer" onChange={handleAnswerSelect} />
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