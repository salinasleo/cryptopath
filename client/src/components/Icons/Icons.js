import React from "react";
import "./Icons.css";

const Icons = ({ src, index, name, styling, handleClick }) => (

        <figure>
                <img data-id={index} className={styling} src={src} alt={name} onClick={handleClick} />
        </figure>

);

export default Icons;