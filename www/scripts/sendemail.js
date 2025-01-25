async function wonauction(auction) {
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sonyplaydeals@gmail.com',
            pass: 'sonyplaydeals123'
        }
    });

    try {
        // Fazer as chamadas às APIs de biddings e users em paralelo para maior eficiência
        const [biddingsResponse, usersResponse] = await Promise.all([
            fetch("http://localhost:3000/biddings/", {
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

        // Encontrar o lance mais alto para a auction atual
        let highestBid = biddings
            .filter(bid => bid.AuctionID === auction.AuctionID)
            .reduce((max, bid) => (bid.BiddingValue > max.BiddingValue ? bid : max), { BiddingValue: 0 });

        if (!highestBid.UserID) {
            console.log(`No valid bids found for auction ID ${auction.AuctionID}`);
            return;
        }

        // Encontrar o usuário vencedor pelo ID
        const winnerUser = users.find(user => user.UserID === highestBid.UserID);

        if (!winnerUser) {
            console.error(`Winner not found for auction ID ${auction.AuctionID}`);
            return;
        }

        // Configurar e enviar o e-mail para o vencedor
        let mailOptions = {
            from: 'sonyplaydeals@gmail.com',
            to: winnerUser.Email,
            subject: `Congratulations! You won the auction: ${auction.AuctionTittle}`,
            text: `You won the auction for ${highestBid.BiddingValue}€! Please respond to this email to proceed.`
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${winnerUser.Email} for auction ID ${auction.AuctionID}`);

    } catch (error) {
        console.error(`Error processing auction ${auction.AuctionID}:`, error);
    }
}

//module.exports = { wonauction };