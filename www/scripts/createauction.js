document.getElementById("createAuctionForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    let auctionTitle = document.getElementById("title").value;
    let auctionDescription = document.getElementById("description").value;
    let startDate = document.getElementById("startdate").value;
    let EndDate = document.getElementById("enddate").value;
    let innitialValue = document.getElementById("innitialvalue").value;

    let today = new Date();
    let todayFormatted = today.toISOString().split('T')[0]; 

    let auctionStatus = '';

    try {
        if(auctionTitle == '' || auctionDescription == '' || EndDate == '' || innitialValue == '') {
            message.textContent = "Please fill every field correctly.";  
            message.style.color = "red";
        }
        else if (parseFloat(innitialValue) <= 0 || isNaN(innitialValue)) {
            message.textContent = "Innitial Value must be VALID.";
            message.style.color = "red";
        }
        else if (EndDate < todayFormatted) {
            message.textContent = "End Date must be VALID.";
            message.style.color = "red";
        }
        else {

            if (startDate == '' || startDate < todayFormatted)
            {
                startDate = todayFormatted;
                auctionStatus = "Available";
            }
            else if (startDate > todayFormatted)
            {
                auctionStatus = "TBA";
            }

            const response = await fetch("/auctions/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        AuctionTitle: auctionTitle,
                        initialvalue: innitialValue,
                        status: auctionStatus,
                        startdate: startDate,
                        enddate: EndDate,
                        description: auctionDescription
                    }
                )
            });

            if (response.ok) {
                const auction = await response.json();
                window.location.href = "/staff_page";
            } else {
                const error = await response.json();
                message.textContent = error.message;
                message.style.color = "red";
            }
        }

    } catch (error) {
        console.error(error);
        message.textContent = "Error invalid auction data.";
        message.style.color = "red";
    }
});

