// =========================
// QUIZ DATA
// =========================

function getQuizzes() {

    const quizzes = localStorage.getItem("quizzes");

    if (quizzes) {

        try {

            const parsedQuizzes =
                JSON.parse(quizzes);

            if (Array.isArray(parsedQuizzes)) {
                return parsedQuizzes;
            }

        } catch (error) {

            console.error(
                "Could not read quizzes:",
                error
            );

        }

    }


    const defaultQuizzes = [

        {
            id: 101,

            title: "Java OOP Basics",

            category: "Java",

            duration: 10,

            active: true,

            questions: [

                {
                    question:
                        "What is the main purpose of encapsulation in Java?",

                    options: {

                        A: "To hide data and control access",

                        B: "To create multiple objects",

                        C: "To execute code faster",

                        D: "To remove classes"

                    },

                    correctAnswer: "A"
                },


                {
                    question:
                        "Which keyword is used to create a class in Java?",

                    options: {

                        A: "object",

                        B: "class",

                        C: "new",

                        D: "create"

                    },

                    correctAnswer: "B"
                }

            ]
        },


        {
            id: 102,

            title: "Data Structures",

            category: "DSA",

            duration: 15,

            active: true,

            questions: [

                {
                    question:
                        "Which data structure follows LIFO?",

                    options: {

                        A: "Queue",

                        B: "Stack",

                        C: "Array",

                        D: "Linked List"

                    },

                    correctAnswer: "B"
                }

            ]
        },


        {
            id: 103,

            title: "Computer Networks",

            category: "Networking",

            duration: 10,

            active: false,

            questions: [

                {
                    question:
                        "Which protocol is used for web pages?",

                    options: {

                        A: "HTTP",

                        B: "FTP",

                        C: "SMTP",

                        D: "SSH"

                    },

                    correctAnswer: "A"
                }

            ]
        }

    ];


    localStorage.setItem(
        "quizzes",
        JSON.stringify(defaultQuizzes)
    );


    return defaultQuizzes;

}


// =========================
// SAVE QUIZZES
// =========================

function saveQuizzes(quizzes) {

    localStorage.setItem(
        "quizzes",
        JSON.stringify(quizzes)
    );

}


// =========================
// DISPLAY QUIZ TABLE
// =========================

function displayQuizTable() {

    const quizzes =
        getQuizzes();


    const tableBody =
        document.getElementById(
            "quizTableBody"
        );


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    if (quizzes.length === 0) {

        tableBody.innerHTML = `

            <div class="admin-empty-row">
                No quizzes available.
            </div>

        `;

        return;
    }


    quizzes.forEach(function(quiz) {

        const row =
            document.createElement("div");


        row.className =
            "admin-table-row";


        const statusClass =
            quiz.active
                ? "admin-active"
                : "admin-inactive";


        const statusText =
            quiz.active
                ? "Active"
                : "Inactive";


        row.innerHTML = `

            <span>
                ${quiz.id}
            </span>

            <strong>
                ${quiz.title}
            </strong>

            <span>
                ${quiz.category}
            </span>

            <span>
                ${quiz.questions.length}
            </span>

            <span>
                ${quiz.duration} min
            </span>

            <span class="${statusClass}">
                ${statusText}
            </span>

            <div class="admin-actions">

                <button
                    onclick="editQuizById(${quiz.id})">
                    Edit
                </button>

                <button
                    onclick="toggleQuiz(${quiz.id})">

                    ${quiz.active
                        ? "Deactivate"
                        : "Activate"}

                </button>

                <button
                    onclick="deleteQuizById(${quiz.id})">
                    Delete
                </button>

            </div>

        `;


        tableBody.appendChild(row);

    });

}


// =========================
// CREATE QUIZ
// =========================

function showCreateQuiz() {

    const quizzes =
        getQuizzes();


    const title =
        prompt("Enter quiz title:");


    if (!title) {
        return;
    }


    const category =
        prompt("Enter quiz category:");


    if (!category) {
        return;
    }


    const duration =
        Number(
            prompt(
                "Enter duration in minutes:"
            )
        );


    if (!duration || duration <= 0) {

        alert(
            "Please enter a valid duration."
        );

        return;
    }


    const newId =
        Date.now();


    const newQuiz = {

        id: newId,

        title: title,

        category: category,

        duration: duration,

        active: false,

        questions: []

    };


    quizzes.push(newQuiz);


    saveQuizzes(quizzes);


    alert(
        "Quiz created successfully!\n\n" +
        "Quiz: " + title +
        "\nStatus: Inactive"
    );


    displayQuizTable();

    updateAdminStatistics();

}


