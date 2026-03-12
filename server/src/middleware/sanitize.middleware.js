/**
 * Strips HTML/script tags from all string fields in req.body.
 * Prevents stored XSS attacks.
 */
const stripTags = (value) => {
  if (typeof value === "string") {
    return value.replace(/<[^>]*>/g, "").trim();
  }
  if (typeof value === "object" && value !== null) {
    for (const key of Object.keys(value)) {
      value[key] = stripTags(value[key]);
    }
  }
  return value;
};

const sanitize = (req, _res, next) => {
  if (req.body) req.body = stripTags(req.body);
  next();
};

export default sanitize;
