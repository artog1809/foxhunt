const newGame = document.querySelector(".newGame");
const main = document.querySelector(".main");
const result = document.querySelector(".resultAttempts");

result.textContent = window.localStorage.getItem('current');

newGame.addEventListener('click', _ => {
    window.location.href = "./main.html"
})

main.addEventListener('click', _ => {
    window.location.href = "./index.html"
})