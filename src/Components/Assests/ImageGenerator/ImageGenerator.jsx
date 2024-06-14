import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../default_image.svg";

const ImageGenerator = () => {
  const [imgae_url, setImage_url] = useState("/");

  const [loading, setLoading] = useState(false);
  let inputRef = useRef(null);
  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);

    const responce = await fetch("LINK", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer ${process.env.REACT_APP_OPENAI_API_KEY}",
        "User-Agent": "Chrome",
      },

      body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: "512x512",
      }),
    });
    let data = await responce.json();
    console.log(data);
    let data_array = data.data;
    setImage_url(data_array[0].url);

    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai image <span>generator</span>
        <div className="img-loading">
          <div className="image">
            <img src={imgae_url === "/" ? default_image : imgae_url} />
          </div>
        </div>
      </div>
      <div className={loading ? "loading-bar-full" : "loading-bar"}>
        <div className={loading ? "loading-text" : "display-none"}>
          Loading...
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe What You want to See"
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
