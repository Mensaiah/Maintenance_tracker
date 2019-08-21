/* eslint-disable node/no-unsupported-features/es-syntax */

import express from "express";
import config from "config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import queryData from "../../config/db";
import auth from "../../middleware/auth";

const router = express.Router();
const date = new Date();

// @route  POST /api/v1/user/auth/signUp
// @desc  Register user
// @access Public
router.post(
  "/signup",
  // Add User Validation
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("username", "Username is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please include a password with minimum of six characters"
    ).isLength({ min: 8 })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, username, password, adminStatus } = req.body;
    try {
      // Check If Username is Unique
      const user = await queryData("SELECT * FROM users WHERE username = $1", [
        username
      ]);

      if (user[0]) {
        res.status(400).json({ errors: [{ msg: "Username already taken" }] });
      } else {
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const sealedPassword = await bcrypt.hash(password, salt);

        // Save User
        queryData(
          `INSERT INTO users(user_uid, full_name, username,pass_word,date_created, admin_status) values(uuid_generate_v4(),$1,$2 , $3, $4, $5)`,
          [name, username, sealedPassword, date, adminStatus]
        );

        // Generate Token
        const payload = {
          user: {
            id: await queryData(
              "SELECT user_uid FROM users WHERE username = $1",
              [username]
            )
          }
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);


export default router;
