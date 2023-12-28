import React, { useState, useEffect, useRef } from "react";
import ProductZoom from "./ProductZoom";

import { ReactComponent as ArrowLeft } from "../imgs/arrow-left_white.svg";
import { ReactComponent as ArrowRight } from "../imgs/arrow-right_white.svg";

const ProductPreview = (props) => {
  const { product, selectedColor } = props;
  const [selectedImages, setSelectedImages] = useState([]);

  //CARROUSEL
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const ProductImg = useRef();

  useEffect(() => {
    const a = ProductImg.current?.getBoundingClientRect().width;
    setPosition(-(a * activeIndex));
  }, [activeIndex]);

  const prevSlide = (e) => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const nextSlide = (e) => {
    if (activeIndex < selectedImages.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    const getImagesBySelectedColor = (color) => {
      const productColors = product?.productImgsDemo;
      return productColors[color]
        ? productColors[color].map((item) => item)
        : [];
    };

    if (!selectedColor) {
      const colors = Object.keys(product?.productImgsDemo || {});
      if (colors.length > 0) {
        props.colorClick(colors[0]);
      }
    }

    const images = getImagesBySelectedColor(selectedColor);
    setSelectedImages(images);
  }, [product, selectedColor, props]);

  return (
    <>
      <div className="productPreview">
        <div
          className="productCarouselContainer"
          style={{ transform: `translate(${position}px)` }}
        >
          {selectedImages.map((url, index) => (
            <div className="heroCarrouselItem" ref={ProductImg} key={index}>
              <img
                key={index}
                src={url}
                alt={`${selectedColor} - Image ${index + 1}`}
                className={`thumbnailImg ${selectedColor}`}
                draggable={false}
              />
            </div>
          ))}
        </div>
        <div className="previewThumbContainer">
          {selectedImages.map((url, index) => {
            return (
              <div
                key={index}
                className={`productHeroThumb ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  key={index}
                  src={url}
                  className={`heroThumbImg ${
                    index === activeIndex ? "active" : ""
                  }`}
                />
              </div>
            );
          })}
        </div>
        {selectedImages.length > 1 ? (
          <div className="productCarouselNav">
            <button onClick={prevSlide}>
              <ArrowLeft />
            </button>
            <button onClick={nextSlide}>
              <ArrowRight />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ProductPreview;
