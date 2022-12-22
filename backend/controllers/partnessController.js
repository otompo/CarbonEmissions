import Partner from "../models/partnessModel";
import slugify from "slugify";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "codesmart",
  api_key: "924552959278257",
  api_secret: "nyl74mynmNWo5U0rzF8LqzcCE8U",
});

// create Partner
export const createPartner = catchAsync(async (req, res, next) => {
  const { name, image } = req.body;

  let slug = slugify(name).toLowerCase();

  const alreadyExist = await Partner.findOne({ slug });
  if (alreadyExist) {
    return next(new AppError("Partner name already exist", 400));
  }
  const imageResult = await cloudinary.v2.uploader.upload(image, {
    folder: "carbonEmission",
  });

  let partner = await new Partner({
    name,
    image: {
      public_id: imageResult.public_id,
      url: imageResult.url,
    },
    slug,
  }).save();
  res.status(200).send(partner);
});

// get all Partner
export const getAllPartness = catchAsync(async (req, res, next) => {
  const partners = await Partner.find({});

  res.status(200).send(partners);
});

export const deletePartner = catchAsync(async (req, res, next) => {
  const partner = await Partner.findById(req.query.id);

  await cloudinary.v2.uploader.destroy(partner.image.public_id);
  if (!partner) {
    return next(new AppError("Partner not found with this ID", 400));
  }

  await partner.remove();

  res.status(200).json({
    success: true,
  });
});
