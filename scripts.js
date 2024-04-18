document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([47.5581077, 7.5878261], 13);
    var userLocationMarker; // Variable für den Standortmarker
    var searchmarker; // Variable für den Suchmarker
    var baseLayers = {
        "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }),
        "OpenTopoMap": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17
        })
    };

    // Hinzufügen der Basiskarten zum Layer-Kontrollschalter
    L.control.layers(baseLayers).addTo(map);

    // Standard-Basiskarte hinzufügen
    baseLayers.OpenStreetMap.addTo(map);

    var marker;

    document.getElementById('searchButton').addEventListener('click', function() {
        searchLocation();
    });

    function searchLocation() {
        var query = document.getElementById('search').value;

        fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + query)
        .then(response => response.json())
        .then(data => {
            if(data && data.length > 0) {
                var lat = data[0].lat;
                var lon = data[0].lon;

                if(searchmarker) {
                    map.removeLayer(searchmarker);
                }

                searchmarker = L.marker([lat, lon]).addTo(map);
                searchmarker.bindPopup("Coordinates: " + lat + ", " + lon).openPopup();
                map.setView([lat, lon], 13);
            } else {
                alert('Location not found');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Geolocation-Funktion
    document.getElementById('locateButton').addEventListener('click', function() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                if (userLocationMarker) {
                    map.removeLayer(userLocationMarker);
                }

                userLocationMarker = L.marker([latitude, longitude]).addTo(map);
                userLocationMarker.bindPopup("Your Location: " + latitude.toFixed(5) + ", " + longitude.toFixed(5)).openPopup();

                map.setView([latitude, longitude], 13);
            }, function(error) {
                console.error("Error getting geolocation:", error);
                alert("Error getting geolocation: " + error.message);
            });
        } else {
            console.error("Geolocation is not supported by this browser");
            alert("Geolocation is not supported by this browser");
        }
    });

    // Eventlistener für Klicks auf die Karte hinzufügen
    map.on('click', function(e) {
        var lat = e.latlng.lat.toFixed(5);
        var lon = e.latlng.lng.toFixed(5);

        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        marker.bindPopup("Coordinates: " + lat + ", " + lon).openPopup();

        // Eventlistener für das Schließen des Popups hinzufügen
        marker.on('popupclose', function() {
            map.removeLayer(marker);
        });

        // Eventlistener für Klicks auf den Marker hinzufügen, um ihn zu entfernen
        marker.on('click', function() {
            map.removeLayer(marker);
        });
    });

    map.on('popupclose', function() {
        if (userLocationMarker) {
            map.removeLayer(userLocationMarker);
        }
    });

    map.on('popupclose', function() {
        if (searchmarker) {
            map.removeLayer(searchmarker);
        }
    });
});



