import { useState, useEffect } from 'react'
// import axios from 'axios'
import Persons from './Components/Person'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Notification from './Components/Notification'
import Error from './Components/Error'
import personService from './Services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      const person = persons.find(person => person.name === newName)
      console.log(person)
      window.confirm(`${newName} is already added to the phonebook. Replace the old number with the new one?`)
        ? updatePerson(person.id)
        : console.log('canceled')
    }
    else {
      const personObject = { name: newName, number: newNumber }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`${returnedPerson.name} was succesfully added to the phonebook`)
          setTimeout(() => setNotification(null), 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => setErrorMessage(null), 5000)
        })
    }
  }

  const updatePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const updatedPerson = { ...person, number: newNumber}
    personService
      .update(id, updatedPerson)
      .then(() => {
        setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
        setNotification(`${person.name} was updated succesfully`)
        setTimeout(() => setNotification(null), 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(`${error.response.data.error}`)
        setTimeout(() => setErrorMessage(null), 5000)
      })
  }

  const deletePerson = (personId) => {
    const person = persons.find(p => p.id === personId)
    personService.destroy(personId).then(() => {
      const newPersons = persons.filter(person => person.id !== personId)
      setPersons(newPersons)
      setNotification(`${person.name} deleted succesfully`)
      setTimeout(() => setNotification(null), 5000)
    }).catch(() => {
      setErrorMessage(`Information of ${person.name} has already been removed`)
      setPersons(persons.filter(person => person.id !== personId))
      setTimeout(() => setErrorMessage(null), 5000)
    })
  }
    
  return (
    <div>
    <h2>Phonebook</h2>
    <Notification message={notification} />
    <Error message={errorMessage} />
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
    <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App