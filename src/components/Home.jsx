import React, {useEffect, useState} from "react";
import Header from "../permanent_components/Header";
import { Link } from "react-router-dom";
import List from "./LIst";


const Home = () => {

const [recipe, setRecipe] = useState([]);
const [error, setError] = useState(null)
const [loaded, setLoaded] = useState(false)

    const fetchData = async() => {

       try{
        const req = await fetch('http://localhost:3000/recipes/');
        const data = await req.json();
        setRecipe(data);
        setError(null)
        setLoaded(true)
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
            rid={rec.id}
            name={rec.name}
            img={rec["img-link"]}
            key={rec.id}
        />
        
    )
}


    return (
        <>
        <main>
        {loaded ? recipe.map(createList) : <div style={{height: '30rem'}}><h2 style={{color: '#F05941', fontSize: "large", fontWeight: 'bold', margin: '5rem'}}>Betoltes...</h2></div>}
        </main>
        </>
    )
}


export default Home;