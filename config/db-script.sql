Create database if not exists playdeals;

use playdeals;

Create table if not exists Auctions (
	AuctionID int auto_increment,
    AuctionTittle varchar(32) not null,
    AuctionInitialValue decimal(10, 2) not null,
    Status varchar(16) not null,
    StartDate date not null,
    EndDate date not null,
    Description varchar(512),
    primary key(AuctionID)
);

Create table if not exists Games (
	GameID int auto_increment,
    GameName varchar(64) not null,
    GameCompany varchar(32) not null,
    GamePrice decimal(10, 2) not null,
    GameReleaseDate date,
    GamePEGI int,
    GamePlatform varchar(4) not null,
    GameDiscount int,
    FeaturedGame boolean not null,
    GameStatus varchar(16) not null,
    GameDescription varchar(256),
    primary key(GameID)
);

Create table if not exists DLCs (
	DLCID int auto_increment,
    DLCName varchar(32) not null,
    DLCPrice decimal(10, 2) not null,
    DLCReleaseDate date,
    DLCStatus varchar(16) not null,
    DLCDiscount int,
    DLCDescription varchar(256),
    GameID int not null,
    primary key(DLCID),
    foreign key(GameID) references Games(GameID)
);

Create table if not exists Users (
	UserID int auto_increment,
	UserName varchar(32) not null,
    FName varchar(32) not null,
    LName varchar(32) not null,
    Email varchar(128) unique not null,
    Pass varchar(255) not null,
    CreationDate date not null,
    UserType char not null,
	primary key(UserID)
);



Create table if not exists ProfilePictures (
	PFPID int auto_increment,
    PFPExtention varchar(8) not null,
    PFPSource varchar(128) not null,
    PFPName varchar(32) not null,
    UserID int not null,
    primary key(PFPID),
    foreign key(UserID) references Users(UserID)
);

Create table if not exists GameImage (
	ImageID int auto_increment,
    ImageExtention varchar(8) not null,
    ImageSource varchar(128) not null,
    ImageName varchar(32) not null,
    GameID int not null,
    primary key(ImageID),
    foreign key(GameID) references Games(GameID)
);

Create table if not exists GiftCards (
	GiftCardID int auto_increment,
    GFCValue decimal(10, 2) not null,
    GFCStatus varchar(16) not null,
    Primary key(GiftCardID)
);

Create table if not exists ShoppingCart (
    CartID int auto_increment,
    UserID int not null,
    GameID int, -- Opcional
    DLCID int, -- Opcional
    GiftCardID int, -- Opcional
    DateAdded datetime not null,
    primary key(CartID),
    foreign key(UserID) references Users(UserID),
    foreign key(GameID) references Games(GameID),
    foreign key(DLCID) references DLCs(DLCID),
    foreign key(GiftCardID) references GiftCards(GiftCardID)
);


Create table if not exists Biddings (
	BiddingID int auto_increment,
    BiddingValue decimal(10, 2) not null,
    UserID int not null,
    AuctionID int not null, 
    primary key(BiddingID),
    foreign key(UserID) references Users(UserID),
	foreign key(AuctionID) references Auctions(AuctionID)
);

Create table if not exists CommentsLog (
	CommentID int auto_increment,
    CommentText varchar(256) not null,
    UserID int not null,
    BiddingID int not null,
    primary key(CommentID),
    foreign key(UserID) references Users(UserID),
    foreign key(BiddingID) references Biddings(BiddingID)    
);

Create table if not exists PurcharseLog (
	PurcharseLogID int auto_increment,
    PurchaseDate datetime not null,
    PurchasePrice decimal(10, 2) not null,
    ItemKey varchar(16) not null,
    UserID int not null,
    GameID int, -- Needs to be optional
    DLCID int, -- Needs to be optional
    GiftCardID int, -- Needs to be optional
	primary key(PurcharseLogID),
    foreign key(UserID) references Users(UserID),
    foreign key(GameID) references Games(GameID),
    foreign key(DLCID) references DLCs(DLCID),
    foreign key(GiftCardID) references GiftCards(GiftCardID)
);

