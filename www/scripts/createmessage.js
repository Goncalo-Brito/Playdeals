document.getElementById("sendFormContact").addEventListener("submit", async function (e) {
    e.preventDefault();

    let firstname = document.getElementById("firstname").value.trim();
    let lastname = document.getElementById("lastname").value.trim();
    let email = document.getElementById("email").value.trim();
    let text = document.getElementById("text").value.trim();
    let message = document.getElementById("message");

    if (firstname === '' || lastname === '' || email === '' || text === '') {
        message.textContent = "Please fill every field correctly."; 
        message.style.color = "red";
        return;
    }

    try {
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
