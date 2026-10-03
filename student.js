// =========================
// GET CURRENT STUDENT
// =========================

function getCurrentStudent() {

    const storedStudent =
        localStorage.getItem("currentStudent");


    if (!storedStudent) {

        return null;

    }


    try {

        return JSON.parse(
            storedStudent
        );

    } catch (error) {

        console.error(
            "Could not read current student:",
            error
        );

        return null;

    }

}


// =========================
// GET QUIZZES
// =========================

function getStudentQuizzes() {

    const storedQuizzes =
        localStorage.getItem("quizzes");


    if (!storedQuizzes) {

        return [];

    }


    try {

        const quizzes =
            JSON.parse(storedQuizzes);


        if (Array.isArray(quizzes)) {

            return quizzes;

        }

    } catch (error) {

        console.error(
            "Could not read quizzes:",
            error
        );

    }


    return [];

}


// =========================
// GET RESULTS
// =========================

function getStudentResults() {

    const storedResults =
        localStorage.getItem("quizResults");


    if (!storedResults) {

        return [];

    }


    try {

        const results =
            JSON.parse(storedResults);


        if (Array.isArray(results)) {

            return results;

        }

    } catch (error) {

        console.error(
            "Could not read quiz results:",
            error
        );

    }


    return [];

}


// =========================
// UPDATE STUDENT PROFILE
// =========================

function updateStudentProfile() {

    const student =
        getCurrentStudent();


    if (!student) {

        return;

    }


    const name =
        student.name || "Student";


    const email =
        student.email || "-";


    const enrollment =
        student.enrollmentNo || "-";


    // =========================
    // WELCOME NAME
    // =========================

    const welcomeName =
        document.getElementById(
            "studentWelcomeName"
        );


    if (welcomeName) {

        welcomeName.textContent =
            name;

    }


    // =========================
    // PROFILE INITIAL
    // =========================

    const initial =
        name
            .charAt(0)
            .toUpperCase();


    const profileInitial =
        document.getElementById(
            "studentProfileInitial"
        );


    if (profileInitial) {

        profileInitial.textContent =
            initial;

    }


    const profileLargeInitial =
        document.getElementById(
            "profileLargeInitial"
        );


    if (profileLargeInitial) {

        profileLargeInitial.textContent =
            initial;

    }


    // =========================
    // PROFILE NAME
    // =========================

    const profileName =
        document.getElementById(
            "profileName"
        );


    if (profileName) {

        profileName.textContent =
            name;

    }


    const profileNameDetail =
        document.getElementById(
            "profileNameDetail"
        );


    if (profileNameDetail) {

        profileNameDetail.textContent =
            name;

    }


    // =========================
    // EMAIL
    // =========================

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );


    if (profileEmail) {

        profileEmail.textContent =
            email;

    }


    // =========================
    // ENROLLMENT
    // =========================

    const profileEnrollment =
        document.getElementById(
            "profileEnrollment"
        );


    if (profileEnrollment) {

        profileEnrollment.textContent =
            enrollment;

    }

}


// =========================
// CREATE QUIZ CARD
// =========================

function createQuizCard(quiz) {

    const card =
        document.createElement("div");


    card.className =
        "quiz-card";


    const questionCount =
        Array.isArray(quiz.questions)
            ? quiz.questions.length
            : 0;


    card.innerHTML = `

        <div class="quiz-card-header">

            <span class="quiz-category">
                ${quiz.category}
            </span>

            <span class="active-badge">
                Active
            </span>

        </div>


        <h3>
            ${quiz.title}
        </h3>


        <p>
            Test your knowledge of
            ${quiz.category} concepts.
        </p>


        <div class="quiz-info">

            <span>
                📝 ${questionCount} Questions
            </span>

            <span>
                ⏱ ${quiz.duration} Minutes
            </span>

        </div>


        <button
            class="primary-button"
            onclick="startQuiz(${quiz.id})">

            Start Quiz →

        </button>

    `;


    return card;

}


// =========================
// DISPLAY AVAILABLE QUIZZES
// =========================

function displayStudentQuizzes() {

    const quizzes =
        getStudentQuizzes();


    const activeQuizzes =
        quizzes.filter(function(quiz) {

            return quiz.active === true;

        });


    // =========================
    // MAIN QUIZ SECTION
    // =========================

    const quizGrid =
        document.getElementById(
            "quizGrid"
        );


    if (quizGrid) {

        quizGrid.innerHTML = "";


        if (activeQuizzes.length === 0) {

            quizGrid.innerHTML = `

                <div class="admin-empty-row">
                    No active quizzes available.
                </div>

            `;

        }

        else {

            activeQuizzes.forEach(
                function(quiz) {

                    quizGrid.appendChild(
                        createQuizCard(quiz)
                    );

                }
            );

        }

    }


    // =========================
    // DASHBOARD QUIZ SECTION
    // =========================

    const dashboardQuizGrid =
        document.getElementById(
            "dashboardQuizGrid"
        );


    if (dashboardQuizGrid) {

        dashboardQuizGrid.innerHTML = "";


        const dashboardQuizzes =
            activeQuizzes.slice(0, 3);


        if (dashboardQuizzes.length === 0) {

            dashboardQuizGrid.innerHTML = `

                <div class="admin-empty-row">
                    No active quizzes available.
                </div>

            `;

        }

        else {

            dashboardQuizzes.forEach(
                function(quiz) {

                    dashboardQuizGrid.appendChild(
                        createQuizCard(quiz)
                    );

                }
            );

        }

    }


    // =========================
    // AVAILABLE QUIZ COUNT
    // =========================

    const availableQuizCount =
        document.getElementById(
            "availableQuizCount"
        );


    if (availableQuizCount) {

        availableQuizCount.textContent =
            activeQuizzes.length;

    }

}


