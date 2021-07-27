const env = require(`./environments/${process.env.APP_ENV}`);
import express from "express";
import cors from "cors";
import DB from "./util/database";
import Crypto from "./models/crypto";
import Seeds from "./util/seeds";
import { exit } from "process";

const app = express();
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(() => {
  if (env.mode !== "prod") {
    Seeds()
      .then((val) => {
        console.log(val);
      })
      .catch((reason) => {
        console.error(reason);
        exit(0);
      });
  }
})();

app.get("/", async (req, res) => {
  res.status(200);
  res.json({ message: "Welcome to bezkoder application." });
});

app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "not found" });
});

const PORT = process.env.PORT || env.port;
const listen = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default {
  express: app,
  port: listen.address().port,
};
