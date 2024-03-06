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
        const req = await fetch(import.meta.env.VITE_API_ENPOINT_FINDALL,{
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
        setLoaded(true)
        throw new Error("failed fetching"+err);


       }
        setLoaded(true)
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
        {loaded && recipe && recipe.length > 0 ? recipe.map(createList) : <div style={{height: '30rem'}}><h2 style={{color: '#F05941', fontSize: "large", fontWeight: 'bold', margin: '5rem'}}>Betoltes...</h2></div>}
        </main>
        </>
    )
}


export default Home;
