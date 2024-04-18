import React from 'react';
import './results.css';

async function updateCount(answer) {
    // Change the count for the most recently published survey
    try {
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

    React.useEffect(() => {
        const selectedAnswer = JSON.parse(localStorage.getItem('selectedAnswer'));
        if (selectedAnswer) {
            updateCount(selectedAnswer);        
            localStorage.removeItem('selectedAnswer');
        }

        fetch('/api/results')
            .then((response) => response.json())
            .then((surveys) => {
                setSurveys(surveys);
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
        </main>
    )
}