-- Auctions: --------------------------------------------------------
INSERT INTO Auctions (AuctionTittle, AuctionInitialValue, Status, StartDate, EndDate, Description) 
    VALUES ('Rare collection',60, 'Active', '2025-01-10', '2025-01-20', 'Auction for a rare PlayStation 1 game collection including: Suikoden II, Castlevania: Symphony of the Night, Final Fantasy VII (Black Label Edition), Silent Hill, Tomba!, Valkyrie Profile, Klonoa: Door to Phantomile, Lunar: Silver Star Story Complete, Persona 2: Eternal Punishment, Mega Man Legends 2');

INSERT INTO Auctions (AuctionTittle, AuctionInitialValue, Status, StartDate, EndDate, Description) 
    VALUES ('Limited PS4 console', 150, 'Completed', '2024-12-15', '2024-12-25', 'Spiderman limited edition PlayStation 4 console');

INSERT INTO Auctions (AuctionTittle, AuctionInitialValue, Status, StartDate, EndDate, Description) 
    VALUES ('Classic PlayStation 2 games', 90, 'Cancelled', '2025-01-05', '2025-01-15', 'Bundle of classic PlayStation 2 games including: Shadow of the Colossus, Silent Hill 2, Okami, Final Fantasy X, Kingdom Hearts (1 and 2), God of War (1 and 2), Persona 3 FES, Metal Gear Solid 3: Snake Eater, Jak and Daxter: The Precursor Legacy, Devil May Cry (Special Edition)');

INSERT INTO Auctions (AuctionTittle, AuctionInitialValue, Status, StartDate, EndDate, Description) 
    VALUES ('VR and accessories', 80, 'Active', '2025-01-12', '2025-01-22', 'PlayStation VR headset and accessories');

INSERT INTO Auctions (AuctionTittle, AuctionInitialValue, Status, StartDate, EndDate, Description) 
    VALUES ('New Limited PS5',200, 'Completed', '2025-01-18', '2025-01-28', 'Brand new limited edition PlayStation 5 with two controllers');

-- Games: -----------------------------------------------------------
INSERT INTO Games (GameName, GameCompany, GamePrice, GameReleaseDate, GamePEGI, GamePlatform, GameDiscount, FeaturedGame, GameStatus, GameDescription) 
    VALUES ('The Last of Us Part II', 'Naughty Dog', 59.99, '2020-06-19', 18, 'PS4', 10, TRUE, 'Available', 'A post-apocalyptic action-adventure game');

INSERT INTO Games (GameName, GameCompany, GamePrice, GameReleaseDate, GamePEGI, GamePlatform, GameDiscount, FeaturedGame, GameStatus, GameDescription) 
    VALUES ('God of War Ragnarok', 'Santa Monica Studio', 69.99, '2022-11-09', 18, 'PS5', 15, TRUE, 'Available', 'Epic action-adventure game based on Norse mythology');

INSERT INTO Games (GameName, GameCompany, GamePrice, GameReleaseDate, GamePEGI, GamePlatform, GameDiscount, FeaturedGame, GameStatus, GameDescription) 
    VALUES ('Horizon Forbidden West', 'Guerrilla Games', 59.99, '2022-02-18', 16, 'PS5', 0, FALSE, 'Available', 'Open-world action RPG set in a post-apocalyptic world');

INSERT INTO Games (GameName, GameCompany, GamePrice, GameReleaseDate, GamePEGI, GamePlatform, GameDiscount, FeaturedGame, GameStatus, GameDescription) 
    VALUES ('Spider-Man: Miles Morales', 'Insomniac Games', 49.99, '2020-11-12', 12, 'PS5', 5, TRUE, 'Available', 'Action-adventure game featuring Miles Morales as Spider-Man');

