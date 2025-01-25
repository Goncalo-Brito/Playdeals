/**
 * Purchase Processing Script
 *
 * This script handles the checkout process for a shopping cart.
 * It submits the purchase form, deletes existing cart items, and processes new purchases.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Get purchase form element
    const formPurchase = document.getElementById('form-purchase');

    // Retrieve cart items and user ID from the DOM
    const cartGames = JSON.parse(document.getElementById('cartGames').value);
    const cartDLCs = JSON.parse(document.getElementById('cartDLCs').value);
    const cartGiftCards = JSON.parse(document.getElementById('cartGiftCards').value);
    const UserID = document.getElementById('userID').value;

    /**
     * Event listener for form submission.
     * Prevents default form submission, deletes cart items, processes purchases, and redirects the user.
     */
    formPurchase.addEventListener('submit', async function (event) {
        event.preventDefault();
        
        try {
            await deleteCartItems(UserID);
            await processCartItems(UserID, cartGames, cartDLCs, cartGiftCards);
            window.location.href = "/profile";
        } catch (error) {
            console.error('Error adding items to the shopping cart:', error);
            alert('There was an error adding items to the shopping cart.');
        }
    });

    /**
     * Deletes all items in the user's shopping cart.
     *
     * @param {string} userID - The ID of the user whose cart items are to be deleted.
     * @throws Will throw an error if the request fails.
     */
    async function deleteCartItems(userID) {
        try {
            const response = await fetch(`/shoppingcart/delete/${userID}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Failed to delete shopping cart items');
            }
        } catch (error) {
            console.error('Error deleting cart items:', error);
            throw error;
        }
    }

    /**
     * Processes all items in the user's cart and sends purchase data to the server.
     *
     * @param {string} userID - The ID of the user making the purchase.
     * @param {Array} cartGames - Array of game objects from the cart.
     * @param {Array} cartDLCs - Array of DLC objects from the cart.
     * @param {Array} cartGiftCards - Array of gift card objects from the cart.
     * @throws Will throw an error if the purchase log submission fails.
     */
    async function processCartItems(userID, cartGames, cartDLCs, cartGiftCards) {
        const dateAdded = new Date().toISOString().split('T')[0]; 

        // Combine all cart items into a single array with formatted purchase data
        const allItems = [
            ...cartGames.map(game => ({
                GameID: game.GameID,
                Price: (game.GamePrice * (1 - game.GameDiscount / 100)).toFixed(2)
            })),
            ...cartDLCs.map(dlc => ({
                DLCID: dlc.DLCID,
                Price: (dlc.DLCPrice * (1 - dlc.DLCDiscount / 100)).toFixed(2)
            })),
            ...cartGiftCards.map(giftCard => ({
                GiftCardID: giftCard.GiftCardID,
                Price: giftCard.GFCValue
            }))
        ];

        // Send each item in the cart to the purchase log endpoint
        for (const item of allItems) {
            const data = {
                UserID: userID,
                PurchaseDate: dateAdded,
                PurchasePrice: item.Price,
                GameID: item.GameID || null,
                DLCID: item.DLCID || null,
                GiftCardID: item.GiftCardID || null
            };

            try {
                await fetch('/purchaselog/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            } catch (error) {
                console.error('Failed to send item:', data, error);
                throw error;
            }
        }
    }
});
