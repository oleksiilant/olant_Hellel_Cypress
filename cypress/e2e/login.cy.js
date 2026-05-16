import LoginPage from "../helpers/Page Objects/LoginPage";

describe("Login test suite", () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.navigate();
  });

  it("Login with valid credentials", () => {
    loginPage.login("standard_user", "secret_sauce");

    loginPage.containUrlCheck("/inventory");
  });

  it("Try to log in with empty password", () => {
    loginPage.usernameField.type("standard_user");
    loginPage.loginButton.click();

    loginPage.errorMessage.should(
      "have.text",
      "Epic sadface: Password is required",
    );
  });
});
