function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Myster Player';
    }

const userNameEl = document.querySelector('.user-email');
console.log(userNameEl)
userNameEl.textContent = this.getPlayerName();    
