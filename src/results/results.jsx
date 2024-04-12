import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './results.css';
import { SurveyEvent, SurveyNotifier } from './surveyNotifier';

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

export function Results() {
    const [surveys, setSurveys] = React.useState([]);
    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
        const selectedAnswer = JSON.parse(localStorage.getItem('selectedAnswer'));
        if (selectedAnswer) {
            // const userVote = JSON.parse(localStorage.getItem('vote'));
            updateCount(selectedAnswer);        
            localStorage.removeItem('selectedAnswer');
        }

        fetch('/api/results')
            .then((response) => response.json())
            .then((surveys) => {
                setSurveys(surveys);
                console.log(surveys);
            })
            .catch((e) => {
                console.error('Failed to get surveys \n' + e);
            })
        }, []);

    function MakeSurveyRow( {survey}, key) {
        return (
            <tr key={key}>
                <td>{survey.question}</td>
                {survey.answers.map((answer, key) => {
                    const answerStr = answer + ' - ' + survey.resultsCount[answer] + ' votes';
                    return (
                        <td key={key}>{answerStr}</td>
                    )
                })}
            </tr>
        )
    }

    React.useEffect(() => {
        SurveyNotifier.addHandler(handleSurveyEvent);

        return () => {
            SurveyNotifier.removeHandler(handleSurveyEvent);
        };
    });

    function handleSurveyEvent(event) {
        setEvents([...events, event]);
    }

    function createMessages() {
        const messageArray = [];
        for (const [i, event] of events.entries()) {
            let message = 'unknown';
            if (event.type === SurveyEvent.Vote) {
                message = `voted ${event.value.msg}`;
            } else if (event.type === SurveyEvent.System) {
                message = event.value.msg;
            }

            messageArray.push(
                <div key={i} className='event'>
                    <span className={'user-event'}>{event.from}</span>
                    {message}
                </div>
            );
        }
        return messageArray;
    }

    return (
        <main className="results">
            <table className="table table-striped table-success">
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Answer 1</th>
                        <th>Answer 2</th>
                        <th>Answer 3</th>
                        <th>Answer 4</th>
                    </tr>
                </thead>
                {surveys.length > 0 && (
                    <tbody id="resultsContainer">
                        {surveys.map((survey, key) => {
                            return (
                            <MakeSurveyRow survey={survey} key={key} />
                            )
                        })}
                    </tbody>
                )}
            </table>

            <div id="surveyNotifications">{createMessages()}</div>        
        </main>
    )
}