import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import { useCountry } from './hooks'
import { useField } from './hooks'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form>
        <input {...nameInput} />
        <button onClick={fetch}>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App