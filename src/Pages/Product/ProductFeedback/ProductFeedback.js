import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import StarsAssessment from "./StarsAssessment";
import FeedbackRight from "./FeedbackRight";
import "./ProductFeedback.css";

import { ReactComponent as Ellipse } from "../imgs/ellipse.svg";

const ProductFeedback = () => {
  const [assessments, setAssessments] = useState([]);
  const { productId } = useParams();
  const [mediaStars, setMediaStars] = useState(0);
  const [totalAssessments, setTotalAssessments] = useState(0);
  const [qntStars, setQntStars] = useState([]);
  const [starsEarned, setStarsEarned] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [assessmentsPerPage] = useState(4);
  const [onHide, setOnHide] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/products/${productId}/feedbacks/`
        );
        const feedbackStars = response.data.map((item) => item.stars);
        const sumStars = feedbackStars.reduce((acc, stars) => acc + stars, 0);
        const totalAssess = response.data.length;
        const mediaStars = sumStars / totalAssess;
        const roundedMediaStars = Math.round(mediaStars * 2) / 2;

        const starsEarnedCopy = { ...starsEarned };
        feedbackStars.forEach((stars) => {
          starsEarnedCopy[stars]++;
        });

        setStarsEarned(starsEarnedCopy);
        setMediaStars(roundedMediaStars);
        setTotalAssessments(totalAssess);
        setQntStars(feedbackStars);
        //setAssessments(response.data);
        setAssessments(response.data.reverse()); // Reverse the order of feedbacks
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedbacks();
  }, []);

  const indexOfLastAssessment = currentPage * assessmentsPerPage;
  const indexOfFirstAssessment = indexOfLastAssessment - assessmentsPerPage;
  const currentAssessments = assessments.slice(
    indexOfFirstAssessment,
    indexOfLastAssessment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleHide = (e) => {
    setOnHide(!onHide);
  };

  console.log(onHide);

  return (
    <>
      <section id="feedback">
        <div className="feedbackContainer container">
          <div className="feedbackFlexContent">
            <div className="feedbackLeft">
              <div className="feedbackTop">
                <h1 className="title2">Avaliações</h1>
                <p>({totalAssessments})</p>
              </div>
              <div className={`feedbackLeftContainer ${onHide ? "hided" : ""}`}>
                {currentAssessments.map((feedback, index) => {
                  const author = feedback.username.name;
                  const stars = feedback.stars;
                  const title = feedback.title;
                  const description = feedback.description;

                  return (
                    <div key={index} className="feedback">
                      <div className="assessmentTop">
                        <h3 className="sub-title1">{author}</h3>
                        <StarsAssessment qntStars={stars} />
                      </div>
                      <h1 className="assessmentTitle title4">{title}</h1>
                      <p className="assessmentDesc">{description}</p>
                    </div>
                  );
                })}
                <div className="feedbackNavControll">
                  <div className="pagination">
                    {Array.from(
                      {
                        length: Math.ceil(
                          assessments.length / assessmentsPerPage
                        ),
                      },
                      (item, index) => {
                        const totalPages = Math.ceil(
                          assessments.length / assessmentsPerPage
                        );
                        const pagesToShow = 2;

                        if (index === 0) {
                          return (
                            <button
                              key={index + 1}
                              onClick={() => paginate(index + 1)}
                              className={
                                currentPage === index + 1
                                  ? "feedbackPagItem active"
                                  : "feedbackPagItem"
                              }
                            >
                              {index + 1}
                            </button>
                          );
                        }

                        const showBeforeEllipsis =
                          index === 1 && currentPage > pagesToShow + 1;
                        const showAfterEllipsis =
                          index === totalPages - 2 &&
                          totalPages > pagesToShow + 2;

                        if (
                          showBeforeEllipsis &&
                          index < currentPage - pagesToShow
                        ) {
                          return (
                            <span key={`ellipsis-before`} className="ellipsis">
                              <Ellipse />
                            </span>
                          );
                        }

                        if (
                          index >= currentPage - pagesToShow &&
                          index <= currentPage + pagesToShow
                        ) {
                          return (
                            <button
                              key={index + 1}
                              onClick={() => paginate(index + 1)}
                              className={
                                currentPage === index + 1
                                  ? "feedbackPagItem active"
                                  : "feedbackPagItem"
                              }
                            >
                              {index + 1}
                            </button>
                          );
                        }

                        if (
                          showAfterEllipsis &&
                          index > currentPage + pagesToShow
                        ) {
                          return (
                            <span key={`ellipsis-after`} className="ellipsis">
                              <Ellipse />
                            </span>
                          );
                        }

                        if (index === totalPages - 1) {
                          return (
                            <button
                              key={index + 1}
                              onClick={() => paginate(index + 1)}
                              className={
                                currentPage === index + 1
                                  ? "feedbackPagItem active"
                                  : "feedbackPagItem"
                              }
                            >
                              {index + 1}
                            </button>
                          );
                        }

                        return null;
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
            <FeedbackRight
              mediaStars={mediaStars}
              totalAssess={totalAssessments}
              qntStars={qntStars}
              starsEarnedObject={starsEarned}
              handleHide={handleHide}
              rightClassProps={onHide ? "hided" : ""}
              rightBtnClass={onHide ? "btnRotated" : ""}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductFeedback;
