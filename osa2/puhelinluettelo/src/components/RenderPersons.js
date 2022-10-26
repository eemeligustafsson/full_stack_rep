const RenderPersons = ({personsToShow, deletePerson }) =>{
    return(
        <div>
        {personsToShow.map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id, person.name)}>DELETE</button>
          </div>
        ))}
      </div>
    )
}

export default RenderPersons
