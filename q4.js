function generateTable() {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = '';

    const rowsInput = document.getElementById('rows');
    const colsInput = document.getElementById('cols');

    let rows = parseInt(rowsInput.value);
    let cols = parseInt(colsInput.value);

    // Validation
    if (isNaN(rows) || rows < 1 || rows > 50 || isNaN(cols) || cols < 1 || cols > 50) {
        errorDiv.textContent = 'Please enter valid numbers (1–50) for rows and columns.';
        return;
    }

    // Clear previous table
    const container = document.getElementById('tableContainer');
    container.innerHTML = '';

    // Create new table
    const table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        const tr = table.insertRow();

        // Alternating row styling
        if (i % 2 === 1) {
            tr.classList.add('even');
        }

        for (let j = 0; j < cols; j++) {
            const td = tr.insertCell();
            td.textContent = `(${i + 1}, ${j + 1})`;
        }

        // Hover effects using JavaScript (NOT CSS)
        tr.addEventListener('mouseover', function () {
            this.style.backgroundColor = '#a8d1ff'; // highlight color
        });

        tr.addEventListener('mouseout', function () {
            this.style.backgroundColor = ''; // reset to CSS alternating style
        });
    }

    container.appendChild(table);
}

// Initialize
function initialize() {
    const btn = document.getElementById('generateBtn');
    btn.addEventListener('click', generateTable);

    // Generate initial table on load (matches the preview)
    generateTable();
}

window.onload = initialize;