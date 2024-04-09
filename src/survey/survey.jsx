import React from 'react';
import { useNavigate } from 'react-router-dom'

export function CreateSurvey( {userName} ) { 
    const navigate = useNavigate();
    const [surveyQuestion, setSurveyQuestion] = React.useState('');
    const [answers, setAnswers] = React.useState([]);

    // const scoreRows = [];
    // if (scores.length) {
    //   for (const [i, score] of scores.entries()) {
    //     scoreRows.push(
    //       <tr key={i}>
    //         <td>{i}</td>
    //         <td>{score.name.split('@')[0]}</td>
    //         <td>{score.score}</td>
    //         <td>{score.date}</td>
    //       </tr>
    //     );
    //   }
    // } else {
    //   scoreRows.push(
    //     <tr key='0'>
    //       <td colSpan='4'>Be the first to score</td>
    //     </tr>
    //   );
    // }

    // Sets surveyData using backend
    function handleAnswerChange(e, index) {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = e.target.value;
        setAnswers(updatedAnswers);
    };
    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await publishSurvey(answers, surveyQuestion);
            navigate('/publishedSurvey')
        } catch (error) {
            console.log("Error publishing survey ", error);
        }
    }

    async function publishSurvey(answers, surveyQuestion) {
        let results = {};
        answers.forEach(answer => {
            results[answer] = 0;
        });

        const formData = {
            question: surveyQuestion,
            answers: answers,
            resultsCount: results
        };

        const response = await fetch('/api/survey', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(formData),
        });
        // Store what the service gave us as the survey
        const surveyData = await response.json();
        console.log(surveyData);
        localStorage.setItem('surveyData', JSON.stringify(surveyData));
    }

    return (
        <main className="survey_content">
        <div className="user">
            User: 
            <span className="user-email"> {userName}</span>
        </div>

        <div className="survey">
            <form id="surveyForm" onSubmit={handleSubmit}>
                <br /> 
                <label type="text" className="sinput" htmlFor="question">Question </label>
                <input type="text" className="sinput" id="question" name="question" placeholder="Survey Question" 
                    onChange={(e) => setSurveyQuestion(e.target.value)} required/>
                <br/>
                <label type="text" className="sinput" htmlFor="answer1">Answer</label>
                <input type="text" className="sinput" id="answer1" name="answer1" placeholder="Survey Answer"
                    onChange={(e) => handleAnswerChange(e, 0)} required/>
                <br/>
                <label type="text" className="sinput" htmlFor="answer2">Answer</label>
                <input type="text" className="sinput" id="answer2" name="answer2" placeholder="Survey Answer"
                    onChange={(e) => handleAnswerChange(e, 1)} required/>
                <br/>
                <label type="text" className="sinput" htmlFor="answer3">Answer</label>
                <input type="text" className="sinput" id="answer3" name="answer3" placeholder="Survey Answer"
                    onChange={(e) => handleAnswerChange(e, 2)}/>
                <br/>
                <label type="text" className="sinput" htmlFor="answer4">Answer</label>
                <input type="text" className="sinput" id="answer4" name="answer4" placeholder="Survey Answer"
                    onChange={(e) => handleAnswerChange(e, 3)}/>
                <br/>
                <button type="submit" id="publish_button" className="btn btn-light">Publish</button>
            </form>
        </div>
    </main>
    )
}