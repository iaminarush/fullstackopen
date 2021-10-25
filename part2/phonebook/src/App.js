import React, { useEffect, useState } from "react";
import personService from "./services/persons";

const Filter = (props) => {
  return (
    <div>
      filter shown with <input {...props} />
    </div>
  );
};

const Form = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <h3>Add a new number</h3>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Phonebook = ({ persons, filter, handleDelete }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((filteredPerson) => (
          <p key={filteredPerson.id}>
            {filteredPerson.name} {filteredPerson.number}{" "}
            <button onClick={() => handleDelete(filteredPerson)}>delete</button>
          </p>
        ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id).then(() => {
        setPersons(
          persons.filter((filterPerson) => person.id !== filterPerson.id)
        );
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = persons.find((person) => person.name === newName);
    if (obj) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        obj.number = newNumber;
        personService.updatePerson(obj).then(() => {
          setPersons(
            persons.map((person) => (person.id !== obj.id ? person : obj))
          );
        });
      }
      return;
    }
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    personService.createPerson(nameObject).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Phonebook
        persons={persons}
        filter={filter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
