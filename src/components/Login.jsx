import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/userContext';


const LoginPage = () => {
  const { loginUser } = useContext(UserContext);
  const [succes, setSucces] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    Email: '',
    password: '',
  });

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
      const req = await fetch(import.meta.env.VITE_API_ENDPOINT_AUTH, {
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
        console.log('Loged in!')
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
      <div style={styles.container}>
        {succes && <h3 style={{ ...styles.header, color: 'green' }}>Bejelentkezve!</h3>}
        {loading && <h3 style={{ ...styles.header, color: '#F05941' }}>Folyamatban...!</h3>}
        {error && <h3 style={{ ...styles.header, color: 'red' }}>Hibas jelszo vagy email cim!</h3>}



        <h2 style={styles.header}>Login Page</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label} htmlFor="Email">
            Email:
          </label>
          <input
            style={styles.input}
            type="text"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />

          <label style={styles.label} htmlFor="password">
            Password:
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

          <button style={styles.button} type="submit">
            Login
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
    height: "30rem"
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
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px',
    cursor: 'pointer',
  },
};

export default LoginPage;
