document.addEventListener('DOMContentLoaded', function () {
    const addToCartForm = document.getElementById('addToCartForm');
    let userInput = document.getElementById('UserID');
    let gameInput = document.getElementById('GameID');
    let dlcInput = document.getElementById('DLCID');
    let giftcardInput = document.getElementById('GiftCardID');
    const message = document.getElementById("message");

    addToCartForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const userId = userInput ? userInput.value : null;
        const gameId = gameInput ? gameInput.value : null;
        const dlcId = dlcInput ? dlcInput.value : null;
        const giftcardId = giftcardInput ? giftcardInput.value : null;

        console.log("User: ", userId);
        console.log("game: ", gameId);
        console.log("dlc: ", dlcId);
        console.log("giftcard: ", giftcardId);


        const cartData = {
            UserID: userId,
            GameID: gameId,
            DLCID: dlcId,
            GiftCardID: giftcardId
        };

        fetch('/shoppingcart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add this game to the cart');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    window.location.href = "/cart_page";
                } else {
                    message.textContent = "Failed to add this game to the cart.";
                    message.style.color = "red";
                }
            })
            .catch(error => {
                console.error('Error:', error);
                message.textContent = "There was an error trying to add this game to your cart.";
                message.style.color = "red";
            });
    });
});
