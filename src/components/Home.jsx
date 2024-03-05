import React, {useEffect, useState} from "react";
import Header from "../permanent_components/Header";
import { Link } from "react-router-dom";
import List from "./LIst";


const Home = () => {

const [recipe, setRecipe] = useState();
const [error, setError] = useState(null)
const [loaded, setLoaded] = useState(false)

    const fetchData = async() => {

       try{
        const req = await fetch('https://cook-book-server.onrender.com/api/recipe/all');
        const data = await req.json();
        setRecipe(data);
        setError(null)
        setLoaded(true)
        console.log(recipe[0])
       }catch(err){
        setError(err);
        setRecipe(null);
        setLoaded(true)
        console.log(`ERROR FETCHING DATA! ${error}`);


       }

    }

useEffect(() => {
    fetchData()
},[])


const createList = (rec) => {
    return(
        
        <List 
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
        {loaded && recipe ? recipe.map(createList) : <div style={{height: '30rem'}}><h2 style={{color: '#F05941', fontSize: "large", fontWeight: 'bold', margin: '5rem'}}>Betoltes...</h2></div>}
        </main>
        </>
    )
}


export default Home;