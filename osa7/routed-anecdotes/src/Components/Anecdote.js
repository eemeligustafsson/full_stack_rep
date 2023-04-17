export const Anecdote = ({ anecdote }) => {
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <p>has {anecdote.votes} votes</p>
        </div>
    )
}