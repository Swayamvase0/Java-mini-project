package onlinequiz;

import java.util.Date;

public class Result {

    private int resultId;
    private int studentId;
    private int quizId;
    private int scoreObtained;
    private int totalMarks;
    private double percentage;
    private Date dateAttempted;

    public Result(int resultId, int studentId, int quizId, int totalMarks) {

        this.resultId = resultId;
        this.studentId = studentId;
        this.quizId = quizId;
        this.totalMarks = totalMarks;
        this.scoreObtained = 0;
        this.percentage = 0.0;
        this.dateAttempted = new Date();
    }

    public void calculateScore(String[] answers, Quiz quiz) {

    scoreObtained = 0;

    for (int i = 0; i < answers.length; i++) {

        if (quiz.getQuestion(i).checkAnswer(answers[i])) {
             scoreObtained += quiz.getQuestion(i).getMarks();
        }
    }

    percentage = ((double) scoreObtained / totalMarks) * 100;
}

    public void generateResult() {
        System.out.println("Result generated.");
    }

    public void viewResult() {
        System.out.println("Score: " + scoreObtained + "/" + totalMarks);
        System.out.println("Percentage: " + percentage + "%");
    }

    public void generateReport(int quizId) {
        System.out.println("Generating report for quiz: " + quizId);
    }
    public int getQuizId() {
    return quizId;
}

}