// test code 
var stockInputEl = document.querySelector("#stock");
var modalEl1 = document.querySelector("#modal1");
var modalEl2 = document.querySelector("#modal2");
var userFormEl = document.querySelector("#user-form");
modalEl1.style.display = "none";
modalEl2.style.display = "none";

var searchStock = function (event) {
    event.preventDefault();

    // get value from input search
    var stockname = stockInputEl.value.trim();

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
            response.json().then(function(data) {
                console.log(data)
            });
        } else {
            modal2.style.display = "block";
        }
    })
}

// Click event listener
userFormEl.addEventListener("submit", searchStock);