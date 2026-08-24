import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly signupOrLoginLink: Locator;
  readonly loginHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.signupOrLoginLink = page.getByRole("link", { name: "Signup / Login" });
    this.loginHeading = page.getByRole("heading", { name: "Login to your account" });
  }

  async open(): Promise<void> {
    await this.signupOrLoginLink.click();
  }
}
