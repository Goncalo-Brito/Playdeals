
document.querySelectorAll("[id^='deleteAuctionForm-']").forEach(form => {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const auctionID = form.getAttribute("data-auction-id");

        try {
            const response = await fetch(`/auctions/${auctionID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            console.log(response);

            if (response.ok) {
                console.log("SUCCESS: Auction deleted successfully");
                await response.json();
                window.location.href = "/staff_page";
            } else {
                console.log("FAILED: Unable to delete auction");
                alert("Error deleting auction: This aucting has biddings!");
            }

        } catch (error) {
            console.log("FAILED: Error processing request");
            console.error(error);
        }
    });
});
