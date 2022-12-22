import nc from "next-connect";
import {
  createPartner,
  getAllPartness,
} from "../../../../backend/controllers/partnessController";
import dbConnect from "../../../../backend/config/dbConnect";
import { isAuth, isAdmin } from "../../../../backend/middlewares";
import onError from "../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.get(getAllPartness);
handler.use(isAuth, isAdmin).post(createPartner);

export default handler;
