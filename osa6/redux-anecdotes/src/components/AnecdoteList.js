import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { orderBy } from 'lodash'; 

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
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const anecdotesSorted = orderBy(anecdotes, ['votes'], ['desc']);

    return ( 
        <div>
            <h2>Anecdotes</h2>
            {anecdotesSorted.map(anecdote => 
                <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => dispatch(voteAnecdote(anecdote.id))} />)}
        </div>
    )
}

export default AnecdoteList
