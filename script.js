document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const addColumnButton = document.getElementById('add-column');
    const newColumnNameInput = document.getElementById('new-column-name');
    let cardIdCounter = 1;
    let columnIdCounter = 4;

    container.addEventListener('click', handleContainerClick);
    addColumnButton.addEventListener('click', addColumn);

    function handleContainerClick(event) {
        const target = event.target;

        if (target.classList.contains('add-card')) {
            const column = target.closest('.column');
            const input = column.querySelector('.card-input');
            addCard(column, input.value);
            input.value = '';
        }
    }

    function addCard(column, text) {
        if (!text.trim()) return;

        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('draggable', 'true');
        card.setAttribute('id', `card-${cardIdCounter++}`);
        card.textContent = text;
        card.addEventListener('dragstart', dragStart);
        column.appendChild(card);
    }

    function addColumn() {
        const columnName = newColumnNameInput.value.trim();
        if (!columnName) return;

        const column = document.createElement('div');
        column.classList.add('column');
        column.setAttribute('id', `column-${columnIdCounter++}`);
        column.innerHTML = `
            <h2>${columnName}</h2>
            <input type="text" class="card-input" placeholder="Enter card text">
            <button class="add-card">Add a Card</button>
        `;
        column.addEventListener('dragover', dragOver);
        column.addEventListener('drop', drop);
        container.appendChild(column);
        newColumnNameInput.value = '';
    }

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.effectAllowed = 'move';
    }

    function dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function drop(e) {
        e.preventDefault();
        const cardId = e.dataTransfer.getData('text/plain');
        const card = document.getElementById(cardId);
        const target = e.target.classList.contains('column') ? e.target : e.target.closest('.column');
        target.appendChild(card);
    }

    
    const columns = document.querySelectorAll('.column');
    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('drop', drop);
    });
});




