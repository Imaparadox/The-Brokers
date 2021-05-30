//API Key for TwelveData: 86e36b55bf3249baa6a35b1ae39ede69

//API Key for Polygon.io: 6GrCrAyGOSpscsyzmo4hVcfw6OJse4D1

var stockInputEl = document.querySelector("#stock");
var modalEl1 = document.querySelector("#modal1");
var modalEl2 = document.querySelector("#modal2");
var userFormEl = document.querySelector("#user-form");
var stockname;
modalEl1.style.display = "none";
modalEl2.style.display = "none";

$(document).ready(function () {

    // when page first loads all stored user inputs display as buttons

    keys = Object.keys(localStorage);
    for (i = 0; i < keys.length; i++) {
        // append stock ticker to buttons
        $('#stock-container').append('<button type="submit" id="' + keys[i] + '" value="' + keys[i] + '" class="btn btn-stored" >' + keys[i] + '</button>');
    };

    // button click for stored stock tickers
    $('.btn-stored').click(function () {
        // find stock ticker 
        var stockname = $(this).attr('value');

        getStockInfo(stockname);

    });

    // grab id value and push that to stockname


    $('#stock-input').click(function () {

        keys = Object.keys(localStorage);

        // get value from input search
        stockname = $('#stock').val().toUpperCase();
        console.log(stockname);

        // do not store null values
        if (!stockname) {
            modal1.style.display = "block";
            return false
        };

        //create button for unique searched stock
        var checkKeys = jQuery.inArray(stockname, keys);

        // unique value < 0 , repeat value > 0
        if (checkKeys < 0) {

            //local storage 
            localStorage.setItem(stockname, "");

            $('#stock-container').append('<button type="submit" id="' + stockname + '" value="' + stockname + '" class="btn btn-stored" >' + stockname + '</button>');
        };

        getStockInfo(stockname);

        return false
    });

});

var getStockInfo = function () {

    // stcok api function fetch
    var apiKey = "28c7003db6dc4105bd96e1de1fe13c21";
    var apiUrl = "https://api.twelvedata.com/time_series?symbol=" + stockname + "&interval=1h&apikey=" + apiKey;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                
                // Display Stock Symbol in Title
                var stockTitleEl = document.createElement("h3");
                var sym = document.createElement("span");
                sym.textContent = "Stock:  " + data.meta.symbol+ "           ";
                stockTitleEl.appendChild(sym);            

                // Display Currency type in Title
                curr = document.createElement("span");
                curr.textContent = "Currency:  " + data.meta.currency;
                stockTitleEl.appendChild(curr);

                // Append Title into Stock Info Div
                var displayStock = document.querySelector("#stock-info");
                displayStock.appendChild(stockTitleEl);
               
                var stockInfoEl = document.createElement("div");

                // Loop over the last 10 hours for stock info
                for (var i = 0; i < 10; i++) {

                    stockInfoEl.classList = "list-item justify-space-between center-align card-panel hoverable";

                    // display date and time for stock info
                    var dateTimeEl = document.createElement("span");
                    dateTimeEl.textContent = data.values[i].datetime + "                ";
                    stockInfoEl.appendChild(dateTimeEl);

                    //display Open Price of Stock for time block
                    var openEl = document.createElement("span");
                    openEl.textContent = "Open Price:  " + data.values[i].open + "               ";
                    stockInfoEl.appendChild(openEl);

                    //display Close Price of Stock for time block
                    var closeEl = document.createElement("span");
                    closeEl.textContent = "Close Price:  " + data.values[i].close;
                    stockInfoEl.appendChild(closeEl);

                    // append all the stock info into the display stock div 
                    displayStock.appendChild(stockInfoEl);
                }       
                });
        } else {
            modal2.style.display = "block";
        }
        getNews();
    })

}

// variable that will grab today's date to display recent news articles
var todayDate = new Date().toJSON().slice(0, 10);
console.log(todayDate);

// API FETCH REQUEST FOR NEWS ARTICLES RELATED TO USER STOCK
function getNews() {
    var apiPoly = "6GrCrAyGOSpscsyzmo4hVcfw6OJse4D1";
    fetch(
        'https://api.polygon.io/v2/reference/news?limit=10&order=descending&sort=published_utc&ticker=' + stockname + '&published_utc.lte=' + todayDate + '&apiKey=' + apiPoly
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //VERIFY STOCKNAME IS GRABBED
            console.log(stockname);

            // DISPLAY 4 NEW ARTICLES
            for (var i = 0; i < 5; i++) {
                var displayNews = document.querySelector(".news-container-" + i);


                // Title of Article
                var pub = data.results[i].title;
                var authName = document.createElement("h5");
                authName.classList.add("card-title");
                // article title text color
                $(".card-title").css("color", "#424242")
                authName.innerHTML = pub;

                // Article description
                var descrip = data.results[i].description;
                var descripDetail = document.createElement("p");
                var length = 125;
                var trimmedString = descrip.substring(0, length);
                descripDetail.innerHTML = trimmedString;
                descripDetail.classList.add("card-content");
                // article descriotion text color
                $(".card-content").css("color", "#212121");

                //Article Image
                var forImg = data.results[i].image_url;
                var forImgEl = document.createElement("img");
                forImgEl.setAttribute("src", forImg);
                forImgEl.setAttribute("width", "350");
                forImgEl.setAttribute("height", "200");
                //create div to hold image for card styling
                var testImg = document.createElement("div");
                testImg.classList.add("card-image");
                testImg.appendChild(forImgEl);

                //Onclick of article, open article on seperate tab
                var artc = data.results[i].article_url;
                var artcLink = document.createElement("a");
                artcLink.setAttribute("href", artc);
                artcLink.setAttribute("target", "_blank");

                // wrap <a href> around <h3> <p> and <img> tags
                artcLink.appendChild(authName);
                artcLink.appendChild(testImg);
                artcLink.appendChild(descripDetail);

                // append each variable
                displayNews.appendChild(artcLink);
            }
        })
};
