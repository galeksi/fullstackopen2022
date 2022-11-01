const Persons = ({ personsToShow }) =>
    <p>
        {personsToShow.map(person =>
            <Person key={person.id} person={person} />
        )}
    </p>

const Person = ({ person }) =>
    <>
        {person.name} {person.number}<br />
    </>

export default Persons