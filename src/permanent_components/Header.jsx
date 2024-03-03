import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext.jsx";


const Header = () => {
    const {user} = useContext(UserContext);
    return(
    <header className=" text-gray p-4">
       <Link to='/'> <h1 className="text-7xl text-center font-bold cim">Cook-Book</h1></Link>
        <nav>
            <ul className="menuItems">
                <li><Link to="/search">Sajat receptjeim</Link></li>
                <li><Link to="/upload">Uj recept feltoltes</Link></li>
                <li><Link to="/login">Bejelentkezes</Link></li>
                <li><Link to="/logout">Kijelentkezes</Link></li>
                <li><Link to="/registration">Regisztralas</Link></li>
                {user.name && <li>Felhasználó:{user.name}</li>}
            </ul>
        </nav>
        
    </header>
)}

export default Header