document.addEventListener('DOMContentLoaded', function getResultsData() {
    const surveyResults = JSON.parse(localStorage.getItem('surveyResults'));
    if (surveyResults) {
        displayResults(surveyResults.response);
    }
});


function displayResults() {
    window.location.href = 'results.html';
    console.log("Yay! You're figuring this out!")
}