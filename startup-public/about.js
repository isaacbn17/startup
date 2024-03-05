let chat = 'Happy birthday to you';
setInterval(() => {
    chat = `${chat} and you`;
    document.querySelector('#quote_box').textContent = chat;
}, 7000);