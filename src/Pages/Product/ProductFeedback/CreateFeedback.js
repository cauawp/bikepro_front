import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductFeedback.css";

import StandartInput from "../../../Components/Form/StandartInput";
import Button from "../../../Components/Form/Button";

import { ReactComponent as CloseIcon } from "../imgs/close.svg";
import { ReactComponent as StarIcon } from "../imgs/star-big.svg";
import { ReactComponent as StarGrayIcon } from "../imgs/star-gray-big.svg";

const CreateFeedback = ({ onConfirm, onClose, setShowConfirmModal }) => {
  const [starsPost, setStarsPost] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [titlePost, setTitlePost] = useState("");
  const [descPost, setDescPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { productId } = useParams();
  const userId =
    sessionStorage.getItem("userId") || localStorage.getItem("userId");
  const postFeedback = async () => {
    if (!starsPost || !titlePost || !descPost) {
      alert("Por favor, preencha todos os campos antes de avaliar.");
      return;
    } else {
      try {
        // Check if all fields are filled

        setIsLoading(true);
        await axios.post(
          `http://localhost:3333/products/${productId}/feedbacks/${userId}`,
          {
            stars: starsPost,
            title: titlePost,
            description: descPost,
          },
          { headers: { authentication: userId } }
        );
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        onClose();
        setIsLoading(false);
        navigate(0);
      }
    }
  };

  const handleTextareaChange = (e) => {
    setDescPost(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitlePost(e.target.value);
  };

  const hoverStars = (index) => {
    setHoveredStar(index + 1);
  };

  return (
    <div className="createFeedback">
      <div className="createFeedbackContainer">
        <div className="createFeedbackTop">
          <h1>Avaliação</h1>
          <button onClick={onClose} className={`feedbackButtonHide`}>
            <CloseIcon />
          </button>
        </div>
        <div className="reviewStarsContainer">
          <h1>Como avalia o produto?</h1>
          <div className="createFeedbackStarContent">
            {Array.from({ length: 5 }, (el, index) => (
              <StarGrayIcon
                key={index}
                onClick={() => setStarsPost(index + 1)}
                className={`leaveFeedbackStar ${
                  index < starsPost ? "yellow" : "gray"
                } ${index < hoveredStar ? "halfOff" : ""}`}
                onMouseEnter={() => hoverStars(index)}
                onMouseLeave={() => setHoveredStar(0)}
              />
            ))}
          </div>
        </div>
        <div className="createFeedbackLine"></div>
        <div className="createFeedbackTitleContent">
          <h1>Titulo da avaliação</h1>
          <StandartInput
            placeholder="Insira o titulo da avaliação"
            inputType="text"
            inputClass="titleFeedbackInput"
            inputValue={titlePost}
            inputChange={handleTitleChange}
            maxLength={50}
          />
        </div>
        <div className="createFeedbackLine"></div>
        <div className="createFeedbackDescContent">
          <h1>O que achou do produto?</h1>
          <div className="divDescContainer">
            <textarea
              className="feedbackDesc"
              name=""
              id=""
              cols="30"
              rows="7"
              placeholder="Insira o que você achou do produto"
              maxLength={200}
              value={descPost}
              onChange={handleTextareaChange}
            ></textarea>
            <div className="lenghtRemaining">
              {200 - descPost.length} caracteres restantes
            </div>
          </div>
        </div>
        <div className="createFeedbackBtnContent">
          <Button
            buttonTitle={isLoading ? "Carregando..." : "Avaliar"}
            btnType="submit"
            disabled={isLoading} // Desabilitar o botão enquanto estiver carregando
            onClick={postFeedback}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateFeedback;
