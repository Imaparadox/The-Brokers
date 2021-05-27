//API Key for TwelveData: 86e36b55bf3249baa6a35b1ae39ede69

//API Key for Polygon.io: 6GrCrAyGOSpscsyzmo4hVcfw6OJse4D1


// API fetch request for getting STOCK information
function getStock (){
    fetch(
        'https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&type=stock&format=JSON&apikey=86e36b55bf3249baa6a35b1ae39ede69'
    )
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
    })
}

getStock();