// =========================
// EDIT QUIZ
// =========================

function editQuizById(quizId) {

    const quizzes =
        getQuizzes();


    const quiz =
        quizzes.find(function(q) {

            return q.id === quizId;

        });


    if (!quiz) {

        alert(
            "Quiz not found."
        );

        return;
    }


    const newTitle =
        prompt(
            "Enter quiz title:",
            quiz.title
        );


    if (!newTitle) {
        return;
    }


    const newCategory =
        prompt(
            "Enter category:",
            quiz.category
        );


    if (!newCategory) {
        return;
    }


    const newDuration =
        Number(
            prompt(
                "Enter duration in minutes:",
                quiz.duration
            )
        );


    if (!newDuration || newDuration <= 0) {

        alert(
            "Invalid duration."
        );

        return;
    }


    quiz.title =
        newTitle;


    quiz.category =
        newCategory;


    quiz.duration =
        newDuration;


    saveQuizzes(quizzes);


    alert(
        "Quiz updated successfully."
    );


    displayQuizTable();

}


// =========================
// ACTIVATE / DEACTIVATE
// =========================

function toggleQuiz(quizId) {

    const quizzes =
        getQuizzes();


    const quiz =
        quizzes.find(function(q) {

            return q.id === quizId;

        });


    if (!quiz) {

        alert(
            "Quiz not found."
        );

        return;
    }


    quiz.active =
        !quiz.active;


    saveQuizzes(quizzes);


    displayQuizTable();


    alert(
        quiz.title +
        (
            quiz.active
                ? " is now ACTIVE."
                : " is now INACTIVE."
        )
    );

}


// =========================
// DELETE QUIZ
// =========================

function deleteQuizById(quizId) {

    const quizzes =
        getQuizzes();


    const quiz =
        quizzes.find(function(q) {

            return q.id === quizId;

        });


    if (!quiz) {

        alert(
            "Quiz not found."
        );

        return;
    }


    const confirmDelete =
        confirm(
            "Delete quiz \"" +
            quiz.title +
            "\"?"
        );


    if (!confirmDelete) {
        return;
    }


    const updatedQuizzes =
        quizzes.filter(function(q) {

            return q.id !== quizId;

        });


    saveQuizzes(updatedQuizzes);


    displayQuizTable();

    updateAdminStatistics();


    alert(
        "Quiz deleted successfully."
    );

}


// =========================
// ADD QUESTION
// =========================

function addQuestion() {

    const quizzes =
        getQuizzes();


    if (quizzes.length === 0) {

        alert(
            "No quizzes available. Create a quiz first."
        );

        return;
    }


    let quizList =
        "Select a quiz:\n\n";


    quizzes.forEach(function(quiz, index) {

        quizList +=
            (index + 1) +
            ". " +
            quiz.title +
            "\n";

    });


    const choice =
        Number(
            prompt(quizList)
        );


    if (
        !choice ||
        choice < 1 ||
        choice > quizzes.length
    ) {

        alert(
            "Invalid quiz selection."
        );

        return;
    }


    const quiz =
        quizzes[choice - 1];


    const questionText =
        prompt("Enter question:");


    if (!questionText) {
        return;
    }


    const optionA =
        prompt("Enter option A:");


    if (!optionA) {
        return;
    }


    const optionB =
        prompt("Enter option B:");


    if (!optionB) {
        return;
    }


    const optionC =
        prompt("Enter option C:");


    if (!optionC) {
        return;
    }


    const optionD =
        prompt("Enter option D:");


    if (!optionD) {
        return;
    }


    const correctAnswer =
        prompt(
            "Enter correct option (A/B/C/D):"
        );


    if (!correctAnswer) {

        alert(
            "Correct answer is required."
        );

        return;
    }


    const finalAnswer =
        correctAnswer
            .trim()
            .toUpperCase();


    if (
        !["A", "B", "C", "D"]
            .includes(finalAnswer)
    ) {

        alert(
            "Correct answer must be A, B, C or D."
        );

        return;
    }


    const question = {

        question:
            questionText,

        options: {

            A: optionA,

            B: optionB,

            C: optionC,

            D: optionD

        },

        correctAnswer:
            finalAnswer

    };


    quiz.questions.push(question);


    saveQuizzes(quizzes);


    alert(
        "Question added successfully!"
    );


    displayQuizTable();

    updateAdminStatistics();

}


