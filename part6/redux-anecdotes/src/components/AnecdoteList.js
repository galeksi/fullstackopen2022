import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  // console.log(sortedAnecdotes)

  const anecdotesToShow = filter === ''
    ? sortedAnecdotes
    : sortedAnecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = (id) => {
    // console.log('vote', id)
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(voteAnecdote(id))
    dispatch(createNotification(`You voted for "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(removeNotification(''))
    }, 5000)
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