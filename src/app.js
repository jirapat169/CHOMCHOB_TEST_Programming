import { sequelize } from "../models";
import express from "express";
import cors from "cors";
import AppRouter from "./routers";

var corsOptions = {
  origin: "*",
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppRouter(app);

const PORT = process.env.PORT || 3100;
app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Server is running on port ${PORT}.`);
});

export default {
  app: app,
  port: PORT,
};
