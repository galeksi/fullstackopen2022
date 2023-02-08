const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height / 100) * (height / 100));
  console.log(bmi);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 30) {
    return "Normal (Healthy weight)";
  } else if (bmi >= 30) {
    return "Overweight";
  } else {
    return "Something went wrong";
  }
};

console.log(calculateBmi(180, 74));
