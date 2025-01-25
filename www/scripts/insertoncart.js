/**
 * Add to Cart Script
 *
 * This script handles adding items to the shopping cart.
 * It captures form submission, collects user and item data, and sends a POST request to the server.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Get form and input elements
    const addToCartForm = document.getElementById('addToCartForm');
    let userInput = document.getElementById('UserID');
    let gameInput = document.getElementById('GameID');
    let dlcInput = document.getElementById('DLCID');
    let giftcardInput = document.getElementById('GiftCardID');
    const message = document.getElementById("message");

    /**
     * Event listener for the add-to-cart form submission.
     * Prevents default form submission and sends data to the server.
     */
    addToCartForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get values from input fields, handling null values if elements do not exist
        const userId = userInput ? userInput.value : null;
        const gameId = gameInput ? gameInput.value : null;
        const dlcId = dlcInput ? dlcInput.value : null;
        const giftcardId = giftcardInput ? giftcardInput.value : null;

        // Prepare cart data object
        const cartData = {
            UserID: userId,
            GameID: gameId,
            DLCID: dlcId,
            GiftCardID: giftcardId
        };

        /**
         * Send cart data to the server via a POST request.
         */
        fetch('/shoppingcart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add this item to the cart');
            }
            return response.json();
        })
        .then(data => {
            /**
             * Handle server response.
             *
             * - On success, redirects to the cart page.
             * - On failure, displays an error message to the user.
             */
            if (data.success) {
                window.location.href = "/cart_page";
            } else {
                message.textContent = "Failed to add this item to the cart.";
                message.style.color = "red";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            message.textContent = "There was an error trying to add this item to your cart.";
            message.style.color = "red";
        });
    });
});
