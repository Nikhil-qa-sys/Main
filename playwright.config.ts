import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { resolveEnv } from "./src/config/EnvResolver";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const env = resolveEnv();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: env.BASE_URL,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "api",
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        baseURL: env.API_BASE_URL,
      },
    },
    {
      name: "chromium-noauth",
      testMatch: /.*\.noauth\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
