const Header = (props) => {
  return (
    <h1>
      {props.course.name}
    </h1>
  )
}

const Content = (props) => {
  const [first, second, third] = props.parts.parts
  
  return (
    <div>
      <Part part={first.name} excercise={first.exercises} />
      <Part part={second.name} excercise={second.exercises} />
      <Part part={third.name} excercise={third.exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.excercise}
    </p>
  )
}

const Total = (props) => {
  const [first, second, third] = props.parts.parts
  
  return (
    <p>
      Number of excercises {first.exercises + second.exercises + third.exercises}
    </p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

export default App