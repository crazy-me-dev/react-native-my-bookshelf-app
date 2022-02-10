import { BestSeller } from "../../model/BestSeller";
import { STORE_BOOK, REMOVE_FROM_STORE } from "../actions";

const initialState: { shoppingList: BestSeller[] } = {
  shoppingList: []
};

const shoppingReducer = (state = initialState, action: any) => {
	switch(action.type) {
		case STORE_BOOK:
			return {
					...state,
					shoppingList: [...state.shoppingList, action.payload]
			}
		case REMOVE_FROM_STORE:
			return {
				...state,
				shoppingList: state.shoppingList.filter(shop => shop.book_uri !== action.payload.book_uri)
		}
		default:
			return state
	}
}

export default shoppingReducer
    