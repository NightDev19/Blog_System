class authService {
  constructor() {
    // Initialization code here
  }
  login(data) {
    // Login logic here
    const { username, password } = data;
    const userExists = users.find((user) => user.email === data.email);
    if (!userExists) {
      throw new Error("User not found");
    }
    if (userExists.password !== data.password) {
      throw new Error("Invalid password");
    }
    return { message: "Login successful", user: userExists };
  }
  logout() {
    // Logout logic here
    return { message: "Logout successful" };
  }
  register(data) {
    // Registration logic here
  }
  forgotPassword() {
    // Forgot password logic here
  }
  resetPassword() {
    // Reset password logic here
  }
}
export default new authService();
