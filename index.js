const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password2');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement; // ???
    formControl.className = 'form__control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Check email is valid
function checkEmail(input) {
    const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form__control success';

}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    })
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

//Check password match
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value){
        showError(input2, 'Password do not match');
    } else {
        showSuccess(input2);
    }
}

//Check password required
function checkPasswordRequired(input){
    if(input.value.trim() === '') {
        showError(input, 'Password confirm is required');
    }
}

// Get field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


// Event listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(username.value);

    checkRequired([username, email, password]);
    checkPasswordRequired(confirmPassword);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, confirmPassword);
});