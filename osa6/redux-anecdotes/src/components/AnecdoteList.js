import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { orderBy } from 'lodash'; 
import { createNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
    
    const anecdotes = useSelector(({filter, anecdotes}) => {
        return filter ? anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase())) : anecdotes
    })

    const handleVoting = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(createNotification(`you voted: ${anecdote.content}`))
    }

    const anecdotesSorted = orderBy(anecdotes, ['votes'], ['desc']);
    const dispatch = useDispatch()

    return ( 
        <div>
            {anecdotesSorted.map(anecdote => 
                <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => handleVoting(anecdote)} />)}
        </div>
    )
}

export default AnecdoteList
