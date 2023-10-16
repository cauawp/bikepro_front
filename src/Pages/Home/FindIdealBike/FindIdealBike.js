import React from "react";
import { Link } from "react-router-dom";

//IMAGES
import FindIdealImgOne from "./imgs/find-ideal_1.png";
import FindIdealImgTwo from "./imgs/find-ideal_2.png";
import FindIdealImgThree from "./imgs/find-ideal_3.png";
import FindIdealImgFour from "./imgs/find-ideal_4.png";
import "./FindIdealBike.css";

const Images = [
  {
    id: 1,
    url: FindIdealImgOne,
  },
  {
    id: 2,
    url: FindIdealImgTwo,
  },
  {
    id: 1,
    url: FindIdealImgThree,
  },
  {
    id: 1,
    url: FindIdealImgFour,
  },
];

const FindIdealBike = () => {
  return (
    <>
      <section id="findIdealBike">
        <div className="findIdealBikeContainer container">
          <div className="findIdealGrid">
            {Images.map((image, index) => {
              return <img key={image.id} src={image.url} alt="" />;
            })}
            <div className="findIdealText">
              <h1>Encontre a bicicleta ideial para você</h1>
              <p>
                Encontramos a bicicleta ideial para você atráves de algumas
                perguntas
              </p>
              <Link className="btn" to="/">
                Encontrar a bicicleta ideial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FindIdealBike;
