import { test } from "@playwright/test";
import { loadEnv } from "@/utils/env";
import { LoginPage } from "@/pages/login/login.page";

test("Verify that login is OK @login", async ({ page, baseURL }) => {
    const env = loadEnv(["BASE_URL"]);
    const loginPage = new LoginPage(page);

    await test.step("1. Access to the website", async () => {
    await loginPage.goto(baseURL || env.BASE_URL);
    });

    await test.step("2. Input username", async () => {
    await loginPage.fillUsername();
    });

    await test.step("3. Input password", async () => {
    await loginPage.fillPassword();
    });

    await test.step("4. Click to Login Btn", async () => {
    await loginPage.clickLoginButton();
    });

    await test.step("5. Verify Login success", async () => {
    await loginPage.verifyLoginSuccess("You logged into a secure area!");
    });

});