// =========================
// VIEW QUESTION BANK
// =========================

function viewQuestions() {

    const quizzes =
        getQuizzes();


    if (quizzes.length === 0) {

        alert(
            "No quizzes available."
        );

        return;
    }


    let quizList =
        "QUESTION BANK\n\n" +
        "Select a quiz:\n\n";


    quizzes.forEach(function(quiz, index) {

        quizList +=
            (index + 1) +
            ". " +
            quiz.title +
            " (" +
            quiz.questions.length +
            " questions)\n";

    });


    const choice =
        Number(
            prompt(quizList)
        );


    if (
        !choice ||
        choice < 1 ||
        choice > quizzes.length
    ) {

        alert(
            "Invalid quiz selection."
        );

        return;
    }


    const quiz =
        quizzes[choice - 1];


    if (quiz.questions.length === 0) {

        alert(
            "No questions found in this quiz."
        );

        return;
    }


    let message =
        "QUESTION BANK\n\n" +
        "Quiz: " +
        quiz.title +
        "\n\n";


    quiz.questions.forEach(
        function(question, index) {

            message +=
                "Question " +
                (index + 1) +
                "\n";


            message +=
                question.question +
                "\n\n";


            message +=
                "A. " +
                question.options.A +
                "\n";


            message +=
                "B. " +
                question.options.B +
                "\n";


            message +=
                "C. " +
                question.options.C +
                "\n";


            message +=
                "D. " +
                question.options.D +
                "\n";


            message +=
                "Correct Answer: " +
                question.correctAnswer +
                "\n";


            message +=
                "-------------------------\n";

        }
    );


    alert(message);


    const manage =
        confirm(
            "Do you want to edit or delete a question?"
        );


    if (!manage) {
        return;
    }


    manageQuestion(quiz);

}


// =========================
// MANAGE QUESTION
// =========================

function manageQuestion(quiz) {

    let questionList =
        "MANAGE QUESTIONS\n\n";


    quiz.questions.forEach(
        function(question, index) {

            questionList +=
                (index + 1) +
                ". " +
                question.question +
                "\n";

        }
    );


    const choice =
        Number(
            prompt(
                questionList +
                "\nEnter question number:"
            )
        );


    if (
        !choice ||
        choice < 1 ||
        choice > quiz.questions.length
    ) {

        alert(
            "Invalid question selection."
        );

        return;
    }


    const action =
        prompt(
            "Choose action:\n\n" +
            "1. Edit Question\n" +
            "2. Delete Question"
        );


    if (!action) {
        return;
    }


    if (action.trim() === "1") {

        editQuestion(
            quiz,
            choice - 1
        );

    }

    else if (action.trim() === "2") {

        deleteQuestion(
            quiz,
            choice - 1
        );

    }

    else {

        alert(
            "Invalid action."
        );

    }

}


// =========================
// EDIT QUESTION
// =========================

function editQuestion(
    quiz,
    questionIndex
) {

    const question =
        quiz.questions[questionIndex];


    if (!question) {

        alert(
            "Question not found."
        );

        return;
    }


    const newQuestion =
        prompt(
            "Enter question:",
            question.question
        );


    if (!newQuestion) {
        return;
    }


    const newOptionA =
        prompt(
            "Enter option A:",
            question.options.A
        );


    if (!newOptionA) {
        return;
    }


    const newOptionB =
        prompt(
            "Enter option B:",
            question.options.B
        );


    if (!newOptionB) {
        return;
    }


    const newOptionC =
        prompt(
            "Enter option C:",
            question.options.C
        );


    if (!newOptionC) {
        return;
    }


    const newOptionD =
        prompt(
            "Enter option D:",
            question.options.D
        );


    if (!newOptionD) {
        return;
    }


    const newCorrectAnswer =
        prompt(
            "Enter correct option (A/B/C/D):",
            question.correctAnswer
        );


    if (!newCorrectAnswer) {
        return;
    }


    const finalAnswer =
        newCorrectAnswer
            .trim()
            .toUpperCase();


    if (
        !["A", "B", "C", "D"]
            .includes(finalAnswer)
    ) {

        alert(
            "Correct answer must be A, B, C or D."
        );

        return;
    }


    question.question =
        newQuestion;


    question.options.A =
        newOptionA;


    question.options.B =
        newOptionB;


    question.options.C =
        newOptionC;


    question.options.D =
        newOptionD;


    question.correctAnswer =
        finalAnswer;


    saveQuizzes(
        getQuizzes()
    );


    alert(
        "Question updated successfully!"
    );


    updateAdminStatistics();

}


