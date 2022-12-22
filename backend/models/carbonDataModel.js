import mongoose from "mongoose";
const { Schema } = mongoose;

const carbonDataSchema = new Schema(
  {
    temperature: {
      type: Number,
    },

    humidity: {
      type: Number,
    },
    air_quality: {
      type: Number,
    },
    air_pollution: {
      type: Number,
    },
    altitude: {
      type: Number,
    },
    pressure: {
      type: Number,
    },
  },

  { timestamps: true }
);

export default mongoose.models && mongoose.models.CarbonData
  ? mongoose.models.CarbonData
  : mongoose.model("CarbonData", carbonDataSchema);
