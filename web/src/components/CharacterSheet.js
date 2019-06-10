import React, {useEffect, useState} from "react";
import graphqlRequest from "../graphqlRequest"

import "./CharacterSheet.scss";

import Character from "./Character"

import getRandomCharacterIds from "../helpers/getRandomCharacterIds"

// for Exercise 3
const randomCharacterIds = getRandomCharacterIds(25)

const randomCharacterIdsString = randomCharacterIds.join(",")

const graphqlQuery = `
{
  characters(ids:${randomCharacterIdsString}){
    id
    name
    imageUrl
    status
    species
    gender
  }
}
`

export default function CharacterSheet() {
    const [data, setData] = useState({characters: [], locations: []});

    useEffect(() => {
        async function fetchData() {
            const result = await graphqlRequest(graphqlQuery)
            setData(result.data);
        }

        fetchData()
    }, []);

    return (
        <div>
            <ul>
                {data.characters.map(item => (
                    <li key={item.id}>
                        <Character data={item}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}
