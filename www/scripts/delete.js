/**
 * Auction Deletion Script
 *
 * This script handles the deletion of auctions.
 * It listens for the submission of auction deletion forms, sends a DELETE request to the server, and manages responses accordingly.
 */

document.querySelectorAll("[id^='deleteAuctionForm-']").forEach(form => {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Get the auction ID from the form's data attribute
        const auctionID = form.getAttribute("data-auction-id");

        try {
            /**
             * Send a DELETE request to remove the auction by ID.
             */
            const response = await fetch(`/auctions/${auctionID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            /**
             * Handle server response.
             *
             * - On success, reloads the staff page.
             * - On failure, alerts the user that the auction cannot be deleted due to existing biddings.
             */
            if (response.ok) {
                await response.json();
                window.location.href = "/staff_page";
            } else {
                alert("Error deleting auction: This auction has biddings!");
            }

        } catch (error) {
            console.error("Error deleting auction:", error);
        }
    });
});
