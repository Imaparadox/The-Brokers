//API Key for TwelveData: 86e36b55bf3249baa6a35b1ae39ede69

//API Key for Polygon.io: 6GrCrAyGOSpscsyzmo4hVcfw6OJse4D1

var stockInputEl = document.querySelector("#stock");
var modalEl1 = document.querySelector("#modal1");
var modalEl2 = document.querySelector("#modal2");
var userFormEl = document.querySelector("#user-form");
var stockname;
modalEl1.style.display = "none";
modalEl2.style.display = "none";

var searchStock = function (event) {
    event.preventDefault();

    // get value from input search
    stockname = stockInputEl.value.trim();

    if (stockname) {
        getStockInfo(stockname);
        stockInputEl.value = "";
    } else {
        modal1.style.display = "block";
    }
    console.log(event);
}

var getStockInfo = function (userStock) {

    // stcok api function fetch
    var apiKey = "28c7003db6dc4105bd96e1de1fe13c21";
    var apiUrl = "https://api.twelvedata.com/time_series?symbol=" + userStock + ",MSFT,EUR/USD,SBUX,NKE&interval=1min&apikey=" + apiKey;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
            });
        } else {
            modal2.style.display = "block";
        }
        getNews();
    })
    console.log(stockname);
}

// Click event listener
userFormEl.addEventListener("submit", searchStock);


// variable that will grab today's date to display recent news articles
var todayDate = new Date().toJSON().slice(0, 10);
console.log(todayDate);

// API FETCH REQUEST FOR NEWS ARTICLES RELATED TO USER STOCK
function getNews() {
    var apiPoly = "6GrCrAyGOSpscsyzmo4hVcfw6OJse4D1";
    fetch(
        'https://api.polygon.io/v2/reference/news?limit=10&order=descending&sort=published_utc&ticker=' + stockname + '&published_utc.gte=' + todayDate + '&apiKey=' + apiPoly
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //VERIFY STOCKNAME IS GRABBED
            console.log(stockname);

            // DISPLAY 4 NEW ARTICLES
            for (var i = 0; i < 4; i++) {
                var displayNews = document.querySelector(".news-container-" + i);


                // Author of Article
                var pub = data.results[i].author;
                var authorName = document.createElement("h4");
                authorName.innerHTML = pub;

                // Article description
                var descrip = data.results[i].description;
                var descripDetail = document.createElement("p");
                var length = 150;
                var trimmedString = descrip.substring(0, length);
                descripDetail.innerHTML = trimmedString;

                //Article Image
                var forImg = data.results[i].image_url;
                var forImgEl = document.createElement("img");
                forImgEl.setAttribute("src", forImg);
                forImgEl.setAttribute("width", "304");
                forImgEl.setAttribute("height", "228");

                //Onclick of article, open article on seperate tab
                var artc = data.results[i].article_url;
                var artcLink = document.createElement("a");
                artcLink.setAttribute("href", artc);
                artcLink.setAttribute("target", "_blank");

                // wrap <a href> around <h3> <p> and <img> tags
                artcLink.appendChild(authorName);
                artcLink.appendChild(descripDetail);
                artcLink.appendChild(forImgEl);

                // append each variable
                displayNews.appendChild(artcLink);
            }
        })
}
