import { defineConfig, devices } from "@playwright/test"

// dotenv.config({ path: path.resolve(__dirname, ".env") });


export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    // baseURL: env.BASE_URL,
    // trace: "on-first-retry",
    trace :'retain-on-failure'
  },

  projects: [
  {
    name: "api",
    testMatch: /.*\.api\.spec\.ts/,
  },
  {
    name: "chromium-noauth",
    testMatch: /.*\.spec\.ts/,
    testIgnore: /.*\.api\.spec\.ts/,
    use: {
      ...devices["Desktop Chrome"],
    },
  },
],
});
