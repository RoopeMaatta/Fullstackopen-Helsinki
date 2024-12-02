const bmiCategories = [
    { max: 16.0, label: 'Underweight (Severe thinness)' },
    { max: 17.0, label: 'Underweight (Moderate thinness)' },
    { max: 18.5, label: 'Underweight (Mild thinness)' },
    { max: 25.0, label: 'Normal range' },
    { max: 30.0, label: 'Overweight (Pre-obese)' },
    { max: 35.0, label: 'Obese (Class I)' },
    { max: 40.0, label: 'Obese (Class II)' },
    { max: Infinity, label: 'Obese (Class III)' },
];

const calculateBmi = (heightCm: number, weightKg: number): string => {
    const bmi = (weightKg / ((heightCm/100) * (heightCm/100)));
    const category = bmiCategories.find((currentItem) => bmi <= currentItem.max);
    return category ? category.label : 'Unknown';
};

try {
  console.log(calculateBmi(180, 74));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}