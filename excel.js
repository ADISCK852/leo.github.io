function calculateDistance() {
    let origin = document.getElementById('origin').value;
    let destination = document.getElementById('destination').value;

    let directionsService = new google.maps.DirectionsService();

    let request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.TRANSIT,
      transitOptions: {
        modes: [google.maps.TransitMode.BUS],
        routingPreference: 'FEWER_TRANSFERS',
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
        let countwalkdistance = countwalk/1000
        console.log(countwalkdistance)
        let distance = result.routes[0].legs[0].distance.text;
        document.getElementById('distance').innerHTML = '路線距離：' + distance;
      //計算票價
        let distancedata = parseFloat(distance)
        let total = distancedata-countwalkdistance
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

  