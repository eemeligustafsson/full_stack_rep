const NewPersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) =>{
    return(
        <form onSubmit={addPerson}>
        <div>
          name<input value={newName} onChange={handleNameChange}></input>
        </div>
        <div>
          number<input value={newNumber} onChange={handleNumberChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )

}

export default NewPersonForm