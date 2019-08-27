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
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user[0].user_uid;
    console.log(decoded.user[0].user_uid);

    next();
  } catch (error) {
    res.status(401).json({ msg: "Token Not Valid" });
  }
};

export default auth;
