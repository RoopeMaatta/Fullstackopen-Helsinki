var bmiCategories = [
    { max: 16.0, label: 'Underweight (Severe thinness)' },
    { max: 17.0, label: 'Underweight (Moderate thinness)' },
    { max: 18.5, label: 'Underweight (Mild thinness)' },
    { max: 25.0, label: 'Normal range' },
    { max: 30.0, label: 'Overweight (Pre-obese)' },
    { max: 35.0, label: 'Obese (Class I)' },
    { max: 40.0, label: 'Obese (Class II)' },
    { max: Infinity, label: 'Obese (Class III)' },
];
var calculateBmi = function (heightCm, weightKg) {
    var bmi = (weightKg / ((heightCm / 100) * (heightCm / 100)));
    var category = bmiCategories.find(function (currentItem) { return bmi <= currentItem.max; });
    return category ? category.label : 'Unknown';
};
try {
    console.log(calculateBmi(180, 74));
}
catch (error) {
    var errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
