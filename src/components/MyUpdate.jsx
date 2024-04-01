import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import blankFood from "../../images/blankfoodimage.png"
import { dark } from "@mui/material/styles/createPalette";

const UpdateForm = () => {

  const { recipeId } = useParams();
  const [succes, setSucces] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const link = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    recipeName: "",
    language: "",
    ingList: [],
    instructions: "",
    imgLink: "",
    cookingTime: "",
    mealtime: "",
    category: "",
    storredIng: ''

  });

  const recipe = {
    name: formData.recipeName,
    language: formData.language,
    meal_time: formData.mealtime,
    category: formData.category,
    ingredients: formData.ingList,
    instructions: formData.instructions,
    image_link: formData.imgLink !== "" ? formData.imgLink : blankFood,
    preparation_time: formData.cookingTime,
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEnter = (event) => {
    const enter = event.key;
    if (enter === "Enter" && formData.storredIng) {
      event.preventDefault();
      handleAdd(event);
    }
  };

  const handleAdd = (event) => {
    event.preventDefault();
    formData.storredIng !== "" &&
      setFormData((prevData) => ({
        ...prevData,
        ingList: [...prevData.ingList, prevData.storredIng.trim()],
      }));
    console.log("New ingredient list:", formData.ingList);
    setFormData((prevData) => ({
      ...prevData,
      storredIng: "",
    }));
  };

  const deleteIng = (event) => {
    event.preventDefault();
    formData.ingList.length > 0 &&
      setFormData((prevData) => ({
        ...prevData,
        ingList: prevData.ingList.slice(0, -1)

      }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data:", formData);

    try {

      const res = await fetch(`${link}recipe/update_one/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(recipe)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(`Error in save: ${data.message}`)

      } else {
        console.log('Loged in!')
        setLoading(false);
        setSucces(true);
        setError(null)
      }

    } catch (err) {
      setError(err.message)
      setSucces(false);
      setLoading(false)
    }
  }


  const fetchBeforeUpdate = async () => {

    try {
      const res = await fetch(`${link}recipe/recipes/${recipeId}`, {
        method: 'GET',
      })
      const data = await res.json(res);

      if (res.ok) {
        setFormData({
          recipeName: data.name,
          language: data.language,
          ingList: data.ingredients,
          instructions: data.instructions,
          imgLink: data.image_link,
          cookingTime: data.cookingTime,
          mealtime: data.meal_time,
          category: data.category,
          storredIng: ''

        })
      } else {
        throw new Error('data fetch failed!')
      }

    } catch (err) {
      setError(err)
      console.log(err.message)
    }





  }

  useEffect(() => {
    fetchBeforeUpdate()
  }, [])






  return (
    <>
      <main>
        <div className='form_container'>
          <h1 style={styles.header}> RECEPT SZERKESZTÉSE</h1>

          <form className='form_form' onSubmit={handleSubmit}>
            <label className='form_label'>Új recept:</label>
            <input
              className='form_input'
              type="text"
              placeholder="add meg az uj recept nevet!"
              name="recipeName"
              value={formData.recipeName}
              onChange={handleInputChange}
            />
            <label className='form_label' >Nyelv:</label>
            <select className='form_select' name="language" value={formData.language} onChange={handleInputChange}>
              <option value=''>Milyen nyelven írod a receptet?</option>
              <option value="English">English</option>
              <option value="Magyar">Magyar</option>
              <option value="Romana">Româna</option>
            </select>
            <br />
            <label className='form_label'>Hozzávalok:</label>
            {formData.ingList.length !== 0 ? (
              formData.ingList.map((ing, id) => <li key={id}>{ing}</li>)
            ) : (
              <li>Nincs hozzá adva alapanyag!</li>
            )}
            <input
              className='form_input'
              placeholder="új hozzávaló?"
              type="text"
              onKeyDown={handleEnter}
              name="storredIng"
              value={formData.storredIng}
              onChange={handleInputChange}
            />
            <div className='form_listbutton'>
              <button className='form_button' onClick={handleAdd}>
                Hozzá ad!
              </button>
              <button className='form_button' onClick={deleteIng}>
                Utolsó törlése!
              </button>
            </div>
            <br />
            <label className='form_label'>Elkészítés:</label>
            <br />
            <textarea
              className='form_input'
              onChange={handleInputChange}
              rows="10"
              cols="80"
              placeholder="Írd le részletesen hogy kell..."
              name="instructions"
              value={formData.instructions}
            ></textarea>
            <br />
            <label className='form_label'>Kép linkje:</label>
            <input
              className='form_input'
              onChange={handleInputChange}
              type="text"
              placeholder="adj meg URL-t"
              name="imgLink"
              value={formData.imgLink}
            />
            <br />
            <label className='form_label'>Elkészítési időtartama (perc):</label>
            <input
              className='form_input'
              onChange={handleInputChange}
              type="number"
              name="cookingTime"
              value={formData.cookingTime}
            />
            <br />
            <label className='form_label' >Étkezés:</label>
            <select className='form_select' name="mealtime" value={formData.mealtime} onChange={handleInputChange}>
              <option value="Kivalaszt">Kiválaszt</option>
              <option value="Eloetel">Előétel</option>
              <option value="Foetel">Főétel</option>
              <option value="Desszert">Desszert</option>
              <option value="Leves">Leves</option>
            </select>
            <br />
            <label className='form_label' >Kategória:</label>
            <select className='form_select' name="category" value={formData.category} onChange={handleInputChange}>
              <option value="Kivalaszt">Kiválaszt</option>
              <option value="Hagyomanyos">Hagyományos</option>
              <option value="Inyenc">Ínyenc</option>
              <option value="Vegetarianus">Vegetáriánus</option>
              <option value="Vegan">Vegán</option>
              <option value="Salata">Saláta</option>
            </select>
            <br />
            {succes && <h3 style={{ ...styles.header, color: 'green' }}>Mentve!</h3>}
            {loading && <h3 style={{ ...styles.header, color: '#F05941' }}>Folyamatban...!</h3>}
            {error && <h3 style={{ ...styles.header, color: 'red' }}>Hiba a mentés során!</h3>}

            <div className='form_listbutton'>
              <button className='form_button' type="submit">
                Mentés!
              </button>
            </div>
            <br />
          </form>
        </div>
      </main>
    </>
  );
};


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    height: "100%"
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '30rem',
  },
  label: {
    marginBottom: '0',
  },
  input: {
    padding: '8px',
    marginBottom: '0.5rem',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px',
    cursor: 'pointer',
    width: '15rem',
    margin: '0 1rem'
  },
  main: {
    height: '1000px'
  },
  listbutton: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  select: {
    padding: '8px',
    marginBottom: '0.5rem',
  },

}

export default UpdateForm
