import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './results.css';


export function Results() {
    const [surveys, setSurveys] = React.useState([]);

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
                    return (
                        <td key={key}>{answer}</td>
                    )
                })}
            </tr>
        )
    }

    return (
        <main className="results">
            <table className="table table-striped">
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