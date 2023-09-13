function geocodeAddress() {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById('origin').value;

    geocoder.geocode({ address: address }, function (results, status) {
      if (status === 'OK') {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        document.getElementById('latitude').innerHTML = latitude;
        document.getElementById('longitude').innerHTML = longitude;
      }
    });
  }
  function geocodeAddress2() {
    var geocoder2 = new google.maps.Geocoder();
    var address = document.getElementById('destination').value;

    geocoder2.geocode({ address: address }, function (results, status) {
      if (status === 'OK') {
        var latitude2 = results[0].geometry.location.lat();
        var longitude2 = results[0].geometry.location.lng();
        document.getElementById('latitude2').innerHTML = latitude2;
        document.getElementById('longitude2').innerHTML = longitude2;
      }
    });
  }