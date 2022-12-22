import nc from "next-connect";
import { geDataPlan } from "../../../backend/controllers/carbonDataController";
import dbConnect from "../../../backend/config/dbConnect";
import onError from "../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.get(geDataPlan);

export default handler;
