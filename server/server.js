/* eslint-disable node/no-unsupported-features/es-syntax */

import express from "express";

import router from "../routes/api/resquests";

import connectDB from "../config/db";

const app = express();

connectDB();
const PORT = process.env.PORT || 5500;

app.use("/api/v1/users/requests/", router);

app.get("/", (req, res) => {
  res.send("App Working");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
