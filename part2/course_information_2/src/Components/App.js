const Header = ({ title }) => <h2>{title}</h2>

const Total = ({ parts }) => {
  const sum = parts.map(part => part.exercises).reduce((a, b) => a + b, 0)
    return (
      <p><strong>Total of {sum} exercises</strong></p>
    )
  }

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part =>
      <Part key={part.id} part={part} />
      )}
  </>

const Course = (props) => {
  console.log(props)
  const {courses} = props
  console.log(courses)
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <div key={course.id}>  
          <Header key={course.id} title={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )}  
    </>
  )
}

const App = () => {
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={course} />
}

export default App