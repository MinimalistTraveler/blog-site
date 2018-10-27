const request = require("supertest");
const express = require("express");
const app = express();
const routes = require("../routes");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);
const toBeType = require("jest-tobetype");
const database = [
  {
    user: "",
    email: "",
    hash: ""
  }
];
// NOTE: Be sure to delete the dummy user from the DB before testing otherwise it will fail.
describe("/register", function() {
  it("should return 200", async () => {
    const registerUser = await request(app)
      .post("/register")
      .send({
        username: "dummy",
        email: "dummy@gmail.com",
        password: "Testing#123"
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log(registerUser.text);
  });
});

describe("/signin", function() {
  it("should return 200", async () => {
    const userToken = await request(app)
      .post("/signin")
      .send({
        username: "dummy",
        email: "dummy@gmail.com",
        password: "Testing#123"
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log(userToken.text);
  });
});
