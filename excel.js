function calculateDistance() {
    let origin = document.getElementById('origin').value;
    let destination = document.getElementById('destination').value;

    let directionsService = new google.maps.DirectionsService();
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

    directionsService.route(request, function (result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log(status)
        let countwalk=0
        let legs = result.routes[0].legs;
        for (let i = 0; i < legs.length; i++) {
            let steps = legs[i].steps;
            for (let j = 0; j < steps.length; j++) {
                if (steps[j].travel_mode === 'WALKING') {
                    console.log('步行距离：' + steps[j].distance.value);
                    countwalk=countwalk+parseFloat(steps[j].distance.value)
                }
            }
        }
        //步行距離換算成公里數
        let countwalkdistance = countwalk/1000
        //抓取距離的元素
        let distance = result.routes[0].legs[0].distance.text;
      //計算票價
        let distancedata = parseFloat(distance)
        console.log(distancedata)
        let total = distancedata-countwalkdistance
        document.getElementById('total').innerHTML = '行駛距離' + (Math.round(total*10.0)/10.0) +'公里'
        let dataA;
        if (distance.match('公尺') == null) {
          console.log('公里')
          if (distancedata > 1){
          dataA = Math.round(((total-1)*10)+30)
          }
          else {
          dataA = 30
          }
        } else {
          console.log('公尺')
          dataA = 30
        }
        document.getElementById('fare').innerHTML = '票價' + dataA+'元';
        console.log(dataA)
      }
    });
 
  }

  