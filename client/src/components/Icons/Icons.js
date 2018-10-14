import React from "react";
import "./Icons.css";

const Icons = ({ src, index, name, price, styling, handleClick }) => (

        <figure>
                <img data-id={index} className={styling} src={src} alt={name} onClick={handleClick} />
                <figcaption>{price}</figcaption>
        </figure>

);

export default Icons;