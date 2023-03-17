async function getUsersAndFillSel() {
    const selUser = window.document.getElementById('sel-user');
    const labUserId = window.document.getElementById('lab-user-id');

    const users = await (await fetch('http://localhost:3000/user')).json();
    for (let index = 0; index < users.length; index++) {
        var option = window.document.createElement('option');
        option.text = users[index].name;
        selUser.add(option);
    }

    labUserId.innerHTML = users[0]._id;
};

async function insertDataWeekTable() {

    const labUserId = window.document.getElementById('lab-user-id');
    var table = document.getElementById('tb-week');
    const users = await (await fetch('http://localhost:3000/user')).json();

    // updates label user id
    updateLabelUserId(users, labUserId);

    const userId = labUserId.textContent;

    // clears table
    tableErase(table);

    // Monday
    var breakfastMonday = "";
    var lunchMonday = "";
    var snackMonday = "";
    var dinnerMonday = "";

    const mealsMonday = await (await fetch(`http://localhost:3000/meal/${userId}/Monday`)).json();

    for (let index = 0; index < mealsMonday.length; index++) {
        const meal = mealsMonday[index];
        if (meal.meal_type === 'Breakfast') {
            breakfastMonday = meal.description;
        } else if (meal.meal_type === 'Lunch') {
            lunchMonday = meal.description;
        } else if (meal.meal_type === 'Snack') {
            snackMonday = meal.description;
        } else {
            dinnerMonday = meal.description;
        }
    }

    // Tuesday
    var breakfastTuesday = "";
    var lunchTuesday = "";
    var snackTuesday = "";
    var dinnerTuesday = "";

    const mealsTuesday = await (await fetch(`http://localhost:3000/meal/${userId}/Tuesday`)).json();

    for (let index = 0; index < mealsTuesday.length; index++) {
        const meal = mealsTuesday[index];
        if (meal.meal_type === 'Breakfast') {
            breakfastTuesday = meal.description;
        } else if (meal.meal_type === 'Lunch') {
            lunchTuesday = meal.description;
        } else if (meal.meal_type === 'Snack') {
            snackTuesday = meal.description;
        } else {
            dinnerTuesday = meal.description;
        }
    }

    // Wednesday
    var breakfastWednesday = "";
    var lunchWednesday = "";
    var snackWednesday = "";
    var dinnerWednesday = "";

    const mealsWednesday = await (await fetch(`http://localhost:3000/meal/${userId}/Wednesday`)).json();

    for (let index = 0; index < mealsWednesday.length; index++) {
        const meal = mealsWednesday[index];
        if (meal.meal_type === 'Breakfast') {
            breakfastWednesday = meal.description;
        } else if (meal.meal_type === 'Lunch') {
            lunchWednesday = meal.description;
        } else if (meal.meal_type === 'Snack') {
            snackWednesday = meal.description;
        } else {
            dinnerWednesday = meal.description;
        }
    }

    // Thursday
    var breakfastThursday = "";
    var lunchThursday = "";
    var snackThursday = "";
    var dinnerThursday = "";

    const mealsThursday = await (await fetch(`http://localhost:3000/meal/${userId}/Thursday`)).json();

    for (let index = 0; index < mealsThursday.length; index++) {
        const meal = mealsThursday[index];
        if (meal.meal_type === 'Breakfast') {
            breakfastThursday = meal.description;
        } else if (meal.meal_type === 'Lunch') {
            lunchThursday = meal.description;
        } else if (meal.meal_type === 'Snack') {
            snackThursday = meal.description;
        } else {
            dinnerThursday = meal.description;
        }
    }

    // Friday
    var breakfastFriday = "";
    var lunchFriday = "";
    var snackFriday = "";
    var dinnerFriday = "";

    const mealsFriday = await (await fetch(`http://localhost:3000/meal/${userId}/Friday`)).json();

    for (let index = 0; index < mealsFriday.length; index++) {
        const meal = mealsFriday[index];
        if (meal.meal_type === 'Breakfast') {
            breakfastFriday = meal.description;
        } else if (meal.meal_type === 'Lunch') {
            lunchFriday = meal.description;
        } else if (meal.meal_type === 'Snack') {
            snackFriday = meal.description;
        } else {
            dinnerFriday = meal.description;
        }
    }

    // Saturday
    var breakfastSaturday = "";
    var lunchSaturday = "";
    var snackSaturday = "";
    var dinnerSaturday = "";

    const mealsSaturday = await (await fetch(`http://localhost:3000/meal/${userId}/Saturday`)).json();

    for (let index = 0; index < mealsSaturday.length; index++) {
        const meal = mealsSaturday[index];
        if (meal.meal_type === 'Breakfast') {
            breakfastSaturday = meal.description;
        } else if (meal.meal_type === 'Lunch') {
            lunchSaturday = meal.description;
        } else if (meal.meal_type === 'Snack') {
            snackSaturday = meal.description;
        } else {
            dinnerSaturday = meal.description;
        }
    }

    // Sunday
    var breakfastSunday = "";
    var lunchSunday = "";
    var snackSunday = "";
    var dinnerSunday = "";

    const mealsSunday = await (await fetch(`http://localhost:3000/meal/${userId}/Sunday`)).json();

    for (let index = 0; index < mealsSunday.length; index++) {
        const meal = mealsSunday[index];
        if (meal.meal_type === 'Breakfast') {
            breakfastSunday = meal.description;
        } else if (meal.meal_type === 'Lunch') {
            lunchSunday = meal.description;
        } else if (meal.meal_type === 'Snack') {
            snackSunday = meal.description;
        } else {
            dinnerSunday = meal.description;
        }
    }

    const data = [
        [breakfastMonday, breakfastTuesday, breakfastWednesday, breakfastThursday, breakfastFriday, breakfastSaturday, breakfastSunday],
        [lunchMonday, lunchTuesday, lunchWednesday, lunchThursday, lunchFriday, lunchSaturday, lunchSunday],
        [snackMonday, snackTuesday, snackWednesday, snackThursday, snackFriday, snackSaturday, snackSunday],
        [dinnerMonday, dinnerTuesday, dinnerWednesday, dinnerThursday, dinnerFriday, dinnerSaturday, dinnerSunday]
    ];

    tableCreate(table, data);

}

