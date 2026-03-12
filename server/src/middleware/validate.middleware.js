import { ApiError } from "../utils/ApiError.js";

/**
 * Generic Zod validation middleware.
 * Accepts a Zod schema and validates req.body against it.
 */
const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    throw new ApiError(400, "Validation failed", errors);
  }

  req.body = result.data;
  next();
};

export default validate;
