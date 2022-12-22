import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";
import { getLogo } from "../../../../backend/controllers/websiteController";
import onError from "../../../../backend/utils/errors";

const handler = nc({ onError });

dbConnect();

handler.get(getLogo);

export default handler;
