import React, { useState, useEffect, useRef } from "react";
import ProductZoom from "./ProductZoom";

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

  // Adicione um estado para controlar o zoom
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [zoomedImage, setZoomedImage] = useState(null);

  // Crie uma função para lidar com o evento onMouseMove
  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = (url) => {
    setZoomedImage(url);
  };

  const handleMouseLeave = () => {
    setZoomedImage(null);
  };

  return (
    <>
      <div className="productPreview">
        <ProductZoom
          position={zoomPosition}
          zoomedImage={zoomedImage}
          ProductImg={ProductImg}
        />
        <div
          className="productCarouselContainer"
          style={{ transform: `translate(${position}px)` }}
        >
          {selectedImages.map((url, index) => (
            <img
              ref={ProductImg}
              key={index}
              src={url}
              alt={`${selectedColor} - Image ${index + 1}`}
              className={`thumbnailImg ${selectedColor}`}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => handleMouseEnter(url)} // Adicione este evento onMouseEnter
              onMouseLeave={handleMouseLeave} // Adicione este evento onMouseLeave
            />
          ))}
        </div>
        <div className="previewThumbContainer">
          {selectedImages.map((url, index) => {
            return (
              <div
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
        <div className="productCarouselNav">
          <button onClick={prevSlide}>PREV</button>
          <button onClick={nextSlide}>NEXT</button>
        </div>
      </div>
    </>
  );
};

export default ProductPreview;
