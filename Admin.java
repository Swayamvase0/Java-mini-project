package onlinequiz;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Admin extends User {

    private int adminId;
    private List<Quiz> managedQuizzes;

    public Admin(int userId, String name, String email,
                 String password, String role, int adminId) {

        super(userId, name, email, password, role);

        this.adminId = adminId;
        this.managedQuizzes = new ArrayList<>();
    }

    @Override
    public void viewDashboard() {
        System.out.println("Admin Dashboard");
        System.out.println("System-wide statistics will be shown here.");
    }

    public void manageUsers() {
        System.out.println("Managing users...");
    }

    public void manageQuizzes() {
        System.out.println("Managing quizzes...");
    }

    public void manageQuestions() {
        System.out.println("Managing questions...");
    }

    public void viewAllResults() {
        System.out.println("Viewing all results...");
    }

    public Quiz createQuiz(Scanner scanner) {

        System.out.println("\n===== CREATE QUIZ =====");

        System.out.print("Enter quiz ID: ");
        int quizId = Integer.parseInt(scanner.nextLine());

        System.out.print("Enter quiz title: ");
        String title = scanner.nextLine();

        System.out.print("Enter category: ");
        String category = scanner.nextLine();

        System.out.print("Enter duration in minutes: ");
        int duration = Integer.parseInt(scanner.nextLine());

        Quiz quiz = new Quiz(
                quizId,
                title,
                category,
                duration,
                0
        );

        managedQuizzes.add(quiz);

        System.out.println("Quiz created successfully.");

        return quiz;
    }

    public void addMCQToQuiz(Quiz quiz, Scanner scanner) {

        System.out.println("\n===== Add MCQ Questions =====");

        System.out.print("How many questions do you want to add? ");
        int numberOfQuestions = Integer.parseInt(scanner.nextLine());

        for (int i = 0; i < numberOfQuestions; i++) {

            System.out.println("\n--- Question " + (i + 1) + " ---");

            System.out.print("Enter question: ");
            String questionText = scanner.nextLine();

            System.out.print("Enter marks: ");
            int marks = Integer.parseInt(scanner.nextLine());

            System.out.print("Enter difficulty: ");
            String difficulty = scanner.nextLine();

            System.out.print("Enter option A: ");
            String optionA = scanner.nextLine();

            System.out.print("Enter option B: ");
            String optionB = scanner.nextLine();

            System.out.print("Enter option C: ");
            String optionC = scanner.nextLine();

            System.out.print("Enter option D: ");
            String optionD = scanner.nextLine();

            System.out.print("Enter correct option (A/B/C/D): ");
            char correctOption = scanner.nextLine().toUpperCase().charAt(0);

            int questionId = quiz.getQuestionCount() + 1;

            MCQQuestion question = new MCQQuestion(
                    questionId,
                    questionText,
                    marks,
                    difficulty,
                    optionA,
                    optionB,
                    optionC,
                    optionD,
                    correctOption
            );

            quiz.addQuestionToQuiz(question);

            System.out.println("Question added successfully.");
        }
    }
}