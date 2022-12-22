import { useState, useEffect } from "react";
import axios from "axios";

const useLogo = () => {
  const [logoImage, setLogoImage] = useState("");

  useEffect(() => {
    loadLogoImage();
  }, []);

  const loadLogoImage = async () => {
    try {
      const { data } = await axios.get("/api/website/logo/logo");
      setLogoImage(data.logoImage.url);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    logoImage,
    setLogoImage,
  };
};

export default useLogo;
