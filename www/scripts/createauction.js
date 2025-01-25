/**
 * Auction Creation Form Script
 *
 * This script handles the submission of the auction creation form.
 * It validates user input, processes the auction data, and submits it to the server.
 */

document.getElementById("createAuctionForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form input values
    let auctionTitle = document.getElementById("title").value;
    let auctionDescription = document.getElementById("description").value;
    let startDate = document.getElementById("startdate").value;
    let EndDate = document.getElementById("enddate").value;
    let innitialValue = document.getElementById("innitialvalue").value;
    const message = document.getElementById("message");

    // Get today's date formatted as YYYY-MM-DD
    let today = new Date();
    let todayFormatted = today.toISOString().split('T')[0]; 

    let auctionStatus = '';

    try {
        /**
         * Form validation checks.
         * 
         * - Ensures all fields are filled correctly.
         * - Checks if start date is before the end date.
         * - Validates if the initial value is a positive number.
         * - Checks if the end date is valid and not in the past.
         */
        if (auctionTitle === '' || auctionDescription === '' || EndDate === '' || innitialValue === '') {
            message.textContent = "Please fill every field correctly.";  
            message.style.color = "red";
        } 
        else if (startDate > EndDate) {
            message.textContent = "The Start Date can't be after the End Date!";  
            message.style.color = "red";
        } 
        else if (parseFloat(innitialValue) <= 0 || isNaN(innitialValue)) {
            message.textContent = "Initial Value must be valid.";
            message.style.color = "red";
        } 
        else if (EndDate < todayFormatted) {
            message.textContent = "End Date must be valid.";
            message.style.color = "red";
        } 
        else {
            // Set auction start date and status
            if (startDate === '' || startDate < todayFormatted) {
                startDate = todayFormatted;
                auctionStatus = "Available";
            } 
            else if (startDate > todayFormatted) {
                auctionStatus = "TBA";
            }

            /**
             * Send auction data to the server using a POST request.
             */
            const response = await fetch("/auctions/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    AuctionTitle: auctionTitle,
                    initialvalue: innitialValue,
                    status: auctionStatus,
                    startdate: startDate,
                    enddate: EndDate,
                    description: auctionDescription
                })
            });

            // Handle server response
            if (response.ok) {
                const auction = await response.json();
                window.location.href = "/staff_page";  // Redirect to staff page on success
            } else {
                const error = await response.json();
                message.textContent = error.message;
                message.style.color = "red";
            }
        }
    } catch (error) {
        console.error(error);
        message.textContent = "Error invalid auction data.";
        message.style.color = "red";
    }
});
