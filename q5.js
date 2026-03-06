// Sample data
const studentsData = [
    {
        name: "Alice",
        courses: [
            { course: "Math", score: 85 },
            { course: "Physics", score: 48 }
        ]
    },
    {
        name: "Bob",
        courses: [
            { course: "Chemistry", score: 65 },
            { course: "Biology", score: 72 }
        ]
    },
    {
        name: "Charlie",
        courses: [
            { course: "History", score: 45 },
            { course: "English", score: 90 }
        ]
    }
];

// Global state
let students = [];
let currentSearch = '';
let sortColumn = 'name';
let sortDirection = 'asc';
let expanded = new Set();

// Deep copy data
function initData() {
    students = studentsData.map(student => ({
        name: student.name,
        courses: student.courses.map(course => ({ ...course }))
    }));
    expanded = new Set(students.map(s => s.name)); // expand all by default
}

// Filter students
function getFilteredStudents() {
    const term = currentSearch.toLowerCase().trim();
    if (!term) return students;

    return students.filter(student =>
        student.name.toLowerCase().includes(term) ||
        student.courses.some(c => c.course.toLowerCase().includes(term))
    );
}

// Toggle expand/collapse (bonus)
window.toggleExpand = function(studentName) {
    if (expanded.has(studentName)) {
        expanded.delete(studentName);
    } else {
        expanded.add(studentName);
    }
    renderTable();
};

// Column sorting
function handleSort(e) {
    const th = e.currentTarget;
    const column = th.dataset.column;

    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }

    if (column === 'name') {
        students.sort((a, b) => {
            const cmp = a.name.localeCompare(b.name);
            return sortDirection === 'asc' ? cmp : -cmp;
        });
    } else if (column === 'course') {
        const isAsc = sortDirection === 'asc';
        students.forEach(student => {
            student.courses.sort((a, b) => {
                const cmp = a.course.localeCompare(b.course);
                return isAsc ? cmp : -cmp;
            });
        });
    } else if (column === 'score') {
        const isAsc = sortDirection === 'asc';
        students.forEach(student => {
            student.courses.sort((a, b) => isAsc ? a.score - b.score : b.score - a.score);
        });
    }

    renderTable();
}

// Render table using DOM methods
function renderTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    const filtered = getFilteredStudents();

    if (filtered.length === 0) {
        const row = tbody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 3;
        cell.className = 'no-results';
        cell.textContent = 'No matching students found.';
        return;
    }

    filtered.forEach(student => {
        const isExpanded = expanded.has(student.name);

        // Student row
        const studentRow = tbody.insertRow();
        studentRow.classList.add('student-row');
        studentRow.dataset.name = student.name;

        const nameCell = studentRow.insertCell(0);
        const toggleSpan = document.createElement('span');
        toggleSpan.className = 'toggle';
        toggleSpan.textContent = isExpanded ? '▼' : '►';
        toggleSpan.onclick = () => toggleExpand(student.name);
        nameCell.appendChild(toggleSpan);
        nameCell.appendChild(document.createTextNode(' ' + student.name));

        studentRow.insertCell(1);
        studentRow.insertCell(2);

        // Course rows
        student.courses.forEach(course => {
            const courseRow = tbody.insertRow();
            courseRow.classList.add('course-row');
            if (course.score < 50) courseRow.classList.add('low-score');
            courseRow.style.display = isExpanded ? 'table-row' : 'none';

            courseRow.insertCell(0);                    // empty
            courseRow.insertCell(1).textContent = course.course;
            courseRow.insertCell(2).textContent = course.score;
        });
    });
}

// Initialize app
function initialize() {
    initData();

    // Sorting listeners
    const headers = document.querySelectorAll('#studentsTable th');
    headers.forEach(th => th.addEventListener('click', handleSort));

    // Search listener
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        currentSearch = searchInput.value;
        renderTable();
    });

    renderTable();
}

window.onload = initialize;