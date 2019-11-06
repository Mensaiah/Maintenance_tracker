/* eslint-disable node/no-unsupported-features/es-syntax */

import express from "express";
import cors from "cors";
import requestRoute from "../routes/api/requests";
import authRoute from "../routes/api/auth";
import userRoute from "../routes/api/users";

const app = express();

app.use(cors());
// Initialize Body Parser
app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 5000;

app.use("/api/v1/requests/", requestRoute);
app.use("/api/v1/users/auth/", authRoute);
app.use("/api/v1/users/requests", userRoute);

app.get("/", (req, res) => {
  res.send("App Working");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
