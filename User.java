package onlinequiz;

public abstract class User {

    private int userId;
    private String name;
    private String email;
    private String password;
    private String role;

    public User(int userId, String name, String email,
                String password, String role) {

        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public int getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public boolean login(String email, String password) {

        return this.email.equals(email) &&
               this.password.equals(password);
    }

    public void register() {
        System.out.println("User registration completed.");
    }

    public void logout() {
        System.out.println(name + " logged out.");
    }

    public void updateProfile(String name, String email, String password) {

        this.name = name;
        this.email = email;
        this.password = password;

        System.out.println("Profile updated successfully.");
    }

    public abstract void viewDashboard();
}