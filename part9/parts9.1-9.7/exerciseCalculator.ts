const calculateExercise = (exerciseHours: number[], exerciseGoal: number): object => {
  const daysRecorded = exerciseHours.length;
  const trainingDays = exerciseHours.filter((item) => item !== 0).length;
  const averageTrainingTime = exerciseHours.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / daysRecorded;
  const goalAchieved = averageTrainingTime >= exerciseGoal;


  let rating: number;
  let ratingDescription: string;

  if (averageTrainingTime < exerciseGoal - 1) {
    rating = 1;
    ratingDescription = 'You failed.';
  } else if (averageTrainingTime <= exerciseGoal + 1) {
    rating = 2;
    ratingDescription = 'Not too bad, but you could improve.';
  } else {
    rating = 3;
    ratingDescription = 'Good job.';
  }

  return {
    periodLength: daysRecorded,
    trainingDays: trainingDays,
    success: goalAchieved,
    rating: rating,
    ratingdescription: ratingDescription,
    target: exerciseGoal,
    average: averageTrainingTime,
    
  };
};

try {
  console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}