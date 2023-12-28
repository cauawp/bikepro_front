import React, { useRef, useState } from "react";
import { ReactComponent as StarIcon } from "../imgs/star.svg";
import { ReactComponent as StarGrayIcon } from "../imgs/star-gray.svg";
import { ReactComponent as StarHalfIcon } from "../imgs/star-half.svg";
import { ReactComponent as MiniStar } from "../imgs/mini-star.svg";

import { ReactComponent as ArrowMenu } from "../imgs/arrow-menu.svg";

import "./ProductFeedback.css";
import CreateFeedback from "./CreateFeedback";

const FeedbackRight = ({
  mediaStars,
  totalAssess,
  qntStars,
  starsEarnedObject,
  handleHide,
  rightClassProps,
  rightBtnClass,
}) => {
  const starsArray = Object.keys(starsEarnedObject).map(Number);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  console.log();

  const handleClose = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className="feedbackRight">
        <div className="feedbackRightTop">
          <button
            onClick={handleHide}
            className={`feedbackButtonHide ${rightBtnClass}`}
          >
            <ArrowMenu />
          </button>
        </div>
        <div className={`feedbackRightContainer ${rightClassProps}`}>
          <h1 className="title2" style={{ marginBottom: "1.5rem" }}>
            Avaliações
          </h1>
          <div>
            <div className="feedbackRightInfo">
              <h1 className="title1">
                {isNaN(mediaStars) || mediaStars === undefined ? 0 : mediaStars}
              </h1>
              <span>
                <p className="starsLine">
                  {Array.from({ length: mediaStars }, (el, index) => (
                    <StarIcon key={index} />
                  ))}
                  {mediaStars % 1 ? <StarHalfIcon /> : <></>}
                  {Array.from({ length: 5 - mediaStars }, (el, index) => (
                    <StarGrayIcon key={index} />
                  ))}
                </p>
                {totalAssess > 1 ? (
                  <p className="paragraph2">De {totalAssess} avaliações</p>
                ) : (
                  <p className="paragraph2">De {totalAssess} avaliação</p>
                )}
              </span>
            </div>

            <ul className="assessmentsInfo">
              {starsArray.map((star, index) => {
                const countWidth =
                  (starsEarnedObject[index + 1] / totalAssess) * 100;

                return (
                  <li className="assessmentsInfoItem" key={index}>
                    <span className="leftAssessInfo">
                      <span className="sub-title2">{star}</span>
                      <MiniStar />
                    </span>
                    <div className="bgProgressFeedback">
                      <span
                        className="progressBarFeedback"
                        style={{ width: `${countWidth}%` }}
                      ></span>
                    </div>
                    <span className="paragraph2">
                      {starsEarnedObject[index + 1]}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            className="btn assessBtn"
            onClick={() => setShowConfirmModal(true)}
          >
            Avaliar
          </button>
        </div>
      </div>
      {showConfirmModal && <CreateFeedback onClose={handleClose} />}
    </>
  );
};

export default FeedbackRight;
