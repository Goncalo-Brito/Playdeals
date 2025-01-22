const authMiddleware = require("./middlewares/authMiddleware");
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

app.use(express.static("www"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "www", "views"));
app.set("images", path.join(__dirname, "www", "images"));

app.use(express.json());

app.use(
  session({
      secret: "G#h72J!@4kM9$eQx7zP%wLqv3nTfYu8&*RcXaKdB", 
      resave: false,
      saveUninitialized: false,
  })
);

app.use("/users", require("./routes/userRoutes"));

app.use("/games", require("./routes/gameRoutes"));

app.use("/gameimages", require("./routes/gameimageRouter"));

app.get("/new_auction", (req, res) => {
    res.render("addauctionspage", { title: "New Auction" }); 
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login Page" }); 
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Register" }); 
});

app.use(authMiddleware);

app.get("/", async (req, res) => {
  const FeaturedGames = [];
  const FeaturedGamesImages = [];
  const FeaturedGamesImagesPath = [];

  try {
    const response = await fetch("http://localhost:3000/games/", {
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

      for (let i = 0; i < FeaturedGamesImages.length; i++) {
        const image = FeaturedGamesImages[i];
        const imagePath = `../${image.ImageSource}/${image.ImageName}.${image.ImageExtention}`;
        FeaturedGamesImagesPath.push(imagePath);
      }

      res.render("homepage", {
        FeaturedGamesImagesPath: FeaturedGamesImagesPath,
      });
    } catch (error) {
      console.error("Error trying to GET game images:", error);
    }
  } catch (error) {
    console.error("Error trying to GET games:", error);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao terminar a sessão:", err);
      return res.status(500).send("Erro ao terminar a sessão.");
    }
    res.redirect("/login"); // Redireciona para a página de login
  });
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

app.get("/payment", (req, res) => {
    res.render("payment", { title: "Payment" }); 
});

app.get("/profile", (req, res) => {
    res.render("profilepage", { title: "Profile" }); 
});

app.get("/redeem", (req, res) => {
    res.render("redeempage", { title: "Redeem" }); 
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
