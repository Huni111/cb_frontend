import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';



export default function Landing() {
    const [toggleActive, setToggle] = useState(false)
    const {t, i18n} = useTranslation();

    const handleToggle = () => {
        setToggle(!toggleActive)
    }

    const handleLangChange  = (e) => {
        const lang = e.target.value;

        i18n.changeLanguage(lang);

        localStorage.setItem('language', lang);

    }

    return (
        <>
            <div className='landing_container '>
            <div className="lang_select">
            <label>language:</label>
                    <select onChange={handleLangChange}>
                        <option value={'hu'}>Magyar</option>
                        <option value={'en'}>English</option>
                        <option value={'ro'}>Română</option>
                    </select>
                    </div>
                <div className='landing_sec first_landing'>
                    <h1 className="text-9xl text-left font-bold cim">Cook-Book</h1>
                    <div className='button_container'>
                        <button>  <Link className='landing_buttons text-3xl' to="/app/registration">{t('Landing.registrationButton')}</Link></button>
                        <button>  <Link className='landing_buttons text-3xl' to="/app/login">{t('Landing.loginButton')}</Link></button>
                        <button> <Link className='landing_buttons text-3xl' to="/app/">{t('Landing.recipesButton')}</Link></button>
                        
                    </div>
                    <button onClick={handleToggle} className="toggle_menu"><MenuIcon />{t('Landing.menuButton')}</button>

                </div>

                <div className='landing_sec'>
                    <div className='landing_greet'>
                        <h1 className='text-6xl drop-shadow-lg greeting_text'>
                            {t('Landing.sharePrompt')} <Link to='/app/' className='text-orange-400'>{t('Landing.recipes')}</Link> {t('Landing.world')}
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

