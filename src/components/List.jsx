import React from "react";
import { Link } from "react-router-dom";


const List = (props) => {


    return(
        <>
            
                <Link to={`/details/${props.rid}`} className="recipe"
                        style={{ backgroundImage: `url(${props.img})` }}>
                    <div>
                        <h3 className="recipe-name">{props.name}</h3>
                        <p className="recipe-name-corner">{props.name.slice(0, 20) + "..."}</p>
                    </div>
                </Link>
                
        </>
    )
}

export default List