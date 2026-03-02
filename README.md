# Playwright E2E Automation Project

This project uses **Playwright + TypeScript** with the **Page Object Model (POM)** pattern for UI automation.

## 1. Project Structure and Purpose

```text
my-playwright-project/
+-- pages/
�   +-- base/
�   �   +-- base.page.ts
�   +-- login/
�       +-- login.page.ts
�       +-- login.locator.ts
�       +-- login.data.ts
+-- tests/
�   +-- Login/
�       +-- login.success.test.ts
+-- utils/
�   +-- env.ts
�   +-- selectors.ts
�   +-- data/
�       +-- users.json
+-- playwright.config.ts
+-- package.json
+-- tsconfig.json
+-- .env
+-- .env.example
```

- `pages/base/base.page.ts`  
  Base page class containing common reusable methods such as `goto`, `fill`, `click`, `waitForElement`, and `scrollIntoView`.

- `pages/login/login.page.ts`  
  Login Page Object with login-specific actions and assertions.

- `pages/login/login.locator.ts`  
  Central place for all login page locators.

- `pages/login/login.data.ts`  
  Test data for login scenarios (valid and invalid credentials).

- `tests/`  
  Test specs. Example: `tests/Login/login.success.test.ts` for successful login flow.

- `utils/env.ts`  
  Environment variable loader (reads values from `.env`, e.g. `BASE_URL`).

- `utils/data/users.json`  
  Optional external test data for users.

- `playwright.config.ts`  
  Global Playwright configuration: test directory, browser projects, timeouts, reporters, trace/screenshot/video settings.

- `package.json`  
  NPM scripts and project dependencies.

- `test-results/` and `playwright-report/`  
  Auto-generated execution artifacts and HTML report.

## 2. Installation and Setup

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm

### Install dependencies

```bash
npm install
npm run install:browsers
```

### Environment setup

1. Create `.env` from `.env.example` (if needed).
2. Make sure `BASE_URL` is defined:

```env
BASE_URL=https://practice.expandtesting.com/login
```

## 3. How to Run Test Files

### Run all tests

```bash
npm test
```

### Run in headed mode

```bash
npm run test:headed
```

### Run in debug mode

```bash
npm run test:debug
```

### Run one specific test file

```bash
npx playwright test tests/Login/login.success.test.ts --project=chromium --headed
```

### Run tests by tag (example: `@login`)

```bash
npx playwright test --grep "@login"
```

### Open HTML report

```bash
npm run test:report
```
