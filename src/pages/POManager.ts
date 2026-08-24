import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LoginPage } from "./LoginPage";

export class POManager {
  private basePageInstance?: BasePage;
  private loginPageInstance?: LoginPage;

  constructor(private readonly page: Page) {}

  get basePage(): BasePage {
    if (!this.basePageInstance) {
      this.basePageInstance = new BasePage(this.page);
    }
    return this.basePageInstance;
  }

  get loginPage(): LoginPage {
    if (!this.loginPageInstance) {
      this.loginPageInstance = new LoginPage(this.page);
    }
    return this.loginPageInstance;
  }
}
