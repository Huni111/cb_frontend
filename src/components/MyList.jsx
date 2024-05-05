import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyList = (props) => {

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const title = props && props.name ? capitalizeFirstLetter(props.name) : 'Loading...';



    return (
        <>

            <Link to={`/app/mydetails/${props.rid}`} className="recipe"
                style={{ backgroundImage: `url(${props.img})` }}>
                <div>
                    <h3  className="recipe-name">{title}</h3>
                    <p className="recipe-name-corner">{title.slice(0, 20) + "..."}</p>
                </div>
            </Link>
            

        </>
    )
}




export default MyList

//rid = recipe id to delete!