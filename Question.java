package onlinequiz;

public abstract class Question {

    private int questionId;
    private String questionText;
    private int marks;
    private String difficulty;

    public Question(int questionId, String questionText,
                    int marks, String difficulty) {

        this.questionId = questionId;
        this.questionText = questionText;
        this.marks = marks;
        this.difficulty = difficulty;
    }

    public void addQuestion() {
        System.out.println("Question added.");
    }

    public void editQuestion() {
        System.out.println("Question edited.");
    }

    public void deleteQuestion() {
        System.out.println("Question deleted.");
    }

    public abstract boolean checkAnswer(String response);

    public int getMarks() {
        return marks;
    }

    public String getQuestionText() {
        return questionText;
    }

    public int getQuestionId() {
        return questionId;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public void setMarks(int marks) {
        this.marks = marks;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
}