const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", routes);

// Start Server
app.listen(PORT, () => {
  console.log(`Listening in ${PORT}`);
});
