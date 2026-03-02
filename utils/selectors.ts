/**
 * Put shared selectors here.
 * Prefer stable selectors like data-testid when your app supports it.
 */
export const Selectors = {
  login: {
    email: '[data-testid="email"]',
    password: '[data-testid="password"]',
    submit: '[data-testid="login-submit"]'
  },
  common: {
    toast: '[data-testid="toast"]'
  }
} as const;
