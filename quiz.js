// =========================
// QUIZ VARIABLES
// =========================

let questions = [];

let currentQuestion = 0;

let userAnswers = [];

let timeRemaining = 0;

let timer;

let selectedQuiz;


// =========================
// HTML ELEMENTS
// =========================

const quizTitle =
    document.getElementById("quizTitle");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const optionA =
    document.getElementById("optionA");

const optionB =
    document.getElementById("optionB");

const optionC =
    document.getElementById("optionC");

const optionD =
    document.getElementById("optionD");

const timerElement =
    document.getElementById("timer");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const submitButton =
    document.getElementById("submitButton");


// =========================
// LOAD SELECTED QUIZ
// =========================

function loadSelectedQuiz() {

    const quizId =
        Number(
            localStorage.getItem("selectedQuizId")
        );


    const storedQuizzes =
        localStorage.getItem("quizzes");


    if (!storedQuizzes) {

        alert(
            "No quizzes available."
        );

        window.location.href =
            "student.html";

        return;
    }


    let quizzes;


    try {

        quizzes =
            JSON.parse(storedQuizzes);

    } catch (error) {

        console.error(
            "Could not read quizzes:",
            error
        );

        alert(
            "Quiz data could not be loaded."
        );

        window.location.href =
            "student.html";

        return;
    }


    selectedQuiz =
        quizzes.find(function(quiz) {

            return quiz.id === quizId;

        });


    if (!selectedQuiz) {

        alert(
            "Quiz not found."
        );

        window.location.href =
            "student.html";

        return;
    }


    if (!selectedQuiz.active) {

        alert(
            "This quiz is currently inactive."
        );

        window.location.href =
            "student.html";

        return;
    }


    questions =
        Array.isArray(selectedQuiz.questions)
            ? selectedQuiz.questions
            : [];


    if (questions.length === 0) {

        alert(
            "This quiz has no questions yet."
        );

        window.location.href =
            "student.html";

        return;
    }


    quizTitle.textContent =
        selectedQuiz.title;


    timeRemaining =
        Number(selectedQuiz.duration) * 60;


    userAnswers =
        new Array(questions.length);


    currentQuestion = 0;


    loadQuestion();

    startTimer();

}


// =========================
// LOAD QUESTION
// =========================

function loadQuestion() {

    const question =
        questions[currentQuestion];


    if (!question) {
        return;
    }


    questionNumber.textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;


    questionText.textContent =
        question.question;


    optionA.textContent =
        question.options.A;


    optionB.textContent =
        question.options.B;


    optionC.textContent =
        question.options.C;


    optionD.textContent =
        question.options.D;


    const selectedAnswer =
        userAnswers[currentQuestion];


    const radioButtons =
        document.querySelectorAll(
            'input[name="answer"]'
        );


    radioButtons.forEach(
        function(radio) {

            radio.checked =
                radio.value ===
                selectedAnswer;

        }
    );


    previousButton.disabled =
        currentQuestion === 0;


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.style.display =
            "none";

        submitButton.style.display =
            "block";

    } else {

        nextButton.style.display =
            "block";

        submitButton.style.display =
            "none";

    }

}


// =========================
// SAVE CURRENT ANSWER
// =========================

function saveAnswer() {

    const selected =
        document.querySelector(
            'input[name="answer"]:checked'
        );


    if (selected) {

        userAnswers[currentQuestion] =
            selected.value;

    }

}


// =========================
// NEXT QUESTION
// =========================

if (nextButton) {

    nextButton.addEventListener(
        "click",
        function() {

            saveAnswer();


            if (
                currentQuestion <
                questions.length - 1
            ) {

                currentQuestion++;

                loadQuestion();

            }

        }
    );

}


// =========================
// PREVIOUS QUESTION
// =========================

if (previousButton) {

    previousButton.addEventListener(
        "click",
        function() {

            saveAnswer();


            if (currentQuestion > 0) {

                currentQuestion--;

                loadQuestion();

            }

        }
    );

}


// =========================
// SUBMIT BUTTON
// =========================

if (submitButton) {

    submitButton.addEventListener(
        "click",
        function() {

            saveAnswer();

            submitQuiz();

        }
    );

}


// =========================
// GET CURRENT STUDENT
// =========================

function getCurrentStudent() {

    const storedStudent =
        localStorage.getItem(
            "currentStudent"
        );


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
// SUBMIT QUIZ
// =========================

function submitQuiz() {

    clearInterval(timer);


    let score = 0;


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        if (
            userAnswers[i] ===
            questions[i].correctAnswer
        ) {

            score++;

        }

    }


    const percentage =
        (score / questions.length) *
        100;


    // =========================
    // GET CURRENT STUDENT
    // =========================

    const currentStudent =
        getCurrentStudent();


    // =========================
    // CREATE RESULT OBJECT
    // =========================

    const result = {

        id:
            Date.now(),


        studentId:
            currentStudent
                ? currentStudent.id
                : null,


        studentName:
            currentStudent
                ? currentStudent.name
                : null,


        studentEmail:
            currentStudent
                ? currentStudent.email
                : null,


        enrollmentNo:
            currentStudent
                ? currentStudent.enrollmentNo
                : null,


        quizId:
            selectedQuiz.id,


        quizTitle:
            selectedQuiz.title,


        score:
            score,


        total:
            questions.length,


        percentage:
            percentage,


        date:
            new Date().toLocaleString()

    };


    // =========================
    // GET OLD RESULTS
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
                "Could not read old results:",
                error
            );

            results = [];

        }

    }


    // =========================
    // SAVE NEW RESULT
    // =========================

    results.push(result);


    localStorage.setItem(
        "quizResults",
        JSON.stringify(results)
    );


    // =========================
    // SAVE CURRENT RESULT
    // =========================

    localStorage.setItem(
        "quizScore",
        score
    );


    localStorage.setItem(
        "quizTotal",
        questions.length
    );


    localStorage.setItem(
        "quizPercentage",
        percentage
    );


    localStorage.setItem(
        "lastQuizTitle",
        selectedQuiz.title
    );


    // Clear temporary quiz session
    localStorage.removeItem(
        "selectedQuizId"
    );


    // =========================
    // OPEN RESULT PAGE
    // =========================

    window.location.href =
        "result.html";

}


// =========================
// START TIMER
// =========================

function startTimer() {

    clearInterval(timer);


    updateTimerDisplay();


    timer =
        setInterval(
            function() {

                timeRemaining--;


                updateTimerDisplay();


                if (
                    timeRemaining <= 0
                ) {

                    clearInterval(timer);


                    alert(
                        "Time is up! Quiz submitted automatically."
                    );


                    submitQuiz();

                }

            },
            1000
        );

}


// =========================
// UPDATE TIMER DISPLAY
// =========================

function updateTimerDisplay() {

    if (!timerElement) {
        return;
    }


    const minutes =
        Math.floor(
            timeRemaining / 60
        );


    const seconds =
        timeRemaining % 60;


    timerElement.textContent =
        minutes +
        ":" +
        String(seconds)
            .padStart(2, "0");

}


// =========================
// START QUIZ
// =========================

loadSelectedQuiz();