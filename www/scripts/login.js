document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        if(username == '' || password == '') {
            message.textContent = "Please fill every field."; 
            message.style.color = "red";
        }
        else {
            const response = await fetch("/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, password: password }),
            });
    
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
        console.error(error);
        message.textContent = "Error fetching user data.";
        message.style.color = "red";
    }
});