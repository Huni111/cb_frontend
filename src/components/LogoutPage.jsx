import React, { useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { UserContext } from '../contexts/userContext';

// Retrieve JWT from cookies
const jwtToken = Cookies.get('jwt');

const LogoutPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const {clearUser} = useContext(UserContext)

  const handleLogout = async () => {
    try {
     

      // Make the logout request
      const req = await fetch('https://cook-book-server.onrender.com/api/user/logout',{
        method: 'POST',
        credentials: 'include',
      });
      const data = await req.json();
      clearUser();

      if (!req.ok) {
        console.log(data);
        throw new Error(data);
      }

      setSuccess(true);
      console.log(data);
    } catch (err) {
      setError(err);
      console.log("ERROR: " + err);
    }
  };

  useEffect(() => {
    handleLogout(); // Log all cookies
  }, []);

  return (
    <main>
      <div style={styles.container}>
        <button onClick={handleLogout} style={{border: '2px solid orange', color: '#F05941'}}>Kijelentkezes:</button>
        {success ? (
          <h2 style={{ ...styles.header, color: "#F05941" }}>Kijelentkezve!</h2>
        ) : (
          <h2 style={{ ...styles.header, color: "red" }}>Sikertelen!</h2>
        )}
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
};

export default LogoutPage;
