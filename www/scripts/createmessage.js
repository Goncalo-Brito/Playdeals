/**
 * Contact Form Submission Script
 *
 * This script handles the submission of the contact form.
 * It validates user input, sends the data to the server, and provides feedback to the user.
 */

document.getElementById("sendFormContact").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form input values and trim whitespace
    let firstname = document.getElementById("firstname").value.trim();
    let lastname = document.getElementById("lastname").value.trim();
    let email = document.getElementById("email").value.trim();
    let text = document.getElementById("text").value.trim();
    let message = document.getElementById("message");

    /**
     * Validate the input fields.
     *
     * - Ensures all fields are filled correctly.
     * - Displays an error message if validation fails.
     */
    if (firstname === '' || lastname === '' || email === '' || text === '') {
        message.textContent = "Please fill every field correctly."; 
        message.style.color = "red";
        return;
    }

    try {
        /**
         * Send contact form data to the server via a POST request.
         */
        const response = await fetch('http://localhost:3000/contact/send', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                text
            })
        });

        const result = await response.json();

        /**
         * Handle server response.
         *
         * - On success, clears form fields and displays success message.
         * - On failure, displays an error message from the server response.
         */
        if (response.ok) {
            document.getElementById("firstname").value = "";
            document.getElementById("lastname").value = "";
            document.getElementById("email").value = "";
            document.getElementById("text").value = "";

            message.textContent = result.message;
            message.style.color = "green";
        } else {
            message.textContent = result.message;
            message.style.color = "red";
        }
    } catch (error) {
        console.error("Error sending message:", error);
        message.textContent = "An error occurred. Please try again later.";
        message.style.color = "red";
    }
});
