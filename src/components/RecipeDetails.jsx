import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";


const DetailPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const detailLink = import.meta.env.VITE_API_BASE_URL + 'recipe/recipes/'
  const {t} = useTranslation();


  

  const fetchRecipe = async () => {
    try {
      const response = await fetch(detailLink + recipeId);
      
      const data = await response.json();

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
    {loading ? (
      <p>{t('DetailPage.loading')}</p>
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
              <h2>{t('DetailPage.loading')}</h2>
            )}
          </div>
          <div className="detail-section">
            <br />
            <h2>{t('DetailPage.ingredientsHeader')}</h2>
            <ul>
              {recipe && recipe.ingredients ? (
                recipe.ingredients.map((ing, index) => <li key={index}>{ing}</li>)
              ) : (
                <li>{t('DetailPage.noIngredients')}</li>
              )}
            </ul>
            <br />
            <h2>{t('DetailPage.instructionsHeader')}</h2>
            {recipe && recipe.instructions ?
              <p>{recipe.instructions}</p> : <p>{t('DetailPage.loading')}</p>}
            <br />
            {recipe && recipe.preparation_time ? 
              <h3>{t('MyDetailPage.cookingTime')} {recipe.preparation_time} {t('MyDetailPage.minute')}</h3> : <p>{t('MyDetailPage.loading')}</p>}
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default DetailPage;
