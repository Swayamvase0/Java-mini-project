package onlinequiz;

public class MCQQuestion extends Question {

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private char correctOption;

    public MCQQuestion(int questionId, String questionText,
                       int marks, String difficulty,
                       String optionA, String optionB,
                       String optionC, String optionD,
                       char correctOption) {

        super(questionId, questionText, marks, difficulty);

        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.correctOption = correctOption;
    }

    @Override
    public boolean checkAnswer(String response) {

        return response.toUpperCase().charAt(0) == correctOption;
    }

    public void editMCQ(String questionText,
                        int marks,
                        String difficulty,
                        String optionA,
                        String optionB,
                        String optionC,
                        String optionD,
                        char correctOption) {

        setQuestionText(questionText);
        setMarks(marks);
        setDifficulty(difficulty);

        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.correctOption = correctOption;

        System.out.println("Question updated successfully.");
    }

    @Override
    public String toString() {

        return "Question: " + getQuestionText() +
               "\nA. " + optionA +
               "\nB. " + optionB +
               "\nC. " + optionC +
               "\nD. " + optionD;
    }
}