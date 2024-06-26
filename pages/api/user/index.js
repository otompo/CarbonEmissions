import nc from "next-connect";
import dbConnect from "../../../backend/config/dbConnect";
import {
  readUser,
  updateUserProfile,
} from "../../../backend/controllers/authController";
import { isAuth } from "../../../backend/middlewares";

import onError from "../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth).get(readUser);
handler.use(isAuth).put(updateUserProfile);

export default handler;
