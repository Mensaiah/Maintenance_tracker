/* eslint-disable node/no-unsupported-features/es-syntax */
import client from "./client";

const queryData = async (test, value) => {
  try {
    const result = await client.query(test, value);

    return result.rows;
  } catch (error) {
    console.log("Failed on error " + error);
  }
};

export default queryData;
