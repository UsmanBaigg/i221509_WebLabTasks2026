// Import express
const express = require("express");

// Create express app
const app = express();

// Define port
const PORT = 3000;

// Student data array
const students = [
    { id: 1, name: "Usman", semester: 5 },
    { id: 2, name: "Ahmed", semester: 6 },
    { id: 3, name: "Sultan", semester: 4 },
    { id: 4, name: "Ali", semester: 7 }
];

// Home route
app.get("/", (req, res) => {
    res.send("Student API is running. Visit /students");
});

// /students route
app.get("/students", (req, res) => {

    const nameQuery = req.query.name;

    // Return all students if no query parameter
    if (!nameQuery) {
        return res.json(students);
    }

    // Filter students by name
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(nameQuery.toLowerCase())
    );

    // If no student found
    if (filteredStudents.length === 0) {
        return res.send("No student found");
    }

    // Return matched students
    res.json(filteredStudents);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});