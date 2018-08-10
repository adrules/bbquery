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
    let newBbq = new google.maps.Circle({
      strokeColor: '#343a40',
      strokeOpacity: 0.8,
      strokeWeight: 1.5,
      fillColor: '#343a40',
      fillOpacity: 0.35,
      map: this.map,
      center: {
        lat: bbq.lat,
        lng: bbq.lng
      },
      radius: 2000
    });

    newBbq.addListener('click', function() {
      window.location.replace(`/bbqs/${bbq.bbqId}`);
    });

    this.bbqs.push(newBbq);
  }

  addBbqPoint(bbq) {
    let newBbq = new google.maps.Marker({
      map: this.map,
      position: {
        lat: bbq.lat,
        lng: bbq.lng
      }
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
