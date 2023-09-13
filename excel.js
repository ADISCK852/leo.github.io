function calculateDistance() {
    var origin = document.getElementById('origin').value;
    var destination = document.getElementById('destination').value;

    var directionsService = new google.maps.DirectionsService();

    var request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.TRANSIT
    };

    directionsService.route(request, function (result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        var distance = result.routes[0].legs[0].distance.text;
        document.getElementById('distance').innerHTML = '路線距離：' + distance;
      }
    });
  }