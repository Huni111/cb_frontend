import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyList = (props) => {




    return (
        <>

            <Link to={`/mydetails/${props.rid}`} className="recipe"
                style={{ backgroundImage: `url(${props.img})` }}>
                <div>
                    <h3  className="recipe-name">{props.name}</h3>
                    <p className="recipe-name-corner">{props.name}</p>
                </div>
            </Link>
            

        </>
    )
}




export default MyList

//rid = recipe id to delete!