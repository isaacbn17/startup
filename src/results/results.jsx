import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <tbody id="resultsContainer"></tbody>
            </table>

            <div id="surveyNotifications"></div>        
        </main>
    )
}