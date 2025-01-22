document.getElementById("registerForm").addEventListener("submit", async function (e) {
	e.preventDefault();

	const fname = document.getElementById("fname").value;
	const lname = document.getElementById("lname").value;
	const username = document.getElementById("username").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const cpassword = document.getElementById("cpassword").value;
	const message = document.getElementById("message");
	try {
		if (fname == '' || lname == '' || username == '' || email == '' || password == '' || cpassword == '') {
			message.textContent = "Please fill every field.";
			message.style.color = "red";
			return;
		} else {
			if (password !== cpassword) {
				message.textContent = "Passwords do not match.";
				message.style.color = "red";
				return;
			} else {
				const response = await fetch("/users/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(
						{
							fname,
							lname,
							username,
							email,
							password
						}
					)
				});

				if (! response.ok) {
					if (response.status === 400) {
						message.textContent = "Please fill out all the fields correctly.";
						message.style.color = "red";
					} else if (response.status === 401) {
						message.textContent = "Email or Username is already in use. Please use a different email.";
						message.style.color = "red";
					} else if (response.status === 500) {
						message.textContent = "Server error occurred. Please try again later.";
						message.style.color = "red";
					} else {
						message.textContent = `Unexpected error: ${
							response.statusText
						}`;
						message.style.color = "red"; 
					}
				} else {
					const result = await response.json();
					window.location.href = "/login";
				}

			}
		}
	} catch (error) {
		console.error(error);
		message.textContent = "Error processing your request.";
		message.style.color = "red"; 
	}
});
