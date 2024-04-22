import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'

/**
 * The `Landing` component is the main entry point of the application, providing a landing page with various navigation options.
 * 
 * The component includes the following features:
 * - A large "Cook-Book" title
 * - Buttons for registration, login, and accessing recipes
 * - A toggle menu button that opens a side menu with the same navigation options
 * - A greeting message with a link to the recipes page
 * - A pot image
 * - A copyright notice
 * 
 * The component uses the `useState` hook to manage the state of the toggle menu, and the `Link` component from `react-router-dom` to provide navigation links.
 */
export default function Landing() {
    const [toggleActive, setToggle] = useState(false)

    const handleToggle = () => {
        setToggle(!toggleActive)
    }

    return (
        <>
            <div className='landing_container'>
                <div className='landing_sec'>
                    <h1 className="text-9xl text-left font-bold cim">Cook-Book</h1>
                    <div className='button_container'>
                        <button>  <Link className='landing_buttons text-3xl' to="/app/registration">Regisztráció</Link></button>
                        <button>  <Link className='landing_buttons text-3xl' to="/app/login">Bejelentkezés</Link></button>
                        <button> <Link className='landing_buttons text-3xl' to="/app/">Receptek</Link></button>
                    </div>
                    <button onClick={handleToggle} className="toggle_menu"><MenuIcon />Menü</button>

                </div>

                <div className='landing_sec'>
                    <div className='landing_greet'>
                        <h1 className='text-6xl drop-shadow-lg greeting_text'>
                            Oszd meg <Link to='/app/' className='text-orange-400'>recptjeid</Link> a nagyvilággal!
                        </h1>
                    </div>
                    <div className='landing-greet'></div>
                    <img className='pot_image' src='../images/pot_image.png'></img>

                </div>

                <div className='landing_sec'>
                    <h5 style={{ textShadow: '1px 1px 2px black' }}>Copyright Hunor Nagy 2024</h5>
                </div>
            </div>

            {toggleActive && <div style={{ display: 'block' }} onClick={handleToggle} className="popup-wrapper">
                <div className="side_menu">

                    <ul className="toggleItems">
                        <li>  <Link className='landing_buttons text-3xl' to="/app/registration">Regisztráció</Link></li>
                        <li>  <Link className='landing_buttons text-3xl' to="/app/login">Bejelentkezés</Link></li>
                        <li> <Link className='landing_buttons text-3xl' to="/app/">Receptek</Link></li>
                    </ul>


                </div>
            </div>}

        </>
    )
}

