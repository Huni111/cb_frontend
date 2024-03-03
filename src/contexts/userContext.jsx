import React, {createContext, useState, useEffect} from 'react';


const UserContext = createContext();

const UserProvider = ({children}) => {

    const [user, setUser] = useState({});


    useEffect(() => {
        // Check if user data is in localStorage on component mount
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);

      const loginUser = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData)
      }


    const clearUser = () => {
        setUser({})
    }



    const value = {
        user,
        loginUser,
        clearUser
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider};