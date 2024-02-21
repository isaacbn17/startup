function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Myster Player';
    }


class Survey {
    constructor() {

    }
}

const userNameEl = document.querySelector('.user-email');
console.log(userNameEl)
userNameEl.textContent = this.getPlayerName();    


// const playerNameEl = document.querySelector('.player-name');
// playerNameEl.textContent = this.getPlayerName();
