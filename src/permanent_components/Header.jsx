import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext.jsx";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const Header = () => {
    const { user, clearUser } = useContext(UserContext);
    const [toggleActive, setToggle] = useState(false)

    useEffect (() => {

        const timeNow = new Date();
        const timeLogin = new Date(user.time);
        const logedInFor = timeNow - timeLogin;
        const allowedTime = 24 * 60 * 60 * 1000

        if (user && user.time) {
            if (logedInFor > allowedTime) {
                clearUser();
            }
        }

    }, [user])


    const handleToggle = () => {
        setToggle(!toggleActive)
    }


    return (
        <header className=" text-gray p-4">
            <Link to='/app'> <h1 className="text-7xl text-center font-bold cim">Cook-Book</h1></Link>
            <nav>
                <ul className="menuItems">
                    <li><Link to="/app">Összes recept</Link></li>
                    {user.name && <li><Link to="/app/myrec">Sajat receptjeim</Link></li>}
                    {user.name && <li><Link to="/app/upload">Uj recept feltoltes</Link></li>}
                    {!user.name && <li><Link to="/app/login">Bejelentkezes</Link></li>}
                    {user.name && <li><Link to="/app/logout">Kijelentkezes</Link></li>}
                    {!user.name && <li><Link to="/app/registration">Regisztralas</Link></li>}
                    {user.name && <li>Felhasználó: {user.name}</li>}
                </ul>
                <button onClick={handleToggle} className="toggle_menu"><MenuIcon/>Menü</button>
            </nav>

           {toggleActive && <div style={{display:'block'}} onClick={handleToggle} className="popup-wrapper">
            <div className="side_menu">
            
            <ul className="toggleItems">
                    <li><Link to="/app">Összes recept</Link></li>
                    {user.name && <li><Link to="/app/myrec">Sajat receptjeim</Link></li>}
                    {user.name && <li><Link to="/app/upload">Uj recept feltoltes</Link></li>}
                    {!user.name && <li><Link to="/app/login">Bejelentkezes</Link></li>}
                    {user.name && <li><Link to="/app/logout">Kijelentkezes</Link></li>}
                    {!user.name && <li><Link to="/app/registration">Regisztralas</Link></li>}
                    {user.name && <li>Felhasználó: {user.name}</li>}
                </ul>

            </div>

            </div>}
            

        </header>
    )
}

export default Header