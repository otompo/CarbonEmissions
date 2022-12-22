import mongoose from "mongoose";
const { Schema } = mongoose;

const footerSchema = new Schema(
  {
    addressTitle: {
      trim: true,
      type: String,
    },

    location: {
      trim: true,
      type: String,
    },

    email: {
      trim: true,
      type: String,
    },
    contactNum: {
      trim: true,
      type: String,
    },

    quickLinkTitle: {
      trim: true,
      type: String,
    },

    socialTitle: {
      trim: true,
      type: String,
    },

    facebook: {
      trim: true,
      type: String,
    },

    facebookLink: {
      trim: true,
      type: String,
    },

    twitter: {
      trim: true,
      type: String,
    },

    twitterLink: {
      trim: true,
      type: String,
    },

    instagram: {
      trim: true,
      type: String,
    },

    instagramLink: {
      trim: true,
      type: String,
    },

    footer: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models && mongoose.models.Footer
  ? mongoose.models.Footer
  : mongoose.model("Footer", footerSchema);
