// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://qauto.forstudy.space/', {
//       auth: {
//         username: 'guest',
//         password: 'welcome2qauto',
//       }
//     })
// }) 

const BASE_URL = "https://qauto.forstudy.space/";
const AUTH = { auth: { username: "guest", password: "welcome2qauto" } };

Cypress.on("uncaught:exception", () => false);

describe("qauto.forstudy.space", () => {
  beforeEach(() => {
    cy.visit(BASE_URL, AUTH);
  });

  describe("Header", () => {
    it("Login", () => {
      cy.url().should("contain", "qauto.forstudy.space");
      cy.get("header").should("be.visible");
    });

    it("Home button", () => {
      cy.get("nav.header_nav")
        .contains("a", "Home")
        .should("be.visible")
        .and("have.class", "-active")
        .and("have.attr", "href", "/");
    });

    it("About button", () => {
      cy.get('[appscrollto="aboutSection"]')
        .should("be.visible")
        .and("have.text", "About");
    });

    it("Contacts button", () => {
      cy.get('[appscrollto="contactsSection"]')
        .should("be.visible")
        .and("have.text", "Contacts");
    });

    it("Guest log in button", () => {
      cy.get(".header-link.-guest").should("be.visible").click();
      cy.url().should("contain", "/panel/garage");
      cy.get('a.sidebar_btn[routerlink="garage"]').should("be.visible");
    });

    it("Sign In button", () => {
      cy.get(".header_signin").should("be.visible").click();
      cy.get(".modal-dialog").should("be.visible");
      cy.get(".modal-dialog")
        .contains("button", "Registration")
        .should("be.visible");
    });
  });

  describe("Footer", () => {
    it("Facebook icon", () => {
      cy.get(".icon-facebook")
        .closest("a.socials_link")
        .should(
          "have.attr",
          "href",
          "https://www.facebook.com/Hillel.IT.School",
        )
        .invoke("removeAttr", "target")
        .click();
      cy.wait(2000);
      cy.url().should("contain", "facebook.com/Hillel.IT.School");
    });

    it("Telegram icon", () => {
      cy.get(".icon-telegram")
        .click()
        .closest("a.socials_link")
        .should("have.attr", "href", "https://t.me/ithillel_kyiv")
        .and("have.attr", "target", "_blank");
    });

    it("YouTube icon", () => {
      cy.get(".icon-youtube")
        .closest("a.socials_link")
        .invoke("attr", "href")
        .should("contain", "youtube.com/user/HillelITSchool");
      cy.get(".icon-youtube")
        .closest("a.socials_link")
        .invoke("removeAttr", "target")
        .click();
      cy.wait(2000);
      cy.url().should("contain", "youtube.com");
    });

    it("Instagram icon", () => {
      cy.get(".icon-instagram")
        .closest("a.socials_link")
        .should(
          "have.attr",
          "href",
          "https://www.instagram.com/hillel_itschool/",
        )
        .invoke("removeAttr", "target")
        .click();
      cy.wait(2000);
      cy.url().should("contain", "instagram.com/hillel_itschool");
    });

    it("LinkedIn icon", () => {
      cy.get(".icon-linkedin")
        .closest("a.socials_link")
        .should(
          "have.attr",
          "href",
          "https://www.linkedin.com/school/ithillel/",
        )
        .invoke("removeAttr", "target")
        .click();
      cy.wait(4000);
      cy.url().should("contain", "linkedin.com");
      cy.title().should("contain", "LinkedIn");
    });

    it("ithillel.ua", () => {
      cy.get('a[href="https://ithillel.ua"]')
        .scrollIntoView()
        .should("be.visible")
        .and("have.text", "ithillel.ua")
        .invoke("removeAttr", "target")
        .click();
      cy.origin("https://ithillel.ua", () => {
        cy.url().should("contain", "ithillel.ua");
        cy.get("#btn-consultation-hero")
          .should("be.visible")
          .and("contain.text", "Безкоштовна консультація");
      });
    });

    it("support@ithillel.ua", () => {
      cy.get('a.contacts_link[href^="mailto:"]')
        .scrollIntoView()
        .should("be.visible")
        .and("contain.text", "support@ithillel.ua");
    });
  });
});
