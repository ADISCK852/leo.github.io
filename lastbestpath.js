    var map;
    var directionsService;
    var directionsRenderer;

     function calculateRoute() {
      origin = document.getElementById('origin').value;
      destination = document.getElementById('destination').value;
  
      var request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.TRANSIT
      };
  
      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        }
      });
    }