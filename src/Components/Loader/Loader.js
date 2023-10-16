import React, { useState, useEffect } from "react";
import "./Loader.css"; // Importe o arquivo CSS para estilização
import { ReactComponent as BikeIcon } from "./bike.svg";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loaderShown = sessionStorage.getItem("loaderShown");

    if (!loaderShown) {
      document.body.classList.add("no-scroll");

      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 1;
          }
          clearInterval(interval);
          sessionStorage.setItem("loaderShown", "true");
          document.body.classList.remove("no-scroll");
          return prevProgress;
        });
      }, 10);

      return () => {
        clearInterval(interval);
        document.body.classList.remove("no-scroll");
      };
    }
  }, []);

  if (sessionStorage.getItem("loaderShown")) {
    return <></>;
  }

  return (
    <div className={`loader ${progress === 100 ? "hidden" : ""}`}>
      <div className="loader-content">
        <span
          className="loaderIcon"
          style={{ transform: `translateX(${progress}%)` }}
        >
          <BikeIcon />
        </span>
        <div className="loader-bar">
          <span>{progress}</span>%
        </div>
      </div>
    </div>
  );
};

export default Loader;
