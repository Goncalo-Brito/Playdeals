/**
 * Redeem Code Form Script
 *
 * This script handles the submission of the redeem code form.
 * It validates the code input, fetches purchase logs from the server, and checks if the code is valid.
 */

document.getElementById("RedeemForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get the code input value and define success flag
    let code = document.getElementById("code").value;
    let success = false;
    const message = document.getElementById("message");

    try {
        /**
         * Validate the code input.
         *
         * - Ensures the code is not empty and has a minimum length of 16 characters.
         */
        if (code === '' || code.length < 16) {
            message.textContent = "Please enter a redeemable code";  
            message.style.color = "red";
        } 
        else {
            /**
             * Fetch purchase logs from the server to verify the provided code.
             */
            const response = await fetch("http://localhost:3000/purchaselog/", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch Purchase Logs.");
            }

            const purchaselogsData = await response.json();
            const purchaselogs = purchaselogsData.data;

            // Check if the entered code exists in purchase logs
            purchaselogs.forEach(purchaselog => {
                if (purchaselog.ItemKey === code) {
                    success = true;
                }
            });

            /**
             * Display appropriate message based on the validation result.
             */
            if (success) {
                message.textContent = 'Code redeemed successfully!';
                message.style.color = "green";
            } else {
                message.textContent = "Invalid redeem code. Please try again.";
                message.style.color = "red";
            }
        }

    } catch (error) {
        console.error("Error during code redemption:", error);
        message.textContent = "Error: invalid Code data.";
        message.style.color = "red";
    }
});
