import { createStore, combineReducers } from 'redux'
import { BestSeller } from '../../model/BestSeller'
import shoppingReducer from '../reducers'

export type GlobalState = {
  shopping: {
    shoppingList: BestSeller[],
  }
}

const rootReducer = combineReducers(
  { 
    shopping: shoppingReducer 
  }
)

const configureStore = () => {
  return createStore(rootReducer)
}

export default configureStore
