import React, { useState } from "react";
import { useTranslation } from "react-i18next";


import blankFood from "../images/blankfoodimage.png"

const UploadForm = () => {

  const [succes, setSucces] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const link = import.meta.env.VITE_API_BASE_URL;
  const { t } = useTranslation();

  

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
    <h1 className="form_header">{t('UploadForm.header')}</h1>

    <form className="form_form" onSubmit={handleSubmit}>
      <label className="form_label">{t('UploadForm.labels.newRecipe')}</label>
      <input
        className="form_input"
        type="text"
        placeholder={t('UploadForm.labels.newIngredient')}
        name="recipeName"
        value={formData.recipeName}
        onChange={handleInputChange}
      />
      <label className="form_label">{t('UploadForm.labels.language')}</label>
      <select className="form_select" name="language" value={formData.language} onChange={handleInputChange}>
        <option value=''>{t('UploadForm.selectOptions.language.prompt')}</option>
        <option value="English">English</option>
        <option value="Magyar">Magyar</option>
        <option value="Romana">Româna</option>
      </select>
      <br />
      <label className="form_label">{t('UploadForm.labels.ingredients')}</label>
      {formData.ingList.length !== 0 ? (
        formData.ingList.map((ing, id) => <li key={id}>{ing}</li>)
      ) : (
        <li>{t('UploadForm.messages.noIngredients')}</li>
      )}
      <input
        className="form_input"
        placeholder={t('UploadForm.labels.newIngredient')}
        type="text"
        onKeyDown={handleEnter}
        name="storredIng"
        value={formData.storredIng}
        onChange={handleInputChange}
      />
      <div className="form_listbutton">
        <button className="form_button" onClick={handleAdd}>
          {t('UploadForm.labels.addIngredient')}
        </button>
        <button className="form_button" onClick={deleteIng}>
          {t('UploadForm.labels.deleteLast')}
        </button>
      </div>
      <br />
      <label className="form_label">{t('UploadForm.labels.instructions')}</label>
      <br />
      <textarea
        className="form_input"
        onChange={handleInputChange}
        rows="10"
        cols="80"
        placeholder={t('UploadForm.labels.instructionsPlaceholder')}
        name="instructions"
        value={formData.instructions}
      ></textarea>
      <br />
      <label className="form_label">{t('UploadForm.labels.imageLink')}</label>
      <input
        className="form_input"
        onChange={handleInputChange}
        type="text"
        placeholder={t('UploadForm.labels.imageLink')}
        name="imgLink"
        value={formData.imgLink}
      />
      <br />
      <label className="form_label">{t('UploadForm.labels.cookingTime')}</label>
      <input
        className="form_input"
        onChange={handleInputChange}
        type="number"
        name="cookingTime"
        value={formData.cookingTime}
      />
      <br />
      <label className="form_label">{t('UploadForm.labels.mealtime')}</label>
      <select className="form_select" name="mealtime" value={formData.mealtime} onChange={handleInputChange}>
        <option value="Select">{t('UploadForm.selectOptions.mealtime.select')}</option>
        <option value="Appetizer">{t('UploadForm.selectOptions.mealtime.appetizer')}</option>
        <option value="Main">{t('UploadForm.selectOptions.mealtime.mainCourse')}</option>
        <option value="Dessert">{t('UploadForm.selectOptions.mealtime.dessert')}</option>
        <option value="Soup">{t('UploadForm.selectOptions.mealtime.soup')}</option>
      </select>
      <br />
      <label className="form_label">{t('UploadForm.labels.category')}</label>
      <select className="form_select" name="category" value={formData.category} onChange={handleInputChange}>
        <option value="Select">{t('UploadForm.selectOptions.category.select')}</option>
        <option value="Traditional">{t('UploadForm.selectOptions.category.traditional')}</option>
        <option value="Gourmet">{t('UploadForm.selectOptions.category.gourmet')}</option>
        <option value="Vegetarian">{t('UploadForm.selectOptions.category.vegetarian')}</option>
        <option value="Vegan">{t('UploadForm.selectOptions.category.vegan')}</option>
        <option value="Salad">{t('UploadForm.selectOptions.category.salad')}</option>
      </select>
      <br />
      {succes && <h3 style={{ ...styles.header, color: 'green' }}>{t('UploadForm.messages.saved')}</h3>}
      {loading && <h3 style={{ ...styles.header, color: '#F05941' }}>{t('UploadForm.messages.loading')}</h3>}
      {error && <h3 style={{ ...styles.header, color: 'red' }}>{t('UploadForm.messages.saveError')}</h3>}

      <div className="form_listbutton">
        <button className='form_button' type="submit">
          {t('UploadForm.labels.saveButton')}
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
