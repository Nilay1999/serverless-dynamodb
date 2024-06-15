export const createPostSchema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    postId: { type: "string", pattern: "^[0-9]+$" },
    body: { type: "string" }
  },
  required: ["title", "postId", "body"],
  additionalProperties: false
} as const;
