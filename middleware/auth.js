/* eslint-disable node/no-unsupported-features/es-syntax */
import jwt from "jsonwebtoken";
import config from "config";

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No Token, authentication denied" });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, config.verify("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token Not Valid" });
  }
};

export default auth;
