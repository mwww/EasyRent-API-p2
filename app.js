const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const apiRoute = require("./routes/apiRoute");

const db = require("./db/connection");
const app = express();
dotenv.config();

db.sequelize
  .sync({ force: false })
  .then(() => console.log("db syncronized!"))
  .catch((err) => console.log("cannot syncronize db", err));

app.use(cors({ credentials: true }));
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());

// app.get("/user", (req, res) => {});
app.use("/api", apiRoute);

app.listen(process.env.PORT, () => {
  console.log(`Running in ${process.env.PORT}`);
});
