export const createUserSchema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 1 },
    userId: { type: "string", pattern: "^[0-9]+$" },
    email: { type: "string", format: "email" },
    age: { type: "number", minimum: 0 }
  },
  required: ["username", "userId", "email", "age"],
  additionalProperties: false
} as const;
