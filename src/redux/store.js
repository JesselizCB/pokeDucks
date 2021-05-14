import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import pokeReducer from './pokeDucks'

const rootReducer = combineReducers({
   pokemones: pokeReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const generateStore = () => {
  const store =  createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
  return store;
}
export default generateStore;