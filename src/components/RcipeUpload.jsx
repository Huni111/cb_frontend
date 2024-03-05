import React, { useState } from "react";
import { json } from "react-router-dom";

const UploadForm = () => {

  const [succes, setSucces] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    recipeName: "",
    language: "",
    ingList: ["so", "bors", "paprika"],
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
    image_link: formData.imgLink,
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

      const res =await fetch('https://cook-book-server.onrender.com/api/recipe/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({recipe})
      });
      const data = await res.json();

      if(!res.ok){
        throw new Error(`Error in login: ${data.message}`)
        
      }else{
        console.log('Loged in!')
        setLoading(false);
        setSucces(true);
        setError(null)
      }

    }catch(err) {
      setError(err)
      throw new Error('Failed saving data!');
    }




  }




  return (
    <>
      <main>
        <div style={styles.container}>
          <h1 style={styles.header}>UJ RECEPT</h1>
          {succes && <h3 style={{ ...styles.header, color: 'green' }}>Mentve!</h3>}
          {loading && <h3 style={{ ...styles.header, color: '#F05941' }}>Folyamatban...!</h3>}
          {error && <h3 style={{ ...styles.header, color: 'red' }}>Hibas a mentes soran!</h3>}

          <form style={styles.form} onSubmit={handleSubmit}>
            <label style={styles.label}>Uj recept:</label>
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
              <option value=''>Milyen nyelven irod a receptet?</option>
              <option value="English">English</option>
              <option value="Magyar">Magyar</option>
              <option value="Romana">Romana</option>
            </select>
            <br />
            <label style={styles.label}>Hozzavalok:</label>
            {formData.ingList.length !== 0 ? (
              formData.ingList.map((ing, id) => <li key={id}>{ing}</li>)
            ) : (
              <li>Nincs hozza adva alapanyag!</li>
            )}
            <input
              style={styles.input}
              placeholder="uj hozzavalo?"
              type="text"
              onKeyDown={handleEnter}
              name="storredIng"
              value={formData.storredIng}
              onChange={handleInputChange}
            />
            <div style={styles.listbutton}>
              <button style={styles.button} onClick={handleAdd}>
                Hozza ad!
              </button>
              <button style={styles.button} onClick={deleteIng}>
                Utolso torlese!
              </button>
            </div>
            <br />
            <label style={styles.label}>Elkeszites:</label>
            <br />
            <textarea
              style={styles.input}
              onChange={handleInputChange}
              rows="10"
              cols="80"
              placeholder="Ird le reszletesen hogy kell..."
              name="instructions"
              value={formData.instructions}
            ></textarea>
            <br />
            <label style={styles.label}>Kep linkje:</label>
            <input
              style={styles.input}
              onChange={handleInputChange}
              type="text"
              placeholder="adj meg URL-t"
              name="imgLink"
              value={formData.imgLink}
            />
            <br />
            <label style={styles.label}>Elkeszites idotartama (perc):</label>
            <input
              style={styles.input}
              onChange={handleInputChange}
              type="number"
              name="cookingTime"
              value={formData.cookingTime}
            />
            <br />
            <label style={styles.label} >Etkezes:</label>
            <select style={styles.select} name="mealtime" value={formData.mealtime} onChange={handleInputChange}>
              <option value="Kivalaszt">Kivalaszt</option>
              <option value="Eloetel">Eloetel</option>
              <option value="Foetel">Foetel</option>
              <option value="Desszert">Desszert</option>
              <option value="Leves">Leves</option>
            </select>
            <br />
            <label style={styles.label} >Katergoria:</label>
            <select style={styles.select} name="category" value={formData.category} onChange={handleInputChange}>
              <option value="Kivalaszt">Kivalaszt</option>
              <option value="Hagyomanyos">Hagyomanyos</option>
              <option value="Inyenc">Inyenc</option>
              <option value="Vegetarianus">Vegetarianus</option>
              <option value="Vegan">Vegan</option>
              <option value="Salata">Salata</option>
            </select>
            <br />
            <div style={styles.listbutton}>
              <button style={styles.button} type="submit">
                Mentes!
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