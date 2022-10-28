const Header = ({ title }) => <h2>{title}</h2>

const Content = ({ parts }) =>
    <>
        {parts.map(part =>
            <Part key={part.id} part={part} />
            )}
    </>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Total = ({ parts }) => {
    const sum = parts.map(part => part.exercises).reduce((a, b) => a + b, 0)
    return (
        <p><strong>Total of {sum} exercises</strong></p>
    )
}

const Course = ({ courses }) => {
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

export default Course