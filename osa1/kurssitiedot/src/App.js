const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        partone={part1}
        exercisesone={exercises1}
        parttwo={part2}
        exercisestwo={exercises2}
        parttre={part3}
        exercisestre={exercises3}/>
        <Total total={exercises1+exercises2+exercises3}/>
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};


const Content = (props) => {
  return (
    <>
      <Part name={props.partone} exer={props.exercisesone}/>
      <Part name={props.parttwo} exer={props.exercisestwo}/>
      <Part name={props.parttre} exer={props.exercisestre}/>
    </>
  );
};

const Part=(props)=>{
    return(
        <p>{props.name} {props.exer}</p>
    )
}
const Total = (props) => {
    return(
        <>
        <p>Number of exercises {props.total}</p>
        </>
    )
};

export default App;
