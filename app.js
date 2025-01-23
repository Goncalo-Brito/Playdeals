const { CONNREFUSED } = require("dns");
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

app.use("/dlcs", require("./routes/dlcRoutes"));

app.use("/giftcard", require("./routes/giftcardRoutes"));

app.get("/new_auction", (req, res) => {
    res.render("addauctionspage", { title: "New Auction" }); 
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login Page" }); 
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Register" }); 
});

//ATIVA A AUTH
//app.use(authMiddleware); 

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
      const responseImages = await fetch("http://localhost:3000/gameimages/", {
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
            if (gameimage.GameID === FeaturedGame.GameID && gameimage.ImageName.includes("_1")) {
              FeaturedGamesImages.push(gameimage);
            }
          }
        }
      }

      for (let i = 0; i < FeaturedGamesImages.length; i++) {
        const image = FeaturedGamesImages[i];
        const imagePath = `../${image.ImageSource}/${image.ImageName}.${image.ImageExtention}`;
        FeaturedGamesImagesPath.push({
          path: imagePath,
          id: image.GameID
        });
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
    res.redirect("/login");
  });
});

app.get("/store", async (req, res) => {
  const gameimages = [];
  const dlcimages = []
  const gameimagesPath = [];
  const dlcimagesPath = [];

  const dlcs = [];
  
  let giftcards = [];
  const giftcardsPath = [];

    try {
      const responseImages = await fetch("http://localhost:3000/gameimages/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseDlcs = await fetch("http://localhost:3000/dlcs/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseGiftCard = await fetch("http://localhost:3000/giftcard/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responseImages.ok) {
        throw new Error(`Error trying to GET game images: ${responseImages.statusText}`);
      }

      if (!responseDlcs.ok) {
        throw new Error(`Error trying to GET game images: ${responseImages.statusText}`);
      }

      if (!responseGiftCard.ok) {
        throw new Error(`Error trying to GET game images: ${responseImages.statusText}`);
      }

      const dataimages = await responseImages.json();
      const Arrayimages = dataimages.gameimages;

      const datadlcs = await responseDlcs.json();
      const Arraydlcs =  datadlcs.dlcs;

      const dataGiftcards = await responseGiftCard.json();
      giftcards = dataGiftcards.giftcards;

      if (Array.isArray(Arrayimages)) {
        for (let i = 0; i < Arrayimages.length; i++) {
          let gameimage = Arrayimages[i];
          if (gameimage.ImageName.includes("_1")) { //jogo
            gameimages.push(gameimage);
          } else if (gameimage.ImageName.includes("_") && !gameimage.ImageName.includes("_1")) { //dlc
            dlcimages.push(gameimage);
          }
        }
      }

      for (let i = 0; i < gameimages.length; i++) {
        const image = gameimages[i];
        const imagePath = `../${image.ImageSource}/${image.ImageName}.${image.ImageExtention}`;
        gameimagesPath.push({
          path: imagePath,
          id: image.GameID
        });
      }

      for(let i = 0; i < dlcimages.length; i++) {
        const image = dlcimages[i];
        const imagePath = `../${image.ImageSource}/${image.ImageName}.${image.ImageExtention}`;
        for(let j = 0; j < Arraydlcs.length; j++) {
          const dlc = Arraydlcs[j];
          if(image.GameID === dlc.GameID) {
            dlcimagesPath.push({
              path: imagePath,
              id: dlc.DLCID,
            });
          }
        }
      }

      for (let i = 0; i < giftcards.length; i++) {
        const image = giftcards[i];
        const imagePath = `../images/giftcards/${image.GiftCardID}.png`;
        giftcardsPath.push({
          path: imagePath,
          id: image.GiftCardID,
        });
      }

      res.render("discoverygames", {
        gameimagesPath: gameimagesPath,
        dlcimagesPath: dlcimagesPath,
        giftcardsPath: giftcardsPath
      });
    } catch (error) {
      console.error("Error trying to GET game images:", error);
    }
});

app.get('/game_page/:id', async (req, res) => {
  const gameId = req.params.id;

  try {
      const response = await fetch(`http://localhost:3000/games/${gameId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const responseDlcs = await fetch("http://localhost:3000/dlcs/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseImages = await fetch("http://localhost:3000/gameimages/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
      }

      if (!responseDlcs.ok) {
        const errorText = await responseDlcs.text();
        throw new Error(`HTTP error! Status: ${responseDlcs.status}, Response: ${errorText}`);
      }

      if (!responseImages.ok) {
        const errorText = await responseImages.text();
        throw new Error(`HTTP error! Status: ${responseImages.status}, Response: ${errorText}`);
      }

      const gameData = await response.json();
      const dlcData = await responseDlcs.json();
      const gameImageData = await responseImages.json();
      const gameImages = gameImageData.gameimages;
      const dlcs = dlcData.dlcs;
      const arrayImage = [];
      let gameImage = "";

      for(let i = 0; i < gameImages.length; i++) {
        const image = gameImages[i];

        if (image.GameID === gameData.game.GameID && !image.ImageName.includes("_")) {
          gameImage = `../${image.ImageSource}/${image.ImageName}.${image.ImageExtention}`;
        } else if(image.GameID == gameData.game.GameID && image.ImageName.includes("_") && !image.ImageName.includes("_1")) {
          for(let j = 0; j < dlcs.length; j++) {
            const dlc = dlcs[j];
            if(image.GameID === dlc.GameID) {
              arrayImage.push({
                path: `../${image.ImageSource}/${image.ImageName}.${image.ImageExtention}`,
                id: dlc.DLCID,
              });
            }
          }
        }
      }

      res.render('gamepage', {
        game: gameData.game,
        gameImage: gameImage,
        imagesDlc: arrayImage
      });
  } catch (error) {
      console.error("Error fetching game data:", error.message);
      res.status(500).send('Error loading game page');
  }
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

app.get("/dlc_page", (req, res) => {
    res.render("dlcpage", { title: "DLC" }); 
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
