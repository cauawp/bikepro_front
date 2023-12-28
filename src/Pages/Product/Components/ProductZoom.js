import React, { useState } from "react";
import "../ProductPage.css";

const MAGNIFY_SIZE = 200;
const MAGNIFY_SIZE_HALF = MAGNIFY_SIZE / 2;

const ProductZoom = ({ position, zoomedImage, offsetDist }) => {
  const { x, y } = position || { x: 0, y: 0 };
  const { offX, offY } = offsetDist || { offXX: 0, offY: 0 };

  console.log("X:" + x, "Y:" + y);

  const zoomedStyles = {
    backgroundImage: zoomedImage ? `url(${zoomedImage})` : "none",
    backgroundPosition: `${x}% ${y}%`,
    left: `${offX - MAGNIFY_SIZE_HALF}px`,
    top: `${offY - MAGNIFY_SIZE_HALF}px`,
    transform: "translate(50% 50%)",
  };

  return <div className="magnify" style={zoomedStyles}></div>;
};

export default ProductZoom;
