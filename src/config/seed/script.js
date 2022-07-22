import fs from "fs";
import pg from "pg";

const { Pool } = pg;

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
};

const connection = new Pool(databaseConfig);

(async () => {
  await connection.query("CREATE DATABASE valex-test;");
  const seedQuery = fs.readFileSync("./src/config/seed/seed.sql", {
    encoding: "utf8",
  });

  connection.query(seedQuery, (err, res) => {
    console.log(err, res);
    console.log("Seeding Completed!");
    connection.end();
  });
})();
