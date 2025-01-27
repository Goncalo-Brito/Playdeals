document.getElementById("RedeemForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    let code = document.getElementById("code").value;
    let success = false;

    try {
        if(code === '' || code.length < 16) {
            message.textContent = "Please enter a redeemable code";  
            message.style.color = "red";
        }
        else {

            const response = await fetch("http://localhost:3000/purchaselog/", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch Purchase Logs.");
            }
    
            const purchaselogsData = await response.json();
            const purchaselogs = purchaselogsData.data;

            purchaselogs.forEach(purchaselog => {
                if(purchaselog.ItemKey == code){
                    success = true;
                }
            });

            if (success) {
                message.textContent = 'Code redeemed successfully!';
                message.style.color = "green";
            } else {
                message.textContent = error.message;
                message.style.color = "red";
            }
        }

    } catch (error) {
        console.error(error);
        message.textContent = "Error invalid Code data.";
        message.style.color = "red";
    }



});
