import InventoryPage from "../helpers/Page Objects/InventoryPage";
import LoginPage from "../helpers/Page Objects/LoginPage";

describe("Footer tests", () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();

  beforeEach(() => {
    loginPage.navigate();
    loginPage.login("standard_user", "secret_sauce");
  });

  it("Facebook redirect test", () => {
    inventoryPage.footer.checkVisibility(inventoryPage.footer.footer);
    inventoryPage.footer.faceBookButton.invoke("removeAttr", "target").click();
    inventoryPage.containUrlCheck("facebook");
  });
});
