
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote, initializeAnecdotes } from "../reducers/anecdoteReducer";
import { orderBy } from "lodash";
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
      : state.anecdotes
  );
  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(createNotification(`voted for: ${anecdote.content}`, 10));
  };

  const sortedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"]);

  return sortedAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <button onClick={() => handleVote(anecdote)}>vote! </button>
      {' votes  '}{anecdote.votes}{'  '}
      {anecdote.content}
    </div>
  ));
};

export default AnecdoteList;
