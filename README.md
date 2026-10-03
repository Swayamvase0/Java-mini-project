# Online Quiz System

A web-based Online Quiz System developed using HTML, CSS and JavaScript.

The system provides separate Student and Admin interfaces for managing quizzes, questions, students and quiz results.

---

## Features

### Student Module

- Student registration
- Student login
- Student dashboard
- View available quizzes
- Attempt active quizzes
- Previous and Next question navigation
- Quiz timer
- Automatic quiz submission
- Automatic score calculation
- Percentage calculation
- View quiz results
- View result history
- View average score
- Edit student profile
- Student session protection
- Logout functionality

### Admin Module

- Admin login
- Admin dashboard
- View quiz statistics
- Create quizzes
- Edit quizzes
- Activate / deactivate quizzes
- Delete quizzes
- Add questions
- View question bank
- Edit questions
- Delete questions
- View registered students
- Delete students
- View quiz results
- Admin session protection
- Logout functionality

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser Local Storage
System Modules
1. User Management

Handles:

Student registration
Student login
Admin login
Student profile
User information
Session management
2. Quiz Management

Handles:

Quiz creation
Quiz editing
Quiz activation/deactivation
Quiz deletion
Quiz availability
3. Question Management

Handles:

Adding questions
Viewing questions
Editing questions
Deleting questions
Multiple-choice questions
4. Result Management

Handles:

Score calculation
Percentage calculation
Result storage
Student result history
Average score
Admin result viewing
5. Admin Panel

Provides centralized management of:

Quizzes
Questions
Students
Results
Dashboard statistics
Student Workflow
Student Registration
        ↓
Student Login
        ↓
Student Dashboard
        ↓
View Available Quizzes
        ↓
Select Quiz
        ↓
Attempt Questions
        ↓
Submit Quiz
        ↓
Calculate Score
        ↓
Store Result
        ↓
View Result
Admin Workflow
Admin Login
     ↓
Admin Dashboard
     ↓
Manage Quizzes
     ↓
Manage Questions
     ↓
Manage Students
     ↓
View Results
Data Storage

The project uses browser localStorage for data persistence.

Important storage items include:

students
currentStudent
quizzes
quizResults
selectedQuizId
adminLoggedIn

This allows the project to operate without a separate database server.

Quiz System

Each quiz contains:

Quiz ID
Quiz title
Category
Duration
Questions
Active / inactive status

Only active quizzes are available to students.

Question System

The current question system uses multiple-choice questions with four options:

A
B
C
D

The selected answer is evaluated against the correct option during submission.

Result Calculation

After submitting a quiz:

Score
   ↓
Total Questions
   ↓
Percentage
   ↓
Result Stored
   ↓
Student Result History

The student's dashboard also calculates the average percentage from their stored results.

Security and Access Control

The frontend implements basic session protection using localStorage.

Examples:

Student pages require a student session.
Quiz access requires a logged-in student and selected quiz.
Admin pages require an admin session.
Logout removes the corresponding session information.

Note: This is a frontend academic project. localStorage authentication is suitable for demonstration purposes but is not equivalent to server-side authentication used in production systems.

How to Run
Option 1 — Directly in Browser

Open:

index.html

in a web browser.

Option 2 — VS Code

Open the project folder in VS Code and use a local development server such as Live Server.

Then open:

index.html
Demo Admin Account
Email: admin@gmail.com
Password: admin123

Students can also create their own account using the registration form.

Project Objective

The objective of this project is to develop an interactive online examination platform that demonstrates:

User management
Quiz management
Question management
Result management
Role-based interfaces
JavaScript programming
DOM manipulation
Local data persistence
Client-side validation
Basic session management
Future Improvements

Possible future enhancements include:

Backend server
SQL database
Secure password hashing
JWT/session-based authentication
Question randomization
Multiple question types
Password reset
Admin analytics
Leaderboard
Detailed performance charts
Cloud deployment
Responsive mobile improvements
Author

Swayam Vase

CSE (Data Science)

Online Quiz System Project