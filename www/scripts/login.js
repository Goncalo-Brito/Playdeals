/**
 * User Login Form Script
 *
 * This script handles the submission of the login form.
 * It validates user input, sends login credentials to the server, and processes the server response.
 */

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        /**
         * Form validation checks.
         *
         * - Ensures both username and password fields are filled.
         */
        if (username === '' || password === '') {
            message.textContent = "Please fill every field."; 
            message.style.color = "red";
        } 
        else {
            /**
             * Send login data to the server via a POST request.
             */
            const response = await fetch("/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, password: password }),
            });

            /**
             * Handle server response.
             *
             * - If credentials are incorrect, display appropriate error message.
             * - If successful, redirect to the homepage.
             */
            if (!response.ok) {
                if (response.status === 404) {
                    message.textContent = "Username or password wrong."; 
                    message.style.color = "red";
                } else if (response.status === 500) {
                    message.textContent = "Server error occurred. Please try again later.";
                    message.style.color = "red";
                } else {
                    message.textContent = `Unexpected error: ${response.statusText}`;
                    message.style.color = "red";
                }
            } else {
                const user = await response.json();
                window.location.href = "/";
            }    
        }
    } catch (error) {
        console.error("Error during login:", error);
        message.textContent = "Error fetching user data.";
        message.style.color = "red";
    }
});
