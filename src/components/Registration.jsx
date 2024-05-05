import React, { useState } from 'react';
import { useTranslation } from "react-i18next";


const RegistrationPage = () => {
  const [matchPasswords, setMatch] = useState(true);
  const [success, setSucces] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const {t} = useTranslation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const regLink = import.meta.env.VITE_API_BASE_URL + 'user'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSucces(false)
    setLoading(true)
    setError(null);
    // Perform registration logic here, like sending data to the server
    try {
      if (formData.password === formData.confirmPassword) {
        const req = await fetch(regLink, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.username,
            email: formData.email,
            password: formData.password
          })
        })
        const data = await req.json();
        if (!req.ok && data.message === "user already exist") {
          throw new Error(`user exist`)
        }else if(!req.ok){
    
          throw new Error(`Post data failed: ${data.message}`);
        } else {
          setLoading(false)
          setSucces(true);
          setError(null)
        }

      } else {
        setMatch(false)
      }
    } catch (err) {
      setError(err);
      setLoading(false)
      setSucces(false)
      
      console.log("ERROR:" + err)

    }




    console.log("Successful registration u can log in!");
   // console.log('Registration data:', formData);
    // Reset the form after submission
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };








  return (
    <main>
  <div className='form_container'>
    {!matchPasswords && <h3 style={{ ...styles.header, color: 'red' }}>{t('RegistrationPage.passwordsDoNotMatch')}</h3>}
    {success && <h3 style={{ ...styles.header, color: 'green' }}>{t('RegistrationPage.registrationSuccessful')}</h3>}
    {loading && <h3 style={{ ...styles.header, color: '#F05941' }}>{t('RegistrationPage.processing')}</h3>}
    {error && <h3 style={{ ...styles.header, color: 'red' }}>{t('RegistrationPage.emailAlreadyUsed')}</h3>}
    <h2 style={styles.header}>{t('RegistrationPage.registrationHeader')}</h2>
    <form className='form_loginform' onSubmit={handleSubmit}>
      <label className='form_label' htmlFor="username">{t('RegistrationPage.usernameLabel')}</label>
      <input className='form_input' type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
      <label className='form_label' htmlFor="email">{t('RegistrationPage.emailLabel')}</label>
      <input className='form_input' type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      <label className='form_label' htmlFor="password">{t('RegistrationPage.passwordLabel')}</label>
      <input className='form_input' type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
      <label className='form_label' htmlFor="confirmPassword">{t('RegistrationPage.confirmPasswordLabel')}</label>
      <input className='form_input' type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
      <button className='form_buttonLogin' type="submit">{t('RegistrationPage.registerButton')}</button>
    </form>
  </div>
</main>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  label: {
    marginBottom: '8px',
  },
  input: {
    padding: '8px',
    marginBottom: '16px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    cursor: 'pointer',
  },
};

export default RegistrationPage;
