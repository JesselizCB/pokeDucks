import React from 'react'
//hooks react redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerPokeAction, siguientePokeAction } from "../redux/pokeDucks";

const Pokemones = () => {
  const dispatch = useDispatch()
  const pokemones = useSelector(store => store.pokemones.array)
  // console.log(pokemones)

  return (
    <div>
      Lista de pokemones
      <button onClick={() => dispatch(obtenerPokeAction())}>Get Pokemones</button>
      <button onClick={() => dispatch(siguientePokeAction(20))}>Next</button>
      <ul>
        {
          pokemones.map(item => (
            <li key={item.name}>{item.name}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Pokemones
