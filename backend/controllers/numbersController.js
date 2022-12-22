import User from "../models/userModel";

export const getNumbers = async (req, res) => {
  try {
    const staff = await User.countDocuments({ role: "admin" });
    const trash = await User.countDocuments({ active: { $ne: true } });
    return res.json({ staff, trash });
  } catch (err) {
    console.log(err);
  }
};
