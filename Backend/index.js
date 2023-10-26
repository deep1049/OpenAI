const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Router } = require("./Routes/Basic.Routes");

const app = express();

require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use("/basic", Router);

app.get("/", (req, res) => res.send("Hello"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
