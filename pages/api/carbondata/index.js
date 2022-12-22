import nc from "next-connect";
import {
  createCarbonData,
  getCarbonData,
} from "../../../backend/controllers/carbonDataController";
import dbConnect from "../../../backend/config/dbConnect";
import onError from "../../../backend/utils/errors";
const handler = nc({ onError });

dbConnect();

handler.post(createCarbonData);
handler.get(getCarbonData);

export default handler;
