import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './results.css';

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
    // const [socket, setSocket] = React.useState(null);

    // React.useEffect(() => {
    //     // Establish WebSocket connection
    //     const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    //     const newSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    //     newSocket.onopen = (event) => {
    //         console.log('WebSocket connected');
    //     };

    //     newSocket.onclose = (event) => {
    //         console.log('WebSocket disconnected');
    //     };

    //     newSocket.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         console.log(data);
    //         setSurveys(data);
    //     };

    //     setSocket(newSocket);

    //     // Cleanup function to close WebSocket connection when component unmounts
    //     return () => {
    //         newSocket.close();
    //     };
    // }, []);

    React.useEffect(() => {
        const selectedAnswer = JSON.parse(localStorage.getItem('selectedAnswer'));
        if (selectedAnswer) {
            // const userVote = JSON.parse(localStorage.getItem('vote'));
            // socket.send(userVote);
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