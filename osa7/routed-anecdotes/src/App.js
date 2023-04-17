import { useState } from 'react'
import { useEffect } from 'react'

import { Menu } from './Components/Menu'
import { Anecdote } from './Components/Anecdote'
import { About } from './Components/About'
import { AnecdoteList } from './Components/AnecdoteList'
import { Footer } from './Components/Footer'
import { Notification } from './Components/Notification'
import { CreateNew } from './Components/CreateNew'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch
  } from "react-router-dom"



const App = () => {
  const navigate = useNavigate()
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const timeOut = setTimeout(()=> {
        setNotification(null)
    }, 5000)
    return () => {
        clearTimeout(timeOut)
    }
    
  }, [notification])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/') //here we go to the front page after creating a new anecdote using the form.
    setNotification(`added a new anecdote ${anecdote.content}`)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

//   const vote = (id) => {
//     const anecdote = anecdoteById(id)

    // const voted = {
    //   ...anecdote,
    //   votes: anecdote.votes + 1
    // }

    const match = useMatch('/anecdotes/:id')
    const anecdote = match ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id)) : null

    //setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification}/>
        <Routes>
            <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>}/>
            <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}/>
            <Route path='/createnew' element={<CreateNew addNew={addNew} />}/>
            <Route path='/about' element={<About />}/>
        </Routes>
      <Footer />
    </div>
  )
}

export default App
