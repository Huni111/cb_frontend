import React, {createContext, useState, useEffect, useRef} from 'react';


const UserContext = createContext();

const UserProvider = ({children}) => {

    const [user, setUser] = useState({});
    const logoutTimer = useRef(null);


    useEffect(() => {
        // Check if user data is in localStorage on component mount
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

          return  ()=> {
            if(logoutTimer.current){
              clearTimeout(logoutTimer.current);
            }
          };
        
      }, []);

      const loginUser = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData)


        if(logoutTimer.current){
        clearTimeout(logoutTimer.current);
        }

         logoutTimer.current = setTimeout(() => {
          clearUser();
      }, 24 * 60 * 60 * 1000);


      }


    const clearUser = () => {
        setUser({});
        localStorage.removeItem("user");

        if(logoutTimer.current) {
          clearTimeout(logoutTimer.current);
        }

    };



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