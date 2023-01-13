const express = require("express");
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
let activeStudents = require('./activeStudents.json');
console.log(activeStudents)
// let activeStudents = [{ name: "john", id: 1 }, { name: "alex", id: 2 }, { name: "sean", id: 3 }]

//middleware to read body urlencode data
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/students", (req, res) => {
    console.log("Request type", req.method);
    res.json({ activeStudents })
})

app.get("/students/:studentId", (req, res) => {
    console.log(req.params.studentId);
    console.log("Request type", req.method);
    let studentName = activeStudents.filter(student => student.id == req.params.studentId)
    res.send(studentName[0].name);
})

app.post("/delete/students", (req, res) => {
    console.log("Request type", req.method);
    console.log("request body", req.body);
    let studentIdToDelete = req.body.id;
    let indexToDelete;
    for (let i = 0; i < activeStudents.length; i++) {
        if (activeStudents[i].id === studentIdToDelete) {
            indexToDelete = i;
        }
    }
    const studentDeactivated = activeStudents.splice(indexToDelete, 1)
    console.log(studentDeactivated);
    console.log(activeStudents)
    fs.writeFile("./activeStudents.json", JSON.stringify(activeStudents), (error) => {
        console.log("file  updated successfully");
        res.json({ studentDeleted: studentDeactivated, activeStudents: activeStudents })
    });
})


app.post("/add/students", (req, res) => {
    console.log("Request type", req.method);
    console.log("request body", req.body);
    let studentIdToAdd = req.body.id;
    let studentName = req.body.name
    activeStudents.push({ id: studentIdToAdd, name: studentName })
    fs.writeFile("./activeStudents.json", JSON.stringify(activeStudents), (error) => {
        console.log("file  updated successfully");
        res.json({ activeStudents: activeStudents })
    });
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})