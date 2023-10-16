import React from "react";
import "./ProductPage.css";

const ProductZoom = ({ position, zoomedImage }, props) => {
  const { x, y } = position || { x: 0, y: 0 };

  const zoomedStyles = {
    backgroundImage: zoomedImage ? `url(${zoomedImage})` : "none",
    backgroundPosition: `${x}px ${y}px`,
    /*backgroundSize:
      props.current?.ProductImg.width * x +
      "px " +
      props.current?.ProductImg * y +
      "px",*/
    width: "100%",
    height: "100%",
  };

  return (
    <div
      className="productZoomLens"
      style={{
        width: "300px",
        height: "300px",
        transform: `translate3d(-50%, -100%, 0) translate(${x}px, ${y}px)`,
      }}
    >
      <div className="zoomedImage" style={zoomedStyles}></div>
    </div>
  );
};

export default ProductZoom;
