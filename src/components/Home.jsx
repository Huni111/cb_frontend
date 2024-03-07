import React, {useEffect, useState} from "react";
import Header from "../permanent_components/Header";
import { Link } from "react-router-dom";
import List from "./LIst";


const Home = () => {

const [recipe, setRecipe] = useState();
const [error, setError] = useState(null)
 const [loading, setLoading] = useState(true);


    const fetchData = async() => {

       try{
        console.log(import.meta.env.VITE_API_ENPOINT_FINDONE);
        const link = import.meta.env.VITE_ENDPOINT_FINDALL;
        console.log(link);
        const req = await fetch(link,{
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
                {loading ? (
                    <div style={{ height: '30rem' }}>
                        <h2 style={{ color: '#F05941', fontSize: 'large', fontWeight: 'bold', margin: '5rem' }}>
                            Betoltes...
                        </h2>
                    </div>
                ) : recipe && recipe.length > 0 ? (
                    recipe.map((rec) => rec._id !== undefined && (
                        <List rid={rec._id} name={rec.name} img={rec.image_link} key={rec._id} />
                    ))
                ) : (
                    <div style={{ height: '30rem' }}>
                        <h2 style={{ color: '#F05941', fontSize: 'large', fontWeight: 'bold', margin: '5rem' }}>
                            Nincsenek elerheto receptek!
                        </h2>
                    </div>
                )}
            </main>
        </>
    )
}


export default Home;
