const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("www"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "www", "views"));

app.use(express.json());

app.use("/users", require("./routes/userRoutes"));

app.get("/new_auction", (req, res) => {
    res.render("addauctionspage", { title: "New Auction" }); 
});

app.get("/new_dlc", (req, res) => {
    res.render("adddlcpage", { title: "New DLC" }); 
});

app.get("/new_game", (req, res) => {
    res.render("addgamepage", { title: "New Game" }); 
});

app.get("/auction_page", (req, res) => {
    res.render("auctionpage", { title: "Auction" }); 
});

app.get("/gift_card_page", (req, res) => {
    res.render("cardpage", { title: "Gift Card" }); 
});

app.get("/cart_page", (req, res) => {
    res.render("cartpage", { title: "Your Cart" }); 
});

app.get("/contact_page", (req, res) => {
    res.render("contactpage", { title: "Contact us" }); 
});

app.get("/auctions", (req, res) => {
    res.render("discoveryauctions", { title: "Auctions" }); 
});

app.get("/store", (req, res) => {
    res.render("discoverygames", { title: "Store" }); 
});

app.get("/dlc_page", (req, res) => {
    res.render("dlcpage", { title: "DLC" }); 
});

app.get("/game_page", (req, res) => {
    res.render("gamepage", { title: "Game" }); 
});

app.get("/", (req, res) => {
    res.render("homepage", { title: "Home Page" }); 
});

app.get("/login", (req, res) => {
    res.render("login", { title: "Login Page" }); 
});

app.get("/payment", (req, res) => {
    res.render("payment", { title: "Payment" }); 
});

app.get("/profile", (req, res) => {
    res.render("profilepage", { title: "Profile" }); 
});

app.get("/redeem", (req, res) => {
    res.render("redeempage", { title: "Redeem" }); 
});

app.get("/register", (req, res) => {
    res.render("register", { title: "Register" }); 
});

app.get("/staff_page", (req, res) => {
    res.render("staffpage", { title: "Staff" }); 
});

app.get("/update_auction", (req, res) => {
    res.render("updateauctionpage", { title: "Update" }); 
});

app.get("/update_dlc", (req, res) => {
    res.render("updatedlcpage", { title: "Update" }); 
});

app.get("/update_game", (req, res) => {
    res.render("updategamepage", { title: "Update" }); 
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});
