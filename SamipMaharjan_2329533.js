document.addEventListener(`DOMContentLoaded`, () => {
    // Displaying date 
    (function displayDate(){
        var currentDate = new Date(); 
        document.getElementById("display-date").innerHTML = currentDate.toDateString();
    })();

    const searchBtn = document.querySelector('.search-btn');

    //When the user searches for a city and clicks the search button
    searchBtn.addEventListener( 'mousedown', () => {
        const cityName = document.querySelector('.search-txt').value;
        const weatherData = localStorage.getItem( cityName ); 
        
        if ( weatherData == null )
        {
            console.log(cityName);
            execute_server_php( cityName );            
        }

    })

    //WHen the user searches for a city and presses enter
    document.querySelector('.search-txt').addEventListener('keyup', function (event){
        if (event.key == "Enter" ){
            const cityName = document.querySelector('.search-txt').value;
            let weatherData = localStorage.getItem( cityName ); 
            weatherData = JSON.parse( weatherData);
            
            if ( weatherData == null )
            {
                console.log(cityName);
                execute_server_php( cityName );            
            }
            else
            {
                display_data_in_DOM( weatherData );
            }
        }
    })


    //Executes the server.php file 
    function execute_server_php ( cityName ) {  
        const xhr = new XMLHttpRequest();
        
        // sets up the parameters for xhr.open method 
        xhr.open( 'GET', 'server.php?cityName=' + encodeURIComponent( cityName ), true );
        
        //executes when the request is on progress
        xhr.onprogress = () => {
            console.log("Requrest On progress");
        }

        // function that executes everytime the request state changes 
        xhr.onreadystatechange = function() {

        //Checks if the request is completed/done or not
        if ( xhr.readyState === 4 ) {

            // checks if the request is successsful or not
            if ( xhr.status === 200 ) 
            {
                const response = JSON.parse( xhr.responseText );
                console.log(response); // Output the PHP response

                //calls the function to display the fetched data
                display_data_in_DOM( response );
            } 
            else 
            {
                console.error('Error: ' + xhr.status);
            }
        }
        };

        //executes the xhr.open method
        xhr.send();        
    }
    execute_server_php( 'windsor' );


    //displays the fetched data in html domm
    function display_data_in_DOM( weatherData ){
        const cityName = weatherData['cityName'];
        const weatherDescription = `${weatherData['weather_description']}`;
        const temperature = weatherData['temperature'];
        const feels_like = weatherData['feels_like'];
        const pressure = weatherData['pressure'];
        const humidity = weatherData['humidity'];
        const windSpeed = weatherData['windSpeed'];
        const weatherState = `${weatherData['weatherState']}`;
        // const weatherState = `Clear`;


        //Inserting the fetched values to their respective classes in HTML
        document.querySelector(".weather-type").innerHTML =  weatherDescription.toUpperCase();
        document.querySelector(".city-name").innerHTML = cityName;
        document.querySelector(".temperature span").innerHTML = parseInt(temperature);
        document.querySelector(".feels-like span").innerHTML = parseInt(feels_like);
        document.querySelector(".pressure span").innerHTML = parseInt(pressure);
        document.querySelector(".humidity span").innerHTML = parseInt(humidity);
        document.querySelector(".wind span").innerHTML = parseInt(windSpeed);

        //calling function for setting the appropriate icon and background img/
        set_icon_and_background( weatherState );

        //calling fucntion for storing the data in localstorage. 
        store_data_in_localStorage( cityName, weatherData )
    }


    function store_data_in_localStorage ( cityName, weatherData ) {
        console.log("Stored")
        weatherData = JSON.stringify( weatherData );
        localStorage.setItem( cityName, weatherData );
    }


    //sets the backgound IMage and icon depending upon the weather state
    function set_icon_and_background ( weatherState ) {

        const application = document.querySelector(".App"); 

        if ( weatherState == "Clouds" ) //
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-cloud";

                application.style.backgroundImage = "url('https://i.ibb.co/L5CqXbS/Clouds.png')";

            }
            else if ( weatherState == "Haze" || weatherState == "Mist" ) //
            {
                document.querySelector("#weather-icon").className = "fa-sharp fa-solid fa-smog";

                application.style.backgroundImage = "url('https://i.ibb.co/3sf70H5/Haze.png')";

            }
            else if ( weatherState == "Rain" ) //
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-cloud-rain";

                application.style.backgroundImage = "url('https://i.ibb.co/S6q9Xb2/Rain-background.png')";

            }
            else if ( weatherState == "Thunderstorm" )//
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-cloud-bolt";

                application.style.backgroundImage = "url('https://i.ibb.co/S6q9Xb2/Rain-background.png')";

            }
            else if ( weatherState == "Snow" )//
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-snowflake";

                application.style.backgroundImage = "url('https://i.ibb.co/THTGTvf/Snow.png')";

            }
            else if ( weatherState == "Clear" )
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-sun";

                application.style.backgroundImage = "url('https://i.ibb.co/5W9DYnG/clear-sky.png')";

            }
            else if ( weatherState == "Drizzle" )
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-cloud-sun-rain";

                application.style.backgroundImage = "url('https://i.ibb.co/S6q9Xb2/Rain-background.png')";

            }
    }

    // function getGeographicalLocationAPI( cityName = 'Windsor' ){
    //     fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=9964006f86896128a73526b1d2b01786`)
    //     .then(response => response.json())
    //     .then(geoData => {

    //         let latitude = geoData[0]['lat'];
    //         let longitude = geoData[0]['lon'];

    //         weatherAPI( latitude, longitude, cityName );

    //     })
    //     .catch(err => alert("Wrong city name."))
    // }
    // getGeographicalLocationAPI();
    // //Calling API to get latitude and longiude of a particular city 

    // function weatherAPI(latitude, longitude, cityName){
    //     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9964006f86896128a73526b1d2b01786`)
    //     .then(response => response.json())
    //     .then(weatherData => {
            
    //         const weatherDescription = `${weatherData['weather'][0]['description']}`;
    //         const temperature = (weatherData['main']['temp'])-273.15;
    //         const feels_like = (weatherData['main']['feels_like'])-273.15;
    //         const pressure = weatherData['main']['pressure'];
    //         const humidity = weatherData['main']['humidity'];
    //         const windSpeed = weatherData['wind']['speed'];
    //         const weatherState = `${weatherData['weather'][0]['main']}`;
    //         // const weatherState = `Rain`;


    //         //Inserting the fetched values to their respective classes in HTML
    //         document.querySelector(".weather-type").innerHTML = weatherDescription.toUpperCase();
    //         document.querySelector(".city-name").innerHTML = cityName;
    //         document.querySelector(".temperature span").innerHTML = parseInt(temperature);
    //         document.querySelector(".feels-like span").innerHTML = parseInt(feels_like);
    //         document.querySelector(".pressure span").innerHTML = parseInt(pressure);
    //         document.querySelector(".humidity span").innerHTML = parseInt(humidity);
    //         document.querySelector(".wind span").innerHTML = parseInt(windSpeed);
    //         const application = document.querySelector(".App"); 
            
    //         if ( weatherState == "Clouds" ) //
    //         {
    //             document.querySelector("#weather-icon").className = "fa-solid fa-cloud";

    //             application.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AMWts8D58eZU9Jqc1OrZaK9j8O3mka1-cZ9woa_NQstH9MR4pARLgJsoS1g1aykfyfyuT-fPBJjFAk1S53Y3rLn10t4KS0rYdKD57rP0IAz0Og0RDg4-eihVJmVSNIe3-fMTW9IHAdjSviOihqXoA2mZsTmQ=w340-h560-no?authuser=0')";

    //         }
    //         else if ( weatherState == "Haze" || weatherState == "Mist" ) //
    //         {
    //             document.querySelector("#weather-icon").className = "fa-sharp fa-solid fa-smog";

    //             application.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AMWts8AUJlWd06ImEYiZRk_NEt6Y0kthFaz4h3DB1IyfIAsU67NwaZ1M0-Yp-oriaKeVXfMHxjuUYIzpClWNrpL-3xgWnttbwc19SXbSK3N2Xl4Q9dwMVXAZtVNUxWeuFOGjRNibDM-iia_r_vh1aXaQ53YZ=w340-h560-no?authuser=0')";

    //         }
    //         else if ( weatherState == "Rain" ) //
    //         {
    //             document.querySelector("#weather-icon").className = "fa-solid fa-cloud-rain";

    //             application.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AMWts8CdTs7--C3riVeB7aClk_3MSsxy1Sue_uBjO8wmR1pCAy-SDA3NQB2CEU3gEzNFX_72ChnEL44PnCKqTRYUYYs49BfAamQNT0xsT4JpiAWKHsT_4VKxc1af1RSvsIIdbSpPWuCa7rVjzF4ZH-2X1n74=w340-h560-no?authuser=0')";

    //         }
    //         else if ( weatherState == "Thunderstorm" )//
    //         {
    //             document.querySelector("#weather-icon").className = "fa-solid fa-cloud-bolt";

    //             application.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AMWts8CTa8sC4_4Yfrzkhpk4N7zcq2y1MqnbioI2F4Ib03UqT8E26bDe8cN6J7b1u_M-ViqbMBf1hHMcTGutb7u1KUM8Jnr4mvMrAbyx8t0x7gsvGSzXuVUK5V14p_3k5ucCbKshdkCGKDaTaBXdjDBjndQg=w340-h560-no?authuser=0')";

    //         }
    //         else if ( weatherState == "Snow" )//
    //         {
    //             document.querySelector("#weather-icon").className = "fa-solid fa-snowflake";

    //             application.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AMWts8BElXWRlKjRczIf2iDxyNS3pdBHLLynFuXBXizjU1-AZK4dlHDz5w0GXCQ0K_nCl6AOu4SpGCr2dNDNEHBWCHjkY5A5IvXlFG_yPgUIglbbz2K4gjbvvkgJkr8UUi0M36EkVgV89VNTAd3e2A21HRHq=w340-h560-no?authuser=0')";

    //         }
    //         else if ( weatherState == "Clear" )
    //         {
    //             document.querySelector("#weather-icon").className = "fa-solid fa-sun";

    //             application.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AMWts8CPwZ2vPr2dTNBce0FzxVvVOZAJBck_gnkhDRIg0m5kPLiNZ_S-8N8sv5gNXw2gtUt9aYvlVcxBImQZZ1o3PuqY50_3lb4nZgNHGjmkXJqBfSSkvvxt3FJWfOvY7xIn9l8_00eE7yofi9cRFExTq8M1=w340-h540-no?authuser=0')";

    //         }
    //         else if ( weatherState == "Drizzle" )
    //         {
    //             document.querySelector("#weather-icon").className = "fa-solid fa-cloud-sun-rain";

    //             application.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AMWts8CdTs7--C3riVeB7aClk_3MSsxy1Sue_uBjO8wmR1pCAy-SDA3NQB2CEU3gEzNFX_72ChnEL44PnCKqTRYUYYs49BfAamQNT0xsT4JpiAWKHsT_4VKxc1af1RSvsIIdbSpPWuCa7rVjzF4ZH-2X1n74=w340-h560-no?authuser=0')";

    //         }


    //         (function weatherDesc(){
    //             console.log("Weather Description::");
    //             console.log(weatherDescription);
    //             console.log(temperature);
    //             console.log(feels_like);
    //             console.log(pressure);
    //             console.log(humidity);
    //             console.log(windSpeed);
    //             console.log(cityName);
    //             console.log('latitude: '+ weatherData['coord']['lat']);
    //             console.log('longitude '+ weatherData['coord']['lon']);
    //             console.log("state "+weatherState);
    //         })();
            
    //     })
    //     .catch(err => alert("Wrong name."))
    // }
})  
        

