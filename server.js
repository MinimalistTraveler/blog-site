const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const cors = require("cors");
const PATH = require("path");
const morgan = require("morgan");
const compression = require("compression");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", routes);

// Server Static Assets In Production
if (process.env.NODE_ENV === "production") {
  app.disable("x-powered-by");
  app.use(morgan("common"));
  app.use(compression());

  // Set Static Folder
  app.use(express.static(__dirname + "/client/build"));
  app.get("*", (req, res) => {
    res.sendFile(PATH.resolve(__dirname + "client", "build", "index.html"));
  });
}
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}
// Start Server
app.listen(PORT, () => {
  console.log(`Listening in ${PORT}`);
});
