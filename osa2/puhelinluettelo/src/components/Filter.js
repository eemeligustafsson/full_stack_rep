const Filter = ({ filter, handleFilterChange, filterPersons }) => {
  return (
    <form>
      <div>
        filter shown with
        <input value={filter} onChange={handleFilterChange}></input>
        <button onClick={filterPersons}>filter</button>
      </div>
    </form>
  );
};

export default Filter;
