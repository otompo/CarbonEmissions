import mongoose from "mongoose";
const { Schema } = mongoose;

const logoSchema = new Schema(
  {
    logoImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    logo: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models && mongoose.models.Logo
  ? mongoose.models.Logo
  : mongoose.model("Logo", logoSchema);
