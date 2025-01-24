document.addEventListener('DOMContentLoaded', function () {
    const auctionContainer = document.getElementById('auction-container');
    const bidForm = document.getElementById('placebid');
    const bidInput = document.getElementById('placebidtextbox');
    const auctionId = auctionContainer.getAttribute('data-auction-id');
    const userId = auctionContainer.getAttribute('data-user-id');
    let highestBidElement = document.getElementById('highestBid');
    let EndDateElement = document.getElementById('EndDate');
    let Status = document.getElementById('status');
    let highestBid = parseFloat(highestBidElement.textContent);
    let EndDate = new Date(EndDateElement.textContent.trim());
    const message = document.getElementById("message");

    bidForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const bidValue = parseFloat(bidInput.value);
        const today = new Date();

        if (EndDate < today || Status != "Active") { 
            message.textContent = "Please, only bid at auctions that are still ongoing.";
            message.style.color = "red";
            return;
        } else if (isNaN(bidValue) || bidValue <= 0) {
            message.textContent = "Please enter a valid bid value.";
            message.style.color = "red";
            return;
        } else if (bidValue <= highestBid) {
            message.textContent = "Please enter a bid higher than the Latest bidding.";
            message.style.color = "red";
            return;
        }

        const bidData = {
            biddingvalue: bidValue,
            userID: userId,
            auctionID: auctionId
        };

        fetch('/bids/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bidData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to place bid');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    location.reload();
                } else {
                    message.textContent = "Error placing bid. Please try again.";
                    message.style.color = "red";
                }
            })
            .catch(error => {
                console.error('Error:', error);
                message.textContent = "There was an error processing your bid.";
                message.style.color = "red";
            });
    });
});
