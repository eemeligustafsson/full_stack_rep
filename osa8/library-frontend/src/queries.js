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
export const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
        title,
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
export const EDIT_AUTHOR_BORN = gql`
mutation editAuthorBorn($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
    ) {
        name
        born
        bookCount
        id
    }
    
}
`