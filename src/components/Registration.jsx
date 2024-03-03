import React, { useState } from 'react';

const RegistrationPage = () => {
  const [matchPasswords, setMatch] = useState(true);
  const [succes, setSucces] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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
        const req = await fetch(import.meta.env.VITE_API_ENDPOINT_REG, {
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

      <div style={styles.container}>
        {!matchPasswords && <h3 style={{ ...styles.header, color: 'red' }}>Jelszavak nem egyeznek!</h3>}
        {succes && <h3 style={{ ...styles.header, color: 'green' }}>Sikeres regisztracio! Jelentezz be!</h3>}
        {loading && <h3 style={{ ...styles.header, color: '#F05941' }}>Folyamatban...!</h3>}
        {error && <h3 style={{ ...styles.header, color: 'red' }}>Ez az email mar hasznalva volt!</h3>}

        <h2 style={styles.header}>Regisztracio!</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label} htmlFor="username">
            Felhasznalo nev:
          </label>
          <input
            style={styles.input}
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label style={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label style={styles.label} htmlFor="password">
            Jelszo:
          </label>
          <input
            style={styles.input}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label style={styles.label} htmlFor="confirmPassword">
            Jelszo megerositese:
          </label>
          <input
            style={styles.input}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button style={styles.button} type="submit">
            Regisztracio
          </button>
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
