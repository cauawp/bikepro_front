import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ReactComponent as FavoriteIcon } from "./imgs/favorite-icon.svg";

const ProductFavorited = (props) => {
  const [favorite, setFavorite] = useState();
  const [firstTimeClick, setFirstTimeClick] = useState(true);
  const [storageId, setStorageId] = useState();

  console.log(favorite);

  const storedUserId =
    sessionStorage.getItem("userId") || localStorage.getItem("userId");

  useEffect(() => {
    async function getFavorite() {
      if (storedUserId !== null) {
        try {
          const response = await axios.get(
            `http://localhost:3333/products/${props.productId}/favorites/${storedUserId}`,
            { headers: { authentication: storedUserId } }
          );
          if (response.data) {
            setFavorite(response.data);
            setFirstTimeClick(false);
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
    }

    getFavorite();
  }, [props.productId]);

  const navigate = useNavigate();

  const handleToggle = async (e) => {
    e.preventDefault();
    if (storedUserId === null) {
      navigate(`/login`);
    }

    try {
      const storedUserId =
        sessionStorage.getItem("userId") || localStorage.getItem("userId");
      if (storedUserId !== null) {
        if (firstTimeClick) {
          const response = await axios.post(
            `http://localhost:3333/products/${props.productId}/favorites/${storedUserId}`,
            { favorited: true },
            { headers: { authentication: storedUserId } }
          );
          if (response.data) {
            setFavorite({ ...favorite, favorited: true });
            setFirstTimeClick(false);
          }
        } else {
          const response = await axios.patch(
            `http://localhost:3333/products/${props.productId}/favorites/${storedUserId}`,
            { favorited: !favorite.favorited },
            { headers: { authentication: storedUserId } }
          );
          if (response.data) {
            setFavorite({ ...favorite, favorited: !favorite.favorited });
          }
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const favoriteTrusty = favorite && favorite.favorited;

  return (
    <>
      <button
        className={`favoriteBtn ${favoriteTrusty ? "favorited" : ""} ${
          props.favoriteClass
        }`}
        onClick={handleToggle}
      >
        {favoriteTrusty ? (
          <span>
            <FavoriteIcon />
          </span>
        ) : (
          <span>
            <FavoriteIcon />
          </span>
        )}
      </button>
    </>
  );
};

export default ProductFavorited;
