const Countries = ({countriesToShow, showDetail}) => {
    // const countries = countriesToShow.slice(0,10)
    if (countriesToShow.length > 10) {
        return (
            <div>
                <h3>Too many matches, specify another filter.</h3>
            </div>
        )
    } else if (countriesToShow.length === 1) {
        return (
        <Country country={countriesToShow[0]} />
        )
    }
    else {
        return (
            <table>
                <tbody>
                    {countriesToShow.map(country =>
                        <tr key = {country.name.common}>
                            <td>{country.name.common}</td>     
                            <td><button onClick={() => showDetail(country.name.common)}>Show</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
}

const Country = ({country}) => {
    const languages = Object.entries(country.languages).map(language => language[1])
    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>
                <p>Capital: {country.capital}<br />
                Area: {country.area}</p>
            </div>
            <div>
                <h3>Languages:</h3>
                <ul>
                    {languages.map(language =>
                        <li key={language}>
                            {language}
                        </li>    
                    )}
                </ul>
            </div>
            <div>
                <img src={country.flags.png} alt='Flag' />
            </div>
        </div>
    )
}

export default Countries