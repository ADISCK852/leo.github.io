function initMap() {
    center = { lat: 25.0329694, lng: 121.5654177 };

    var map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 11.3  // 控制地圖的縮放級別
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
    // 在地圖上放置標記
    marker = new google.maps.Marker({
        position: center,
        map: map,
        title: 'Hello World!'  // 標記的標題
    });

    //新增標記點
      for (var i = 0; i < points.length; i++) {
        var marker = new google.maps.Marker({
          position: points[i],
          map: map,
          title: 'Marker ' + (i + 1)
        });
    }
  }