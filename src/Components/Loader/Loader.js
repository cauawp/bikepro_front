import React, { useState, useEffect } from "react";
import "./Loader.css"; // Importe o arquivo CSS para estilização
import { ReactComponent as BikeIcon } from "./bike.svg";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        }
        clearInterval(interval);
        return prevProgress;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`loader ${progress === 100 ? "hidden" : ""}`}>
      <div className="loader-content">
        <span
          className="loaderIcon"
          style={{ transform: `translateX(${progress}%)` }}
        >
          <BikeIcon />
        </span>
        <div className="loader-bar">{progress}%</div>
      </div>
    </div>
  );
};

export default Loader;
