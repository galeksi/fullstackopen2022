import { useState } from 'react'

const Person = ({ person }) =>
  <>
    {person.name} {person.number}<br />
  </>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  // console.log(persons)

  const addPerson = (event) => {
    event.preventDefault()
    // console.log(event.target[0].value)
    if (checkNameExists(newName)) {
      alert(`${newName} is already in the phonebook`)
    }
    else {
      const personObject = { name: newName, number: newNumber, id: persons.length + 1 }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  } 

  const handleValueChange = (event) => {
    console.log('Filter input changed to', event.target.value)
    setNewFilter(event.target.value)
  }
  
  const checkNameExists = (newName) => {
    console.log(newName)
    return (
      persons.find(person => person.name === newName)
    )
  }

  const personsToShow = newFilter
      ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLocaleLowerCase()))
      : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown for: <input value={newFilter} onChange={handleValueChange}/>
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} /> <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p>
        {personsToShow.map(person => 
          <Person key={person.id} person={person} />
        )}
      </p>
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App