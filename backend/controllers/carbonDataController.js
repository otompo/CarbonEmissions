import CarbornData from "../models/carbonDataModel";
import catchAsync from "../utils/catchAsync";

export const createCarbonData = catchAsync(async (req, res, next) => {
  // create
  const created = await new CarbornData({ ...req.query }).save();
  return res.json(created);
});

export const getCarbonData = async (req, res) => {
  try {
    const found = await CarbornData.find({}).sort({ createdAt: -1 });
    return res.json(found);
  } catch (err) {
    console.log(err);
  }
};

export const geDataPlan = async (req, res, next) => {
  const dailyData = await CarbornData.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        numOfData: { $sum: 1 },
        temperature: { $sum: "$temperature" },
        humidity: { $sum: "$humidity" },
        airQuality: { $sum: "$air_quality" },
        airPollution: { $sum: "$air_pollution" },
        altitude: { $sum: "$altitude" },
        pressure: { $sum: "$pressure" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.status(200).json(dailyData.slice(dailyData.length - 2));
};
