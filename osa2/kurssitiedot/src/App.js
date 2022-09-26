const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "State ",
        exercises: 114,
        id: 4,
      },
      {
        name: "State ",
        exercises: 114,
        Id: 5,
      },
      {
        name: "State ",
        exercises: 114,
        id: 6,
      },
      {
        name: "Sta222te ",
        exercises: 11422,
        Id: 6,
      },
    ],
  };

  return (
    <div>
      <Course key={course.id} course={course} />
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, i) => (
        <Part key={i} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};
const Total = ({ parts }) => {
  const total = parts.reduce((sum, next) => sum + next.exercises, 0);
  return (
    <>
      <strong>total of {total} exercises</strong>
    </>
  );
};

export default App;
