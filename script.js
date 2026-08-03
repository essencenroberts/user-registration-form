

// Select DOM elements & connect JavaScript to HTML 
const form = document.getElementById('registrationForm')

const usernameInput = document.getElementById('username');

const emailInput = document.getElementById('email');

const passwordInput = document.getElementById('password');

const confirmPasswordInput = document.getElementById('confirmPassword')

const usernameError = document.getElementById('emailError');

const emailError = document.getElementById('emailError');

const passwordError = document.getElementById('passwordError');

const confirmPasswordError = document.getElementById('confirmPasswordError');

//console.log(form, usernameInput, emailInput, passwordInput, confirmPasswordInput)

// load data
window.addEventListener('DOMContentLoaded', () => {
  const savedUsername = localStorage.getItem('username');
  //console.log('Saved username from localStorage:', savedUsername)
  if (savedUsername) {
    usernameInput.value = savedUsername
  }
});


//functions + error messages 
  function getErrorMessage(input) {
    const validity = input.validity;

    if (validity.valid) return '';

    if (validity.valueMissing) {
      return 'This field is required.';
    }

    if (input.id === 'username' && validity.tooShort) {
      return `Username must be at least ${input.minLength} characters long.`;
    }

    if (input.id === 'email' && validity.typeMismatch) {
      return 'Please enter a valid email address.';
    }

    if (input.id === 'passwprd' && (validity.patternMismatch || valid.tooShort)) {
      return 'Password must be at least 8 chracters and include an uppercase letter, a lowercase letter, and a number.';
    }

    return input.validationMessage
  }

// function validation
function validateField(input, errorSpan) {
  // confirm password needs a manual match check
  if (input.id === 
  'confirmPassword') {
    return validateConfirmPassword();
  }

  const message = getErrorMessage(input);

  if (message) {
    errorSpan.textContent = message;
    return false;
  } else {
    errorSpan.textContent = '';
    return true;
  }
}

function validateConfirmPassword(){
  if (confirmPasswordInput.validity.valueMissing) {
    confirmPasswordError.textContent = 'Please confirm your password.';
    return false;
  }


if (confirmPasswordInput.value !== passwordInput.value) {
  confirmPasswordError.textContent = 'Passwords do not match.'; 
  
  return false;
}

confirmPasswordError.textContent = '';
return true;

}

// add eventListner
usernameInput.addEventListener('input', () => {
  validateField(usernameInput, usernameError);
});

emailInput.addEventListener('input', () => {
  validateField(emailInput, emailError);
});

passwordInput.addEventListener('input', () => {
  validateField(passwordInput, passwordError);

  if (confirmPasswordInput.value) {
    validateConfirmPassword();
  }
});

confirmPasswordInput.addEventListener('input', () => {
  validateConfirmPassword();
});


// form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const isUsernameValid = validateField(usernameInput, usernameError);

  const isEmailValid = validateField(emailInput, emailError);

  const isPasswordValid = validateField(passwordInput, passwordError);

  const isConfirmPasswordValid = validateConfirmPassword();

  //console.log({ isUsernameValid , isEmailValid, isPasswordValid, isConfirmPasswordValid })

  const isFormValid =
    isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

    if (isFormValid) {
      localStorage.setItem('username', usernameInput.value);

      alert('Registration successful!');

      passwordInput.value = '';
      confirmPasswordInput.value = '';
      passwordError.textContent = '';
      confirmPasswordError.textContent = '';
    } else {
      // if something is invalid

      const fields = [
        { input: usernameInput, valid: isUsernameValid },

        { input: emailInput, valid: isEmailValid },

        { input: passwordInput, valid: isPasswordValid },

        { input: confirmPasswordInput, valid: isConfirmPasswordValid},
      ];

      const firstInvalid = fields.find((field) => !field.valid);
        if (firstInvalid) {
          firstInvalid.input.focus();
        }
    }
} );