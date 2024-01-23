import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, AUTHOR_BOOK_COUNT, BOOK_COUNT } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const {loading, error, data} = useQuery(ALL_BOOKS)
  const authorData = useQuery(AUTHOR_BOOK_COUNT);
  if (loading) return "Loading..."
  if (error) return `error ${error.message}`


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authorData}/>

      <Books show={page === 'books'} books={data.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
