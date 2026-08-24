import { test as base } from "@playwright/test";
import { POManager } from "../pages/POManager";
import { ApiManager } from "../api/ApiManager";
import { userDataFactory } from "../utils/userDataFactory";

interface Fixtures {
  pom: POManager;
  api: ApiManager;
  factory: typeof userDataFactory;
}

export const test = base.extend<Fixtures>({
  pom: async ({ page }, use) => {
    await use(new POManager(page));
  },

  api: async ({ request }, use) => {
    await use(new ApiManager(request));
  },

  factory: async ({}, use) => {
    await use(userDataFactory);
  },
});

export { expect } from "@playwright/test";