INSERT INTO Games (GameName, GameCompany, GamePrice, GameReleaseDate, GamePEGI, GamePlatform, GameDiscount, FeaturedGame, GameStatus, GameDescription) 
    VALUES ('Uncharted 4: A Thief’s End', 'Naughty Dog', 39.99, '2016-05-10', 16, 'PS4', 20, TRUE, 'Available', 'Action-adventure game with treasure hunting and exploration');

-- DLC's: -----------------------------------------------------------

INSERT INTO DLCs (DLCName, DLCPrice, DLCReleaseDate, DLCStatus, DLCDiscount, DLCDescription, GameID) 
    VALUES ('Frozen Wilds', 20, '2017-11-07', 'Available', 5, 'Expansion pack for Horizon Zero Dawn featuring a new region and story', 3);

INSERT INTO DLCs (DLCName, DLCPrice, DLCReleaseDate, DLCStatus, DLCDiscount, DLCDescription, GameID) 
    VALUES ('The City That Never Sleeps', 15, '2018-09-28', 'Available', 10, 'Story DLC for Spider-Man with new missions and villains', 4);

-- Users: -----------------------------------------------------------
INSERT INTO Users (UserName, FName, LName, Email, Pass, CreationDate, UserType) 
    VALUES ('gamer123', 'John', 'Doe', 'johndoe@example.com', 'password123', '2024-12-01', 'A');

INSERT INTO Users (UserName, FName, LName, Email, Pass, CreationDate, UserType) 
    VALUES ('playstationfan', 'Emily', 'Smith', 'emilysmith@example.com', 'pass456', '2024-12-10', 'U');

INSERT INTO Users (UserName, FName, LName, Email, Pass, CreationDate, UserType) 
    VALUES ('pslover', 'Michael', 'Brown', 'michaelbrown@example.com', 'mypassword', '2025-01-05', 'S');

INSERT INTO Users (UserName, FName, LName, Email, Pass, CreationDate, UserType) 
    VALUES ('sonyfanatic', 'Alice', 'Johnson', 'alicejohnson@example.com', 'alicepass', '2025-01-10', 'S');

INSERT INTO Users (UserName, FName, LName, Email, Pass, CreationDate, UserType) 
    VALUES ('gamelord', 'David', 'Lee', 'davidlee@example.com', 'davidpass', '2024-11-30', 'U');

-- Profile Images: --------------------------------------------------
INSERT INTO ProfilePictures (PFPExtention, PFPSource, PFPName, UserID) 
    VALUES ('jpg', 'images/users', '1', 1);

INSERT INTO ProfilePictures (PFPExtention, PFPSource, PFPName, UserID) 
    VALUES ('jpeg', 'images/users', '2', 2);

INSERT INTO ProfilePictures (PFPExtention, PFPSource, PFPName, UserID) 
    VALUES ('jpeg', 'images/users', '3', 3);

INSERT INTO ProfilePictures (PFPExtention, PFPSource, PFPName, UserID) 
    VALUES ('jpeg', 'images/users', '4', 4);

-- Game Images: -----------------------------------------------------
INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '1', 1);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '1_1', 1);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '2', 2);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '2_1', 2);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '3', 3);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '3_1', 3);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '3_2', 3);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '3_2_0', 3);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '4', 4);
    
INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '4_1', 4);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '4_2', 4);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '4_2_0', 4);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '5', 5);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '5_1', 5);

-- Gift Cards: ------------------------------------------------------
INSERT INTO GiftCards (GFCValue, GFCStatus) 
    VALUES (10, 'Available');

INSERT INTO GiftCards (GFCValue, GFCStatus) 
    VALUES (20, 'Available');

INSERT INTO GiftCards (GFCValue, GFCStatus) 
    VALUES (50, 'Available');

INSERT INTO GiftCards (GFCValue, GFCStatus) 
    VALUES (60, 'Available');

INSERT INTO GiftCards (GFCValue, GFCStatus) 
    VALUES (80, 'Available');

