import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import slugify from "slugify";
import cloudinary from "cloudinary";
import { signToken } from "../middlewares/auth";
import emaliValidator from "email-validator";
// cluodnary

cloudinary.config({
  cloud_name: "codesmart",
  api_key: "924552959278257",
  api_secret: "nyl74mynmNWo5U0rzF8LqzcCE8U",
});

export const signin = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    active: { $ne: false },
  }).select("+password +active");
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      user,
    });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

export const currentUser = async (req, res) => {
  try {
    // const user = await User.findById(req.user._id).select("-password").exec();
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const currentAdmin = catchAsync(async (req, res, next) => {
  try {
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
});

export const readUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").exec();
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const updateUserProfile = catchAsync(async (req, res, next) => {
  const { name, email, contactNum, password } = req.body;

  const user = await User.findById(req.user._id).select("+active +password");
  // compare password
  // if (!bcrypt.compareSync(prevPassword, user.password)) {
  //   return next(new AppError("previous password is wrong", 401));
  // }

  // check password length
  if (password && password.length < 6) {
    return next(new AppError("Password should be 6 characters long", 500));
  }

  // check valid email
  if (!emaliValidator.validate(email)) {
    return next(new AppError("Invalid email", 401));
  }

  const exist = await User.findOne({ email });

  if (exist && exist._id.toString() !== user._id.toString()) {
    return next(new AppError("Email is taken", 401));
  }

  const hashedPassword = password ? await bcrypt.hashSync(password) : undefined;

  const token = signToken(user);
  const updated = await User.findByIdAndUpdate(
    req.user._id,
    {
      username: slugify(name) + `${nanoid(5)}`,
      name: name || user.name,
      email: email || user.email,
      contactNum: contactNum || user.contactNum,
      password: hashedPassword || user.password,
      generatedPasword: " ",
    },
    { new: true }
  );
  res.json(updated);

  // await user.save();
  // const token = signToken(user);
  // res.send({
  //   token,
  //   _id: user._id,
  //   name: user.name,
  //   email: user.email,
  //   role: user.role,
  //   contactNum: user.contactNum,
  //   username: user.username,
  //   active: user.active,
  //   generatedPasword: user.generatedPasword,
  // });
});

export const updateUserPassword = catchAsync(async (req, res, next) => {
  const userData = await User.findById(req.user._id).select("+password");
  const { prevPassword, newPassword, c_password } = req.body;
  // Check id the Posted current password is correct

  if (!bcrypt.compareSync(prevPassword, userData.password)) {
    return next(new AppError("previous password is wrong", 401));
  }

  if (c_password !== newPassword) {
    return next(new AppError("Password do not mach", 500));
  }

  if (!newPassword || newPassword.length < 6) {
    return next(new AppError("Password should be 6 characters long", 500));
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      generatedPasword: "",
      password: bcrypt.hashSync(newPassword),
    },
    { new: true }
  );
  res.send(user);
});

export const getAllStaffs = catchAsync(async (req, res, next) => {
  const staff = await User.find({
    role: "admin",
    active: { $ne: false },
  })
    .select("-password")
    .sort({ createdAt: -1 })
    .exec();
  res.send(staff);
});

export const readSingleUser = catchAsync(async (req, res, next) => {
  let username = req.query.username;
  const user = await User.findOne({ username }).select("-password");
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.send(user);
});

// add staff
export const addUser = catchAsync(async (req, res, next) => {
  const { name, email, contactNum } = req.body;
  // console.log(req.body);
  let userExist = await User.findOne({ email }).exec();
  if (userExist) return next(new AppError("Email is taken", 404));
  let password = nanoid(10).toLowerCase();
  const user = await new User({
    name: name,
    email: email,
    contactNum: contactNum,
    username: slugify(name) + `${nanoid(5)}`,
    password: bcrypt.hashSync(password),
    generatedPasword: password,
  }).save();
  // const token = signToken(user._id, user.email);
  res.status(201).json(user);
});

export const makeUserAdmin = catchAsync(async (req, res, next) => {
  const { username } = req.query;
  const user = await User.findOne({ username }).exec();
  if (!user) return next(new AppError("User not found", 400));

  const roleUpdated = await User.findOneAndUpdate(
    { username },
    {
      $addToSet: { role: "admin" },
    },
    { new: true }
  ).exec();
  res.send(`${user.name}  is now an Admin `);
  // console.log(roleUpdated);
});

export const removeAsAdmin = catchAsync(async (req, res, next) => {
  const { username } = req.query;

  const user = await User.findOne({ username });

  if (!user) return next(new AppError("User not found", 400));

  const roleUpdated = await User.findOneAndUpdate(
    { username },
    {
      $pull: { role: "admin" },
    },
    { new: true }
  ).exec();
  res.send(`${user.name}  is remove as an Admin `);
});

//  make user an active
export const moveUserFromTrash = catchAsync(async (req, res, next) => {
  const { username } = req.query;
  const user = await User.findOne({ username });
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const roleUpdated = await User.findOneAndUpdate(
    { username: user.username },
    {
      active: true,
    },
    { new: true }
  );
  res.send({ ok: true });
  // console.log(roleUpdated);
});

// make un-active
export const moveUserToTrash = catchAsync(async (req, res, next) => {
  const { username } = req.query;
  const user = await User.findOne({ username });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  const roleUpdated = await User.findOneAndUpdate(
    { username: user.username },
    {
      active: false,
    },
    { new: true }
  );
  res.send({ ok: true });
});

export const getAllStaffsInTrash = catchAsync(async (req, res, next) => {
  const staff = await User.find({ role: "admin", active: { $ne: true } });

  res.status(200).json({ total: staff.length, staff });
});
