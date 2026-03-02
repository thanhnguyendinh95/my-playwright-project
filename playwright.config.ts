import { defineConfig, devices } from "@playwright/test";
import { loadEnv } from "@/utils/env";

const env = loadEnv(["BASE_URL"]);

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 10_000 },

  // Output folders (auto-generated)
  outputDir: "test-results",

  reporter: [["html", { outputFolder: "playwright-report", open: "never" }]],

  use: {
    baseURL: env.BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox",  use: { ...devices["Desktop Firefox"] } },
    { name: "webkit",   use: { ...devices["Desktop Safari"] } },
  ]
});
