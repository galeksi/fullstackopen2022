import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(Array(anecdotes.length).fill(0))

  const selectNewNumber = () => {
    const newNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(newNumber)
  }

  const handleVote = () => {
    const anecdoteVoted = [...voted]
    anecdoteVoted[selected] += 1
    setVoted(anecdoteVoted)
  }

  const mostVotedAnecdote = () => {
    const sortedVotes = [...voted].sort((a, b) => b - a)
    if (sortedVotes[0] === 0) {
      return (
        <>No votes yet</>
      )
    }
    return (
      voted.indexOf(sortedVotes[0])
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <h3>{anecdotes[selected]}<br />has {voted[selected]} votes</h3>
      <button onClick={handleVote}>vote</button>
      <button onClick={selectNewNumber}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <h3>{anecdotes[mostVotedAnecdote()]}<br />has {voted[mostVotedAnecdote()]} votes</h3>
    </div>
  )
}

export default App
