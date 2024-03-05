function login () {
    const emailEl = document.querySelector('#inputemail');
    localStorage.setItem('userName', emailEl.value);
    window.location.href = 'survey.html';
}