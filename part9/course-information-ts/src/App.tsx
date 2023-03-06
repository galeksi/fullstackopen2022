const Header = ({ title }: { title: string }) => <h1>{title}</h1>;

interface CourseProps {
  name: string;
  exerciseCount: number;
}

const Content = ({ parts }: { parts: CourseProps[] }) => (
  <>
    {parts.map((p) => (
      <p key={p.name}>
        {p.name} {p.exerciseCount}
      </p>
    ))}
  </>
);

const Total = ({ count }: { count: number }) => (
  <p>Number of exercises {count}</p>
);

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];
  const exercisesTotal = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header title={courseName} />
      <Content parts={courseParts} />
      <Total count={exercisesTotal} />
    </div>
  );
};

export default App;
