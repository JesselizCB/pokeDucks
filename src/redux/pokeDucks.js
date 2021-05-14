import axios from "axios";

//NOTE:
//constantes:
const dataInicial = {
  array: [],
  offset: 0
};

// types
const GET_POKE_SUCCESS = "GET_POKE_SUCCESS";
const GET_POKE_NEXT_SUCCESS= "GET_POKE_NEXT_SUCCESS";

// reducer:
const pokeReducer = (state = dataInicial, action) => {
  switch (action.type) {
    case GET_POKE_SUCCESS:
      return { ...state, array: action.payload };
    case GET_POKE_NEXT_SUCCESS:
      return { ...state, array: action.payload.array, offset: action.payload.offset};
    default:
      return state;
  }
};

// acciones:
/* NOTE: dos funciones de flecha porque en la primera funcion de flecha enviaremos parametros para algunas acciones ya que otras no lo necesitaran
la segunda accion de flecha si va necesitar 2 parametros (dispatch y getState) */
export const obtenerPokeAction = () => async (dispatch, getState) => {
  // console.log(getState, getState().pokemones.offset)
  // const offset = getState().pokemones.offset es lo mismo que: const {offset} = getState().pokemones
  const offset = getState().pokemones.offset

  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
    );
    dispatch({
      type: GET_POKE_SUCCESS,
      payload: res.data.results
    });
  } catch (error) {
    console.log(error);
  }
};

export const siguientePokeAction = (numero) => async (dispatch, getState) => {
  const {offset} = getState().pokemones

  const next = offset + numero;
console.log(next)
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${next}&limit=20`);
    dispatch({
      type: GET_POKE_NEXT_SUCCESS,
      payload: {
        array: res.data.results, 
        offset: next
      }
    });
  } catch (error) {
    console.log(error)
  }

} 

export default pokeReducer;
