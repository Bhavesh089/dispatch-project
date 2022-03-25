const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

readdirSync("./backend/routes/v1").map((r) =>
  app.use("/api", require("./routes/v1/" + r))
);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`running at ${port}`));
