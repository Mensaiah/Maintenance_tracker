/* eslint-disable node/no-unsupported-features/es-syntax */

import express from "express";
import config from "config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import queryData from "../../config/db";
import auth from "../../middleware/auth";

const date = new Date();
const router = express.Router();

// @route  POST /api/user/auth/signUp
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
        await queryData(
          `INSERT INTO users(user_uid, full_name, username,pass_word,date_created, admin_status) values(uuid_generate_v4(),$1,$2 , $3, $4, $5)`,
          [name, username, sealedPassword, date, adminStatus]
        );

        // Generate Token
        const payload = {
          user: await queryData(
            "SELECT user_uid FROM users WHERE username = $1",
            [username]
          )
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 36000 },
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
// @route  POST /api/user/auth/signin
// @desc  Authenticate User and get token
// @access Public
router.post(
  "/signin",
  [
    check("username", "Please include a valid username").exists(),
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
      const user = await queryData("SELECT * FROM users WHERE username = $1", [
        username
      ]);

      if (!user[0] || user.length < 1) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, user[0].pass_word);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      // Generate Token
      const payload = {
        user: await queryData(
          "SELECT user_uid FROM users WHERE username = $1",
          [username]
        )
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route  GET api/auth/
// @desc  Get authenticated user
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await queryData(
      "SELECT user_uid,full_name,username,date_created,admin_status FROM users WHERE user_uid = $1",
      [req.user]
    );
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
});

// @route  DELETE api/auth/
// @desc DELETE authenticated user
// @access Private
router.delete("/", auth, async (req, res) => {
  try {
    await queryData("DELETE FROM requests WHERE user_uid = $1", [req.user]);
    await queryData("DELETE FROM users WHERE user_uid = $1", [req.user]);
    res.json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
});
export default router;
