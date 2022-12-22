import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import { createLogo } from "../../../../backend/controllers/websiteController";
import onError from "../../../../backend/utils/errors";
import { isAdmin, isAuth } from "../../../../backend/middlewares";
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).post(createLogo);

export default handler;
