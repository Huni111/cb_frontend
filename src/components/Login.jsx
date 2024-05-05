import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { useTranslation } from "react-i18next";



const LoginPage = () => {
  const authLink = import.meta.env.VITE_API_BASE_URL + 'user/auth'
  const { loginUser } = useContext(UserContext);
  const [succes, setSucces] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    Email: '',
    password: '',
  });
  const {t} = useTranslation();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSucces(false)
    setError(null)
    

    // Perform login logic here, like sending data to the server
    try {
      const req = await fetch(authLink, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.Email,
          password: formData.password
        }),
        credentials: 'include'
      })
      const data = await req.json()
      if (!req.ok) {
        throw new Error(`Error in login: ${data.message}`);

      } else {
        
        setLoading(false);
        setSucces(true);
        setError(null);

      }
      
      loginUser(data)

    } catch (err) {
      setError(err);
      setSucces(false);
      setLoading(false)

    }




    ;
    // console.log('Login data:', formData);
    // Reset the form after submission
    setFormData({
      Email: '',
      password: '',
    });
  };

  return (
    <main>
      <div className='form_container'>
      <h2 className='form_header'>{t('LoginPage.header')}</h2>
        {succes && <h3 style={{ ...styles.header, color: 'green' }}>{t('LoginPage.loggedIn')}!</h3>}
        {loading && <h3 style={{ ...styles.header, color: '#F05941' }}>{t('LoginPage.loading')}</h3>}
        {error && <h3 style={{ ...styles.header, color: 'red' }}>{t('LoginPage.error')}</h3>}



        
        <form className='form_loginform' onSubmit={handleSubmit}>
          <label className='form_label' htmlFor="Email">
          {t('LoginPage.emailLabel')}
          </label>
          <input
            className='form_input'
            type="text"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />

          <label className='form_label' htmlFor="password">
          {t('LoginPage.passwordLabel')}
          </label>
          <input
            className='form_input'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className='form_buttonLogin' type="submit">
          {t('LoginPage.loginButton')}
          </button>
        </form>
      </div>
    </main>
  );
};

const styles = {
 
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  }
  
};

export default LoginPage;
