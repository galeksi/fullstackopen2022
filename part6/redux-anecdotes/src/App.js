import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdotesService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App