// =========================
// LOGIN FORM
// =========================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("password")
                    .value;


            const role =
                document
                    .getElementById("role")
                    .value;


            const message =
                document
                    .getElementById(
                        "loginMessage"
                    );


            // =========================
            // ADMIN LOGIN
            // =========================

            if (role === "admin") {

                if (
                    email === "admin@gmail.com" &&
                    password === "admin123"
                ) {

                    message.textContent =
                        "Admin login successful.";

                    message.style.color =
                        "green";


                    setTimeout(
                        function() {

                            window.location.href =
                                "admin.html";

                        },
                        500
                    );

                } else {

                    message.textContent =
                        "Invalid admin email or password.";

                    message.style.color =
                        "red";

                }

                return;

            }


            // =========================
            // STUDENT LOGIN
            // =========================

            /*
             * Demo student account.
             *
             * We now also create currentStudent
             * so quiz results can be linked to
             * this student.
             */

            if (
                email === "rahul@gmail.com" &&
                password === "1234"
            ) {

                const demoStudent = {

                    id:
                        "demo-rahul",

                    name:
                        "Rahul",

                    email:
                        "rahul@gmail.com",

                    password:
                        "1234",

                    enrollmentNo:
                        "DEMO001",

                    role:
                        "student"

                };


                localStorage.setItem(
                    "currentStudent",
                    JSON.stringify(
                        demoStudent
                    )
                );


                message.textContent =
                    "Student login successful.";

                message.style.color =
                    "green";


                setTimeout(
                    function() {

                        window.location.href =
                            "student.html";

                    },
                    500
                );


                return;

            }


            // =========================
            // REGISTERED STUDENTS
            // =========================

            const storedStudents =
                localStorage.getItem(
                    "students"
                );


            let students = [];


            if (storedStudents) {

                try {

                    students =
                        JSON.parse(
                            storedStudents
                        );


                    if (
                        !Array.isArray(
                            students
                        )
                    ) {

                        students = [];

                    }

                } catch (error) {

                    console.error(
                        "Could not read students:",
                        error
                    );

                    students = [];

                }

            }


            const student =
                students.find(
                    function(student) {

                        return (
                            student.email ===
                            email &&

                            student.password ===
                            password
                        );

                    }
                );


            if (student) {

                // =========================
                // SAVE CURRENT STUDENT
                // =========================

                localStorage.setItem(
                    "currentStudent",
                    JSON.stringify(
                        student
                    )
                );


                message.textContent =
                    "Student login successful.";

                message.style.color =
                    "green";


                setTimeout(
                    function() {

                        window.location.href =
                            "student.html";

                    },
                    500
                );

            } else {

                message.textContent =
                    "Invalid student email or password.";

                message.style.color =
                    "red";

            }

        }
    );

}


// =========================
// SHOW REGISTRATION FORM
// =========================

function showRegisterForm() {

    const container =
        document.getElementById(
            "registerFormContainer"
        );


    if (!container) {
        return;
    }


    container.style.display =
        "block";


    const loginFormElement =
        document.getElementById(
            "loginForm"
        );


    if (loginFormElement) {

        loginFormElement.style.display =
            "none";

    }


    const registerSection =
        document.querySelector(
            ".register-section"
        );


    if (registerSection) {

        registerSection.style.display =
            "none";

    }


    const loginMessage =
        document.getElementById(
            "loginMessage"
        );


    if (loginMessage) {

        loginMessage.textContent =
            "";

    }

}


// =========================
// HIDE REGISTRATION FORM
// =========================

function hideRegisterForm() {

    const container =
        document.getElementById(
            "registerFormContainer"
        );


    if (!container) {
        return;
    }


    container.style.display =
        "none";


    const loginFormElement =
        document.getElementById(
            "loginForm"
        );


    if (loginFormElement) {

        loginFormElement.style.display =
            "block";

    }


    const registerSection =
        document.querySelector(
            ".register-section"
        );


    if (registerSection) {

        registerSection.style.display =
            "block";

    }


    const registerMessage =
        document.getElementById(
            "registerMessage"
        );


    if (registerMessage) {

        registerMessage.textContent =
            "";

    }

}


// =========================
// REGISTRATION FORM
// =========================

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // =========================
            // GET FORM DATA
            // =========================

            const name =
                document
                    .getElementById(
                        "registerName"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "registerEmail"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById(
                        "registerPassword"
                    )
                    .value;


            const enrollmentNo =
                document
                    .getElementById(
                        "registerEnrollment"
                    )
                    .value
                    .trim();


            const message =
                document
                    .getElementById(
                        "registerMessage"
                    );


            // =========================
            // BASIC VALIDATION
            // =========================

            if (
                !name ||
                !email ||
                !password ||
                !enrollmentNo
            ) {

                message.textContent =
                    "Please fill all fields.";

                message.style.color =
                    "red";

                return;

            }


            if (password.length < 4) {

                message.textContent =
                    "Password must contain at least 4 characters.";

                message.style.color =
                    "red";

                return;

            }


            // =========================
            // EMAIL VALIDATION
            // =========================

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                message.textContent =
                    "Please enter a valid email address.";

                message.style.color =
                    "red";

                return;

            }


            // =========================
            // GET EXISTING STUDENTS
            // =========================

            const storedStudents =
                localStorage.getItem(
                    "students"
                );


            let students = [];


            if (storedStudents) {

                try {

                    students =
                        JSON.parse(
                            storedStudents
                        );


                    if (
                        !Array.isArray(
                            students
                        )
                    ) {

                        students = [];

                    }

                } catch (error) {

                    console.error(
                        "Could not read students:",
                        error
                    );

                    students = [];

                }

            }


            // =========================
            // CHECK DUPLICATE EMAIL
            // =========================

            const emailExists =
                students.some(
                    function(student) {

                        return (
                            student.email
                                .toLowerCase() ===
                            email
                        );

                    }
                );


            if (emailExists) {

                message.textContent =
                    "An account with this email already exists.";

                message.style.color =
                    "red";

                return;

            }


            // =========================
            // CHECK DUPLICATE ENROLLMENT
            // =========================

            const enrollmentExists =
                students.some(
                    function(student) {

                        return (
                            student.enrollmentNo ===
                            enrollmentNo
                        );

                    }
                );


            if (enrollmentExists) {

                message.textContent =
                    "This enrollment number is already registered.";

                message.style.color =
                    "red";

                return;

            }


            // =========================
            // CREATE STUDENT
            // =========================

            const newStudent = {

                id:
                    Date.now(),

                name:
                    name,

                email:
                    email,

                password:
                    password,

                enrollmentNo:
                    enrollmentNo,

                role:
                    "student",

                registeredAt:
                    new Date().toLocaleString()

            };


            // =========================
            // ADD STUDENT
            // =========================

            students.push(
                newStudent
            );


            // =========================
            // SAVE STUDENTS
            // =========================

            localStorage.setItem(
                "students",
                JSON.stringify(
                    students
                )
            );


            // =========================
            // SUCCESS MESSAGE
            // =========================

            message.textContent =
                "Registration successful! You can now login.";

            message.style.color =
                "green";


            // =========================
            // RESET FORM
            // =========================

            registerForm.reset();


            // =========================
            // RETURN TO LOGIN
            // =========================

            setTimeout(
                function() {

                    hideRegisterForm();


                    const loginEmail =
                        document.getElementById(
                            "email"
                        );


                    if (loginEmail) {

                        loginEmail.value =
                            email;

                    }

                },
                1000
            );

        }
    );

}