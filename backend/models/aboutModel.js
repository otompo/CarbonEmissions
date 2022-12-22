import mongoose from "mongoose";
const { Schema } = mongoose;

const aboutSchema = new Schema(
  {
    mainContent: {},

    title: {
      type: String,
    },

    missionTitle: {
      type: String,
    },

    missionContent: {},

    visionTitle: {
      type: String,
    },

    visionContent: {},

    about: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models && mongoose.models.About
  ? mongoose.models.About
  : mongoose.model("About", aboutSchema);
