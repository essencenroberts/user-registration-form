# Interactive User Registration

I built aregistration form with HTML, CSS, and vanilla JavaScript. It validates username, email, password, and conform password fields, shows custom error messages, and saves the username to localStorage.

# Reflection

1. By default when you submit a form the browser tries to reload the page and send the form data, but becuause I want the vlaidation logic i use `event.preventDefault()` to prevent that from happening

2. HTML5 validation attributes like `required`, `type="email"`, `minlength`, and `pattern` are built into the browsers. JavaScript validation is where I get to check the same rules and decide what happens. I used COnstraint Validation API (`input.validity`) to read what the browser already flagged (like `valueMissing` or `patternMismatch`) then wrote my own custom message for each one.  I used both because they work together.

3. When the form is submitted successfully, I save the username using `localStorage.setItem('username', usernameInput.value)`. Then when the page loads, I added an even listener for `DOMContentLoaded` that checks `localStorage.getItem('username')`. If there's a saved value, I set it as the vlaue of the username input so it's already filled in when the page laods again. As far as limitations, loccalStorage is not secure at all.

4. I had to write a comparsion myself for the confirm password field. The Consttraint Validation API works great for checking things like "is this required" or "is this email formatted right" but there wan't a rile for "does this match another field"

5. For the custom error messages I tried writign them the way I've seen them pop up on other websites and it reads straight to the point so user knows what to expect and how to correct the error. I used the `input` event so messages updated live as someone types and once the fields are valid the error message clears.

