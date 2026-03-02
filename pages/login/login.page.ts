import { expect } from "@playwright/test";
import { LoginTestData } from "@/pages/login/login.data";
import { BasePage } from "@/pages/base/base.page";
import { LoginLocators } from "@/pages/login/login.locator"

export class LoginPage extends BasePage {

  async fillUsername(): Promise<void> {
    await this.scrollIntoView(LoginLocators.username);
    await this.fill(LoginLocators.username, LoginTestData.valid.username);
  }

  async fillPassword(): Promise<void> {
    await this.scrollIntoView(LoginLocators.password);
    await this.fill(LoginLocators.password, LoginTestData.valid.password);
  }

  async clickLoginButton(): Promise<void> {
    await this.scrollIntoView(LoginLocators.loginBtn);
    await this.click(LoginLocators.loginBtn);
  }

  async login(username: string, password: string) {
    await this.fillUsername();
    await this.fillPassword();
    await this.clickLoginButton();
  }

  async verifyLoginSuccess(expectedText: string): Promise<void> {
  await expect(this.page.locator(LoginLocators.loginSucessMgs)).toContainText(expectedText);
}

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).not.toHaveURL(/login/i);
  }

  // async expectLoginFormVisible(): Promise<void> {
  //   await this.waitForElement(Selectors.login.email);
  //   await this.waitForElement(Selectors.login.password);
  //   await this.waitForElement(Selectors.login.submit);
  // }
}
