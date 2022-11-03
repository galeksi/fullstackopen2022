const Persons = ({ personsToShow, deletePerson }) =>
    <table>
        <tbody>
            {personsToShow.map(person =>
                <Person key={person.id} person={person} deletePerson={deletePerson} />
            )}
        </tbody>
    </table>

const Person = ({ person, deletePerson }) =>
    <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td>
            <button onClick={() => 
            window.confirm("Do you really want to delete?") 
            ? deletePerson(person.id)
            : console.log('canceled')
            }>Delete</button >
        </td>
    </tr>

export default Persons