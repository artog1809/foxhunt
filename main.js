const field = document.querySelector('.field')
const foxesLast = document.querySelector('.foxesLast')
const attempts = document.querySelector('.attemptsLast')
const score = document.querySelector('.score')
let matrix =[[], [], [], [], [], [], [], [], []];
let foxes = [];
let flag = 1;
let guessed = 0;
let clicks = 0;

getFoxesCoords();
foxesLast.textContent = 5;
attempts.textContent = 0;
if(!window.localStorage.getItem('best')){
    window.localStorage.setItem('best', '40')
}
score.textContent = window.localStorage.getItem('best');

// Открытие клетки
let openCell = function(x,y) {

    let handler = function() {
        clicks++;
        attempts.textContent = clicks;
        let cell = document.getElementById(`${x}${y}`);
        // Игрок выиграл
        if(guessed == 4) {
            foxesLast.textContent = 0;
            cell.innerHTML = '<img class = "fox" src = "./imgs/fox.svg">'
            window.localStorage.setItem('current', clicks);
            if(window.localStorage.getItem('best') > clicks) {
                window.localStorage.setItem('best', clicks)
            }
            setTimeout(gameOver,1000);
            return;
        }
        // Если лисы в клетке нет
        if(!checkFox(x,y)) {
            const count = checkFoxesCount(x,y);
            cell.innerHTML = styleCountNum(count);
            cell.removeEventListener('click', handler)
            return;
        }
        // Если лиса найдена
        cell.innerHTML = '<img class = "fox" src = "./imgs/fox.svg">'
        guessed++;
        foxesLast.textContent = 5 - guessed;
        cell.removeEventListener('click', handler)
        return;
    }
    return handler;
}

createField();


// Запонение игрового поля
function createField() {
    for (let i = 0; i < 9; i++) {
        let cellLine = document.createElement('div');
        cellLine.classList.add('cellLine');
        // Заполнить поле лесом и создать матрицу с клетками
        for(let j = 0; j< 9; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerHTML = '<img class = "forest" src = "./imgs/forest.svg">'
            for(let k = 0 ; k < foxes.length; k++) {
                if(foxes[k].x == i && foxes[k].y == j)
                {
                    matrix[i][j] = "F";
                    break;
                }
                matrix[i][j] = "";
            }
            cellLine.appendChild(cell);
            cell.addEventListener('click', openCell(i,j))
            cell.id = `${i}${j}`
        }
        field.appendChild(cellLine);
    }
}

// Создать координаты для лис
function getFoxesCoords() {
    for(let i = 0; i < 5; i ++) {
        foxes[i] = getRandomCoords();
        flag = 1;
        while(flag) {
            flag = 0;
            for(let j = 0; j < i; j++) {
                if(foxes[i].x == foxes[j].x && foxes[i].y == foxes[j].y) {
                    flag = 1;
                    foxes[i] = getRandomCoords();
                    break;
                }
            }
            if(flag == 0) {
                break;
            }
        }
    }
}


// Получить случайные координаты
function getRandomCoords() {
    const x = getRandomInRange(0,8);
    const y = getRandomInRange(0,8);
    return {x: x, y: y}
}

// Создание случайного числа в диапазоне
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Проверить наличие лис по горизонтали
function checkFoxesHorizontal(x) {
    let count = 0;
    for(let j = 0; j < matrix[x].length; j++) {
        if(matrix[x][j] == "F") {
            count++;
        }
    }
    return count;
}

// Проверить наличие лис по вертикали
function checkFoxesVertical(y) {
    let count = 0;
    let col = [];
    for(let i = 0; i < matrix.length; i++){
        col.push(matrix[i][y])
    }
    for(let j = 0; j < col.length; j++) {
        if(col[j] == "F") {
            count++;
        }
    }
    return count;
}

// Проверить наличие лис по диагонали(слева направо)
function checkFoxesLeftDiagonal(x,y) {
    let count = 0;
    for(let i = x, j = y; i >= 0 && j >= 0; i--, j--) {
        if(matrix[i][j] == "F") {
            count++;
        }
    }
    for(let i = x, j = y; i < matrix.length && j < matrix.length ; i++, j++) {
        if(matrix[i][j] == "F") {
            count++;
        }
    }
    return count;
}

//Проверить наличие лис по диагонали(справа налево)
function checkFoxesRightDiagonal(x,y) {
    let count = 0;
    for(let i = x, j = y; i >= 0 && j < matrix.length; i--, j++) {
        if(matrix[i][j] == "F") {
            count++;
        }
    }
    for(let i = x, j = y; j >= 0 && i < matrix.length; i++, j--) {
        if(matrix[i][j] == "F") {
            count++;
        }
    }
    return count;
}

// Проверить есть ли лиса в клетке
function checkFox(x, y) {
    for (let i = 0; i < foxes.length; i++) {
        const fox = foxes[i];
        if (fox.x === x && fox.y === y) {
            return true;
        }
    }
    return false; 
}

// Проверить сколько лис осталось
function checkFoxesCount(x, y) {
    let count = 0;
    count += checkFoxesHorizontal(x);
    count += checkFoxesVertical(y);
    count += checkFoxesLeftDiagonal(x,y);
    count += checkFoxesRightDiagonal(x,y);
    return count;
}

// Добавление стилей для чисел пеленгатора
function styleCountNum(num) {
    let str;
    if(num == 0) {
        str = `<div class = "num zero">${num}</div>`;
    }
    if(num == 1) {
        str = `<div class = "num one">${num}</div>`;
    }
    if(num == 2) {
        str = `<div class = "num two">${num}</div>`;
    }
    if(num == 3) {
        str = `<div class = "num three">${num}</div>`;
    }
    if(num == 4) {
        str = `<div class = "num four">${num}</div>`;
    }
    if(num == 5) {
        str = `<div class = "num five">${num}</div>`;
    }
    return str;
}

// Завершение игры
function gameOver() {
    window.location.href = "/gameover.html"
}