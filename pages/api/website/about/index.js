import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import { createAbout } from "../../../../backend/controllers/websiteController";
import onError from "../../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.post(createAbout);

export default handler;
