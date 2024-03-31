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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data:", formData);

    try {

      const res = await fetch(link + "recipe/new", {
        method: 'POST',
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




  return (
    <>
      <main>
        <div className="form_container">
          <h1 className="form_header"> ÚJ RECEPT</h1>

          <form className="form_form" onSubmit={handleSubmit}>
            <label className="form_label">Új recept:</label>
            <input
              className="form_input"
              type="text"
              placeholder="add meg az uj recept nevet!"
              name="recipeName"
              value={formData.recipeName}
              onChange={handleInputChange}
            />
            <label className="form_label" >Nyelv:</label>
            <select className="form_select" name="language" value={formData.language} onChange={handleInputChange}>
              <option value=''>Milyen nyelven írod a receptet?</option>
              <option value="English">English</option>
              <option value="Magyar">Magyar</option>
              <option value="Romana">Româna</option>
            </select>
            <br />
            <label className="form_label">Hozzávalok:</label>
            {formData.ingList.length !== 0 ? (
              formData.ingList.map((ing, id) => <li key={id}>{ing}</li>)
            ) : (
              <li>Nincs hozzá adva alapanyag!</li>
            )}
            <input
              className="form_input"
              placeholder="új hozzávaló?"
              type="text"
              onKeyDown={handleEnter}
              name="storredIng"
              value={formData.storredIng}
              onChange={handleInputChange}
            />
            <div className="form_listbutton">
              <button className="form_button" onClick={handleAdd}>
                Hozzá ad!
              </button>
              <button className="form_button" onClick={deleteIng}>
                Utolsó törlése!
              </button>
            </div>
            <br />
            <label className="form_label">Elkészítés:</label>
            <br />
            <textarea
              className="form_input"
              onChange={handleInputChange}
              rows="10"
              cols="80"
              placeholder="Írd le részletesen hogy kell..."
              name="instructions"
              value={formData.instructions}
            ></textarea>
            <br />
            <label className="form_label">Kép linkje:</label>
            <input
              className="form_input"
              onChange={handleInputChange}
              type="text"
              placeholder="adj meg URL-t"
              name="imgLink"
              value={formData.imgLink}
            />
            <br />
            <label className="form_label">Elkészítési időtartama (perc):</label>
            <input
              className="form_input"
              onChange={handleInputChange}
              type="number"
              name="cookingTime"
              value={formData.cookingTime}
            />
            <br />
            <label className="form_label" >Étkezés:</label>
            <select className="form_select" name="mealtime" value={formData.mealtime} onChange={handleInputChange}>
              <option value="Kivalaszt">Kiválaszt</option>
              <option value="Eloetel">Előétel</option>
              <option value="Foetel">Főétel</option>
              <option value="Desszert">Desszert</option>
              <option value="Leves">Leves</option>
            </select>
            <br />
            <label className="form_label" >Kategória:</label>
            <select className="form_select" name="category" value={formData.category} onChange={handleInputChange}>
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

            <div className="form_listbutton">

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
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  }
}



export default UploadForm
