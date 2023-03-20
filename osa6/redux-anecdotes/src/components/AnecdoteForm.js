import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreateAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(anecdote));
    dispatch(createNotification(`added new anecdote: ${anecdote}`, 2));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;