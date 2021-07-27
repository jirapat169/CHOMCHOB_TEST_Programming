import { Router } from "express";
import UserController from "../../controllers/user/user.controller";

const UserRouter = (app) => {
  const router = Router();

  router.get("/", UserController.findAll);
  router.get("/:username", UserController.findByUsername);
  router.post("/", UserController.create);
  router.put("/:username", UserController.update);
  router.delete("/:username", UserController.delete);

  app.use("/api/user", router);
};

export default UserRouter;
