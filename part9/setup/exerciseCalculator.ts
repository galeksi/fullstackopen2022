interface CalculatedResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const validateArgs = (args: string[]): number[] => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const values = args.slice(2).map((v) => {
    if (isNaN(Number(v))) {
      throw new Error(`Provided value ${v} is not a number`);
    } else {
      return Number(v);
    }
  });

  return values;
};

const calculateExercises = (
  target: number,
  days: number[]
): CalculatedResult => {
  let rating = 0;
  let comment = "";
  const trainingDays = days.filter((d) => d > 0);
  // console.log("training days:", trainingDays);
  const average = trainingDays.reduce((a, b) => a + b, 0) / days.length;
  // console.log("average:", average);

  if (average >= target) {
    rating = 3;
    comment = "Great job";
  } else if (average < target && average >= target / 2) {
    rating = 2;
    comment = "Not too bad but could be better";
  } else if (average < target / 2) {
    rating = 1;
    comment = "Missed your target by 50%, keep trying";
  } else {
    throw new Error("Could not calculate BMI");
  }

  return {
    periodLength: days.length,
    trainingDays: trainingDays.length,
    success: rating >= 3 ? true : false,
    rating: rating,
    ratingDescription: comment,
    target: target,
    average: average,
  };
};

try {
  const exerciseArgs = validateArgs(process.argv);
  console.log(calculateExercises(exerciseArgs[0], exerciseArgs.slice(1)));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
