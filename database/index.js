require("dotenv").config();
const config =
  process.env.NODE_ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: true
      }
    : {
        host: "127.0.0.1",
        user: process.env.USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: "blog-site"
      };
const knex = require("knex")({
  client: "pg",
  connection: config
});
module.exports = knex;
