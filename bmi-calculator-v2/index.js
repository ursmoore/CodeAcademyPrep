// index.js
function calculateBMI(weight, height) {
    return weight / (height * height);
}

function calculateBMR(weight, height, ageOfUser, genderOfUser) {
    const heightInCm = height * 100;

    let BMR

    if (genderOfUser === "m") {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50;
    } else {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150;
    }

    return BMR;
}

function calculateIdealWeight(height) {
    return 22.5 * height * height;
}

function calculateDailyCalories(BasalMetabolicRate, doesUserExcercise) {
    return doesUserExcercise === "yes"
        ? BasalMetabolicRate * 1.6
        : BasalMetabolicRate * 1.4;
}

function calculateDietWeeks(weightToLose) {
    return Math.abs(weightToLose / 0.5);
}

function calculateDietCalories(weightToLose, caloriesUsedDaily) {
    return weightToLose > 0 ? caloriesUsedDaily - 500 : caloriesUsedDaily + 500;
} 

function validateNumberOfInputs(argv) {
    if (argv.length !== 7) {
      console.log(`
        You gave ${argv.length - 2} argument(s) to the program
    
        Please provide 5 arguments for
        
        weight (kg), 
        height (m), 
        age (years), 
        wether you exercise daily (yes or no)
        and your gender (m or f)
        
        Example:
    
        $ node index.js 82 1.79 32 yes m
      `);
  
      process.exit();
    }
  }

function validateWeightHeightAndAge(weight, height, ageOfUser, argv) {
    if (isNaN(weight) || isNaN(height) || isNaN(ageOfUser)) {
      console.log(`
      Please make sure weight, height and age are numbers:

      weight (kg) example: 82 | your input: ${argv[2]}
      height (m) example 1.79 | your input: ${argv[3]}
      age (years) example 32  | your input: ${argv[4]}
  
      Example:
      
      node index.js 82 1.79 32 yes m 
    `);
    process.exit();
  }

  if (ageOfUser < 20) {
    console.log(`
    We are sorry to inform you that we can not calculate your BMI!
    This BMI calculator is designed for people over 20
    `);
    process.exit();
  }
  
  if (weight < 30 || weight > 300 ) {
      console.log(`
  
      No offence! It seems you put your weight wrong. 
      Please provide a number for weight in kilograms between 30 and 300.
  
      Example:
  
      node index.js 82 1.79 32 yes m
      
      `);
      process.exit();
  }
}

function validateStringInput(doesUserExcercise, genderOfUser) {
    if (doesUserExcercise !== "yes" && doesUserExcercise !== "no") {
        console.log(`
    
        Your input seems to be wrong.
        Please specify if you exercise daily with "yes" or "no"
        Thank you.

        You entered: ${doesUserExercise}
        
        (Don't worry, we won't judge you if you enter no)

        

        Example:
    
        node index.js 82 1.79 32 yes m
    
        `)
        process.exit();
    }
    if (genderOfUser !== "m" && genderOfUser !== "f") {
        console.log(`
    
        Your input seems to be wrong.
        Please specify if you are (m)ale or (f)emale.
        Thank you.
        
        You entered: ${genderOfUser}



        Example:
    
        node index.js 82 1.79 32 yes m
    
        `)
        process.exit();
    }
}

function formatOutput(userObject) {
    
    return `
    **************
    BMI CALCULATOR
    **************

    age: ${userObject.age} years
    gender: ${userObject.gender}
    height: ${userObject.heightInM} m
    weight: ${userObject.weightInKg} kg
    do you exercise daily? ${userObject.dailyExercise}

    ****************
    FACING THE FACTS
    ****************

    Your BMI is ${userObject.BMI}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ${userObject.idealWeightKg} kg
    With a normal lifestyle you burn ${userObject.dailyCalories} calories a day

    **********
    DIET PLAN
    **********

    If you want to reach your ideal weight of ${userObject.idealWeightKg} kg:

    Eat ${userObject.dietCalories} calories a day
    For ${userObject.dietWeeks} weeks
    `;
}

function bmiCalculator() {
    validateNumberOfInputs(process.argv);

    const weightInKg = parseInt(process.argv[2]);
    const heightInM = parseFloat(process.argv[3]);
    const age = parseInt(process.argv[4]);
    const dailyExercise = process.argv[5];
    const gender = process.argv[6];

    validateWeightHeightAndAge(weightInKg, heightInM, age, process.argv);
    validateStringInput(dailyExercise, gender);

    const BMI = calculateBMI(weightInKg, heightInM);
    const BMR = calculateBMR(weightInKg, heightInM, age, gender);
    const idealWeightKg = calculateIdealWeight(heightInM);
    const dailyCalories = calculateDailyCalories(BMR, dailyExercise);
    const weightToLoseInKg = weightInKg - idealWeightKg
    const dietWeeks = calculateDietWeeks(weightToLoseInKg);
    const dietCalories = calculateDietCalories(weightToLoseInKg, dailyCalories);

    // console.log("WEIGHT:", weightInKg)
    // console.log("HEIGHT:", heightInM)
    // console.log("AGE:", age);
    // console.log("DAILY EXERCISE:", dailyExercise);
    // console.log("GENDER:", gender);
    // console.log("BMI:", BMI);
    // console.log("BMR:", BMR)
    // console.log("Your ideal weight is:", idealWeight);
    // console.log("Your daily calorie intake:", dailyCalories);
    // console.log("Weight to lose:", weightToLoseInKg)
    // console.log("Weeks to go on diet:", dietWeeks)
    // console.log("You should eat", dietCalories, "daily.")

    const user = {
        weightInKg: weightInKg,
        heightInM: heightInM,
        age: age,
        dailyExercise: dailyExercise,
        gender: gender,
        BMI: BMI,
        idealWeightKg: idealWeightKg,
        dailyCalories: dailyCalories,
        weightToLoseKg: weightToLoseInKg,
        dietWeeks: dietWeeks,
        dietCalories: dietCalories,
    };
    
    const output = formatOutput(user);

    console.log(output);
  }
  
  bmiCalculator();