async function mondayRemainingMacronutrientsOver() {
    const selUser = window.document.getElementById('sel-user');
    const spanDetails = window.document.getElementById('details-monday');
    const labUserId = window.document.getElementById('lab-user-id');
    const userId = labUserId.textContent;

    if (selUser.value !== "") {

        const remainingMacronutrientsMonday = {
            "remaining_carbohydrate": 1.2800000000000153,
            "remaining_protein": -31.829999999999984,
            "remaining_fat": 15.239999999999995
        }
        //await (await fetch(`http://localhost:3000/nutrition/${userId}/Monday`)).json();

        if (remainingMacronutrientsMonday.remaining_carbohydrate < 0 || remainingMacronutrientsMonday.remaining_protein < 0 || remainingMacronutrientsMonday.remaining_fat < 0) {
            spanDetails.style.backgroundColor = "rgb(236, 191, 191)";
        }

        spanDetails.textContent = "remaining macronutrients:";
        spanDetails.textContent += "\n";
        spanDetails.textContent += `carbohydrate: ${parseFloat(remainingMacronutrientsMonday.remaining_carbohydrate).toPrecision(3)}`;
        spanDetails.textContent += "\n";
        spanDetails.textContent += `proteyn: ${parseFloat(remainingMacronutrientsMonday.remaining_protein).toPrecision(3)}`;
        spanDetails.textContent += "\n";
        spanDetails.textContent += `fat: ${parseFloat(remainingMacronutrientsMonday.remaining_fat).toPrecision(3)}`;
    }
}

async function tuesdayRemainingMacronutrientsOver() {
    const selUser = window.document.getElementById('sel-user');
    const spanDetails = window.document.getElementById('details-tuesday');
    const labUserId = window.document.getElementById('lab-user-id');
    const userId = labUserId.textContent;

    if (selUser.value !== "") {
        const remainingMacronutrientsTuesday = {
            "remaining_carbohydrate": 1.2800000000000153,
            "remaining_protein": 31.829999999999984,
            "remaining_fat": 15.239999999999995
        }
        //await (await fetch(`http://localhost:3000/nutrition/${userId}/Tuesday`)).json();

        if (remainingMacronutrientsTuesday.remaining_carbohydrate < 0 || remainingMacronutrientsTuesday.remaining_protein < 0 || remainingMacronutrientsTuesday.remaining_fat < 0) {
            spanDetails.style.backgroundColor = "rgb(236, 191, 191)";
        }

        spanDetails.textContent = "remaining macronutrients:";
        spanDetails.textContent += "\n";
        spanDetails.textContent += `carbohydrate: ${parseFloat(remainingMacronutrientsTuesday.remaining_carbohydrate).toPrecision(3)}`;
        spanDetails.textContent += "\n";
        spanDetails.textContent += `proteyn: ${parseFloat(remainingMacronutrientsTuesday.remaining_protein).toPrecision(3)}`;
        spanDetails.textContent += "\n";
        spanDetails.textContent += `fat: ${parseFloat(remainingMacronutrientsTuesday.remaining_fat).toPrecision(3)}`;
    }
}

