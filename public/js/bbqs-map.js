const CENTER = {
  lat: 40.416821,
  lng: -3.703500
}

const ZOOM = 12;

class BbqsMap {

  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.bbqs = [];
  }

  initMap() {
    const mapOptions = {
      center: CENTER,
      zoom: ZOOM
    }

    const containerDOMElement = document.getElementById(this.containerId);

    this.map = new google.maps.Map(containerDOMElement, mapOptions);
  }

  addBbq(bbq) {
    let newBbq = new google.maps.Marker({
      position: {
        lat: bbq.location.coordinates[0],
        lng: bbq.location.coordinates[1]
      },
      map: this.map
    });

    this.map.setCenter({
        lat: bbq.location.coordinates[0],
        lng: bbq.location.coordinates[1]
      })

    this.bbqs.push(newBbq);
  }

  mirrorPosition(latElem, lngElem) {
    this.map.addListener('click', function(e) {
      latElem.value = e.latLng.lat().toFixed(4);
      lngElem.value = e.latLng.lng().toFixed(4);
    });
  }
}
