var autocomplete;

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'),{types: ['geocode']});
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    let place = autocomplete.getPlace();
    document.getElementById('latitude').value = place.geometry.location.lat();
    document.getElementById('longitude').value = place.geometry.location.lng();
  });
}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
