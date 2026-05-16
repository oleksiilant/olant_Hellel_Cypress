import InventoryPage from "../helpers/Page Objects/InventoryPage";
import LoginPage from "../helpers/Page Objects/LoginPage";

describe("Inventory page test", () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();

  beforeEach(() => {
    loginPage.navigate();
    loginPage.login("standard_user", "secret_sauce");
  });

  it("Add item to card", () => {
    inventoryPage.cardItem("Sauce Labs Backpack").within(() => {
      cy.get("button").click();
    });
  });
});
