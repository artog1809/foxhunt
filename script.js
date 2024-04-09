const field = document.querySelector('.field')


for (let i = 0; i < 9; i++) {
    let cellLine = document.createElement('div');
    cellLine.classList.add('cellLine');
    for(let j = 0; j< 9; j++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = ''
        cellLine.appendChild(cell);
    }
    field.appendChild(cellLine);
}

