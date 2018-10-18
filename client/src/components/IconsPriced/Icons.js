import React from "react";
import "./Icons.css";

const Icons = ({ src, index, name, price, styling, clicked, handleClick }) => (

        <figure>
                <img data-id={index} className={styling} src={src} alt={name} onClick={handleClick}/>
                <figcaption id = {styling}>{price}</figcaption>
        </figure>
           

);

export default Icons;