// =========================
// DELETE QUESTION
// =========================

function deleteQuestion(
    quiz,
    questionIndex
) {

    const question =
        quiz.questions[questionIndex];


    if (!question) {

        alert(
            "Question not found."
        );

        return;
    }


    const confirmDelete =
        confirm(
            "Delete this question?\n\n" +
            question.question
        );


    if (!confirmDelete) {
        return;
    }


    quiz.questions.splice(
        questionIndex,
        1
    );


    const quizzes =
        getQuizzes();


    saveQuizzes(quizzes);


    alert(
        "Question deleted successfully!"
    );


    displayQuizTable();

    updateAdminStatistics();

}


// =========================
// GET STUDENTS
// =========================

function getStudents() {

    const storedStudents =
        localStorage.getItem(
            "students"
        );


    if (!storedStudents) {
        return [];
    }


    try {

        const students =
            JSON.parse(storedStudents);


        if (Array.isArray(students)) {
            return students;
        }

    } catch (error) {

        console.error(
            "Could not read students:",
            error
        );

    }


    return [];

}


// =========================
// UPDATE STUDENT COUNT
// =========================

function updateStudentCount() {

    const students =
        getStudents();


    const studentCount =
        students.length;


    const totalStudents =
        document.getElementById(
            "totalStudents"
        );


    if (totalStudents) {

        totalStudents.textContent =
            studentCount;

    }


    const registeredStudentCount =
        document.getElementById(
            "registeredStudentCount"
        );


    if (registeredStudentCount) {

        registeredStudentCount.textContent =
            studentCount;

    }

}


// =========================
// UPDATE ADMIN STATISTICS
// =========================

function updateAdminStatistics() {

    const quizzes =
        getQuizzes();


    // =========================
    // TOTAL QUIZZES
    // =========================

    const totalQuizzes =
        document.getElementById(
            "totalQuizzes"
        );


    if (totalQuizzes) {

        totalQuizzes.textContent =
            quizzes.length;

    }


    // =========================
    // TOTAL QUESTIONS
    // =========================

    let questionCount = 0;


    quizzes.forEach(function(quiz) {

        questionCount +=
            quiz.questions.length;

    });


    const totalQuestions =
        document.getElementById(
            "totalQuestions"
        );


    if (totalQuestions) {

        totalQuestions.textContent =
            questionCount;

    }


    // =========================
    // STUDENT COUNT
    // =========================

    updateStudentCount();


    // =========================
    // GET RESULTS
    // =========================

    const storedResults =
        localStorage.getItem(
            "quizResults"
        );


    let results = [];


    if (storedResults) {

        try {

            results =
                JSON.parse(storedResults);


            if (!Array.isArray(results)) {

                results = [];

            }

        } catch (error) {

            console.error(
                "Could not read quiz results:",
                error
            );


            results = [];

        }

    }


    // =========================
    // TOTAL ATTEMPTS
    // =========================

    const totalAttempts =
        results.length;


    const attemptsElement =
        document.getElementById(
            "totalAttempts"
        );


    const resultAttempts =
        document.getElementById(
            "resultAttempts"
        );


    if (attemptsElement) {

        attemptsElement.textContent =
            totalAttempts;

    }


    if (resultAttempts) {

        resultAttempts.textContent =
            totalAttempts;

    }


    // =========================
    // AVERAGE SCORE
    // =========================

    let totalPercentage = 0;


    results.forEach(function(result) {

        totalPercentage +=
            Number(result.percentage) || 0;

    });


    let averageScoreValue = 0;


    if (results.length > 0) {

        averageScoreValue =
            totalPercentage /
            results.length;

    }


    const averageScore =
        document.getElementById(
            "averageScore"
        );


    if (averageScore) {

        averageScore.textContent =
            averageScoreValue.toFixed(1) +
            "%";

    }


    // =========================
    // PASSED RESULTS
    // =========================

    let passed = 0;


    results.forEach(function(result) {

        if (
            Number(result.percentage) >= 40
        ) {

            passed++;

        }

    });


    const passedResults =
        document.getElementById(
            "passedResults"
        );


    if (passedResults) {

        passedResults.textContent =
            passed;

    }

}


// =========================
// USER MANAGEMENT
// =========================

