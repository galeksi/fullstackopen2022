import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Countries from './Components/Country'
import countryService from './Services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const countriesToShow = newFilter
    ? countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    : []

  const showDetail = (countryName) => setNewFilter(countryName)
  
  return (
    <div>
      <h1>Countrydata</h1>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} showDetail={showDetail}/>
    </div>
  );
}

export default App
