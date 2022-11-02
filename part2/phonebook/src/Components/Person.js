const Persons = ({ personsToShow }) =>
    <table>
        <tbody>
            {personsToShow.map(person =>
                <Person key={person.id} person={person} />
            )}
        </tbody>
    </table>

const Person = ({ person }) =>
    <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td>
            <button onClick={() => 
            window.confirm("Do you really want to delete?") 
            ? console.log('confirmed') 
            : console.log('canceled')
            }>Delete</button >
        </td>
    </tr>

export default Persons