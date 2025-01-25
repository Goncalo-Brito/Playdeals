async function wonauction(auction) {
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sonyplaydeals@gmail.com',
            pass: 'qpyd onjm exvc kimw'
        }
    });

    try {

        const [biddingsResponse, usersResponse] = await Promise.all([
            fetch("http://localhost:3000/bids/", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }),
            fetch("http://localhost:3000/users/", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
        ]);

        if (!biddingsResponse.ok || !usersResponse.ok) {
            throw new Error("Failed to fetch biddings or users.");
        }

        const biddingsData = await biddingsResponse.json();
        const usersData = await usersResponse.json();
        const biddings = biddingsData.biddings;
        const users = usersData.users;

        let highestBid = biddings
            .filter(bid => bid.AuctionID === auction.AuctionID)
            .reduce((max, bid) => (bid.BiddingValue > max.BiddingValue ? bid : max), { BiddingValue: 0 });

        if (!highestBid.UserID) {
            return;
        }

        const winnerUser = users.find(user => user.UserID === highestBid.UserID);

        if (!winnerUser) {
            console.error(`Winner not found for auction ID ${auction.AuctionID}`);
            return;
        }

        try {
            let mailOptions = {
                from: 'sonyplaydeals@gmail.com',
                to: winnerUser.Email,
                subject: `Congratulations! You won the auction: ${auction.AuctionTittle}`,
                text: `You won the auction for ${highestBid.BiddingValue}€! Please respond to this email to proceed.`
            };
        
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error(`Error while sending Email: Auction ${auction.AuctionID}`, error);
        }
        

    } catch (error) {
        console.error(`Error processing auction ${auction.AuctionID}:`, error);
    }
}

module.exports = {
    wonauction
};
