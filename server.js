const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const cors = require("cors");
const PATH = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", routes);

// Server Static Assets In Production
if (process.env.NODE_ENV === "production") {
  // Set Static Folder
  app.use(express.static(__dirname + "/client/build"));
  app.get("*", (req, res) => {
    res.sendFile(PATH.resolve(__dirname + "/client/build", "index.html"));
  });
}
// Start Server
app.listen(PORT, () => {
  console.log(`Listening in ${PORT}`);
});
