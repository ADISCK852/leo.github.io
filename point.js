let startMarker;
let endMarker;
let geocode;
let currentPistion;
let markerIcon;
let infowindow;
let mapstyle = [
  {
    "elementType": "labels.text",
    "stylers": [
      {
        "color": "#878787"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#656565"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "landscape",
    "stylers": [
      {
        "color": "#f9f5ed"
      }
    ]
  },
  {
    "featureType": "landscape.natural.landcover",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#d4f6e1"
      }
    ]
  },
  {
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#62d4a2"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#8ad0fa"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
      {
        "color": "#aee0f4"
      }
    ]
  }
]
function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 23.953919515364724, lng: 120.49666396116729 },
      zoom: 11.3,  // 控制地圖的縮放級別
      styles:mapstyle
  });
  navigator.geolocation.getCurrentPosition(function(position) {
    currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    map.setCenter(currentPosition)
    map.setZoom(15);
    var markerIcon = {
      path: google.maps.SymbolPath.CIRCLE, // 使用圓形符號
      fillColor: '#004cff', // 填充顏色，這裡是藍色
      fillOpacity: 3, // 填充不透明度
      strokeColor: 'black', // 邊框顏色
      strokeWeight: 3, // 邊框寬度
      scale: 7 // 圓形的尺寸
    };
    currentMarker = new google.maps.Marker({
      position: currentPosition,
      map: map,
      title: '您的當前位置',
      icon: markerIcon
    });
        
      // 在標點上添加文字視窗
      infowindow = new google.maps.InfoWindow({
        content: '這是您的當前位置',
      });
      // 監聽標點的 mouseover 事件
      google.maps.event.addListener(currentMarker, 'mouseover', function() {
        infowindow.open(map, currentMarker);
      });
      // 監聽標點的 mouseout 事件
      google.maps.event.addListener(currentMarker, 'mouseout', function() {
        infowindow.close();
      });
  });
  const locationButton = document.getElementById("button_position");
  map.addListener("drag", ()=>{
    locationButton.style.display = "block"
  })
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos)
          map.setZoom(15);
          locationButton.style.display = "none"
        },
      );
    }
  });
//初始化
directionsService = new google.maps.DirectionsService();
directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
    // 創建一個地理編碼器
    geocoder = new google.maps.Geocoder();
    // 監聽地圖的點擊事件
    map.addListener('click', function(event) {
      if (!startMarker) {
        // 用戶選擇起始點
        startMarker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        title: '起始點'
    });

    // 執行逆地理編碼以獲取位址
      geocodeLatLng(event.latLng, 'origin');
        } else if (!endMarker) {
          // 用户选择目的地
          endMarker = new google.maps.Marker({
          position: event.latLng,
          map: map,
          title: '目的地'
      });
    // 執行逆地理編碼以獲取位址
      geocodeLatLng(event.latLng, 'destination');
        } else {
          // 如果已經選擇了起始點和目的地，清除它們並重新選擇
          startMarker.setMap(null);
          endMarker.setMap(null);
          startMarker = null;
          endMarker = null;
          document.getElementById('origin').value = '';
          document.getElementById('destination').value = '';
    }
  });
  $(function () {
    $(".button").click((e)=> {
      e.preventDefault();
      $(".dropdownList").slideToggle(500);
      $(".fa-chevron-down").toggleClass("active");
    });
  });
}

function geocodeLatLng(latlng, elementId) {
  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === "OK" && results[0]) {
      const address = results[0].formatted_address;
      document.getElementById(elementId).value = address;
    } else {
        console.log("無法取得地址");
    }
  });
}

