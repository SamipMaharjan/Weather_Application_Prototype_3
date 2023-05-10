<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App</title>
    <link rel="stylesheet" href="SamipMaharjan_2329533.css?v=<?php echo time(); ?>">


</head>
<body>

    <div class="App">
        <div class="top-section"> 

            <div class="date">
                <span id="display-date"></span>
            </div>
            <!-- date -->
            
            <div class="search-box">
                <input class="search-txt" type="text" placeholder="Search for a city." name="search-button">
                <a class ="search-btn" href="#">
                    <i class="fas fa-search"></i>
                </a>
            </div>
            <!-- Search bar -->

            <div class="nav-bar">
                <a href="" class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
            <!-- navbar  -->

        </div>
        <!-- top section -->

        <div class="mid-section">

            <div class="icon">
                <i id="weather-icon" class=""></i>
            </div>
            <!-- icon  -->

            <div class="weather-type">
                
                <!-- Displays data fetched from API -->
            </div>
            <!-- weather-type  -->

        </div>
        <!-- mid-section -->

        <div class="bottom-section">
            <div class="city-name">
            </div>
            <!-- city name  -->
            
            <div class="for-flex">
                <div class="temperature-details">
                    <div class="temperature">
                        <h3><span>
                        </span>°C</h3>
                    </div>
                    <!-- temperature  -->

                    <div class="feels-like">
                        <p>Feels like <span>
                        </span>°C </p>
                    </div>
                    <!-- feels like section  -->
                </div>

                <div class="history-button">
                    <a href="#">
                        <i class="fa-solid fa-clock-rotate-left"></i>
                        <span> History</span>
                    </a>
                </div>
                <!-- History Button  -->
            </div>
            <!-- For flex  -->
        </div>  
        <!-- bottom-section  -->    

        <div class="footer-section">
            <div class="pressure props">
                <p>Pressure: <span>
                </span> hPA</p>
            </div>
            <!-- Pressure  -->

            <div class="humidity props">
                <p>Humidity: <span>
                </span>%</p>
            </div>
            <!-- humidity  -->

            <div class="wind props">
                <p>Wind: <span>
                </span>km/h</p>
            </div>
            <!-- wind  -->
        </div>
        <!-- footer section  -->

    </div>
    <!-- App 1 section  -->

    <div class="App2">
        <div class = 'icon2'>
            <a href="#">
                <i class="fa-solid fa-arrow-left"></i>
            </a>
            
            <div class="history-text">
                <span>Weather History</span>
            </div>
            
        </div>

        
        <div id="historyData">
            
        </div>
            
    </div>
    <!-- App 2 section  -->

    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
    <script src="https://kit.fontawesome.com/65ed642159.js" crossorigin="anonymous"></script>
    <script src="SamipMaharjan_2329533.js?v=<?php echo time(); ?>"></script>
</body>
</html>