function manageUsers() {

    const container =
        document.getElementById(
            "usersTableContainer"
        );


    if (!container) {

        alert(
            "User management table is not available."
        );

        return;
    }


    const students =
        getStudents();


    updateStudentCount();


    container.innerHTML = "";


    if (students.length === 0) {

        container.innerHTML = `

            <div class="admin-empty-row">
                No registered students found.
            </div>

        `;

        return;
    }


    const table =
        document.createElement("div");


    table.className =
        "results-table";


    // =========================
    // TABLE HEADER
    // =========================

    const header =
        document.createElement("div");


    header.className =
        "results-table-row results-table-header";


    header.innerHTML = `

        <span>
            Name
        </span>

        <span>
            Email
        </span>

        <span>
            Enrollment
        </span>

        <span>
            Registered
        </span>

        <span>
            Action
        </span>

    `;


    table.appendChild(header);


    // =========================
    // STUDENT ROWS
    // =========================

    students.forEach(function(student) {

        const row =
            document.createElement("div");


        row.className =
            "results-table-row";


        row.innerHTML = `

            <span>
                ${student.name}
            </span>

            <span>
                ${student.email}
            </span>

            <span>
                ${student.enrollmentNo}
            </span>

            <span>
                ${student.registeredAt}
            </span>

            <span>

                <button
                    onclick="deleteStudent(${student.id})">

                    Delete

                </button>

            </span>

        `;


        table.appendChild(row);

    });


    container.appendChild(table);

}


// =========================
// DELETE STUDENT
// =========================

function deleteStudent(studentId) {

    const students =
        getStudents();


    const student =
        students.find(function(item) {

            return item.id === studentId;

        });


    if (!student) {

        alert(
            "Student not found."
        );

        return;
    }


    const confirmed =
        confirm(
            'Delete student "' +
            student.name +
            '"?'
        );


    if (!confirmed) {
        return;
    }


    const updatedStudents =
        students.filter(function(item) {

            return item.id !== studentId;

        });


    localStorage.setItem(
        "students",
        JSON.stringify(updatedStudents)
    );


    updateStudentCount();


    alert(
        "Student deleted successfully."
    );


    manageUsers();

}


// =========================
// VIEW ALL RESULTS
// =========================

function viewResults() {

    const container =
        document.getElementById(
            "resultsTableContainer"
        );


    if (!container) {

        alert(
            "Results table is not available."
        );

        return;
    }


    const storedResults =
        localStorage.getItem(
            "quizResults"
        );


    let results = [];


    if (storedResults) {

        try {

            results =
                JSON.parse(storedResults);


            if (!Array.isArray(results)) {

                results = [];

            }

        } catch (error) {

            results = [];

        }

    }


    container.innerHTML = "";


    if (results.length === 0) {

        container.innerHTML = `

            <div class="admin-empty-row">
                No quiz attempts found.
            </div>

        `;

        return;
    }


    const table =
        document.createElement("div");


    table.className =
        "results-table";


    // =========================
    // TABLE HEADER
    // =========================

    const header =
        document.createElement("div");


    header.className =
        "results-table-row results-table-header";


    header.innerHTML = `

        <span>
            Quiz
        </span>

        <span>
            Score
        </span>

        <span>
            Percentage
        </span>

        <span>
            Status
        </span>

        <span>
            Date
        </span>

    `;


    table.appendChild(header);


    // =========================
    // RESULT ROWS
    // =========================

    results.forEach(function(result) {

        const row =
            document.createElement("div");


        row.className =
            "results-table-row";


        const percentage =
            Number(result.percentage) || 0;


        const passed =
            percentage >= 40;


        const statusClass =
            passed
                ? "result-passed"
                : "result-failed";


        const statusText =
            passed
                ? "Passed"
                : "Failed";


        row.innerHTML = `

            <span>
                ${result.quizTitle}
            </span>

            <span>
                ${result.score}/${result.total}
            </span>

            <span>
                ${percentage.toFixed(1)}%
            </span>

            <span class="${statusClass}">
                ${statusText}
            </span>

            <span>
                ${result.date}
            </span>

        `;


        table.appendChild(row);

    });


    container.appendChild(table);

}


// =========================
// LOGOUT
// =========================

function logoutAdmin() {

    const confirmed =
        confirm("Are you sure you want to logout?");

    if (!confirmed) {
        return;
    }

    // Remove admin session
    localStorage.removeItem("adminLoggedIn");

    // Redirect to login page
    window.location.href = "index.html";

}


// =========================
// INITIALIZE ADMIN DASHBOARD
// =========================

getQuizzes();

displayQuizTable();

updateAdminStatistics();