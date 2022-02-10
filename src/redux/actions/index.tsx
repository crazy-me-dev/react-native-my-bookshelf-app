import { BestSeller } from "../../model/BestSeller"

export const STORE_BOOK = 'STORE_BOOK'
export const REMOVE_FROM_STORE = 'REMOVE_FROM_STORE'

export function storeBook(book: BestSeller) {
    return {
        type: STORE_BOOK,
        payload: book
    }
}

export function removeFromStore(book: BestSeller) {
    return {
        type: REMOVE_FROM_STORE,
        payload: book
    }
}