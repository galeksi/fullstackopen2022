import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const anecdotesToShow = filter === ''
    ? sortedAnecdotes
    : sortedAnecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = (id) => {
    // console.log('vote', id)
    const anecdote = anecdotes.find(a => a.id === id)
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    
    dispatch(voteAnecdote(id, votedAnecdote))
    dispatch(setNotification(`You voted for "${anecdote.content}"`, 10))
  }

  return (
    <>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList