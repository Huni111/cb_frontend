import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import blankFood from "../images/blankfoodimage.png"
import { dark } from "@mui/material/styles/createPalette";

const UpdateForm = () => {

  const { recipeId } = useParams();
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
          <h1 style={styles.header}> {t('UpdateForm.header')}</h1>

          <form className='form_form' onSubmit={handleSubmit}>
            <label className='form_label'>{t('UploadForm.header')}</label>
            <input
              className='form_input'
              type="text"
              placeholder="add meg az uj recept nevet!"
              name="recipeName"
              value={formData.recipeName}
              onChange={handleInputChange}
            />
            <label className='form_label' >{t('UploadForm.labels.language')}</label>
            <select className='form_select' name="language" value={formData.language} onChange={handleInputChange}>
              <option value=''>{t('UploadForm.selectOptions.language.prompt')}</option>
              <option value="English">English</option>
              <option value="Magyar">Magyar</option>
              <option value="Romana">Româna</option>
            </select>
            <br />
            <label className='form_label'>{t('UploadForm.labels.ingredients')}</label>
            {formData.ingList.length !== 0 ? (
              formData.ingList.map((ing, id) => <li key={id}>{ing}</li>)
            ) : (
              <li>Nincs hozzá adva alapanyag!</li>
            )}
            <input
              className='form_input'
              placeholder={t('UploadForm.labels.newIngredient')}
              type="text"
              onKeyDown={handleEnter}
              name="storredIng"
              value={formData.storredIng}
              onChange={handleInputChange}
            />
            <div className='form_listbutton'>
              <button className='form_button' onClick={handleAdd}>
                {t('UploadForm.labels.addIngredient')}
              </button>
              <button className='form_button' onClick={deleteIng}>
                {t('UploadForm.labels.deleteLast')}
              </button>
            </div>
            <br />
            <label className='form_label'>{t('UploadForm.labels.instructions')}</label>
            <br />
            <textarea
              className='form_input'
              onChange={handleInputChange}
              rows="10"
              cols="80"
              placeholder={t('UploadForm.labels.instructionsPlaceholder')}
              name="instructions"
              value={formData.instructions}
            ></textarea>
            <br />
            <label className='form_label'>{t('UploadForm.labels.imageLink')}</label>
            <input
              className='form_input'
              onChange={handleInputChange}
              type="text"
              placeholder="URL"
              name="imgLink"
              value={formData.imgLink}
            />
            <br />
            <label className='form_label'>{t('UploadForm.labels.cookingTime')}</label>
            <input
              className='form_input'
              onChange={handleInputChange}
              type="number"
              name="cookingTime"
              value={formData.cookingTime}
            />
            <br />
            <label className='form_label' >{t('UploadForm.labels.mealtime')}</label>
            <select className='form_select' name="mealtime" value={formData.mealtime} onChange={handleInputChange}>
              <option value="Select">{t('UploadForm.selectOptions.mealtime.select')}</option>
              <option value="Starter">{t('UploadForm.selectOptions.mealtime.appetizer')}</option>
              <option value="Main">{t('UploadForm.selectOptions.mealtime.mainCourse')}</option>
              <option value="Dessert">{t('UploadForm.selectOptions.mealtime.dessert')}</option>
              <option value="Soup">{t('UploadForm.selectOptions.mealtime.soup')}</option>
            </select>
            <br />
            <label className='form_label' >{t('UploadForm.labels.category')}</label>
            <select className='form_select' name="category" value={formData.category} onChange={handleInputChange}>
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
            <div className='form_listbutton'>
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
