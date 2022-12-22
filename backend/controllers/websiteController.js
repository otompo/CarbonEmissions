import CallToAction from "../models/calltoactionModel";
import Policy from "../models/policyModel";
import Hero from "../models/heroModel";
import Footer from "../models/footerModel";
import About from "../models/aboutModel";
import cloudinary from "cloudinary";
import Logo from "../models/logoModel";

cloudinary.config({
  cloud_name: "codesmart",
  api_key: "924552959278257",
  api_secret: "nyl74mynmNWo5U0rzF8LqzcCE8U",
});

export const createHero = async (req, res) => {
  try {
    const { hero, content, fullwithImage } = req.body;
    const fullwithImageResult = await cloudinary.v2.uploader.upload(
      fullwithImage,
      {
        folder: "carbonEmission",
      }
    );
    const found = await Hero.findOne({ hero });
    if (found) {
      await cloudinary.v2.uploader.destroy(found.fullwithImage.public_id);
      // update
      const updated = await Hero.findOneAndUpdate(
        { hero },
        {
          ...req.body,
          content,
          fullwithImage: {
            public_id: fullwithImageResult.public_id,
            url: fullwithImageResult.url,
          },
        },
        {
          new: true,
        }
      );
      return res.json(updated);
    } else {
      // create
      const created = await new Hero({
        ...req.body,

        fullwithImage: {
          public_id: fullwithImageResult.public_id,
          url: fullwithImageResult.url,
        },
      }).save();
      return res.json(created);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getHero = async (req, res) => {
  try {
    const { hero } = req.query;
    const found = await Hero.findOne({ hero });
    return res.json(found);
  } catch (err) {
    console.log(err);
  }
};

export const createCallToAction = async (req, res) => {
  try {
    const { calltoaction } = req.body;
    const found = await CallToAction.findOne({ calltoaction });
    if (found) {
      // update
      const updated = await CallToAction.findOneAndUpdate(
        { calltoaction },
        req.body,
        {
          new: true,
        }
      );
      return res.json(updated);
    } else {
      // create
      const created = await new CallToAction(req.body).save();
      return res.json(created);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getCallToAction = async (req, res) => {
  try {
    const { calltoaction } = req.query;
    const found = await CallToAction.findOne({ calltoaction });
    return res.json(found);
  } catch (err) {
    console.log(err);
  }
};

export const createFooter = async (req, res) => {
  try {
    const { footer } = req.body;
    const found = await Footer.findOne({ footer });

    if (found) {
      // update
      const updated = await Footer.findOneAndUpdate({ footer }, req.body, {
        new: true,
      });
      return res.json(updated);
    } else {
      // create
      const created = await new Footer(req.body).save();
      return res.json(created);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getFooter = async (req, res) => {
  try {
    const { footer } = req.query;
    const found = await Footer.findOne({ footer });
    return res.json(found);
  } catch (err) {
    console.log(err);
  }
};

export const createAbout = async (req, res) => {
  try {
    const { about } = req.body;
    const found = await About.findOne({ about });

    if (found) {
      // update
      const updated = await About.findOneAndUpdate({ about }, req.body, {
        new: true,
      });
      return res.json(updated);
    } else {
      // create
      const created = await new About(req.body).save();
      return res.json(created);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAbout = async (req, res) => {
  try {
    const { about } = req.query;
    const found = await About.findOne({ about });
    return res.json(found);
  } catch (err) {
    console.log(err);
  }
};

export const createPolicy = async (req, res) => {
  try {
    const { policy } = req.body;
    const found = await Policy.findOne({ policy });

    if (found) {
      // update
      const updated = await Policy.findOneAndUpdate({ policy }, req.body, {
        new: true,
      });
      return res.json(updated);
    } else {
      // create
      const created = await new Policy(req.body).save();
      return res.json(created);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPolicy = async (req, res) => {
  try {
    const { policy } = req.query;
    const found = await Policy.findOne({ policy });
    return res.json(found);
  } catch (err) {
    console.log(err);
  }
};

export const createLogo = async (req, res) => {
  try {
    const { logo, logoImage } = req.body;
    const logoImageResult = await cloudinary.v2.uploader.upload(logoImage, {
      folder: "ImpactHealthCare",
    });
    const found = await Logo.findOne({ logo });
    if (found) {
      await cloudinary.v2.uploader.destroy(found.logoImage.public_id);

      const updated = await Logo.findOneAndUpdate(
        { logo },
        {
          ...req.body,
          logoImage: {
            public_id: logoImageResult.public_id,
            url: logoImageResult.url,
          },
        },
        {
          new: true,
        }
      );
      return res.json(updated);
    } else {
      // create
      const created = await new Logo({
        ...req.body,
        logoImage: {
          public_id: logoImageResult.public_id,
          url: logoImageResult.url,
        },
      }).save();
      return res.json(created);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getLogo = async (req, res) => {
  try {
    const { logo } = req.query;
    const found = await Logo.findOne({ logo });
    return res.json(found);
  } catch (err) {
    console.log(err);
  }
};
