function initMap() {
  const map = new BbqsMap("map");

  map.initMap();

  map.mirrorPosition(
    document.getElementById("latitude"),
    document.getElementById("longitude")
  );

  new BbqsApi().getBbq($('#id').val())
    .then(bbq => {
      console.log(bbq.data)
      map.addBbq(bbq.data);
    });
}