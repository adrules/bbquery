function initMap() {
  const map = new BbqsMap("map");

  map.initMap();

  map.mirrorPosition(
    document.getElementById("latitude"),
    document.getElementById("longitude")
  );

  new BbqsApi().getBbq($('#id').val())
    .then(bbq => {
      !!$('#confirmed').length || !!$('#cancel').length ? map.addBbqPoint(bbq.data) : map.addBbq(bbq.data);
    });
}