async function wednesdayRemainingMacronutrientsOver() {
    const selUser = window.document.getElementById('sel-user');
    const spanDetails = window.document.getElementById('details-wednesday');
    const labUserId = window.document.getElementById('lab-user-id');
    const userId = labUserId.textContent;

    if (selUser.value !== "") {
        const remainingMacronutrientsWednesday = {
            "remaining_carbohydrate": 1.2800000000000153,
            "remaining_protein": 31.829999999999984,
            "remaining_fat": 15.239999999999995
        }
        //const remainingMacronutrientsWednesday = await (await fetch(`http://localhost:3000/nutrition/${userId}/Wednesday`)).json();

        if (remainingMacronutrientsWednesday.remaining_carbohydrate < 0 || remainingMacronutrientsWednesday.remaining_protein < 0 || remainingMacronutrientsWednesday.remaining_fat < 0) {
            spanDetails.style.backgroundColor = "rgb(236, 191, 191)";
        }

        spanDetails.textContent = "remaining macronutrients:";
        spanDetails.textContent += "\n";
        spanDetails.textContent += `carbohydrate: ${parseFloat(remainingMacronutrientsWednesday.remaining_carbohydrate).toPrecision(3)}`;
        spanDetails.textContent += "\n";
        spanDetails.textContent += `proteyn: ${parseFloat(remainingMacronutrientsWednesday.remaining_protein).toPrecision(3)}`;
        spanDetails.textContent += "\n";
        spanDetails.textContent += `fat: ${parseFloat(remainingMacronutrientsWednesday.remaining_fat).toPrecision(3)}`;
    }
}

async function thursdayRemainingMacronutrientsOver() {
    const selUser = window.document.getElementById('sel-user');
    const spanDetails = window.document.getElementById('details-thursday');
    const labUserId = window.document.getElementById('lab-user-id');
    const userId = labUserId.textContent;

    if (selUser.value !== "") {
        const remainingMacronutrientsThursday = {
            "remaining_carbohydrate": 1.2800000000000153,
            "remaining_protein": 31.829999999999984,
            "remaining_fat": 15.239999999999995
        }
        //const remainingMacronutrientsThursday = await (await fetch(`http://localhost:3000/nutrition/${userId}/Thursday`)).json();

        if (remainingMacronutrientsThursday.remaining_carbohydrate < 0 || remainingMacronutrientsThursday.remaining_protein < 0 || remainingMacronutrientsThursday.remaining_fat < 0) {
            spanDetails.style.backgroundColor = "rgb(236, 191, 191)";
        }

        spanDetails.textContent = "remaining macronutrients:";
        spanDetails.textContent += "\n";
        spanDetails.textContent += `carbohydrate: ${parseFloat(remainingMacronutrientsThursday.remaining_carbohydrate).toPrecision(3)}`;
        spanDetails.textContent += "\n";
        spanDetails.textContent += `proteyn: ${parseFloat(remainingMacronutrientsThursday.remaining_protein).toPrecision(3)}`;
        spanDetails.textContent += "\n";
        spanDetails.textContent += `fat: ${parseFloat(remainingMacronutrientsThursday.remaining_fat).toPrecision(3)}`;
    }
}

async function fridayRemainingMacronutrientsOver() {
    const selUser = window.document.getElementById('sel-user');
    const spanDetails = window.document.getElementById('details-friday');
    const labUserId = window.document.getElementById('lab-user-id');
    const userId = labUserId.textContent;

    if (selUser.value !== "") {
        const remainingMacronutrientsFriday = {
            "remaining_carbohydrate": 1.2800000000000153,
            "remaining_protein": 31.829999999999984,
            "remaining_fat": 15.239999999999995
        }
        //const remainingMacronutrientsFriday = await (await fetch(`http://localhost:3000/nutrition/${userId}/Friday`)).json();

        if (remainingMacronutrientsFriday.remaining_carbohydrate < 0 || remainingMacronutrientsFriday.remaining_protein < 0 || remainingMacronutrientsFriday.remaining_fat < 0) {
            spanDetails.style.backgroundColor = "rgb(236, 191, 191)";
        }

        spanDetails.textContent = "remaining macronutrients:";
        spanDetails.textContent += "\n";
        spanDetails.textContent += `carbohydrate: ${parseFloat(remainingMacronutrientsFriday.remaining_carbohydrate).toPrecision(3)}`;
        spanDetails.textContent += "\n";
        spanDetails.textContent += `proteyn: ${parseFloat(remainingMacronutrientsFriday.remaining_protein).toPrecision(3)}`;
        spanDetails.textContent += "\n";
        spanDetails.textContent += `fat: ${parseFloat(remainingMacronutrientsFriday.remaining_fat).toPrecision(3)}`;
    }
}

