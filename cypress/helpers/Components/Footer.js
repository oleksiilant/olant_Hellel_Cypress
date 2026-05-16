import BaseComponent from "./BaseComponent";

export default class extends BaseComponent {
  get footer() {
    return cy.get("footer");
  }

  get socialButtons() {
    return this.footer.find(".social li a");
  }

  get xButton() {
    return this.socialButtons.eq(0);
  }

  get faceBookButton() {
    return this.socialButtons.eq(1);
  }

  get linkedInButton() {
    return this.socialButtons.eq(2);
  }
}
