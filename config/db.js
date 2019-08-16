/* eslint-disable node/no-unsupported-features/es-syntax */
import { Client } from "pg";
import config from "config";

const client = new Client({
  user: "postgres",
  password: config.get("postgresPassword"),
  host: "localhost",
  port: 5432,
  database: "mendit"
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
