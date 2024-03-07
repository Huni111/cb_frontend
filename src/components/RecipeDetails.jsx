import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(recipeId);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT_FINDONE + recipeId);
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Data received:", data);
      setRecipe(data);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err);
      setRecipe(null);
      setLoading(false);
      console.log(`ERROR: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const title = recipe && recipe.name ? capitalizeFirstLetter(recipe.name) : 'Betoltes...';


  return (
   <>
      {loading ? ( // Render a loading indicator while fetching is in progress
        <p>Betoltes...</p>
      ) : (
        <div className="wrap-detail">
          <div className="detail-block">
            <h1 className="recipe-title">{title}</h1>
          </div>
          <div className="detail-block">
            <div className="detail-section">
              {recipe && recipe.image_link ? (
                <img className="recipe-img" src={recipe.image_link} alt={title} />
              ) : (
                <h2>Betoltes...</h2>
              )}
            </div>
            <div className="detail-section">
              <br />
              <h2>Hozzávalók:</h2>
              <ul>
                {recipe && recipe.ingredients ? (
                  recipe.ingredients.map((ing, index) => <li key={index}>{ing}</li>)
                ) : (
                  <li>No ingredients!</li>
                )}
              </ul>
              <br />
              <h2>Elkészités:</h2>
              {recipe && recipe.instructions ?
              <p>{recipe.instructions}</p> : <p>Betoltes...</p>}
              <br />
              {recipe && recipe.preparation_time ? 
              <h3>Fozesi ido: {recipe.preparation_time} perc</h3> : <p>Betoltes...</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPage;
