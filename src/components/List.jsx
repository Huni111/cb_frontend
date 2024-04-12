import React from "react";
import { Link } from "react-router-dom";


const List = (props) => {


    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const title = props && props.name ? capitalizeFirstLetter(props.name) : 'Betoltes...';


    return(
        <>
            
                <Link to={`/app/details/${props.rid}`} className="recipe"
                        style={{ backgroundImage: `url(${props.img})` }}>
                    <div>
                        <h3 className="recipe-name">{title}</h3>
                        <p className="recipe-name-corner">{title.slice(0, 20) + "..."}</p>
                    </div>
                </Link>
                
        </>
    )
}

export default List