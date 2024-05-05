import React, {useEffect, useState, useContext} from "react";
import MyList from "./MyList.jsx";
import { UserContext } from "../contexts/userContext.jsx";
import { useTranslation } from "react-i18next";


const MyRecipeList = () => {

const [recipe, setRecipe] = useState();
const [error, setError] = useState(null)
const [loading, setLoading] = useState(true);
const {user} = useContext(UserContext);
const fetchRecipes = import.meta.env.VITE_API_BASE_URL + "recipe/my_recipes/" + user._id;
const {t} = useTranslation();




    const fetchData = async() => {

        
       try{
        const req = await fetch(fetchRecipes,{
            credentials: 'include'
        });
        const data = await req.json();
        
        if(!req.ok){
            throw new Error(data.error)
        }
        setRecipe(data);
        setError(null)
        
        
       }catch(err){
        setError(err.message);
        setRecipe(null);
        
        throw new Error("failed fetching"+err);


       }finally {
                setLoading(false);
            }
       
    }

useEffect(() => {
    fetchData()
},[])


const createList = (rec) => {

   
    return(
        
        <MyList 
            rid={rec._id}
            name={rec.name}
            img={rec.image_link}
            key={rec._id}
        />
        
        
    )
}


    return (
        <>
            <main>
                {loading ? (
                    <div style={{ height: '30rem' }}>
                        <h2 style={{ color: '#F05941', fontSize: 'large', fontWeight: 'bold', margin: '5rem' }}>
                            {t('MyRecipeList.loading')}
                        </h2>
                    </div>
                ) : recipe && recipe.length > 0 ? (

                    recipe.map((rec) => rec._id !== undefined && (createList(rec)))

                ) : (

                    <div style={{ height: '30rem' }}>
                        <h2 style={{ color: '#F05941', fontSize: 'large', fontWeight: 'bold', margin: '5rem' }}>
                        {t('MyRecipeList.noRecipesAvailable')}
                        </h2>
                    </div>
                )}
            </main>
        </>
    )
}


export default MyRecipeList;
