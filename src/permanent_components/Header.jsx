import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext.jsx";


const Header = () => {
    const { user, clearUser } = useContext(UserContext);

    useEffect(() => {

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


    return (
        <header className=" text-gray p-4">
            <Link to='/'> <h1 className="text-7xl text-center font-bold cim">Cook-Book</h1></Link>
            <nav>
                <ul className="menuItems">
                    <li><Link to="/">Összes recept</Link></li>
                    {user.name && <li><Link to="/myrec">Sajat receptjeim</Link></li>}
                    {user.name && <li><Link to="/upload">Uj recept feltoltes</Link></li>}
                    {!user.name && <li><Link to="/login">Bejelentkezes</Link></li>}
                    {user.name && <li><Link to="/logout">Kijelentkezes</Link></li>}
                    {!user.name && <li><Link to="/registration">Regisztralas</Link></li>}
                    {user.name && <li>Felhasználó: {user.name}</li>}
                </ul>
            </nav>

        </header>
    )
}

export default Header