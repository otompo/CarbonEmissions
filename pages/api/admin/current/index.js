import nc from "next-connect";
import {
  currentAdmin,
  currentUser,
} from "../../../../backend/controllers/authController";
import dbConnect from "../../../../backend/config/dbConnect";
import { isAdmin, isAuth } from "../../../../backend/middlewares";
import onError from "../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).get(currentUser);

export default handler;
