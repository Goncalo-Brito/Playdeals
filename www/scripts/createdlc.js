document.getElementById("createDLCForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const dlcname = document.getElementById("title").value;
    const dlcdescription = document.getElementById("description").value;
    const dlcprice = document.getElementById("price").value;
    let dlcreleaseDate = document.getElementById("date").value;
    const gameID = document.getElementById("gameid").value;
    let image1 = document.getElementById("image1");
    let image2 = document.getElementById("image2");

    const dlcdiscount = 0;
    let today = new Date();
    let todayFormatted = today.toISOString().split('T')[0]; 
    const imagesource = 'images/games';

    let dlcstatus = '';

    try {
        if(dlcname == '' || dlcdescription == '' || dlcprice == '' || gameID == '') {
            message.textContent = "Please fill every field correctly."; 
            message.style.color = "red";
        }
        else if (parseFloat(dlcprice) <= 0 || isNaN(dlcprice)) {
            message.textContent = "DLC price must be VALID.";
            message.style.color = "red";
        }
        else {

            if (dlcreleaseDate == '')
            {
                dlcreleaseDate = todayFormatted;
            }

            if (todayFormatted >= dlcreleaseDate) {
                dlcstatus = "Available";
            } else {
                dlcstatus = "TBA";
            }
            
            const response1 = await fetch("/dlcs/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        DLCName: dlcname,
                        DLCPrice: dlcprice,
                        DLCReleaseDate: dlcreleaseDate,
                        DLCStatus: dlcstatus,
                        DLCDiscount: dlcdiscount,
                        DLCDescription: dlcdescription,
                        GameID: gameID,
                    }
                )
            });

            try {
                let imagename1 = '';
                let imagename2 = '';
                let imageExtension1 = '';
                let imageExtension2 = '';
                let latestDLC = '';
                let latestDLCGameID = '';
                let numberOfDlcs = '';
        
                const data = await fetch("/dlcs/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },            
                });
        
                let dlcling = await data.json();
                let dlcs = dlcling.dlcs;
        
                dlcs.forEach(dlcLatest => {
                    latestDLC = dlcLatest.DLCID;  
                    latestDLCGameID = dlcLatest.GameID;
                });
                
                dlcs.forEach(dlc => {
                    if( dlc.DLCID == latestDLC && dlc.GameID == latestDLCGameID)
                    {
                        numberOfDlcs = numberOfDlcs + 1;
                    }
                });
        
                if(image1.files.length > 0 && image2.files.length > 0){
                    imageExtension1 = image1.files[0].name.split('.').pop();
                    imageExtension2 = image2.files[0].name.split('.').pop();

                    imagename1 = latestDLC + '_' + numberOfDlcs ; 
                    imagename2 = latestDLC + '_' + numberOfDlcs + '_0'; 
                }
                else{
                    if (image1.files.length === 0) {
                        imagename1 = 'no_image_small';
                        imageExtension1 = 'jpg'; 
                    }
                
                    if (image2.files.length === 0) {
                        imagename2 = 'no_image_big'; 
                        imageExtension2 = 'jpg';   
                    }
                }
        
                const response2 = await fetch("/gameimages/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            imageextention: imageExtension1,
                            imagesource,
                            imagename: imagename1,
                            gameID,
                        }
                    )
                });
        
                const response3 = await fetch("/gameimages/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            imageextention: imageExtension2,
                            imagesource,
                            imagename: imagename2,
                            gameID,
                        }
                    )
                });
            
            if (!response2.ok && !response3.ok) {
                if (response2.status === 400 || response3.status === 400) {
                    message.textContent = "Please fill out all the fields correctly.";
                    message.style.color = "red";
                }else if (response2.status === 500 || response3.status === 500) {
                    message.textContent = "Server error occurred. Please try again later.";
                    message.style.color = "red";
                } else {
                    message.textContent = `Unexpected error: ${
                        response2.statusText
                    }`;
                    message.style.color = "red"; 
                }
            } else {
                window.location.href = "/staff_page";
            }
        
            } catch (error) {
                console.error(error);
                message.textContent = "Error fetching game data.";
                message.style.color = "red";
            }
            
        }

    } catch (error) {
        console.error(error);
        message.textContent = "Error invalid game data.";
        message.style.color = "red";
    }
});




document.getElementById('image1').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            
            img.onload = function() {
                if (img.width != 753 || img.height != 950) {
                    alert('A imagem excede as dimensões permitidas de 753x950 pixels.');
                    event.target.value = '';
                    document.getElementById('previewImage1').src = '../images/games/no_image_small.jpg';
                } else {
                    document.getElementById('previewImage1').src = e.target.result;
                }
            };
        };
        
        reader.readAsDataURL(file);
    }
});


document.getElementById('image2').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            
            img.onload = function() {
                if (img.width != 3840 || img.height != 2160) {
                    alert('A imagem excede as dimensões permitidas de 3840x2160 pixels.');
                    event.target.value = '';
                    document.getElementById('previewImage2').src = '../images/games/no_image_big.jpg';
                } else {
                    document.getElementById('previewImage2').src = e.target.result;
                }
            };
        };
        
        reader.readAsDataURL(file);
    }
});




