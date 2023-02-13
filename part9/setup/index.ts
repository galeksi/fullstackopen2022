import express = require("express");
const app = express();

app.use(express.json());

import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const params = req.query;
  if (!params || isNaN(Number(params.height)) || isNaN(Number(params.weight)))
    res.status(400).send({ error: "malformatted parameters" });
  const bmi = calculateBmi(Number(params.height), Number(params.weight));
  params.bmi = bmi;
  res.send(params);
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (Object.keys(req.body).length === 0)
    res.status(400).json({
      error: "parameters missing",
    });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (isNaN(Number(target)))
    res.status(400).json({
      error: "malformatted parameters",
    });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  if (daily_exercises.find((d: any) => isNaN(Number(d))))
    res.status(400).json({
      error: "malformatted parameters",
    });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(target, daily_exercises);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
