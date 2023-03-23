async function create() {
    const inputName = window.document.getElementById('input-name');
    const inputAge = window.document.getElementById('input-age');
    const inputCarbohydrate = window.document.getElementById('input-carbohydrate');
    const inputProtein = window.document.getElementById('input-protein');
    const inputFat = window.document.getElementById('input-fat');
    const inputGender = window.document.getElementsByName('input-gender');
    var gender = undefined;

    if (inputGender[0].checked) {
        gender = "M"
    } else {
        gender = "F"
    }

    const body = {
        "name": inputName.value, "age": inputAge.value, "gender": gender, "carbohydrate": inputCarbohydrate.value,
        "protein": inputProtein.value, "fat": inputFat.value
    };

    await fetch('http://localhost:3000/user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then((response) => {
            return response.json();
        });
}