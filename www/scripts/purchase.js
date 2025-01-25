document.addEventListener('DOMContentLoaded', function () {

    const formPurchase = document.getElementById('form-purchase');
    const cartGames = document.getElementById('cartGames').value;
    const cartDLCs = document.getElementById('cartDLCs').value;
    const cartGiftCards = document.getElementById('cartGiftCards').value;
    const UserID = document.getElementById('userID').value;

    formPurchase.addEventListener('submit', function (event) {
        event.preventDefault();


    });
});