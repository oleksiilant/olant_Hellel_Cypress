import BasePage from "./BasePage";

export default class extends BasePage {
  cardItem(itemName) {
    return cy.contains(".inventory_item_description", itemName);
  }
}
