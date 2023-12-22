
function initializeMap(){
    // 獲取用戶輸入的起始位址和目的地位址
    let origin = document.getElementById('origin').value;
    let destination = document.getElementById('destination').value;
    //固定時間，須改數值
    const pastDepartureTimeInSeconds = Math.floor(new Date(2024, 2, 24, 14, 0, 0).getTime() / 1000);
    // 路徑請求
    let request = {
        origin: origin,
        destination: destination,
        travelMode: 'TRANSIT', // 使用TRANSIT模式以顯示公車站
        transitOptions: {
            modes: [google.maps.TransitMode.BUS],
            routingPreference: 'FEWER_TRANSFERS',
            departureTime: new Date(pastDepartureTimeInSeconds * 1000 ),
          },
    };
    const duration = document.getElementById('duration')
    const fare = document.getElementById('fare')
    const stationList = document.getElementById('stationList')
    directionsService.route(request, function (response, status) {
        if (status === 'OK') {
            var route = response.routes[0];
            showTransitStations(route);
            stationList.style.display = 'block'
            duration.style.display = 'block'
        }
        else {
            stationList.style.display = 'none' 
            fare.style.display = 'none'
            duration.style.display = 'none'
            alert("請重新選擇路線")
        }
    });
}

// 列出公車站
function showTransitStations(route) {
    let transitStations = [];
    for (var i = 0; i < route.legs.length; i++) {
        let leg = route.legs[i];
        for (var j = 0; j < leg.steps.length; j++) {
            let step = leg.steps[j];
            if (step.travel_mode === 'TRANSIT' && step.transit) {
                var stationName = step.transit.arrival_stop.name;
                transitStations.push(stationName);
            }
        }
    }
    if (transitStations.length == 0){
        stationList=''
    }
    else{
        // 在HTML中顯示公車站名稱清單
        let stationList = document.getElementById('stationList');
        stationList.innerHTML = "<h3>經過的公車站別</h3><ul>";
        transitStations.forEach(function (station) {
            stationList.innerHTML += "<li>" + station + "</li>";
        });
        stationList.innerHTML += "</ul>";
    }
}


