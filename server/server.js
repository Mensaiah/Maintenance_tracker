/* eslint-disable node/no-unsupported-features/es-syntax */

import express from "express";

import requestRoute from "../routes/api/resquests";
import authRoute from "../routes/api/auth";
import userRoute from "../routes/api/users";

const app = express();

// Initialize Body Parser

app.use(express.json({ extended: false }));
// connectDB();
const PORT = process.env.PORT || 7000;

app.use("/api/v1/users/requests/", requestRoute);
app.use("/api/v1/users/auth/", authRoute);
app.use("/api/v1/users/", userRoute);

app.get("/", (req, res) => {
  res.send("App Working");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
