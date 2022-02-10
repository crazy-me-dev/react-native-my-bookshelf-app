export type BestSellerName = {
    list_name: string,
    display_name: string,
    list_name_encoded: string,
    oldest_published_date: string,
    newest_published_date: string,
    updated: string,
}

export type BestSeller = {
    title: string,
    description: string,
    book_image: string,
    amazon_product_url: string,
    price: number,
    primary_isbn10: string,
    author: string,
    book_uri: string,
}