INSERT INTO GiftCards (GFCValue, GFCStatus) 
    VALUES (100, 'Available');

INSERT INTO GiftCards (GFCValue, GFCStatus) 
    VALUES (150, 'Available');

INSERT INTO GiftCards (GFCValue, GFCStatus) 
    VALUES (200, 'Available');

INSERT INTO GiftCards (GFCValue, GFCStatus) 
    VALUES (250, 'Available');
    
-- Biddings: --------------------------------------------------------
INSERT INTO Biddings (BiddingValue, UserID, AuctionID) 
    VALUES (120, 1, 1);

INSERT INTO Biddings (BiddingValue, UserID, AuctionID) 
    VALUES (550, 2, 2);

INSERT INTO Biddings (BiddingValue, UserID, AuctionID) 
    VALUES (270, 3, 3);

INSERT INTO Biddings (BiddingValue, UserID, AuctionID) 
    VALUES (85, 4, 4);

INSERT INTO Biddings (BiddingValue, UserID, AuctionID) 
    VALUES (1050, 5, 5);
    
-- Cart: ------------------------------------------------------------

INSERT INTO ShoppingCart (UserID, GameID, DateAdded)
VALUES (1, 2, NOW());

INSERT INTO ShoppingCart (UserID, DLCID, DateAdded)
VALUES (2, 1, NOW());

INSERT INTO ShoppingCart (UserID, GiftCardID, DateAdded)
VALUES (3, 1, NOW());

INSERT INTO ShoppingCart (UserID, GameID, DateAdded)
VALUES (1, 3, NOW());

INSERT INTO ShoppingCart (UserID, DLCID, DateAdded)
VALUES (1, 2, NOW());

INSERT INTO ShoppingCart (UserID, GiftCardID, DateAdded)
VALUES (1, 2, NOW());

INSERT INTO ShoppingCart (UserID, GameID, DateAdded)
VALUES (4, 4, NOW());

-- Purchase Logs: ---------------------------------------------------
INSERT INTO PurcharseLog (PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID) 
    VALUES ('2025-01-10 14:23:00', 60, 'pok4fposj343490b', 3, 1, NULL, NULL);

INSERT INTO PurcharseLog (PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID) 
    VALUES ('2025-01-11 15:45:00', 20, 'l3jnv92xodfiwe7q', 2, NULL, 1, NULL);

INSERT INTO PurcharseLog (PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID)
    VALUES ('2025-01-12 10:30:00', 70, '0f7pdjkxl9v3yrq2', 3, 1, NULL, NULL);

INSERT INTO PurcharseLog (PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID) 
    VALUES ('2025-01-13 09:00:00', 15, 'xkq9bndm3r8fj20p', 4, NULL, 2, NULL);

INSERT INTO PurcharseLog (PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID) 
    VALUES ('2025-01-14 11:10:00', 60, 'v8jf24opqxw7ykl9', 5, 1, NULL, NULL);

INSERT INTO PurcharseLog (PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID) 
    VALUES ('2025-01-15 12:50:00', 0, '3npqxl8rfv20j9od', 5, NULL, NULL, 3);

INSERT INTO PurcharseLog (PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID) 
    VALUES ('2025-01-16 13:20:00', 40, 'jk9v2x07pfwl3o8q', 2, 1, NULL, NULL);

INSERT INTO PurcharseLog (PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID) 
    VALUES ('2025-01-17 14:00:00', 20, 'qx4po9n7fj32v8kl', 3, NULL, NULL, 5);

INSERT INTO PurcharseLog (PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID) 
    VALUES ('2025-01-18 16:40:00', 50, 'l7v0nqx32p9fjk84', 4, NULL, NULL, 6);

INSERT INTO PurcharseLog (PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID) 
    VALUES ('2025-01-19 18:05:00', 15, 'rfj29klvq803xw7p', 5, NULL, 2, NULL);