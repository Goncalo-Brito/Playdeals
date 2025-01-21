var FeaturedGames = [];
var FeaturedGamesImages = [];

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("www"));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "www", "views"));
app.set("images", path.join(__dirname, "www", "images"));


app.use(express.json());

app.use("/users", require("./routes/userRoutes"));

app.use("/games", require("./routes/gameRoutes"));

app.use("/gameimages", require("./routes/gameimageRouter"));

app.get("/", async (req, res) => {
    try {
      // Update the URL here
      const response = await fetch("http://localhost:3000/games/", {  // <-- updated URL
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error trying to GET games: ${response.statusText}`);
      }

      const data = await response.json();

      const games = data.games;

      if (Array.isArray(games)) {
        games.forEach((game) => {
          if (game.FeaturedGame === 1) {
            FeaturedGames.push(game);
          }
        });
      } else {
        console.error("Expected an array of games, but got:", games);
      }

      try {
        // Update the URL here as well for the gameimages fetch
        const responseImages = await fetch("http://localhost:3000/gameimages/", {  // <-- updated URL
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!responseImages.ok) {
          throw new Error(`Error trying to GET game images: ${responseImages.statusText}`);
        }

        const dataimages = await responseImages.json();

        const gameimages = dataimages.gameimages;

        if (Array.isArray(gameimages)) {
          for (let i = 0; i < gameimages.length; i++) {
            let gameimage = gameimages[i];
            for (let j = 0; j < FeaturedGames.length; j++) {
              let FeaturedGame = FeaturedGames[j];
              if (
                gameimage.GameID === FeaturedGame.GameID &&
                !gameimage.ImageName.includes("_")
              ) {
                FeaturedGamesImages.push(gameimage);
              }
            }
          }
        }

        res.render("homepage", {
          FeaturedGamesImages: FeaturedGamesImages,
        });
      } catch (error) {
        console.error("Error trying to GET game images:", error);
      }
    } catch (error) {
      console.error("Error trying to GET games:", error);
    }
  });

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
