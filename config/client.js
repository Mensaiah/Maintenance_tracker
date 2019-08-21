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
client.connect();

export default client;
