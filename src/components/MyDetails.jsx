import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const MyDetailPage = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPopUp, setShow] = useState(false);
    const [deleteDone, setDone] = useState(false);
    const deleteLink = import.meta.env.VITE_API_BASE_URL + 'recipe/delete/' + recipeId
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


    const handlePopUp = () => {
        
        setShow(true);

    }

    // const testReload () => {

    // }

    const handelDelete = async() => {


        try{
            const res = await fetch(deleteLink, {
                method: 'DELETE',
                credentials: 'include'
            });

            if(res.ok){
                setShow(false);
                setDone(true)
                
            }else{
                throw new Error('data is not deleted')
            }

        }catch(err) {
            console.log(err.message)

        }
    }




    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const title = recipe && recipe.name ? capitalizeFirstLetter(recipe.name) : 'Betoltes...';


    return (
        <>
            {loading ? ( // Render a loading indicator while fetching is in progress
                <p>{t('MyDetailPage.loading')}</p>
            ) : (
                <div className="wrap-detail">
                    <div className="detail-block">

                        <h1 className="recipe-title">
                        {title}

                        <button onClick={handlePopUp}>
                        <DeleteIcon className="delete-icon" />
                        </button> 

                        <Link to={`/app/update/${recipeId}`} >
                        <BorderColorIcon className="delete-icon" />
                        </Link> 


                        </h1>


                    </div>
                    <div className="detail-block">
                        <div className="detail-section">
                            {recipe && recipe.image_link ? (
                                <img className="recipe-img" src={recipe.image_link} alt={title} />
                            ) : (
                                <h2>{t('MyDetailPage.loading')}</h2>
                            )}
                        </div>
                        <div className="detail-section">
                            <br />
                            <h2>{t('MyDetailPage.ingredientsHeader')}</h2>
                            <ul>
                                {recipe && recipe.ingredients ? (
                                    recipe.ingredients.map((ing, index) => <li key={index}>{ing}</li>)
                                ) : (
                                    <li>{t('MyDetailPage.noIngredients')}</li>
                                )}
                            </ul>
                            <br />
                            <h2>{t('MyDetailPage.preparationHeader')}</h2>
                            {recipe && recipe.instructions ?
                                <p>{recipe.instructions}</p> : <p>{t('MyDetailPage.loading')}</p>}
                            <br />
                            {recipe && recipe.preparation_time ?
                                <h3>{t('MyDetailPage.cookingTime')}: {recipe.preparation_time} {t('MyDetailPage.minute')}</h3> : <p>{t('MyDetailPage.loading')}</p>}
                        </div>
                    </div>
                </div>
            )}

            {showPopUp && (
                <div className="popup-wrapper">
                    <div className="popup-backdrop" onClick={() => setShow(false)} />
                    <div className="delete-popup popup-text">


                        <p>{t('MyDetailPage.deleteConfirmation')} {title}</p>
                        <button onClick={handelDelete}>{t('MyDetailPage.deleteButton')}</button>
                        <button onClick={() => setShow(false)}>{t('MyDetailPage.cancelButton')}</button>


                    </div>
                </div>
            )}

            {deleteDone && (
                <div className="popup-wrapper">
                    <div className="popup-backdrop" />
                    <div className="delete-popup popup-text">


                        <p>{t('MyDetailPage.deleteSuccess')} {title}</p>
                        <button><Link to={'/myrec'}> {t('MyDetailPage.closeButton')}</Link></button>

                    </div>
                </div>
            )}

        </>
    );
};

export default MyDetailPage;
