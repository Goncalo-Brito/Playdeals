document.getElementById("createGameForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    let gamename = document.getElementById("title").value;
    let gamecompany = document.getElementById("company").value;
    let gamePEGI = document.getElementById("pegi").value;
    let gameplatform = document.getElementById("platform").value;
    let gamedescription = document.getElementById("description").value;
    let gameprice = document.getElementById("price").value;
    let gamereleasedate = document.getElementById("date").value;
    let image1 = document.getElementById("image1");
    let image2 = document.getElementById("image2");

    let gamediscount = 0;
    let featuredgame = false;
    let today = new Date();
    let todayFormatted = today.toISOString().split('T')[0]; 
    let imagesource = 'images/games';

    let gamestatus = '';

    try {
        if(gamename == '' || gamecompany == '' || gamePEGI == '' || gameplatform == '' || gamedescription == '' || gameprice == '' || image1.files.length == 0 || image2.files.length == 0) {
            message.textContent = "Please fill every field correctly. (Don't forget the images)"; 
            message.style.color = "red";
        }
        else if (parseFloat(gameprice) <= 0 || isNaN(gameprice)) {
            message.textContent = "Game price must be VALID.";
            message.style.color = "red";
        }
        else {

            if (gamereleasedate == '')
            {
                gamereleasedate = todayFormatted;
            }

            if (todayFormatted >= gamereleasedate) {
                gamestatus = "Available";
            } else {
                gamestatus = "TBA";
            }

            const response1 = await fetch("/games/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        gamename,
                        gamecompany,
                        gameprice,
                        gamereleasedate,
                        gamePEGI,
                        gameplatform,
                        gamediscount,
                        featuredgame,
                        gamestatus,
                        gamedescription,
                    }
                )
            });

            try {
                let imagename1 = '';
                let imagename2 = '';
                let imageExtension1 = '';
                let imageExtension2 = '';
                let gameID = '';
        
                const data = await fetch("/games/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },            
                });
        
                let gaming = await data.json();
                let games = gaming.games;
        
                games.forEach(game => {
                    gameID = game.GameID;
                });
        
        
                if(image1.files.length > 0 && image2.files.length > 0){
                    imageExtension1 = image1.files[0].name.split('.').pop();
                    imageExtension2 = image2.files[0].name.split('.').pop();
        
                    imagename1 = gameID + '_1'; 
                    imagename2 = gameID; 
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


