document.addEventListener('DOMContentLoaded', function () {

    const formPurchase = document.getElementById('form-purchase');

    const cartGames = JSON.parse(document.getElementById('cartGames').value);
    const cartDLCs = JSON.parse(document.getElementById('cartDLCs').value);
    const cartGiftCards = JSON.parse(document.getElementById('cartGiftCards').value);

    const UserID = document.getElementById('userID').value;

    console.log("UserID: ", UserID);

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

    async function deleteCartItems(userID) {

        try {
            const response = await fetch(`/shoppingcart/${userID}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Failed to delete shopping cart items');
            }

            console.log(`Successfully deleted cart items for UserID: ${userID}`);
        } catch (error) {
            console.error('Error deleting cart items:', error);
            throw error;
        }
    }

    async function processCartItems(userID, cartGames, cartDLCs, cartGiftCards) {
        const dateAdded = new Date().toISOString().split('T')[0]; 

        const allItems = [
            ...cartGames.map(game => ({ GameID: game.GameID, Price: (game.GamePrice * (1 - game.GameDiscount / 100)).toFixed(2) })),
            ...cartDLCs.map(dlc => ({ DLCID: dlc.DLCID, Price: (dlc.DLCPrice * (1 - dlc.DLCDiscount / 100)).toFixed(2) })),
            ...cartGiftCards.map(giftCard => ({ GiftCardID: giftCard.GiftCardID, Price: giftCard.GFCValue }))
        ];

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
