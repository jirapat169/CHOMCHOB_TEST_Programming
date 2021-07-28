import CryptoRouter from "./crypto/crypto.router";
import UserRouter from "./user/user.router";
import WalletRouter from "./wallet/wallet.router";

const AppRouter = (app) => {
  UserRouter(app);
  WalletRouter(app);
  CryptoRouter(app);
};

export default AppRouter;
