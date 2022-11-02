import { useState, useEffect } from 'react'
// import axios from 'axios'
import Persons from './Components/Person'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import personService from './Services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  
  const checkNameExists = (newName) => persons.find(person => person.name === newName)
  
  const personsToShow = newFilter
      ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLocaleLowerCase()))
      : persons
  
  const addPerson = (event) => {
    event.preventDefault()
    if (checkNameExists(newName)) {
      alert(`${newName} is already in the phonebook`)
    }
    else {
      const personObject = { name: newName, number: newNumber }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }
    
  return (
    <div>
    <h2>Phonebook</h2>
    <Filter value={newFilter} onChange={handleFilterChange} />
    <h2>Add a new</h2>
    <PersonForm 
      onSubmit={addPerson} 
      valueName={newName} 
      valueNumber={newNumber} 
      onChangeName={handleNameChange} 
      onChangeNumber={handleNumberChange} 
      />
    <h2>Numbers</h2>
    <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App