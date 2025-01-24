document.getElementById("deleteGameForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
essage.style.color = "red";

        const response = await fetch("/auctions/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    
                }
            )
        });

        if (response.ok) {
            const auction = await response.json();
            window.location.href = "/staff_page";
        } else {
            const error = await response.json();
            message.textContent = error.message;
            message.style.color = "red";
        }

    } catch (error) {
        console.error(error);
        message.textContent = "Error invalid auction data.";
        message.style.color = "red";
    }
});

