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

app.use("/giftcards", require("./routes/giftcardRoutes"));

app.use("/auctions", require("./routes/auctionRoutes"));

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

      const responseGiftCard = await fetch("http://localhost:3000/giftcards/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responseImages.ok) {
        throw new Error(`Error trying to GET game images: ${responseImages.statusText}`);
      }

      if (!responseDlcs.ok) {
        throw new Error(`Error trying to GET game images: ${responseDlcs.statusText}`);
      }

      if (!responseGiftCard.ok) {
        throw new Error(`Error trying to GET game images: ${responseGiftCard.statusText}`);
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
          } else if (gameimage.ImageName.includes("_") && !gameimage.ImageName.includes("_1") && !gameimage.ImageName.includes("_0")) { //dlc
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
        } else if(image.GameID == gameData.game.GameID && image.ImageName.includes("_") && !image.ImageName.includes("_1") && !image.ImageName.includes("_0")) {
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

app.get('/dlc_page/:id', async (req, res) => {
  const dlcId = req.params.id;

  try {
      const response = await fetch(`http://localhost:3000/dlcs/${dlcId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
      }
      

      const responseImages = await fetch("http://localhost:3000/gameimages/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responseImages.ok) {
        const errorText = await responseImages.text();
        throw new Error(`HTTP error! Status: ${responseImages.status}, Response: ${errorText}`);
      }

      const dlcData = await response.json();
      const dlc = dlcData.dlc;

      const gameImageData = await responseImages.json();
      const gameImages = gameImageData.gameimages;

      const arrayImage = [];
      let dlcImage = "";
      let gameImage = "";

      for(let i = 0; i < gameImages.length; i++) {
        const image = gameImages[i];
        if(image.GameID === dlc.GameID && image.ImageName.includes("_0")) {
          dlcImage = `../${image.ImageSource}/${image.ImageName}.${image.ImageExtention}`;
        } else if(image.GameID === dlc.GameID && image.ImageName.includes("_1")) {
          gameImage = `../${image.ImageSource}/${image.ImageName}.${image.ImageExtention}`;
        }
      }

      res.render('dlcpage', {
        dlc: dlc,
        gameImage : gameImage,
        dlcImage : dlcImage
      });
  } catch (error) {
      console.error("Error fetching game data:", error.message);
      res.status(500).send('Error loading game page');
  }
});

app.get("/gift_card_page/:id", async (req, res) => {
  const giftcardID = req.params.id;
  let giftcards = [];
  const giftcardsPath = [];
  const giftcard = [];

    try {
      const response = await fetch("http://localhost:3000/giftcards/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error trying to GET game images: ${response.statusText}`);
      }

      const dataGiftcards = await response.json();
      giftcards = dataGiftcards.giftcards;

      for (let i = 0; i < giftcards.length; i++) {
        const giftC = giftcards[i];
        const imagePath = `../images/giftcards/${giftC.GiftCardID}.png`;

        if(giftC.GiftCardID == giftcardID) {
          giftcard.push({
            path: imagePath,
            value: giftC.GFCValue,
          });
        } else {
          giftcardsPath.push({
            path: imagePath,
            id: giftC.GiftCardID,
          });
        }
      }
      
      res.render("cardpage", {
        giftcard: giftcard,
        giftcardsPath: giftcardsPath
      });
    } catch (error) {
      console.error("Error trying to GET gift images:", error);
    }
});

//__________________________________________________________________________________________________________

app.get("/deals", async (req, res) => {


  try {
    const response = await fetch("http://localhost:3000/auctions/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error trying to GET auctions: ${response.statusText}`);
    }

    const dataAuctions = await response.json();
    const auctions = dataAuctions.auctions;

    res.render("discoveryauctions", {
      auctions: auctions
    });

  } catch (error) {
    console.error("Error trying to GET games:", error);
  }
});


//__________________________________________________________________________________________________________

app.get("/auction_page/:id", (req, res) => {
  res.render("auctionpage", { title: "Auction" }); 
});



app.get("/cart_page", (req, res) => {
  res.render("cartpage", { title: "Your Cart" }); 
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


//__________________________________________________________________________________________________________


app.get("/staff_page", async (req, res) => {

  let games = []; 
  let dlcs = [];
  let auctions = [];
  const gameimages = [];
  const gameimagesPath = [];
  const dlcimages = []; 
  const dlcimagesPath = []; 

  try {
    const [gamesResponse, dlcsResponse, auctionsResponse, gameimagesResponse] = await Promise.all([
      fetch("http://localhost:3000/games/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      fetch("http://localhost:3000/dlcs/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      fetch("http://localhost:3000/auctions/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      fetch("http://localhost:3000/gameimages/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    ]);


    if (!gamesResponse.ok || !dlcsResponse.ok || !auctionsResponse.ok || !gameimagesResponse.ok) {
      throw new Error("Error: Failed to fetch data");
    }

    const dataimages = await gameimagesResponse.json();
    const Arrayimages = dataimages.gameimages;

    const datagames = await gamesResponse.json();
    games = datagames.games;

    const datadlcs = await dlcsResponse.json();
    dlcs = datadlcs.dlcs;

    const dataauctions = await auctionsResponse.json();
    auctions = dataauctions.auctions;

// ----------------------------------------------------------------
    for (let i = 0; i < Arrayimages.length; i++) {
      let gameimage = Arrayimages[i];
      if (gameimage.ImageName.includes("_1")) { //jogo
        gameimages.push(gameimage);
      } else if (gameimage.ImageName.includes("_") && !gameimage.ImageName.includes("_1") && !gameimage.ImageName.includes("_0")) { //dlc
        dlcimages.push(gameimage);
      }
    }

    for (let i = 0; i < gameimages.length; i++) {
      const image = gameimages[i];
      const imagePath = `../${image.ImageSource}/${image.ImageName}.${image.ImageExtention}`;
      gameimagesPath.push(imagePath);
    }

    for(let i = 0; i < dlcimages.length; i++) {
      const image = dlcimages[i];
      const imagePath = `../${image.ImageSource}/${image.ImageName}.${image.ImageExtention}`;
      dlcimagesPath.push(imagePath);
    }

    for(let i = 0; i < games.length; i++) {
      const game = games[i];
      game.GameReleaseDate = game.GameReleaseDate.substring(0, 10);
      games[i] = game;
    }

    for(let i = 0; i < dlcs.length; i++) {
      const dlc = dlcs[i];
      dlc.DLCReleaseDate = dlc.DLCReleaseDate.substring(0, 10);
      dlcs[i] = dlc;
    }

    for(let i = 0; i < auctions.length; i++) {
      const auction = auctions[i];
      auction.EndDate = auction.EndDate.substring(0, 10);
      auction.StartDate = auction.StartDate.substring(0, 10);
      auctions[i] = auction;
    }
// ----------------------------------------------------------------

    res.render("staffpage", {
      title: "Staff",
      games: games,
      dlcs: dlcs,
      auctions: auctions,
      gameimagesPath: gameimagesPath,
      dlcimagesPath: dlcimagesPath,
    });

  } catch (error) {
    console.error("Error fetching staff data:", error);
    res.render("staffpage", {
      title: "Staff",
      games: [],
      dlcs: [],
      auctions: [],
      gameImagesPath: [],
      dlcimagesPath: [],
    });
  }
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

app.get("/new_dlc", (req, res) => {
  res.render("adddlcpage", { title: "New DLC" }); 
});

app.get("/new_game", (req, res) => {
  res.render("addgamepage", { title: "New Game" }); 
});

app.get("/new_auction", (req, res) => {
  res.render("addauctionspage", { title: "New Auction" }); 
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});
