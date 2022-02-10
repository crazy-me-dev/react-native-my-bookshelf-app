import axios from "axios"

export const imageBaseUrl = 'https://storage.googleapis.com/du-prd/books/images/'

const apiKey = 'xjIudOlzbX0jnEtSd0Gwylbfs2LrtNBs'

const api = axios.create({
    baseURL: `https://api.nytimes.com/svc/books/v3/`
});

export const loadBestSellerNames = () => {
    return api.get(`/lists/names.json?api-key=${apiKey}`)
}

export const loadBestSellers = (listName: string) => {
    return api.get(`/lists/current/${listName}.json?api-key=${apiKey}`)
}