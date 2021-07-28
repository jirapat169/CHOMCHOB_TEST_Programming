import { Router } from "express";
import CryptoController from "../../controllers/crypto/crypto.controller";

const CryptoRouter = (app) => {
  const router = Router();

  router.get("/", CryptoController.findAll);
  router.get("/:name", CryptoController.findByName);
  router.post("/", CryptoController.create);
  router.put("/:name", CryptoController.updateRate);
  router.delete("/:name", CryptoController.delete);

  app.use("/api/crypto", router);
};

export default CryptoRouter;
