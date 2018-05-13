let map;
let pointer = { //icon downloaded from: https://commons.wikimedia.org/wiki/File:Quake_pointer.svg
    path: 'm15,.7a14.3,14.3 0 1,0 .1,0zm0,2a12.3,12.3 0 1,1-.1,0zm0,8.7a3.6,3.6 0 1,0 .1,0z',
    fillColor: '#900',
    fillOpacity: 1,
    scale: 1
};
let tableSummary = document.getElementById('tableSummary');

function convertSec(sec) {
    let date = new Date(sec * 1000);
    return date.toLocaleTimeString();
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,  
        center: {
            lat: 52.2126261,
            lng: 20.9763674
        },
        mapTypeId: 'terrain'
    });


   
      fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
        .then(resp => resp.json())
        .then(resp => {
            for (let i = 0; i < resp.features.length; i++) {
                let coords = resp.features[i].geometry.coordinates;
                let latLng = new google.maps.LatLng(coords[1], coords[0])
                let magnitude = resp.features[i].properties.mag;
                let place = resp.features[i].properties.place;
                let time = resp.features[i].properties.time;

                let element = document.createElement('tr');
                    element.innerHTML = '<td>'+place+'</td>' + '<td>' + convertSec(time)+'</td>' + '<td>' + magnitude + '</td>';
                    element.addEventListener("click", function() {
                        map.setCenter({
                            lat: coords[1],
                            lng: coords[0]
                        })
                    });
                    tableSummary.appendChild(element);


                resp.features.forEach(feature => {
                    
                    let marker = new google.maps.Marker({
                        position: latLng,
                        map: map, 
                        icon: pointer                       
                    
                      });
                                       
                });

            }

        })
}


