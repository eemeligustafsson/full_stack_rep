import { gql } from "@apollo/client";


export const ALL_BOOKS = gql`
query {
    allBooks {
        title
        published
        genres
        author
    }
}
`
export const BOOK_COUNT = gql`
    query BookCount {
        bookCount
    }
`
export const AUTHOR_BOOK_COUNT = gql`
query AllAuthors {
    allAuthors {
        bookCount
        name
        born
    }
}
`