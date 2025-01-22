Create database if not exists playdeals;

use playdeals;

Create table if not exists Auctions (
	AuctionID int auto_increment,
    AuctionInitialValue int not null,
    Status varchar(16) not null,
    StartDate date not null,
    EndDate date not null,
    Description varchar(256),
    primary key(AuctionID)
);

Create table if not exists Games (
	GameID int auto_increment,
    GameName varchar(64) not null,
    GameCompany varchar(32) not null,
    GamePrice int not null,
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
    DLCPrice int not null,
    DLCReleaseDate date,
    DLCStatus varchar(16) not null,
    DLCDiscount int,
    DLCDescription varchar(256),
    GameID int not null,
    primary key(DLCID),
    foreign key(GameID) references Games(GameID)
);

Create table if not exists Address (
	AddressID int auto_increment,
    Country varchar(64) not null,
    Street varchar(64) not null,
    PostalCode varchar(8) not null,
    primary key(addressID)
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
    AddressID int, -- Needs to be optional
	primary key(UserID),
    foreign key(AddressID) references Address(AddressID)
);

Create table if not exists CardsInfo (
	CardID int auto_increment,
    CardNumber varchar(16) not null,
    CardCVC varchar(3) not null,
    CardVal date not null,
    UserID int not null,
    primary key(CardID),
    foreign key(UserID) references Users(UserID)
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
    GFCValue int not null,
    GFCStatus varchar(16) not null,
    Primary key(GiftCardID)
);

