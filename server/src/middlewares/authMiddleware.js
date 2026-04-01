const jwt = require("jsonwebtoken");
const { responseHeader } = require("../utility/utiliti");
const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies["x-Acc_Token"] || req.headers["authorization"].split(" ")[1];
    if (!token) return responseHeader.error(res, "Invalid token!", 404);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) return responseHeader.error(res, "Unathorized token!", 401);
    req.user = decoded;
    next();
  } catch (e) {
    throw new Error("Invalid or Expire Token!", e);
  }
};
module.exports = authMiddleware;
