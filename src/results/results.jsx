import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './results.css';


export function Results() {
    const [surveys, setSurveys] = React.useState([]);

    React.useEffect(() => {
        function handleWebSocketMessage(event) {
            const data = JSON.parse(event.data);
            console.log(data);
            setSurveys(data);
        }

        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        socket.onopen = (event) => {
            console.log('WebSocket connected');
        };

        socket.onclose = (event) => {
            console.log('WebSocket disconnected');
        };

        socket.onmessage = handleWebSocketMessage;

        return () => {
            socket.close();
        };
    }, []);

    React.useEffect(() => {
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

            <div id="surveyNotifications"></div>        
        </main>
    )
}