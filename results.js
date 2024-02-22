document.addEventListener('DOMContentLoaded', function getResultsData() {
    const surveyResults = JSON.parse(localStorage.getItem('surveyResults'));
    if (surveyResults) {
        displayResults(surveyResults.response);
    }
});


function displayResults() {
    console.log("Yay! You're figuring this out!")
}