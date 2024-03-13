import React, { useState } from "react";

import blankFood from "../../images/blankfoodimage.png"

const UploadForm = () => {

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
        ingList: prevData.ingList.filter(
          (ing) => prevData.ingList.indexOf(ing) !== prevData.ingList.length - 1
        ),
      }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log("Form data:", formData);

    try{

      const res =await fetch(link + "recipe/new", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(recipe)
      });
      const data = await res.json();

      if(!res.ok){
        throw new Error(`Error in save: ${data.message}`)
        
      }else{
        console.log('Loged in!')
        setLoading(false);
        setSucces(true);
        setError(null)
      }

    }catch(err) {
      setError(err.message)
      setSucces(false);
      setLoading(false)
    }




  }




  return (
    <>
      <main>
        <div style={styles.container}>
          <h1 style={styles.header}> ÚJ RECEPT</h1>
          {succes && <h3 style={{ ...styles.header, color: 'green' }}>Mentve!</h3>}
          {loading && <h3 style={{ ...styles.header, color: '#F05941' }}>Folyamatban...!</h3>}
          {error && <h3 style={{ ...styles.header, color: 'red' }}>Hiba a mentés során!</h3>}

          <form style={styles.form} onSubmit={handleSubmit}>
            <label style={styles.label}>Új recept:</label>
            <input
              style={styles.input}
              type="text"
              placeholder="add meg az uj recept nevet!"
              name="recipeName"
              value={formData.recipeName}
              onChange={handleInputChange}
            />
            <label style={styles.label} >Nyelv:</label>
            <select style={styles.select} name="language" value={formData.language} onChange={handleInputChange}>
              <option value=''>Milyen nyelven írod a receptet?</option>
              <option value="English">English</option>
              <option value="Magyar">Magyar</option>
              <option value="Romana">Româna</option>
            </select>
            <br />
            <label style={styles.label}>Hozzávalok:</label>
            {formData.ingList.length !== 0 ? (
              formData.ingList.map((ing, id) => <li key={id}>{ing}</li>)
            ) : (
              <li>Nincs hozzá adva alapanyag!</li>
            )}
            <input
              style={styles.input}
              placeholder="új hozzávaló?"
              type="text"
              onKeyDown={handleEnter}
              name="storredIng"
              value={formData.storredIng}
              onChange={handleInputChange}
            />
            <div style={styles.listbutton}>
              <button style={styles.button} onClick={handleAdd}>
                Hozzá ad!
              </button>
              <button style={styles.button} onClick={deleteIng}>
                Utolsó törlése!
              </button>
            </div>
            <br />
            <label style={styles.label}>Elkészítés:</label>
            <br />
            <textarea
              style={styles.input}
              onChange={handleInputChange}
              rows="10"
              cols="80"
              placeholder="Írd le részletesen hogy kell..."
              name="instructions"
              value={formData.instructions}
            ></textarea>
            <br />
            <label style={styles.label}>Kép linkje:</label>
            <input
              style={styles.input}
              onChange={handleInputChange}
              type="text"
              placeholder="adj meg URL-t"
              name="imgLink"
              value={formData.imgLink}
            />
            <br />
            <label style={styles.label}>Elkészítési időtartama (perc):</label>
            <input
              style={styles.input}
              onChange={handleInputChange}
              type="number"
              name="cookingTime"
              value={formData.cookingTime}
            />
            <br />
            <label style={styles.label} >Étkezés:</label>
            <select style={styles.select} name="mealtime" value={formData.mealtime} onChange={handleInputChange}>
              <option value="Kivalaszt">Kiválaszt</option>
              <option value="Eloetel">Előétel</option>
              <option value="Foetel">Főétel</option>
              <option value="Desszert">Desszert</option>
              <option value="Leves">Leves</option>
            </select>
            <br />
            <label style={styles.label} >Kategória:</label>
            <select style={styles.select} name="category" value={formData.category} onChange={handleInputChange}>
              <option value="Kivalaszt">Kiválaszt</option>
              <option value="Hagyomanyos">Hagyományos</option>
              <option value="Inyenc">Ínyenc</option>
              <option value="Vegetarianus">Vegetáriánus</option>
              <option value="Vegan">Vegán</option>
              <option value="Salata">Saláta</option>
            </select>
            <br />
            <div style={styles.listbutton}>
              <button style={styles.button} type="submit">
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

export default UploadForm
