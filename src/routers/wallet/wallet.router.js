import { Router } from "express";
import WalletController from "../../controllers/wallet/wallet.controller";

const WalletRouter = (app) => {
  const router = Router();

  router.get("/", WalletController.findAll);
  router.get("/:username", WalletController.findByUsername);
  router.post("/", WalletController.create);
  router.put("/:username", WalletController.update);
  router.delete("/:username", WalletController.delete);

  app.use("/api/wallet", router);
};

export default WalletRouter;
