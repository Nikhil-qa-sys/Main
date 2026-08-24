import { faker } from "@faker-js/faker";

export interface LoginCredentials {
  email: string;
  password: string;
}

export const userDataFactory = {
  getRandomUnregisteredCredentials(): LoginCredentials {
    return {
      email: faker.internet.email({ provider: "pw-framework-test.dev" }),
      password: faker.internet.password({ length: 12 }),
    };
  },
};
