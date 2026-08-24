import { test, expect } from "../../src/fixtures/baseFixture";
import { API_MESSAGES, HTTP_STATUS } from "../../src/constants/messages";

test("unregistered credentials are rejected", async ({ api, factory }) => {
  const credentials = factory.getRandomUnregisteredCredentials();

  const response = await api.auth.verifyLogin(credentials.email, credentials.password);
  const body = await response.json();

  expect(response.status()).toBe(HTTP_STATUS.OK);
  expect(body.message).toEqual(API_MESSAGES.USER_NOT_FOUND);
});
