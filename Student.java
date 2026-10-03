package onlinequiz;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Student extends User {

    private String enrollmentNo;
    private List<Result> attemptedQuizzes;

    public Student(int userId, String name, String email,
                   String password, String role, String enrollmentNo) {

        super(userId, name, email, password, role);

        this.enrollmentNo = enrollmentNo;
        this.attemptedQuizzes = new ArrayList<>();
    }

    @Override
    public void viewDashboard() {

        System.out.println("Student Dashboard");
        System.out.println(
                "Available quizzes and past results will be shown here."
        );
    }

    public void attemptQuiz(Quiz quiz, Scanner scanner) {

        System.out.println("\n===== START QUIZ =====");
        System.out.println("Quiz: " + quiz.getTitle());

        quiz.startQuiz(getUserId());

        int numberOfQuestions = quiz.getQuestionCount();

        String[] answers = new String[numberOfQuestions];

        long startTime = System.currentTimeMillis();

        int durationMinutes = quiz.getDurationMinutes();

        long durationMillis =
                durationMinutes * 60L * 1000L;

        for (int i = 0; i < numberOfQuestions; i++) {

            long currentTime = System.currentTimeMillis();

            long elapsedTime = currentTime - startTime;

            long remainingTime =
                    durationMillis - elapsedTime;

            if (remainingTime <= 0) {

                System.out.println(
                        "\nTime is up! Quiz submitted automatically."
                );

                break;
            }

            long remainingSeconds =
                    remainingTime / 1000;

            long minutes =
                    remainingSeconds / 60;

            long seconds =
                    remainingSeconds % 60;

            System.out.println(
                    "Time remaining: "
                            + minutes
                            + ":"
                            + String.format("%02d", seconds)
            );

            System.out.print(
                    "Enter answer for Question "
                            + (i + 1)
                            + " (A/B/C/D): "
            );

            answers[i] = scanner.nextLine();
        }

        Result result = new Result(
                attemptedQuizzes.size() + 1,
                getUserId(),
                quiz.getQuizId(),
                quiz.getTotalMarks()
        );

        result.calculateScore(answers, quiz);

        attemptedQuizzes.add(result);

        System.out.println("\nQuiz submitted successfully.");

        result.viewResult();
    }

    public void viewResult(int quizId) {

        System.out.println("\n===== RESULT =====");

        for (Result result : attemptedQuizzes) {

            if (result.getQuizId() == quizId) {

                result.viewResult();

                return;
            }
        }

        System.out.println(
                "No result found for this quiz."
        );
    }
}