const CENTER = {
  lat: 40.416821,
  lng: -3.703500
}

const ZOOM = 10;

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
        lat: bbq.lat,
        lng: bbq.lng
      },
      map: this.map
    });

    this.bbqs.push(newBbq);
  }

  mirrorPosition(latElem, lngElem) {
    this.map.addListener('click', function(e) {
      latElem.value = e.latLng.lat().toFixed(4);
      lngElem.value = e.latLng.lng().toFixed(4);
    });
  }
}
