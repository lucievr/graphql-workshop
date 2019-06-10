import React from "react";

import "./Character.scss";

export default function Character(props) {

    const {id, name, imageUrl, status, species, gender} = props.data

    return (
        <div className="character">
            <div className="header">{id} Name: {name} status: {status} Species: {species} Gender: {gender} </div>
            <div className="image"><img src={imageUrl}/></div>

        </div>
    );
}
