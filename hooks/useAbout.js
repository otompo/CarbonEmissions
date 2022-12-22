import { useState, useEffect } from "react";
import axios from "axios";

const useAbout = () => {
  // state
  const [mainTitle, setMainTitle] = useState("");
  const [mainContent, setMainContent] = useState("");
  const [missionTitle, setMissionTitle] = useState("");
  const [missionContent, setMissionContent] = useState("");
  const [visionTitle, setVisionTitle] = useState("");
  const [visionContent, setVisionContent] = useState("");

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      const { data } = await axios.get("/api/website/about/about");
      setMainTitle(data.title);
      setMainContent(data.mainContent);
      setMissionTitle(data.missionTitle);
      setMissionContent(data.missionContent);
      setVisionTitle(data.visionTitle);
      setVisionContent(data.visionContent);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    mainTitle,
    mainContent,
    missionTitle,
    missionContent,
    visionTitle,
    visionContent,
    setMainTitle,
    setMainContent,
    setMissionTitle,
    setMissionContent,
    setVisionTitle,
    setVisionContent,
  };
};

export default useAbout;
