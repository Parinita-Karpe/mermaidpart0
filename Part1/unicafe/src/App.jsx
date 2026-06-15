import { useState } from 'react'
  const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
  const StatisticLine = (props) => (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  ) 
  const Statistics = (props) => {
    if (props.good + props.neutral + props.bad === 0) {
      return (
        <div>
          No feedback given
        </div>
      )
    }
        return (
      <div>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={props.good + props.neutral + props.bad} />
        <StatisticLine text='average' value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
        <StatisticLine text='positive' value={props.good / (props.good + props.neutral + props.bad) * 100 + ' %'} />
      </div>
    )
  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const[selected, setSelected] = useState(0)
  const initialVotes = new Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(initialVotes)

  const handleVote = () => {    const copy = [...votes]
    console.log(copy)
    copy[selected] += 1
    setVotes(copy)
  }
  // console.log(initialVotes)
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <br></br>
      <h1>anecdote of the day</h1>
      {anecdotes[selected]}
        
        <p>has {votes[selected]} votes</p>
        <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text='next anecdote' />
        
        <button onClick={handleVote}>vote</button>
          <h1>anecdote with most votes</h1>
        {anecdotes[votes.indexOf(Math.max(...votes))]}
    </div>
  )
}

export default App