import { useQuery } from "@apollo/client"
import { ALL_BOOKS, AUTHOR_BOOK_COUNT, BOOK_COUNT } from '../queries'

const Authors = (props) => {
    const {loading, error, data} = useQuery(AUTHOR_BOOK_COUNT);
    if (loading) return "Loading..."
    if(error) return "Errorrrr"

  if (!props.show) {
    return null
  }
  const authors = []

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
