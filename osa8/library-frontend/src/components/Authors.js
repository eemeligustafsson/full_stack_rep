import { useMutation, useQuery } from "@apollo/client"
import { ALL_BOOKS, AUTHOR_BOOK_COUNT, BOOK_COUNT, EDIT_AUTHOR_BORN } from '../queries'
import { useState } from "react";
import Select from "react-select";

const Authors = (props) => {
    const [name, setName] = useState('')
    const [setBornTo, setSetBornTo] = useState(2004)
    const [selected, setSelected] = useState('')

    const handleChange = (selectedOption) => {
        const fullOption = {...selectedOption}
        setName(fullOption[0].value)
    }
    const [ editAuthorBorn ] = useMutation(EDIT_AUTHOR_BORN, {
        refetchQueries: [
            {query: ALL_BOOKS},
            {query: AUTHOR_BOOK_COUNT}
        ]
      })
    const {loading, error, data} = useQuery(AUTHOR_BOOK_COUNT);
      console.log(data)
    if (loading) return "Loading..."
    if(error) return "Errorrrr"

  if (!props.show) {
    return null
  }
  const options = data.allAuthors.map((a) => [{value: a.name, label: a.name}])
  
  const submit = async ( event ) => {
    event.preventDefault();
    editAuthorBorn({variables: {name, setBornTo}})
    setName('')
    setSetBornTo(0)
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
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
        <Select 
        options={options}
        onChange={handleChange}
        autoFocus={true}
        />
        <div>
        </div>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
      </div>
    </div>
  )
}

export default Authors