// =========================
// GET RESULTS FOR CURRENT STUDENT
// =========================

function getCurrentStudentResults() {

    const student =
        getCurrentStudent();


    const results =
        getStudentResults();


    if (!student) {

        return [];

    }


    /*
     * Different versions of the quiz system
     * may store the student's email, id or
     * enrollment number.
     */

    return results.filter(
        function(result) {

            if (
                result.studentId !== undefined &&
                String(result.studentId) ===
                String(student.id)
            ) {

                return true;

            }


            if (
                result.studentEmail !== undefined &&
                result.studentEmail ===
                student.email
            ) {

                return true;

            }


            if (
                result.email !== undefined &&
                result.email ===
                student.email
            ) {

                return true;

            }


            if (
                result.enrollmentNo !== undefined &&
                result.enrollmentNo ===
                student.enrollmentNo
            ) {

                return true;

            }


            return false;

        }
    );

}


// =========================
// UPDATE STUDENT STATISTICS
// =========================

function updateStudentStatistics() {

    const results =
        getCurrentStudentResults();


    // =========================
    // ATTEMPT COUNT
    // =========================

    const attemptedQuizCount =
        document.getElementById(
            "attemptedQuizCount"
        );


    if (attemptedQuizCount) {

        attemptedQuizCount.textContent =
            results.length;

    }


    // =========================
    // AVERAGE SCORE
    // =========================

    let totalPercentage = 0;


    results.forEach(
        function(result) {

            totalPercentage +=
                Number(
                    result.percentage
                ) || 0;

        }
    );


    let average =
        0;


    if (results.length > 0) {

        average =
            totalPercentage /
            results.length;

    }


    const averageScore =
        document.getElementById(
            "studentAverageScore"
        );


    if (averageScore) {

        averageScore.textContent =
            average.toFixed(1) +
            "%";

    }

}


// =========================
// CREATE RESULT TABLE
// =========================

function createResultTable(
    results,
    container
) {

    container.innerHTML = "";


    if (results.length === 0) {

        container.innerHTML = `

            <div class="admin-empty-row">
                You have not attempted any quiz yet.
            </div>

        `;

        return;

    }


    const header =
        document.createElement("div");


    header.className =
        "result-row result-heading";


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

    `;


    container.appendChild(header);


    results
        .slice()
        .reverse()
        .forEach(
            function(result) {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "result-row";


                const percentage =
                    Number(
                        result.percentage
                    ) || 0;


                const passed =
                    percentage >= 40;


                const statusClass =
                    passed
                        ? "passed"
                        : "failed";


                const statusText =
                    passed
                        ? "Passed"
                        : "Failed";


                row.innerHTML = `

                    <span>
                        ${result.quizTitle || "Quiz"}
                    </span>

                    <span>
                        ${result.score || 0}
                        /
                        ${result.total || 0}
                    </span>

                    <span>
                        ${percentage.toFixed(1)}%
                    </span>

                    <span class="${statusClass}">
                        ${statusText}
                    </span>

                `;


                container.appendChild(row);

            }
        );

}


// =========================
// DISPLAY RECENT RESULTS
// =========================

function displayRecentResults() {

    const container =
        document.getElementById(
            "recentResultsContainer"
        );


    if (!container) {

        return;

    }


    const results =
        getCurrentStudentResults();


    const recentResults =
        results.slice(-5);


    createResultTable(
        recentResults,
        container
    );

}


// =========================
// DISPLAY ALL RESULTS
// =========================

function displayAllStudentResults() {

    const container =
        document.getElementById(
            "studentResultsContainer"
        );


    if (!container) {

        return;

    }


    const results =
        getCurrentStudentResults();


    createResultTable(
        results,
        container
    );

}


// =========================
// START QUIZ
// =========================

function startQuiz(quizId) {

    const quizzes =
        getStudentQuizzes();


    const quiz =
        quizzes.find(
            function(item) {

                return String(item.id) ===
                    String(quizId);

            }
        );


    if (!quiz) {

        alert(
            "Quiz not found."
        );

        return;

    }


    if (!quiz.active) {

        alert(
            "This quiz is currently inactive."
        );

        return;

    }


    /*
     * Store the selected quiz so quiz.js
     * can load it.
     */

    localStorage.setItem(
        "selectedQuizId",
        String(quiz.id)
    );


    window.location.href =
        "quiz.html";

}


// =========================
// LOGOUT
// =========================

function logout() {

    const confirmed =
        confirm("Are you sure you want to logout?");

    if (!confirmed) {
        return;
    }

    // Remove student session
    localStorage.removeItem("currentStudent");

    // Remove temporary quiz session
    localStorage.removeItem("selectedQuizId");

    // Redirect to login
    window.location.href = "index.html";

}


// =========================
// LOAD STUDENT DASHBOARD
// =========================

function loadStudentDashboard() {

    const student =
        getCurrentStudent();


    if (!student) {

        alert(
            "Please login as a student first."
        );


        window.location.href =
            "index.html";


        return;

    }


    updateStudentProfile();

    displayStudentQuizzes();

    updateStudentStatistics();

    displayRecentResults();

    displayAllStudentResults();

}


// =========================
// INITIALIZE
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadStudentDashboard();

    }
);