Create table if not exists Biddings (
	BiddingID int auto_increment,
    BiddingValue int not null,
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
    PurchasePrice int not null,
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
INSERT INTO Auctions (AuctionInitialValue, Status, StartDate, EndDate, Description) 
    VALUES (60, 'Active', '2025-01-10', '2025-01-20', 'Auction for a rare PlayStation 1 game collection');

INSERT INTO Auctions (AuctionInitialValue, Status, StartDate, EndDate, Description) 
    VALUES (150, 'Completed', '2024-12-15', '2024-12-25', 'Limited edition PlayStation 4 console');

INSERT INTO Auctions (AuctionInitialValue, Status, StartDate, EndDate, Description) 
    VALUES (90, 'Cancelled', '2025-01-05', '2025-01-15', 'Bundle of classic PlayStation 2 games');

INSERT INTO Auctions (AuctionInitialValue, Status, StartDate, EndDate, Description) 
    VALUES (80, 'Active', '2025-01-12', '2025-01-22', 'PlayStation VR headset and accessories');

INSERT INTO Auctions (AuctionInitialValue, Status, StartDate, EndDate, Description) 
    VALUES (200, 'Pending', '2025-01-18', '2025-01-28', 'Brand new PlayStation 5 with two controllers');

-- Games: -----------------------------------------------------------
INSERT INTO Games (GameName, GameCompany, GamePrice, GameReleaseDate, GamePEGI, GamePlatform, GameDiscount, FeaturedGame, GameStatus, GameDescription) 
    VALUES ('The Last of Us Part II', 'Naughty Dog', 60, '2020-06-19', 18, 'PS4', 10, TRUE, 'Available', 'A post-apocalyptic action-adventure game');

INSERT INTO Games (GameName, GameCompany, GamePrice, GameReleaseDate, GamePEGI, GamePlatform, GameDiscount, FeaturedGame, GameStatus, GameDescription) 
    VALUES ('God of War Ragnarok', 'Santa Monica Studio', 70, '2022-11-09', 18, 'PS5', 15, TRUE, 'Available', 'Epic action-adventure game based on Norse mythology');

INSERT INTO Games (GameName, GameCompany, GamePrice, GameReleaseDate, GamePEGI, GamePlatform, GameDiscount, FeaturedGame, GameStatus, GameDescription) 
    VALUES ('Horizon Forbidden West', 'Guerrilla Games', 60, '2022-02-18', 16, 'PS5', 0, FALSE, 'Available', 'Open-world action RPG set in a post-apocalyptic world');

INSERT INTO Games (GameName, GameCompany, GamePrice, GameReleaseDate, GamePEGI, GamePlatform, GameDiscount, FeaturedGame, GameStatus, GameDescription) 
    VALUES ('Spider-Man: Miles Morales', 'Insomniac Games', 50, '2020-11-12', 12, 'PS5', 5, TRUE, 'Available', 'Action-adventure game featuring Miles Morales as Spider-Man');

INSERT INTO Games (GameName, GameCompany, GamePrice, GameReleaseDate, GamePEGI, GamePlatform, GameDiscount, FeaturedGame, GameStatus, GameDescription) 
    VALUES ('Uncharted 4: A Thief’s End', 'Naughty Dog', 40, '2016-05-10', 16, 'PS4', 20, TRUE, 'Available', 'Action-adventure game with treasure hunting and exploration');

-- DLC's: -----------------------------------------------------------

INSERT INTO DLCs (DLCName, DLCPrice, DLCReleaseDate, DLCStatus, DLCDiscount, DLCDescription, GameID) 
    VALUES ('Frozen Wilds', 20, '2017-11-07', 'Available', 5, 'Expansion pack for Horizon Zero Dawn featuring a new region and story', 3);

INSERT INTO DLCs (DLCName, DLCPrice, DLCReleaseDate, DLCStatus, DLCDiscount, DLCDescription, GameID) 
    VALUES ('The City That Never Sleeps', 15, '2018-09-28', 'Available', 10, 'Story DLC for Spider-Man with new missions and villains', 4);

-- Adress: ----------------------------------------------------------
INSERT INTO Address (Country, Street, PostalCode) 
    VALUES ('United States', '123 Main St', '90210');

INSERT INTO Address (Country, Street, PostalCode) 
    VALUES ('United Kingdom', '45 Baker Street', 'W1U 8EW');

INSERT INTO Address (Country, Street, PostalCode) 
    VALUES ('Canada', '789 Maple Ave', 'K1A 0B1');

INSERT INTO Address (Country, Street, PostalCode) 
    VALUES ('Australia', '12 Kangaroo Rd', '3000');

INSERT INTO Address (Country, Street, PostalCode) 
    VALUES ('Germany', '56 Berliner Str', '10115');

-- Users: -----------------------------------------------------------
INSERT INTO Users (UserName, FName, LName, Email, Pass, CreationDate, UserType, AddressID) 
    VALUES ('gamer123', 'John', 'Doe', 'johndoe@example.com', 'password123', '2024-12-01', 'A', 1);

INSERT INTO Users (UserName, FName, LName, Email, Pass, CreationDate, UserType, AddressID) 
    VALUES ('playstationfan', 'Emily', 'Smith', 'emilysmith@example.com', 'pass456', '2024-12-10', 'U', 2);

INSERT INTO Users (UserName, FName, LName, Email, Pass, CreationDate, UserType, AddressID) 
    VALUES ('pslover', 'Michael', 'Brown', 'michaelbrown@example.com', 'mypassword', '2025-01-05', 'S', 3);

INSERT INTO Users (UserName, FName, LName, Email, Pass, CreationDate, UserType, AddressID) 
    VALUES ('sonyfanatic', 'Alice', 'Johnson', 'alicejohnson@example.com', 'alicepass', '2025-01-10', 'S', 4);

INSERT INTO Users (UserName, FName, LName, Email, Pass, CreationDate, UserType) 
    VALUES ('gamelord', 'David', 'Lee', 'davidlee@example.com', 'davidpass', '2024-11-30', 'U');

-- Cards: -----------------------------------------------------------
INSERT INTO CardsInfo (CardNumber, CardCVC, CardVal, UserID) 
    VALUES (1234567812345678, 123, '2026-12-31', 1);

INSERT INTO CardsInfo (CardNumber, CardCVC, CardVal, UserID) 
    VALUES (8765432187654321, 456, '2025-11-30', 2);

INSERT INTO CardsInfo (CardNumber, CardCVC, CardVal, UserID) 
    VALUES (1111222233334444, 789, '2027-10-31', 3);

INSERT INTO CardsInfo (CardNumber, CardCVC, CardVal, UserID) 
    VALUES (5555666677778888, 101, '2024-09-30', 4);

INSERT INTO CardsInfo (CardNumber, CardCVC, CardVal, UserID) 
    VALUES (9999000011112222, 202, '2025-08-31', 5);

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
    VALUES ('jpg', 'images/games', '2_2', 2);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '3', 3);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '3_3', 3);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '4', 4);
    
INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '4_4', 4);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '5', 5);

INSERT INTO GameImage (ImageExtention, ImageSource, ImageName, GameID) 
    VALUES ('jpg', 'images/games', '5_5', 5);

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

-- Comments Auctions: -----------------------------------------------
INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('Great auction! Hoping to win this.', 1, 1);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('This item looks amazing!', 2, 2);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('I really want this collectible.', 3, 3);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('This will be a nice addition to my collection.', 4, 4);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('Good luck to all bidders!', 5, 5);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('I hope I win this rare item.', 1, 1);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('Nice bid! I might increase mine.', 2, 2);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('This auction is getting competitive!', 3, 3);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('I like the description of the item.', 4, 4);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('Let’s see who wins this!', 5, 5);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('The starting bid was very reasonable.', 1, 1);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('I’ll be back for the next auction.', 2, 2);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('I hope this auction gets extended.', 3, 3);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('Can’t wait to see the final result.', 4, 4);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('Nice auction setup!', 5, 5);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('Great item. Worth every penny.', 1, 1);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('I love bidding on unique items.', 2, 2);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('Looking forward to more auctions like this.', 3, 3);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('The competition is tough!', 4, 4);

INSERT INTO CommentsLog (CommentText, UserID, BiddingID) 
    VALUES ('This has been a fun experience.', 5, 5);

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