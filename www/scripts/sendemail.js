/**
 * Auction Winner Notification Module
 *
 * This module defines the `wonauction` function, which notifies the winner of an auction via email.
 * It fetches auction bid data and user information, determines the highest bidder, and sends an email notification.
 */

async function wonauction(auction) {
    const nodemailer = require('nodemailer');

    // Configure the email transporter using Gmail service
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sonyplaydeals@gmail.com',
            pass: 'qpyd onjm exvc kimw'
        }
    });

    try {
        /**
         * Fetch bidding and user data concurrently using Promise.all.
         */
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

        // Check if API responses are successful
        if (!biddingsResponse.ok || !usersResponse.ok) {
            throw new Error("Failed to fetch biddings or users.");
        }

        // Parse the fetched data
        const biddingsData = await biddingsResponse.json();
        const usersData = await usersResponse.json();
        const biddings = biddingsData.biddings;
        const users = usersData.users;

        /**
         * Determine the highest bid for the auction.
         */
        let highestBid = biddings
            .filter(bid => bid.AuctionID === auction.AuctionID)
            .reduce((max, bid) => (bid.BiddingValue > max.BiddingValue ? bid : max), { BiddingValue: 0 });

        // If no valid highest bid is found, exit the function
        if (!highestBid.UserID) {
            return;
        }

        // Find the user corresponding to the highest bid
        const winnerUser = users.find(user => user.UserID === highestBid.UserID);

        // If the winning user is not found, log an error and exit
        if (!winnerUser) {
            console.error(`Winner not found for auction ID ${auction.AuctionID}`);
            return;
        }

        try {
            /**
             * Email configuration and sending notification to the auction winner.
             */
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
