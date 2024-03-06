import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState(null);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT_FINDONE + recipeId);
      const data = await response.json();
      setRecipe(data);
      setError(null);
    } catch (err) {
      setError(err);
      setRecipe(null);
      console.log(`ERROR: ${error}`);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const title = recipe.name ? capitalizeFirstLetter(recipe.name) : 'Betoltes...'

  return (
    <>
      <div className="wrap-detail">
        <div className="detail-block">
          <h1 className="recipe-title">{title}</h1>
        </div>
        <div className="detail-block">
          <div className="detail-section">
            <img className="recipe-img" src={recipe.image_link} alt={recipe.name} />
          </div>
          <div className="detail-section">
            <br />
            <h2>Hozzávalók:</h2>
            <ul>
              {recipe.ingredients ? (
                recipe.ingredients.map((ing, index) => <li key={index}>{ing}</li>)
              ) : (
                <li>No ingredients!</li>
              )}
            </ul>
            <br />
            <h2>Elkészités:</h2>
            <p>{recipe.instructions}</p>
            <br />
            <h3>Fozesi ido: {recipe.preparation_time} perc</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
