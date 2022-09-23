import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const handleVoteClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const getMostVoted = () => {
    return votes.reduce(
      (maxIdx, vote, idx) => (vote > votes[maxIdx] ? idx : maxIdx),
      0
    );
  };
  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };
  const handleAnecdoteClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  if (good + neutral + bad === 0) {
    return (
      <>
        <Header content="give feedback" />
        <Button handleclick={handleGoodClick} text="good" />
        <Button handleclick={handleNeutralClick} text="neutral" />
        <Button handleclick={handleBadClick} text="bad" />
        <Header content="statistics" />
        <div>no feedback given</div>
        <h1>{anecdotes[selected]}</h1>
        <h1>has {votes[selected]} votes</h1>
        <Button handleclick={handleVoteClick} text="vote" />
        <Button handleclick={handleAnecdoteClick} text="next anecdote" />
        <Header content="Anecdote with most votes" />
        <p>{anecdotes[getMostVoted()]}</p>
        <p>has {votes[getMostVoted()]} votes</p>
      </>
    );
  }
  return (
    <>
      <Header content="give feedback" />
      <Button handleclick={handleGoodClick} text="good" />
      <Button handleclick={handleNeutralClick} text="neutral" />
      <Button handleclick={handleBadClick} text="bad" />
      <Header content="statistics" />
      <Statistics goods={good} neutrals={neutral} bads={bad} />
      <h1>{anecdotes[selected]}</h1>
      <h1>has {votes[selected]} votes</h1>
      <Button handleclick={handleVoteClick} text="vote" />
      <Button handleclick={handleAnecdoteClick} text="next anecdote" />
      <Header content="Anecdote with most votes" />
      <p>{anecdotes[getMostVoted()]}</p>
      <p>has {votes[getMostVoted()]} votes</p>
    </>
  );
};

const Header = (props) => {
  return <h1>{props.content}</h1>;
};
const Button = (props) => {
  return <button onClick={props.handleclick}>{props.text}</button>;
};
const Statistics = ({ goods, neutrals, bads }) => {
  var all = goods + neutrals + bads;
  var mean = all > 0 ? (goods - bads) / all : 0;
  var positive = all > 0 ? (goods / all) * 100 : 0;
  return (
    <table>
      <tbody>
        <StatisticLine value={goods} text="good" />
        <StatisticLine value={neutrals} text="neutral" />
        <StatisticLine value={bads} text="bad" />
        <StatisticLine value={all} text="all" />
        <StatisticLine value={mean} text="average" />
        <StatisticLine value={positive} text="positive" />
      </tbody>
    </table>
  );
};
const StatisticLine = ({ value, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default App;
