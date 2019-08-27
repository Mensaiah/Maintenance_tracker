/* eslint-disable node/no-unsupported-features/es-syntax */

import express from "express";
import config from "config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResults } from "express-validator";

const router = express.Router();

// @route  POST /api/v1/user/auth/signUp
// @desc  Register user
// @access Public
router.post(
  "/auth/signup",
  // Add User Validation
  [
    //
  ],
  (req, res) => {
    try {
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

export default router;
