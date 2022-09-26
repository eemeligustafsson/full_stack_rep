const Total = ({ parts }) => {
    const total = parts.reduce((sum, next) => sum + next.exercises, 0);
    return (
      <>
        <strong>total of {total} exercises</strong>
      </>
    );
  };


  export default Total