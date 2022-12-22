import { useState, useContext, useEffect } from "react";
import axios from "axios";

const useHero = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fullwithImage, setFullwithImage] = useState("");

  useEffect(() => {
    loadHero();
  }, []);

  const loadHero = async () => {
    try {
      const { data } = await axios.get("/api/website/hero/hero");
      setTitle(data.title);
      setContent(data.content);
      setFullwithImage(data.fullwithImage.url);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    title,
    content,
    fullwithImage,
    setContent,
    setTitle,
    setFullwithImage,
  };
};

export default useHero;
