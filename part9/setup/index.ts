import express = require("express");
const app = express();

import calculateBmi from "./bmiCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

let value3: any = 1;

app.get("/bmi", (req, res) => {
  const params = req.query;
  if (!params || isNaN(Number(params.height)) || isNaN(Number(params.weight)))
    res.json({ error: "malformatted parameters" });
  const bmi = calculateBmi(Number(params.height), Number(params.weight));
  params.bmi = bmi;
  res.json(params);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
