package onlinequiz;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        Student student = new Student(
                1,
                "Rahul",
                "rahul@gmail.com",
                "1234",
                "STUDENT",
                "EN001"
        );

        Admin admin = new Admin(
                2,
                "Admin User",
                "admin@gmail.com",
                "admin123",
                "ADMIN",
                101
        );

        List<Quiz> quizzes = new ArrayList<>();

        boolean running = true;

        while (running) {

            System.out.println("\n===== ONLINE QUIZ SYSTEM =====");
            System.out.println("1. Student Registration");
            System.out.println("2. Student Login");
            System.out.println("3. Admin Login");
            System.out.println("4. Exit");

            System.out.print("Enter your choice: ");
            int choice = Integer.parseInt(scanner.nextLine());

            if (choice == 1) {

                System.out.println("\n===== STUDENT REGISTRATION =====");

                System.out.print("Enter name: ");
                String name = scanner.nextLine();

                System.out.print("Enter email: ");
                String email = scanner.nextLine();

                System.out.print("Enter password: ");
                String password = scanner.nextLine();

                System.out.print("Enter enrollment number: ");
                String enrollmentNo = scanner.nextLine();

                student = new Student(
                        3,
                        name,
                        email,
                        password,
                        "STUDENT",
                        enrollmentNo
                );

                student.register();

                System.out.println("Registration successful.");

            } else if (choice == 2) {

                System.out.print("Enter student email: ");
                String email = scanner.nextLine();

                System.out.print("Enter student password: ");
                String password = scanner.nextLine();

                if (student.login(email, password)) {

                    System.out.println("Student login successful.");
                    student.viewDashboard();

                    boolean studentRunning = true;

                    while (studentRunning) {

                        System.out.println("\n===== STUDENT PANEL =====");
                        System.out.println("1. Take Quiz");
                        System.out.println("2. View Result");
                        System.out.println("3. Update Profile");
                        System.out.println("4. Logout");

                        System.out.print("Enter your choice: ");

                        int studentChoice =
                                Integer.parseInt(scanner.nextLine());

                        if (studentChoice == 1) {

                            boolean hasActiveQuiz = false;

                            for (Quiz quiz : quizzes) {

                                if (quiz.isActive()) {
                                    hasActiveQuiz = true;
                                    break;
                                }
                            }

                            if (!hasActiveQuiz) {

                                System.out.println(
                                        "No active quizzes are currently available."
                                );

                            } else {

                                System.out.println(
                                        "\n===== AVAILABLE QUIZZES ====="
                                );

                                int quizNumber = 1;

                                for (Quiz q : quizzes) {

                                    if (q.isActive()) {

                                        System.out.println(
                                                quizNumber + ". "
                                                        + q.getTitle()
                                        );

                                        quizNumber++;
                                    }
                                }

                                System.out.print(
                                        "Select quiz number: "
                                );

                                int quizChoice =
                                        Integer.parseInt(
                                                scanner.nextLine()
                                        );

                                Quiz selectedQuiz = null;

                                int currentNumber = 1;

                                for (Quiz q : quizzes) {

                                    if (q.isActive()) {

                                        if (currentNumber == quizChoice) {

                                            selectedQuiz = q;
                                            break;
                                        }

                                        currentNumber++;
                                    }
                                }

                                if (selectedQuiz != null) {

                                    if (selectedQuiz.getQuestionCount() == 0) {

                                        System.out.println(
                                                "No questions available."
                                        );

                                    } else {

                                        student.attemptQuiz(
                                                selectedQuiz,
                                                scanner
                                        );
                                    }

                                } else {

                                    System.out.println(
                                            "Invalid quiz choice."
                                    );
                                }
                            }

                        } else if (studentChoice == 2) {

                            if (quizzes.isEmpty()) {

                                System.out.println(
                                        "No quizzes available."
                                );

                            } else {

                                System.out.println(
                                        "\n===== AVAILABLE QUIZZES ====="
                                );

                                for (int i = 0; i < quizzes.size(); i++) {

                                    Quiz q = quizzes.get(i);

                                    System.out.println(
                                            (i + 1) + ". "
                                                    + q.getTitle()
                                    );
                                }

                                System.out.print(
                                        "Select quiz number: "
                                );

                                int quizChoice =
                                        Integer.parseInt(
                                                scanner.nextLine()
                                        );

                                if (quizChoice >= 1 &&
                                    quizChoice <= quizzes.size()) {

                                    Quiz selectedQuiz =
                                            quizzes.get(
                                                    quizChoice - 1
                                            );

                                    student.viewResult(
                                            selectedQuiz.getQuizId()
                                    );

                                } else {

                                    System.out.println(
                                            "Invalid quiz choice."
                                    );
                                }
                            }

                        } else if (studentChoice == 3) {

                            System.out.print("Enter new name: ");
                            String newName = scanner.nextLine();

                            System.out.print("Enter new email: ");
                            String newEmail = scanner.nextLine();

                            System.out.print("Enter new password: ");
                            String newPassword = scanner.nextLine();

                            student.updateProfile(
                                    newName,
                                    newEmail,
                                    newPassword
                            );

                        } else if (studentChoice == 4) {

                            student.logout();
                            studentRunning = false;

                        } else {

                            System.out.println("Invalid choice.");
                        }
                    }

                } else {

                    System.out.println(
                            "Invalid student email or password."
                    );
                }

            } else if (choice == 3) {

                System.out.print("Enter admin email: ");
                String email = scanner.nextLine();

                System.out.print("Enter admin password: ");
                String password = scanner.nextLine();

                if (admin.login(email, password)) {

                    System.out.println("Admin login successful.");
                    admin.viewDashboard();

                    boolean adminRunning = true;

                    while (adminRunning) {

                        System.out.println("\n===== ADMIN PANEL =====");
                        System.out.println("1. Create Quiz");
                        System.out.println("2. Add Questions");
                        System.out.println("3. View Questions");
                        System.out.println("4. View Quiz Details");
                        System.out.println("5. Edit Quiz");
                        System.out.println("6. Delete Quiz");
                        System.out.println("7. Activate Quiz");
                        System.out.println("8. Deactivate Quiz");
                        System.out.println("9. Logout");

                        System.out.print("Enter your choice: ");

                        int adminChoice =
                                Integer.parseInt(scanner.nextLine());

                        if (adminChoice == 1) {

                            Quiz newQuiz =
                                    admin.createQuiz(scanner);

                            quizzes.add(newQuiz);

                        } else if (adminChoice == 2) {

                            if (quizzes.isEmpty()) {

                                System.out.println(
                                        "Please create a quiz first."
                                );

                            } else {

                                System.out.println(
                                        "\n===== SELECT QUIZ ====="
                                );

                                for (int i = 0; i < quizzes.size(); i++) {

                                    Quiz q = quizzes.get(i);

                                    System.out.println(
                                            (i + 1) + ". "
                                                    + q.getTitle()
                                    );
                                }

                                System.out.print(
                                        "Select quiz number: "
                                );

                                int quizChoice =
                                        Integer.parseInt(
                                                scanner.nextLine()
                                        );

                                if (quizChoice >= 1 &&
                                    quizChoice <= quizzes.size()) {

                                    Quiz selectedQuiz =
                                            quizzes.get(
                                                    quizChoice - 1
                                            );

                                    admin.addMCQToQuiz(
                                            selectedQuiz,
                                            scanner
                                    );

                                } else {

                                    System.out.println(
                                            "Invalid quiz choice."
                                    );
                                }
                            }

                        } else if (adminChoice == 3) {

                            if (quizzes.isEmpty()) {

                                System.out.println(
                                        "No quizzes available."
                                );

                            } else {

                                System.out.println(
                                        "\n===== SELECT QUIZ ====="
                                );

                                for (int i = 0; i < quizzes.size(); i++) {

                                    Quiz q = quizzes.get(i);

                                    System.out.println(
                                            (i + 1) + ". "
                                                    + q.getTitle()
                                    );
                                }

                                System.out.print(
                                        "Select quiz number: "
                                );

                                int quizChoice =
                                        Integer.parseInt(
                                                scanner.nextLine()
                                        );

                                if (quizChoice >= 1 &&
                                    quizChoice <= quizzes.size()) {

                                    Quiz selectedQuiz =
                                            quizzes.get(
                                                    quizChoice - 1
                                            );

                                    selectedQuiz.displayQuestions();

                                } else {

                                    System.out.println(
                                            "Invalid quiz choice."
                                    );
                                }
                            }

                        } else if (adminChoice == 4) {

                            if (quizzes.isEmpty()) {

                                System.out.println(
                                        "No quizzes available."
                                );

                            } else {

                                System.out.println(
                                        "\n===== SELECT QUIZ ====="
                                );

                                for (int i = 0; i < quizzes.size(); i++) {

                                    Quiz q = quizzes.get(i);

                                    System.out.println(
                                            (i + 1) + ". "
                                                    + q.getTitle()
                                    );
                                }

                                System.out.print(
                                        "Select quiz number: "
                                );

                                int quizChoice =
                                        Integer.parseInt(
                                                scanner.nextLine()
                                        );

                                if (quizChoice >= 1 &&
                                    quizChoice <= quizzes.size()) {

                                    Quiz selectedQuiz =
                                            quizzes.get(
                                                    quizChoice - 1
                                            );

                                    selectedQuiz.displayQuizDetails();

                                } else {

                                    System.out.println(
                                            "Invalid quiz choice."
                                    );
                                }
                            }

                        } else if (adminChoice == 5) {

                            if (quizzes.isEmpty()) {

                                System.out.println(
                                        "No quizzes available."
                                );

                            } else {

                                System.out.println(
                                        "\n===== SELECT QUIZ ====="
                                );

                                for (int i = 0; i < quizzes.size(); i++) {

                                    Quiz q = quizzes.get(i);

                                    System.out.println(
                                            (i + 1) + ". "
                                                    + q.getTitle()
                                    );
                                }

                                System.out.print(
                                        "Select quiz number: "
                                );

                                int quizChoice =
                                        Integer.parseInt(
                                                scanner.nextLine()
                                        );

                                if (quizChoice >= 1 &&
                                    quizChoice <= quizzes.size()) {

                                    Quiz selectedQuiz =
                                            quizzes.get(
                                                    quizChoice - 1
                                            );

                                    System.out.print(
                                            "Enter new quiz title: "
                                    );

                                    String newTitle =
                                            scanner.nextLine();

                                    System.out.print(
                                            "Enter new category: "
                                    );

                                    String newCategory =
                                            scanner.nextLine();

                                    System.out.print(
                                            "Enter new duration in minutes: "
                                    );

                                    int newDuration =
                                            Integer.parseInt(
                                                    scanner.nextLine()
                                            );

                                    selectedQuiz.editQuiz(
                                            newTitle,
                                            newCategory,
                                            newDuration
                                    );

                                } else {

                                    System.out.println(
                                            "Invalid quiz choice."
                                    );
                                }
                            }

                        } else if (adminChoice == 6) {

                            if (quizzes.isEmpty()) {

                                System.out.println(
                                        "No quizzes available."
                                );

                            } else {

                                System.out.println(
                                        "\n===== SELECT QUIZ ====="
                                );

                                for (int i = 0; i < quizzes.size(); i++) {

                                    Quiz q = quizzes.get(i);

                                    System.out.println(
                                            (i + 1) + ". "
                                                    + q.getTitle()
                                    );
                                }

                                System.out.print(
                                        "Select quiz number: "
                                );

                                int quizChoice =
                                        Integer.parseInt(
                                                scanner.nextLine()
                                        );

                                if (quizChoice >= 1 &&
                                    quizChoice <= quizzes.size()) {

                                    Quiz selectedQuiz =
                                            quizzes.get(
                                                    quizChoice - 1
                                            );

                                    selectedQuiz.deleteQuiz();

                                    quizzes.remove(
                                            quizChoice - 1
                                    );

                                    System.out.println(
                                            "Quiz removed from the system."
                                    );

                                } else {

                                    System.out.println(
                                            "Invalid quiz choice."
                                    );
                                }
                            }

                        } else if (adminChoice == 7) {

                            if (quizzes.isEmpty()) {

                                System.out.println(
                                        "No quizzes available."
                                );

                            } else {

                                System.out.println(
                                        "\n===== SELECT QUIZ ====="
                                );

                                for (int i = 0; i < quizzes.size(); i++) {

                                    Quiz q = quizzes.get(i);

                                    System.out.println(
                                            (i + 1) + ". "
                                                    + q.getTitle()
                                    );
                                }

                                System.out.print(
                                        "Select quiz number: "
                                );

                                int quizChoice =
                                        Integer.parseInt(
                                                scanner.nextLine()
                                        );

                                if (quizChoice >= 1 &&
                                    quizChoice <= quizzes.size()) {

                                    Quiz selectedQuiz =
                                            quizzes.get(
                                                    quizChoice - 1
                                            );

                                    selectedQuiz.activateQuiz();

                                } else {

                                    System.out.println(
                                            "Invalid quiz choice."
                                    );
                                }
                            }

                        } else if (adminChoice == 8) {

                            if (quizzes.isEmpty()) {

                                System.out.println(
                                        "No quizzes available."
                                );

                            } else {

                                System.out.println(
                                        "\n===== SELECT QUIZ ====="
                                );

                                for (int i = 0; i < quizzes.size(); i++) {

                                    Quiz q = quizzes.get(i);

                                    System.out.println(
                                            (i + 1) + ". "
                                                    + q.getTitle()
                                    );
                                }

                                System.out.print(
                                        "Select quiz number: "
                                );

                                int quizChoice =
                                        Integer.parseInt(
                                                scanner.nextLine()
                                        );

                                if (quizChoice >= 1 &&
                                    quizChoice <= quizzes.size()) {

                                    Quiz selectedQuiz =
                                            quizzes.get(
                                                    quizChoice - 1
                                            );

                                    selectedQuiz.deactivateQuiz();

                                } else {

                                    System.out.println(
                                            "Invalid quiz choice."
                                    );
                                }
                            }

                        } else if (adminChoice == 9) {

                            admin.logout();
                            adminRunning = false;

                        } else {

                            System.out.println("Invalid choice.");
                        }
                    }

                } else {

                    System.out.println(
                            "Invalid admin email or password."
                    );
                }

            } else if (choice == 4) {

                System.out.println(
                        "Exiting Online Quiz System..."
                );

                running = false;

            } else {

                System.out.println("Invalid choice.");
            }
        }

        scanner.close();
    }
}