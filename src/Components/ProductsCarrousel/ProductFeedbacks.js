import React, { useEffect, useState } from "react";
import axios from "axios";

import { ReactComponent as StarIcon } from "./imgs/star-icon.svg";
import { ReactComponent as StarIconGray } from "./imgs/star-icon-gray.svg";

const ProductFeedbacks = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageStars, setAverageStars] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/products/${props.productId}/feedbacks`)
      .then((res) => {
        const feedbackStars = res.data.map((item) => item.stars);
        const sumStars = feedbackStars.reduce((acc, stars) => acc + stars, 0);
        const avgStars = Math.round(sumStars / feedbackStars.length);
        setAverageStars(avgStars);
        setFeedbacks(res.data);
      });
  }, [props.productId]);

  return (
    <>
      <div className="starsContainer">
        {Array.from({ length: averageStars }, (el, index) => (
          <StarIcon key={index} />
        ))}
        {Array.from({ length: 5 - averageStars }, (el, index) => (
          <StarIconGray key={index} />
        ))}
      </div>
      {feedbacks.length === 0 ? <></> : <span>({feedbacks.length})</span>}
    </>
  );
};

export default ProductFeedbacks;
