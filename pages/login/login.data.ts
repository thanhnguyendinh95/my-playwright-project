export const LoginTestData = {
  valid: {
    username: "practice",
    password: "SuperSecretPassword!",
  },
  invalid: {
    username: "wrong",
    password: "wrong",
  },
} as const;