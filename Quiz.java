package onlinequiz;

import java.util.ArrayList;
import java.util.List;

public class Quiz {

    private int quizId;
    private String title;
    private String category;
    private int durationMinutes;
    private int totalMarks;
    private List<Question> questionList;
    private boolean isActive;

    public Quiz(int quizId, String title, String category,
                int durationMinutes, int totalMarks) {

        this.quizId = quizId;
        this.title = title;
        this.category = category;
        this.durationMinutes = durationMinutes;
        this.totalMarks = totalMarks;
        this.questionList = new ArrayList<>();
        this.isActive = false;
    }

    public void createQuiz() {
        System.out.println("Quiz created: " + title);
    }

    public void editQuiz(String title, String Category, int durationMinutes) {

        this.title = title;
        this.category = Category;
        this.durationMinutes = durationMinutes;

        System.out.println("Quiz Updated Successfully.");
    }

    public void deleteQuiz() {
        System.out.println("Quiz deleted: " + title);
    }

    public void addQuestionToQuiz(Question question) {
        questionList.add(question);
    }

    public void startQuiz(int studentId) {

        System.out.println(
                "Student " + studentId + " started quiz: " + title
        );

        System.out.println("Questions in the quiz:");

        for (Question question : questionList) {
            System.out.println(question);
        }
    }

    public void displayQuestions() {

        System.out.println("Questions in the quiz:");

        for (Question question : questionList) {
            System.out.println(question);
        }
    }

    public void displayQuizDetails() {

        System.out.println("\n===== QUIZ DETAILS =====");
        System.out.println("Quiz ID: " + quizId);
        System.out.println("Title: " + title);
        System.out.println("Category: " + category);
        System.out.println("Duration: " + durationMinutes + " minutes");
        System.out.println("Total Marks: " + getTotalMarks());
        System.out.println("Number of Questions: " + questionList.size());
        System.out.println("Status: " + (isActive ? "Active" : "Inactive"));
    }

    public void submitQuiz(String[] answers) {
        System.out.println("Quiz submitted: " + title);
    }

    public Question getQuestion(int index) {
        return questionList.get(index);
    }

    public int getTotalMarks() {

        int total = 0;

        for (Question question : questionList) {
            total += question.getMarks();
        }

        return total;
    }

    public int getQuestionCount() {
        return questionList.size();
    }

    public int getQuizId() {
        return quizId;
    }

    public String getTitle() {
        return title;
    }

    public int getDurationMinutes() {
    return durationMinutes;
}

    public void activateQuiz() {

        isActive = true;

        System.out.println("Quiz activated successfully.");
    }

    public void deactivateQuiz() {

        isActive = false;

        System.out.println("Quiz deactivated successfully.");
    }

    public boolean isActive() {

        return isActive;
    }
}