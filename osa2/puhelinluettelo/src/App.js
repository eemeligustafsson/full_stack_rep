import { useEffect, useState } from "react";
import axios from 'axios';
import Filter from "./components/Filter";
import NewPersonForm from "./components/NewPersonForm";
import RenderPersons from "./components/RenderPersons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(true);

    useEffect(()=>{
        axios.get('http://localhost:3001/persons')
        .then(response =>{
            setPersons(response.data)
        })
    },[])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    const person = persons.filter((person) => person.name === newName);
    if (person.length !== 0) {
      alert(`${personObject.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };
  const filterPersons = (event) => {
    event.preventDefault();
    setFiltered(
      persons.filter((person) => person.name.toLowerCase().includes(filter))
    );
    setShowAll(!showAll);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const personsToShow = showAll ? persons : filtered;
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
        filterPersons={filterPersons}
      />
      <h2>add a new</h2>
      <NewPersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <RenderPersons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
