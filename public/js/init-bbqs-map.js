function initMap() {
  const map = new BbqsMap("map");

  map.initMap();

  map.mirrorPosition(
    document.getElementById("latitude"),
    document.getElementById("longitude")
  );

  new BbqsApi().getBbqs()
    .then(data => {
      data.data.forEach(function(bbq) {
        map.addBbq(bbq);
      });
    });
}