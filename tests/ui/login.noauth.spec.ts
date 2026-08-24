import { test, expect } from "../../src/fixtures/baseFixture";

test("guest can open the login page", async ({ pom }) => {
  await pom.basePage.goto("/");
  await pom.loginPage.open();

  await expect(pom.loginPage.loginHeading).toBeVisible();
});
