import React, { useState } from "react";

import { ReactComponent as StarIcon } from "../imgs/star.svg";
import { ReactComponent as StarGrayIcon } from "../imgs/star-gray.svg";
import "./ProductFeedback.css";

const StarsAssessment = ({ qntStars }) => {
  return (
    <>
      <span>
        {Array.from({ length: qntStars }, (el, index) => (
          <StarIcon key={index} />
        ))}
        {Array.from({ length: 5 - qntStars }, (el, index) => (
          <StarGrayIcon key={index} />
        ))}
      </span>
    </>
  );
};

export default StarsAssessment;