async function saturdayRemainingMacronutrientsOver() {
    const selUser = window.document.getElementById('sel-user');
    const spanDetails = window.document.getElementById('details-saturday');
    const labUserId = window.document.getElementById('lab-user-id');
    const userId = labUserId.textContent;

    if (selUser.value !== "") {
        const remainingMacronutrientsSaturday = {
            "remaining_carbohydrate": 1.2800000000000153,
            "remaining_protein": 31.829999999999984,
            "remaining_fat": 15.239999999999995
        }
        //const remainingMacronutrientsSaturday = await (await fetch(`http://localhost:3000/nutrition/${userId}/Saturday`)).json();

        if (remainingMacronutrientsSaturday.remaining_carbohydrate < 0 || remainingMacronutrientsSaturday.remaining_protein < 0 || remainingMacronutrientsSaturday.remaining_fat < 0) {
            spanDetails.style.backgroundColor = "rgb(236, 191, 191)";
        }

        spanDetails.textContent = "remaining macronutrients:";
        spanDetails.textContent += "\n";
        spanDetails.textContent += `carbohydrate: ${parseFloat(remainingMacronutrientsSaturday.remaining_carbohydrate).toPrecision(3)}`;
        spanDetails.textContent += "\n";
        spanDetails.textContent += `proteyn: ${parseFloat(remainingMacronutrientsSaturday.remaining_protein).toPrecision(3)}`;
        spanDetails.textContent += "\n";
        spanDetails.textContent += `fat: ${parseFloat(remainingMacronutrientsSaturday.remaining_fat).toPrecision(3)}`;
    }
}

async function sundayRemainingMacronutrientsOver() {
    const selUser = window.document.getElementById('sel-user');
    const spanDetails = window.document.getElementById('details-sunday');
    const labUserId = window.document.getElementById('lab-user-id');
    const userId = labUserId.textContent;

    if (selUser.value !== "") {
        const remainingMacronutrientsSunday = {
            "remaining_carbohydrate": 1.2800000000000153,
            "remaining_protein": 31.829999999999984,
            "remaining_fat": -15.239999999999995
        }
        //const remainingMacronutrientsSunday = await (await fetch(`http://localhost:3000/nutrition/${userId}/Sunday`)).json();

        if (remainingMacronutrientsSunday.remaining_carbohydrate < 0 || remainingMacronutrientsSunday.remaining_protein < 0 || remainingMacronutrientsSunday.remaining_fat < 0) {
            spanDetails.style.backgroundColor = "rgb(236, 191, 191)";
        }

        spanDetails.textContent = "remaining macronutrients:";
        spanDetails.textContent += "\n";
        spanDetails.textContent += `carbohydrate: ${parseFloat(remainingMacronutrientsSunday.remaining_carbohydrate).toPrecision(3)}`;
        spanDetails.textContent += "\n";
        spanDetails.textContent += `proteyn: ${parseFloat(remainingMacronutrientsSunday.remaining_protein).toPrecision(3)}`;
        spanDetails.textContent += "\n";
        spanDetails.textContent += `fat: ${parseFloat(remainingMacronutrientsSunday.remaining_fat).toPrecision(3)}`;
    }
}

// creates table with data
function tableCreate(table, data) {

    for (var i = 0; i < data.length; i++) {
        var tr = table.insertRow();
        for (var j = 0; j < data[i].length; j++) {
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(data[i][j]));
        }
    }
}

// clears table
function tableErase(table) {
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}

// updates label user id
function updateLabelUserId(users, labUserId) {

    const selUser = window.document.getElementById('sel-user').value;

    for (let index = 0; index < users.length; index++) {
        const user = users[index];

        if (user.name === selUser) {
            labUserId.innerHTML = user._id;
        }
    }
}