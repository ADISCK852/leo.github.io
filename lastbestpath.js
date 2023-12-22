     function calculateRoute() {
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
      
      directionsService.route(request, function(result, status) {
        const stationList = document.getElementById('stationList')
        const fare = document.getElementById('fare')
        const distance = document.getElementById('distance')
        if (status == 'OK') {
          // 檢查是否有公車路線
          let start_address = result.routes[0].legs[0].start_address
          let end_address = result.routes[0].legs[0].end_address
          let hasBusRoute = result.routes.some(function(route) {
            return route.legs.some(function(leg) {
              return leg.steps.some(function(step) {
                return step.travel_mode === 'TRANSIT';
              });
            });
          });
        if ((start_address.match('彰化') && end_address.match('彰化'))  == null){
          alert('尚未開始服務')
          stationList.innerHTML=''
          distance.style.display = 'none'
          fare.style.display = 'none'
          
        }
        else{
          if (hasBusRoute) {
            // 顯示原始公車路線
            directionsRenderer.setDirections(result);
            fare.style.display = 'block'
            distance.style.display = 'block'
          } else {
            // 如果沒有公車路線，將路線模式更改為開車
            // request.travelMode = 'DRIVING';
            fare.style.display = 'none'
            stationList.style.display = 'none'
            alert("此路線目前未提供服務")
            
            
            directionsService.route(request, function(result, status) {
              if (status == 'OK') {
                //如無路線會以走路提示
                // directionsRenderer.setDirections(result);
              }
            });
          }
        }
      }
      let requestance = {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING', // 使用TRANSIT模式以顯示公車站
        transitOptions: {
            departureTime: new Date(pastDepartureTimeInSeconds * 1000 ),
          },
        }
        directionsService.route(requestance, function(result, status) {
          if (status == 'OK') {
          console.log(result)
          let duration = result.routes[0].legs[0].duration.value
          const durational = Math.floor(duration/60)+3
          console.log(duration)
          document.getElementById('duration').innerHTML = '預計到達時間：'+durational + '分鐘'
          }
        })
    })}