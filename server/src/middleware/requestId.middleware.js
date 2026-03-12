import { randomUUID } from "crypto";

const requestId = (req, _res, next) => {
  req.requestId = req.headers["x-request-id"] || randomUUID();
  next();
};

export default requestId;
