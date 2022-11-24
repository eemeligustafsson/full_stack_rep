import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import Filter from "./components/Filter";
import NewPersonForm from "./components/NewPersonForm";
import RenderPersons from "./components/RenderPersons";
import personService from "./services/personService";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [action, setAction] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const person = persons.filter((person) => person.name === newName);
    if (person.length !== 0) {
      if (
        window.confirm(
          `${personObject.name} is already added to phonebook, replace old number with a new one?`
        )
      ) {
        personService
          .update(person[0].id, { name: newName, number: newNumber })
          .then((returnedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            );

            setAction(`Modified ${personObject.name}`);
            setTimeout(() => {
              setAction(null);
            }, 5000);
            setPersons(updatedPersons);
            alert(`Updated ${personObject.name}`);
          })
          .catch((error) => {
            setError(
              `Information of ${personObject.name} has already been removed from server.`
            );
            setTimeout(() => {
              setError(null);
            }, 5000);
          });
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setAction(`Added ${personObject.name}`);
        setTimeout(() => {
          setAction(null);
        }, 5000);
        setPersons(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
      }
      )
      .catch(error => {
        setError(`${error.response.data.error}`)
        setTimeout(()=>{
            setError("")
        }, 5000)
      });
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

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id).then((Response) => {
        const updatePersons = persons.filter((person) => person.id !== id);
        setAction(`Deleted ${name}`);
        setTimeout(() => {
          setAction(null);
        }, 5000);
        setPersons(updatePersons);
      });
    }
  };
  const personsToShow = showAll ? persons : filtered;
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification action={action} />
      <Error message={error} />
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
      <RenderPersons
        personsToShow={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
