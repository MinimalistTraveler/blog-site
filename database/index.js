require("dotenv").config();

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: process.env.USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "blog-site"
  }
});
module.exports = knex;
