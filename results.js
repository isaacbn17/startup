document.addEventListener('DOMContentLoaded', function getResultsData() {
    const selectedAnswer = JSON.parse(localStorage.getItem('selectedAnswer'));
    if (selectedAnswer) {
        count = updateCount(selectedAnswer);
        displayResults(count);
    }
});

function goToResults () {
    window.location.href = 'results.html';
}

function updateCount(answer) {
    console.log('Arrived at updateCount');
    const resultsCount = JSON.parse(localStorage.getItem('resultsCount'));
    resultsCount[answer] = (resultsCount[answer] + 1);
    localStorage.setItem('resultsCount', JSON.stringify(resultsCount));
    console.log(resultsCount);
    return resultsCount;
}

function displayResults(count) {
    console.log("Yay! You're figuring this out!")
    console.log(count)

}

