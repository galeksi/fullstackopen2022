const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = ({ title }: { title: string }) => <h1>{title}</h1>;

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackround extends CoursePartDescription {
  backroundMaterial: string;
  kind: "background";
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackround
  | CoursePartRequirements;

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <b>{part.name}</b>
          <br />
          Exercises: {part.exerciseCount}
          <br />
          Description: {part.description}
        </p>
      );
    case "group":
      return (
        <p>
          <b>{part.name}</b>
          <br />
          Exercises: {part.exerciseCount}
          <br />
          Projects: {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <b>{part.name}</b>
          <br />
          Exercises: {part.exerciseCount}
          <br />
          Description: {part.description}
          <br />
          Material: {part.backroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          <b>{part.name}</b>
          <br />
          Exercises: {part.exerciseCount}
          <br />
          Description: {part.description}
          <br />
          Requirements: {part.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(part);
  }
};

const Content = ({ parts }: { parts: CoursePart[] }) => (
  <>
    {parts.map((p) => (
      <Part key={p.name} part={p} />
    ))}
  </>
);

const Total = ({ count }: { count: number }) => (
  <p>Number of exercises {count}</p>
);

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
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
