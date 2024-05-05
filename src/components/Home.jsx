import React, { useEffect, useState } from "react";
import List from "./List";
import { useTranslation } from "react-i18next";


const Home = () => {

    const [recipe, setRecipe] = useState();
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);
    const fetchAll = import.meta.env.VITE_API_BASE_URL + 'recipe/all'
    const { t } = useTranslation();

    const fetchData = async () => {

        try {
            const req = await fetch(fetchAll, {
                credentials: 'include'
            });
            const data = await req.json();
            if (!req.ok) {
                throw new Error(data.error)
            }
            setRecipe(data);
            setError(null)
            console.log(data)

        } catch (err) {
            setError(err.message);
            setRecipe(null);

            throw new Error("failed fetching" + err);


        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    // const searchType = (e) => {
    //     const type = e.target.name;
    //     const query = e.target.value

    //     //fetchData()
    //     setQuery(query);
    //     console.log(e.target.name)
    //     handleFilter(type);
    // }

    // const handleFilter = (type) => {
    //     console.log(query)

    //     let filtered
        

    //     switch (type){
    //         case 'search':
    //             query.length > 1 ? filtered = recipe.filter(rec => {
    //                 return rec.name.includes(query)
    //             }) : fetchData()
    //             break;
    //         case 'mealtime':
                
    //             query !== "Select" ? filtered = recipe.filter(rec => rec.meal_time === query)
    //              : fetchData()
    //             break;    
    //         case 'category':
    //             query !== "Select" ? filtered = recipe.filter(rec => rec.category === query)
    //             : fetchData()
    //     }



    //     setRecipe(filtered)

    // }


    const createList = (rec) => {


        return (

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
            {/* <div className="search_bar">
                <div>
                    <label>{t('Home.search')}</label><input name='search' onChange={searchType} className="search_input" type="search"></input>
                </div>

                <div>
                    <label>{t('UploadForm.labels.category')}</label>
                    <select className="search_input" name="category" onChange={searchType}>
                        <option value="Select">{t('UploadForm.selectOptions.category.select')}</option>
                        <option value="Traditional">{t('UploadForm.selectOptions.category.traditional')}</option>
                        <option value="Gourmet">{t('UploadForm.selectOptions.category.gourmet')}</option>
                        <option value="Vegetarian">{t('UploadForm.selectOptions.category.vegetarian')}</option>
                        <option value="Vegan">{t('UploadForm.selectOptions.category.vegan')}</option>
                        <option value="Salad">{t('UploadForm.selectOptions.category.salad')}</option>
                    </select>
                </div>

                <div>
                    <label>{t('UploadForm.labels.mealtime')}</label>
                    <select className="search_input" name="mealtime" onChange={searchType}>
                        <option value="Select">{t('UploadForm.selectOptions.mealtime.select')}</option>
                        <option value="Appetizer">{t('UploadForm.selectOptions.mealtime.appetizer')}</option>
                        <option value="Main">{t('UploadForm.selectOptions.mealtime.mainCourse')}</option>
                        <option value="Dessert">{t('UploadForm.selectOptions.mealtime.dessert')}</option>
                        <option value="Soup">{t('UploadForm.selectOptions.mealtime.soup')}</option>
                    </select>
                </div>
            </div> */}
            <main>
                {loading ? (
                    <div style={{ height: '30rem' }}>
                        <h2 style={{ color: '#F05941', fontSize: 'large', fontWeight: 'bold', margin: '5rem' }}>
                            {t('Home.loading')}
                        </h2>
                    </div>
                ) : recipe && recipe.length > 0 ? (

                    recipe.map((rec) => rec._id !== undefined && (createList(rec)))

                ) : (

                    <div style={{ height: '30rem' }}>
                        <h2 style={{ color: '#F05941', fontSize: 'large', fontWeight: 'bold', margin: '5rem' }}>
                            {t('Home.noRecipesAvailable')}
                        </h2>
                    </div>
                )}
            </main>
        </>
    )
}


export default Home;
