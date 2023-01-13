const button = document.getElementById("deleteStudentButton")
const input = document.getElementById("studentId");


const deleteStudents = () => {
    console.log("student deleted");
    console.log(input.value);
    let studentToBeDeleted = input.value;
    fetch("/delete/students", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: studentToBeDeleted })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    deleteStudents();
})