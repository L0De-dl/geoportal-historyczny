const map = L.map('map', { 
  zoomControl: false, 
  zoomSnap: 0.5,
  preferCanvas: true
}).setView([52.9435, 17.3002], 17.5);
const currentYear = new Date().getFullYear();

const PrintControl = L.Control.extend({
    options: { position: 'topleft' },

    onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        const button = L.DomUtil.create('a', 'print-button', container);
        
        button.innerHTML = '🖨️'; 
        button.title = "Eksport mapy";

        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.on(button, 'click', (e) => {
            L.DomEvent.stop(e);
            exportMap();
        });

        return container;
    }
});
  
  map.setMaxBounds([
    [52.9490239, 17.2852683], // NW
    [52.9381943, 17.3122189]  // SE
  ]);

  map.setMinZoom(map.getBoundsZoom([
    [52.9490239, 17.2852683],
    [52.9381943, 17.3122189]
  ]));

  const kontrolkaTytulu = L.control({ position: "topleft" });
  kontrolkaTytulu.onAdd = function() {
    const div = L.DomUtil.create("div", "tytul-mapy");
    div.innerHTML = `
      <div style="display:flex; align-items:center; gap:12px;">
        <img src="assets/icon/logo.png" alt="Logo" style="height:60px;">
        <span>Geoportal Historyczny Gołańczy</span>
      </div>
    `;
    return div;
  };
  kontrolkaTytulu.addTo(map);

  L.control.zoom({ position: "topleft" }).addTo(map);

  L.control.locate({ position: "topleft" }).addTo(map);

  new PrintControl().addTo(map);

  L.control.scale({ imperial: false, metric: true, position: 'bottomleft' }).addTo(map);

  const kontrolkaWspolrzednych = L.control({ position: 'bottomleft' });

  kontrolkaWspolrzednych.onAdd = function() {
    const div = L.DomUtil.create('div', 'wspolrzedne-myszki');
    div.innerHTML = "X: - | Y: -";
    return div;
  };

  kontrolkaWspolrzednych.addTo(map);

  map.on('mousemove', function(e) {
    const coords = e.latlng;
    const y = coords.lng.toFixed(5);
    const x = coords.lat.toFixed(5);
    
    document.querySelector('.wspolrzedne-myszki').innerHTML = `X: ${x} &nbsp;&nbsp; Y: ${y}`;
  });
  
  const layerOSM = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
  }).addTo(map);

  const layer1890 = L.imageOverlay('assets/map/map-1890.jpg', [[52.9490319, 17.3121943], [52.9381133, 17.2852466]]);
  const layer1911 = L.imageOverlay('assets/map/map-1911.jpg', [[52.9490257, 17.3122210], [52.9381925, 17.2852721]]);
  const layer1934 = L.imageOverlay('assets/map/map-1934.jpg', [[52.9490222, 17.3122162], [52.9382042, 17.2852771]]);
  const layer1940 = L.imageOverlay('assets/map/map-1940.jpg', [[52.9490216, 17.3122245], [52.9381925, 17.2852719]]);
  const layer1941 = L.imageOverlay('assets/map/map-1941.jpg', [[52.9490186, 17.3122318], [52.9381960, 17.2852748]]);
  const layer1966 = L.imageOverlay('assets/map/map-1966.jpg', [[52.9490219, 17.3122117], [52.9381881, 17.2852638]]);
  const layer1981 = L.imageOverlay('assets/map/map-1981.jpg', [[52.9490213, 17.3122149], [52.9381963, 17.2852654]]);
  const layer2002 = L.imageOverlay('assets/map/map-2002.jpg', [[52.9490239, 17.3122189], [52.9381943, 17.2852683]]);
  const layerCurrentYear = L.tileLayer('');

  const layerTable = [
    layer1890, layer1911, layer1934, layer1940, 
    layer1941, layer1966, layer1981, layer2002, layerCurrentYear
  ];
  const layerNames = [
    "Mapa z 1890 roku", "Mapa z 1911 roku", "Mapa z 1934 roku", "Mapa z 1940 roku",
    "Mapa z 1941 roku", "Mapa z 1966 roku", "Mapa z 1981 roku", "Mapa z 2002 roku", `Mapa z ${currentYear} roku`
  ];

  layerCurrentYear.addTo(map);

  document.getElementById('suwak-czasu').addEventListener('input', function(e) {
    const indeks = parseInt(e.target.value);
    layerTable.forEach(p => { if (map.hasLayer(p)) map.removeLayer(p); });
    if (layerTable[indeks]) {
      layerTable[indeks].addTo(map);
    }
    document.getElementById('nazwa-podkladu').textContent = layerNames[indeks];
  });

  const icon01 = L.icon({ iconUrl: 'assets/icon/icon-03.png',  iconSize: [25,25] });
  const icon02 = L.icon({ iconUrl: 'assets/icon/icon-04.png', iconSize: [25,25] });
  const icon03 = L.icon({ iconUrl: 'assets/icon/icon-03.png',  iconSize: [25,25] });
  const icon04 = L.icon({ iconUrl: 'assets/icon/icon-04.png', iconSize: [25,25] });
  const icon05 = L.icon({ iconUrl: 'assets/icon/icon-03.png',  iconSize: [25,25] });
  const icon06 = L.icon({ iconUrl: 'assets/icon/icon-04.png', iconSize: [25,25] });
  const icon07 = L.icon({ iconUrl: 'assets/icon/icon-01.png', iconSize: [25,25] });
  const icon08 = L.icon({ iconUrl: 'assets/icon/icon-02.png', iconSize: [25,25] });
  const icon09 = L.icon({ iconUrl: 'assets/icon/icon-12.png', iconSize: [35,35] });
  const icon10 = L.icon({ iconUrl: 'assets/icon/icon-13.png', iconSize: [35,35] });
  const icon11 = L.icon({ iconUrl: 'assets/icon/icon-14.png', iconSize: [35,35] });
  const icon12 = L.icon({ iconUrl: 'assets/icon/icon-15.png', iconSize: [35,35] });
  const icon13 = L.icon({ iconUrl: 'assets/icon/icon-16.png', iconSize: [35,35] });
  const icon14 = L.icon({ iconUrl: 'assets/icon/icon-17.png', iconSize: [35,35] });

  const markerHistoryScene1_1 = L.marker([52.94373322618029, 17.2995650661561], { icon: icon09 })
    .bindTooltip("Kliknij aby poznać historię", {permanent: false, direction: "top"});
  markerHistoryScene1_1.on('mouseover', () => markerHistoryScene1_1.setIcon(icon10));
  markerHistoryScene1_1.on('mouseout',  () => markerHistoryScene1_1.setIcon(icon09));
  markerHistoryScene1_1.on('click',     () => { updateHistoryDescription(1); });

  const markerHistoryScene1_2 = L.marker([52.943992585492, 17.30037156740903], { icon: icon11 })
    .bindTooltip("Kliknij aby poznać historię", {permanent: false, direction: "top"});
  markerHistoryScene1_2.on('mouseover', () => markerHistoryScene1_2.setIcon(icon12));
  markerHistoryScene1_2.on('mouseout',  () => markerHistoryScene1_2.setIcon(icon11));
  markerHistoryScene1_2.on('click',     () => { updateHistoryDescription(2); });

  const markerHistoryScene1_3 = L.marker([52.94437369260621, 17.29988940604356], { icon: icon13 })
    .bindTooltip("Kliknij aby poznać historię", {permanent: false, direction: "top"});
  markerHistoryScene1_3.on('mouseover', () => markerHistoryScene1_3.setIcon(icon14));
  markerHistoryScene1_3.on('mouseout',  () => markerHistoryScene1_3.setIcon(icon13));
  markerHistoryScene1_3.on('click',     () => { updateHistoryDescription(3); });

  const markerHistoryScene2_1 = L.marker([52.944087258997484, 17.299487108124467], { icon: icon09 })
    .bindTooltip("Kliknij aby poznać historię", {permanent: false, direction: "top"});
  markerHistoryScene2_1.on('mouseover', () => markerHistoryScene2_1.setIcon(icon10));
  markerHistoryScene2_1.on('mouseout',  () => markerHistoryScene2_1.setIcon(icon09));
  markerHistoryScene2_1.on('click',     () => { updateHistoryDescription(1); });

  const markerHistoryScene2_2 = L.marker([52.943985311166436, 17.300828132807435], { icon: icon11 })
    .bindTooltip("Kliknij aby poznać historię", {permanent: false, direction: "top"});
  markerHistoryScene2_2.on('mouseover', () => markerHistoryScene2_2.setIcon(icon12));
  markerHistoryScene2_2.on('mouseout',  () => markerHistoryScene2_2.setIcon(icon11));
  markerHistoryScene2_2.on('click',     () => { updateHistoryDescription(2); });

  const markerHistoryScene2_3 = L.marker([52.943673484010986, 17.300208298925735], { icon: icon13 })
    .bindTooltip("Kliknij aby poznać historię", {permanent: false, direction: "top"});
  markerHistoryScene2_3.on('mouseover', () => markerHistoryScene2_3.setIcon(icon14));
  markerHistoryScene2_3.on('mouseout',  () => markerHistoryScene2_3.setIcon(icon13));
  markerHistoryScene2_3.on('click',     () => { updateHistoryDescription(3); });

  const markerHistoryScene3_1 = L.marker([52.94296450263298, 17.300516747752436], { icon: icon09 })
    .bindTooltip("Kliknij aby poznać historię", {permanent: false, direction: "top"});
  markerHistoryScene3_1.on('mouseover', () => markerHistoryScene3_1.setIcon(icon10));
  markerHistoryScene3_1.on('mouseout',  () => markerHistoryScene3_1.setIcon(icon09));
  markerHistoryScene3_1.on('click',     () => { updateHistoryDescription(1); });

  const markerHistoryScene3_2 = L.marker([52.9425239448951, 17.30096765667786], { icon: icon11 })
    .bindTooltip("Kliknij aby poznać historię", {permanent: false, direction: "top"});
  markerHistoryScene3_2.on('mouseover', () => markerHistoryScene3_2.setIcon(icon12));
  markerHistoryScene3_2.on('mouseout',  () => markerHistoryScene3_2.setIcon(icon11));
  markerHistoryScene3_2.on('click',     () => { updateHistoryDescription(2); });

  const markerHistoryScene3_3 = L.marker([52.943415823912986, 17.301277933672306], { icon: icon13 })
    .bindTooltip("Kliknij aby poznać historię", {permanent: false, direction: "top"});
  markerHistoryScene3_3.on('mouseover', () => markerHistoryScene3_3.setIcon(icon14));
  markerHistoryScene3_3.on('mouseout',  () => markerHistoryScene3_3.setIcon(icon13));
  markerHistoryScene3_3.on('click',     () => { updateHistoryDescription(3); });
  
  const markerNavigation1 = L.marker([52.944121, 17.299766], { icon: icon01 })
    .bindTooltip("Kliknij aby przejść do sceny nr 1", {permanent: false, direction: "top"});
  markerNavigation1.on('mouseover', () => markerNavigation1.setIcon(icon02));
  markerNavigation1.on('mouseout',  () => markerNavigation1.setIcon(icon01));
  markerNavigation1.on('click',     () => { window.location.href = "https://l0de-dl.github.io/scena1"; });

  const markerNavigation2 = L.marker([52.943821912004104, 17.29955368122488], { icon: icon03 })
    .bindTooltip("Kliknij aby przejść do sceny nr 2", {permanent: false, direction: "top"});
  markerNavigation2.on('mouseover', () => markerNavigation2.setIcon(icon04));
  markerNavigation2.on('mouseout',  () => markerNavigation2.setIcon(icon03));
  markerNavigation2.on('click',     () => { window.location.href = "https://l0de-dl.github.io/scena2"; });

  const markerNavigation3 = L.marker([52.942454, 17.300135], { icon: icon05 })
    .bindTooltip("Kliknij aby przejść do sceny nr 3", {permanent: false, direction: "top"});
  markerNavigation3.on('mouseover', () => markerNavigation3.setIcon(icon06));
  markerNavigation3.on('mouseout',  () => markerNavigation3.setIcon(icon05));
  markerNavigation3.on('click',     () => { window.location.href = "https://l0de-dl.github.io/scena3"; });

  const markerFotoScene1_1 = L.marker([52.944493557724094, 17.300672245263762], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene1_1.on('mouseover', () => markerFotoScene1_1.setIcon(icon08));
  markerFotoScene1_1.on('mouseout',  () => markerFotoScene1_1.setIcon(icon07));
  markerFotoScene1_1.on('click', () => { showModal("assets/foto/foto-tree-04.jpg"); });

  const markerFotoScene1_2 = L.marker([52.94421555840046, 17.300320873370165], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene1_2.on('mouseover', () => markerFotoScene1_2.setIcon(icon08));
  markerFotoScene1_2.on('mouseout',  () => markerFotoScene1_2.setIcon(icon07));
  markerFotoScene1_2.on('click', () => { showModal("assets/foto/foto-tree-05.jpg"); });

  const markerFotoScene1_3 = L.marker([52.943572275037965, 17.300288686728997], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene1_3.on('mouseover', () => markerFotoScene1_3.setIcon(icon08));
  markerFotoScene1_3.on('mouseout',  () => markerFotoScene1_3.setIcon(icon07));
  markerFotoScene1_3.on('click', () => { showModal("assets/foto/foto-tree-06.jpg"); });

    const markerFotoScene1_4 = L.marker([52.94375484315489, 17.300047140899494], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene1_4.on('mouseover', () => markerFotoScene1_4.setIcon(icon08));
  markerFotoScene1_4.on('mouseout',  () => markerFotoScene1_4.setIcon(icon07));
  markerFotoScene1_4.on('click', () => { showModal("assets/foto/foto-tree-07.jpg"); });

    const markerFotoScene1_5 = L.marker([52.943977583276336, 17.29972517055154], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene1_5.on('mouseover', () => markerFotoScene1_5.setIcon(icon08));
  markerFotoScene1_5.on('mouseout',  () => markerFotoScene1_5.setIcon(icon07));
  markerFotoScene1_5.on('click', () => { showModal("assets/foto/foto-tree-08.jpg"); });

  const markerFotoScene2_1 = L.marker([52.94390523172963, 17.299907813117944], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene2_1.on('mouseover', () => markerFotoScene2_1.setIcon(icon08));
  markerFotoScene2_1.on('mouseout',  () => markerFotoScene2_1.setIcon(icon07));
  markerFotoScene2_1.on('click', () => { showModal("assets/foto/foto-monument-04.jpg"); });

  const markerFotoScene2_2 = L.marker([52.94410888433341, 17.299856850204417], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene2_2.on('mouseover', () => markerFotoScene2_2.setIcon(icon08));
  markerFotoScene2_2.on('mouseout',  () => markerFotoScene2_2.setIcon(icon07));
  markerFotoScene2_2.on('click', () => { showModal("assets/foto/foto-monument-05.jpg"); });

  const markerFotoScene2_3 = L.marker([52.94381471645432, 17.300897547333577], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene2_3.on('mouseover', () => markerFotoScene2_3.setIcon(icon08));
  markerFotoScene2_3.on('mouseout',  () => markerFotoScene2_3.setIcon(icon07));
  markerFotoScene2_3.on('click', () => { showModal("assets/foto/foto-monument-06.jpg"); });

    const markerFotoScene2_4 = L.marker([52.944176468987365, 17.300239612230616], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene2_4.on('mouseover', () => markerFotoScene2_4.setIcon(icon08));
  markerFotoScene2_4.on('mouseout',  () => markerFotoScene2_4.setIcon(icon07));
  markerFotoScene2_4.on('click', () => { showModal("assets/foto/foto-monument-07.jpg"); });

    const markerFotoScene2_5 = L.marker([52.944024246485895, 17.300018576900822], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene2_5.on('mouseover', () => markerFotoScene2_5.setIcon(icon08));
  markerFotoScene2_5.on('mouseout',  () => markerFotoScene2_5.setIcon(icon07));
  markerFotoScene2_5.on('click', () => { showModal("assets/foto/foto-monument-08.jpg"); });

  const markerFotoScene3_1 = L.marker([52.94205599178503, 17.300511080962853], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene3_1.on('mouseover', () => markerFotoScene3_1.setIcon(icon08));
  markerFotoScene3_1.on('mouseout',  () => markerFotoScene3_1.setIcon(icon07));
  markerFotoScene3_1.on('click', () => { showModal("assets/foto/foto-church-04.jpg"); });

  const markerFotoScene3_2 = L.marker([52.943216799358325, 17.299816635607232], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene3_2.on('mouseover', () => markerFotoScene3_2.setIcon(icon08));
  markerFotoScene3_2.on('mouseout',  () => markerFotoScene3_2.setIcon(icon07));
  markerFotoScene3_2.on('click', () => { showModal("assets/foto/foto-church-05.jpg"); });

  const markerFotoScene3_3 = L.marker([52.942835924868454, 17.30012022506858], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene3_3.on('mouseover', () => markerFotoScene3_3.setIcon(icon08));
  markerFotoScene3_3.on('mouseout',  () => markerFotoScene3_3.setIcon(icon07));
  markerFotoScene3_3.on('click', () => { showModal("assets/foto/foto-church-06.jpg"); });

    const markerFotoScene3_4 = L.marker([52.942268865619376, 17.30039747241794], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene3_4.on('mouseover', () => markerFotoScene3_4.setIcon(icon08));
  markerFotoScene3_4.on('mouseout',  () => markerFotoScene3_4.setIcon(icon07));
  markerFotoScene3_4.on('click', () => { showModal("assets/foto/foto-church-07.jpg"); });

    const markerFotoScene3_5 = L.marker([52.94258011762376, 17.300320786644853], { icon: icon07 })
    .bindTooltip("Kliknij aby zobaczyć zdjęcie", {permanent: false, direction: "top"});
  markerFotoScene3_5.on('mouseover', () => markerFotoScene3_5.setIcon(icon08));
  markerFotoScene3_5.on('mouseout',  () => markerFotoScene3_5.setIcon(icon07));
  markerFotoScene3_5.on('click', () => { showModal("assets/foto/foto-church-08.jpg"); });
  
  const markerTable = [markerHistoryScene1_1, markerHistoryScene1_2, markerHistoryScene1_3, markerHistoryScene2_1, markerHistoryScene2_2, markerHistoryScene2_3, markerHistoryScene3_1, markerHistoryScene3_2, markerHistoryScene3_3, markerNavigation1, markerNavigation2, markerNavigation3, markerFotoScene1_1, markerFotoScene1_2, markerFotoScene1_3, markerFotoScene1_4, markerFotoScene1_5, markerFotoScene2_1, markerFotoScene2_2, markerFotoScene2_3, markerFotoScene2_4, markerFotoScene2_5, markerFotoScene3_1, markerFotoScene3_2, markerFotoScene3_3, markerFotoScene3_4, markerFotoScene3_5];

  function clearMarkers() {
    markerTable.forEach(z => { if (map.hasLayer(z)) map.removeLayer(z); });
  }

  const layerGeometryTree1 = {
    "type": "FeatureCollection",
    "name": "scena1_then",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
      { "type": "Feature", "properties": {}, "geometry": { "type": "MultiPoint", "coordinates": [
        [17.2995881, 52.9440234], [17.2996245, 52.9438778], [17.2998895, 52.9436305], [17.3001909, 52.9436743],
        [17.3004403, 52.9437275], [17.3006793, 52.9437808], [17.3008404, 52.9439718], [17.3008092, 52.9441471],
        [17.3007209, 52.9443444], [17.2995466, 52.9441894],
      ]}}
    ]
  };

  const layerGeometryTree2 = {
    "type": "FeatureCollection",
    "name": "scena1_now",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
      { "type": "Feature", "properties": {}, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ 
        [17.3005556, 52.9443292], [17.2998073, 52.9439817], [17.2997376, 52.9438896],
        [17.2997242, 52.9438459], [17.2997268, 52.9437587], [17.2997564, 52.9437118],
        [17.2997897, 52.9436850], [17.2998127, 52.9436665], [17.2999119, 52.9436374],
        [17.2999843, 52.9436310], [17.3000680, 52.9436403], [17.3003464, 52.9436876],
        [17.3007085, 52.9437587], [17.3007939, 52.9437898], [17.3008477, 52.9438188],
        [17.3008453, 52.9438783], [17.3007836, 52.9438961], [17.3006924, 52.9442339],
        [17.3007246, 52.9442646], [17.3007112, 52.9442904], [17.3006790, 52.9443131],
        [17.3006281, 52.9443276], [17.3005905, 52.9443308], [17.3005556, 52.9443292]
      ] ] ]}}
    ]
  };

  const layerGeometryTree3 = {
    "type": "FeatureCollection",
    "name": "scena1_now2",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
      { "type": "Feature", "properties": {}, "geometry": { "type": "MultiPoint", "coordinates": [
        [17.2998116, 52.9442583], [17.3000922, 52.9443459], [17.3003260, 52.9444242]
      ]}}
    ]
  };
  
  const layerTree1 = L.geoJSON(layerGeometryTree1, {
    pointToLayer: (f, latlng) => L.marker(latlng, {
      icon: L.icon({ iconUrl: 'assets/icon/icon-06.png', iconSize: [18,18], iconAnchor: [9,9] })
    })
  });
  const layerTree2 = L.geoJSON(layerGeometryTree2, {
    style: { color: "#398e3c", weight: 0.5, fillColor: "#79dc7d", fillOpacity: 0.5 }
  });
  const layerTree3 = L.geoJSON(layerGeometryTree3, {
    pointToLayer: (f, latlng) => L.marker(latlng, {
      icon: L.icon({ iconUrl: 'assets/icon/icon-05.png', iconSize: [24,24], iconAnchor: [12,12] })
    })
  });

  const layerGeometryMonument1 = {
    "type": "FeatureCollection",
    "name": "scena2_then",
    "features": [{ "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [17.29965560563264, 52.944015004328229] } }]
  };
  const layerGeometryMonument2 = {
    "type": "FeatureCollection",
    "name": "scena2_then1",
    "features": [{ "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [17.300619400124713, 52.943864852433535] } }]
  };
  const layerGeometryMonument3 = {
    "type": "FeatureCollection",
    "name": "scena2_now",
    "features": [{ "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [17.3001883, 52.9438316] } }]
  };

  const layerMonument1 = L.geoJSON(layerGeometryMonument1, {
    pointToLayer: (f, latlng) => L.marker(latlng, {
      icon: L.icon({ iconUrl: 'assets/icon/icon-08.png', iconSize: [12,22], iconAnchor: [6,11] })
    })
  });
  const layerMonument2 = L.geoJSON(layerGeometryMonument2, {
    pointToLayer: (f, latlng) => L.marker(latlng, {
      icon: L.icon({ iconUrl: 'assets/icon/icon-09.png', iconSize: [12,22], iconAnchor: [6,11] })
    })
  });
  const layerMonument3 = L.geoJSON(layerGeometryMonument3, {
    pointToLayer: (f, latlng) => L.marker(latlng, {
      icon: L.icon({ iconUrl: 'assets/icon/icon-07.png', iconSize: [12,22], iconAnchor: [6,11] })
    })
  });

  const layerGeometryChurch1 = {
    "type": "FeatureCollection",
    "name": "scena3_then",
    "features": [{ "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [17.3001727, 52.9430590] } }]
  };
  const layerGeometryChurch2 = {
    "type": "FeatureCollection",
    "name": "scena3_now",
    "features": [{ "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [17.3009418, 52.9422824] } }]
  };
  const layerGeometryChurch3 = {
    "type": "FeatureCollection",
    "name": "scena3_now1",
   "features": [{ "type": "Feature", "properties": {}, "geometry": { "type": "LineString", "coordinates": [[17.299726431374044, 52.943187951426204], [17.300573180757336, 52.94338093573877], [17.301712277817746, 52.94367984493318], [17.30254766873985, 52.94403240904947]] } }]
  };
  
  const layerChurch1 = L.geoJSON(layerGeometryChurch1, {
    pointToLayer: (f, latlng) => L.marker(latlng, {
      icon: L.icon({ iconUrl: 'assets/icon/icon-11.png', iconSize: [18,22], iconAnchor: [9,11] })
    })
  });
  const layerChurch2 = L.geoJSON(layerGeometryChurch2, {
    pointToLayer: (f, latlng) => L.marker(latlng, {
      icon: L.icon({ iconUrl: 'assets/icon/icon-10.png', iconSize: [18,22], iconAnchor: [9,11] })
    })
  });
  const layerChurch3 = L.geoJSON(layerGeometryChurch3, {
    style: { color: '#0147D9',  weight: 4, opacity: 0.8 }
  });

  const sidePanel = {
    1: {
      legenda: "assets/legend/legend-tree-01.png",
      opis: "Pierwotnie plac rynkowy otaczał pas zadrzewień...",
      opisyHistorii: {
        1: { tekst: "Pierwotnie plac rynkowy otaczał pas zadrzewień, który stanowił jego charakterystyczny element. Z czasem, prawdopodobnie w związku z elektryfikacją miasta, stare drzewa zostały wycięte. Początkowo na miejsce wyciętych okazów dokonywano nowych nasadzeń, jednak z czasem nasadzenia obejmowały coraz mniejszą ich liczę.", warstwaGeoJSON: layerTree1 },
        2: { tekst: "Po II wojnie światowej, w ramach prac porządkowych przestrzeni rynku w latach 70., zmieniono koncepcję układu zieleni. W centralnej części placu założono pięcioalejkowy park, który miał nadać rynkowi nowoczesny charakter. To właśnie w tym miejscu z czasem wyeksponowano odrestaurowany pomnik św. Wawrzyńca.", warstwaGeoJSON: layerTree2 },
        3: { tekst: "Dzisiaj po dawnej linii drzew pozostały jedynie nieliczne drzewa zlokalizowane w północnej części rynku. Współczesna roślinność jest wynikiem późniejszych nasadzeń, które znacząco różnią się od dawnego układu.", warstwaGeoJSON: layerTree3 }
      },
      zdjeciaPanelu: ["assets/foto/foto-tree-01.jpg", "assets/foto/foto-tree-02.jpg", "assets/foto/foto-tree-03.jpg"],
      funkcjaWlaczenia: function() {
        map.addLayer(markerNavigation1); 
        markerFotoScene1_1.addTo(map); markerFotoScene1_2.addTo(map); markerFotoScene1_3.addTo(map); markerFotoScene1_4.addTo(map); markerFotoScene1_5.addTo(map); markerHistoryScene1_1.addTo(map); markerHistoryScene1_2.addTo(map); markerHistoryScene1_3.addTo(map);
        layerTree2.addTo(map); layerTree3.addTo(map); layerTree1.addTo(map);
      }
    },
    2: {
      legenda: "assets/legend/legend-monument-01.png",
      opis: "Na miejscu dawnego pominika stoi obecne inny monument...",
      opisyHistorii: {
        1: { tekst: "Pomnik św. Wawrzyńca wzniesiono w 1925 roku z inicjatywy lokalnej społeczności, pragnącej uczcić patrona miasta. W czasie II wojny światowej obiekt został całkowicie zniszczony w ramach działań wojennych. Przez wiele lat miejsce to pozostawało puste.", warstwaGeoJSON: layerMonument1 },
        2: { tekst: "Podczas II wojny światowej Niemcy wybudowali własny pomnik w południowo-wschodniej części rynku, który miał symbolizować ich panowanie. Po wyzwoleniu miasta konstrukcja ta została rozebrana. W latach 70., na miejscu dawnego pomnika św. Wawrzyńca  postawiono pomnik ku czci poległych w I i II wojnie światowej.", warstwaGeoJSON: layerMonument2 },
        3: { tekst: "Przełom nastąpił w 1999 roku, gdy na poddaszu kościoła odnaleziono fragmenty dawnego pomnika z 1925 roku. Znalezisko poddano starannej rekonstrukcji, przywracając mu dawny blask. Rok później odtworzony monument stanął ponownie na rynku, jednak już w innym miejscu.", warstwaGeoJSON: layerMonument3 }
      },
      zdjeciaPanelu: ["assets/foto/foto-monument-01.jpg", "assets/foto/foto-monument-02.jpg", "assets/foto/foto-monument-03.jpg"],
      funkcjaWlaczenia: function() {
        map.addLayer(markerNavigation2); 
        markerFotoScene2_1.addTo(map); markerFotoScene2_2.addTo(map); markerFotoScene2_3.addTo(map); markerFotoScene2_4.addTo(map); markerFotoScene2_5.addTo(map); markerHistoryScene2_1.addTo(map); markerHistoryScene2_2.addTo(map); markerHistoryScene2_3.addTo(map);
        layerMonument3.addTo(map); layerMonument1.addTo(map); layerMonument2.addTo(map);
      }
    },
    3: {
      legenda: "assets/legend/legend-church-01.png",
      opis: "Obecnie przy ulicy Kościelnej nie ma żadnego kościoła...",
      opisyHistorii: {
        1: { tekst: "Na obecnym placu przy ulicy Kościelnej znajdował się drewniany kościół parafialny, wzniesiony w latach 1781–1785 na fundamentach znacznie starszej świątyni. Obiekt przez pokolenia był centrum życia duchowego mieszkańców miasta. Budowlę rozebrano w pierwszej połowie XX wieku z powodu bardzo złego stanu technicznego.", warstwaGeoJSON: layerChurch1 },
        2: { tekst: "W 1934 roku funkcję głównej świątyni przejął nowy, murowany kościół pw. św. Wawrzyńca. Budynek ten wzniesiono w zupełnie nowej lokalizacji, po przeciwnej stronie Strugi Gołanieckiej. Zmiana ta wpłynęła na kierunek rozwoju miasta.", warstwaGeoJSON: layerChurch2 },
        3: { tekst: "Nazwa ulicy Kościelnej, przy której obecnie nie stoi już żaden budynek sakralny, stanowi dziś jedyną pamiątkę po dawnej świątyni. Przypomina ona o historycznym znaczeniu tego miejsca oraz o budowie nowego kościoła. Dzięki tej nazwie pamięć o drewnianym zabytku przetrwała do czasów współczesnych.", warstwaGeoJSON: layerChurch3 }
      },
      zdjeciaPanelu: ["assets/foto/foto-church-01.jpg", "assets/foto/foto-church-02.jpg", "assets/foto/foto-church-03.jpg"],
      funkcjaWlaczenia: function() {
        map.addLayer(markerNavigation3); 
        markerFotoScene3_1.addTo(map); markerFotoScene3_2.addTo(map); markerFotoScene3_3.addTo(map); markerFotoScene3_4.addTo(map); markerFotoScene3_5.addTo(map); markerHistoryScene3_1.addTo(map); markerHistoryScene3_2.addTo(map); markerHistoryScene3_3.addTo(map);
        layerChurch2.addTo(map); layerChurch3.addTo(map); layerChurch1.addTo(map);
      }
    }
  };

  let currentScene = 1;
  let fotoNumber = 0;

const preLoading = [
  'assets/map/map-1890.jpg', 'assets/map/map-1911.jpg', 'assets/map/map-1934.jpg', 'assets/map/map-1940.jpg', 
  'assets/map/map-1941.jpg', 'assets/map/map-1966.jpg', 'assets/map/map-1981.jpg', 'assets/map/map-2002.jpg', 'assets/icon/logo.png',

  'assets/legend/legend-church-02.png', 'assets/legend/legend-monument-02.png', 'assets/legend/legend-church-02.png',
  'assets/legend/legend-tree-01.png', 'assets/legend/legend-monument-01.png', 'assets/legend/legend-church-01.png',

  'assets/icon/icon-03.png', 'assets/icon/icon-04.png', 
  'assets/icon/icon-01.png', 'assets/icon/icon-02.png',
  'assets/icon/icon-12.png', 'assets/icon/icon-13.png', 
  'assets/icon/icon-14.png', 'assets/icon/icon-15.png', 
  'assets/icon/icon-16.png', 'assets/icon/icon-17.png',
  'assets/icon/icon-06.png', 'assets/icon/icon-05.png',
  'assets/icon/icon-08.png', 'assets/icon/icon-09.png', 'assets/icon/icon-07.png',
  'assets/icon/icon-11.png', 'assets/icon/icon-10.png',

  'assets/foto/foto-tree-04.jpg', 'assets/foto/foto-tree-05.jpg', 'assets/foto/foto-tree-06.jpg', 'assets/foto/foto-tree-07.jpg', 'assets/foto/foto-tree-08.jpg',
  'assets/foto/foto-monument-04.jpg', 'assets/foto/foto-monument-05.jpg', 'assets/foto/foto-monument-06.jpg', 'assets/foto/foto-monument-07.jpg', 'assets/foto/foto-monument-08.jpg',
  'assets/foto/foto-church-04.jpg', 'assets/foto/foto-church-05.jpg', 'assets/foto/foto-church-06.jpg', 'assets/foto/foto-church-07.jpg', 'assets/foto/foto-church-08.jpg',
  'assets/foto/foto-tree-01.jpg', 'assets/foto/foto-tree-02.jpg', 'assets/foto/foto-tree-03.jpg',
  'assets/foto/foto-monument-01.jpg', 'assets/foto/foto-monument-02.jpg', 'assets/foto/foto-monument-03.jpg',
  'assets/foto/foto-church-01.jpg', 'assets/foto/foto-church-02.jpg', 'assets/foto/foto-church-03.jpg'
];

function preloadImages(tablicaZdjec) {
  tablicaZdjec.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

preloadImages(preLoading);
  
function animateLayerPulse(warstwa, maxDodatkowyWeight = 6, czasTrwania = 1500) {
  if (!map.hasLayer(warstwa)) return;

  const start = performance.now();
  
  function wykonajDlaKazdejPodwarstwy(layer, akcja) {
    if (typeof layer.eachLayer === 'function') {
      layer.eachLayer(subLayer => wykonajDlaKazdejPodwarstwy(subLayer, akcja));
    } else {
      akcja(layer);
    }
  }

  wykonajDlaKazdejPodwarstwy(warstwa, layer => {
    if (layer.options && layer.options.weight !== undefined) {
      if (layer._originalWeight === undefined) {
        layer._originalWeight = layer.options.weight;
      }
    }
  });

  function krok(timestamp) {
    const progres = (timestamp - start) / czasTrwania;

    if (progres < 1) {
      const fala = Math.sin(progres * Math.PI); 
      
      wykonajDlaKazdejPodwarstwy(warstwa, layer => {
        if (layer.options && layer._originalWeight !== undefined) {
          const nowyWeight = layer._originalWeight + (fala * maxDodatkowyWeight);
          layer.setStyle({ weight: nowyWeight });
        }
      });

      const skala = 1 + (fala * 0.6);
      
      wykonajDlaKazdejPodwarstwy(warstwa, layer => {
        if (layer.getElement && layer.options && layer.options.icon) {
          const el = layer.getElement();
          const iconOpts = layer.options.icon.options;
          
          if (el && iconOpts && iconOpts.iconSize) {
            const bazowySize = iconOpts.iconSize;
            const bazowyAnchor = iconOpts.iconAnchor || [bazowySize[0] / 2, bazowySize[1] / 2];
            
            el.style.width = (bazowySize[0] * skala) + 'px';
            el.style.height = (bazowySize[1] * skala) + 'px';
            el.style.marginLeft = -(bazowyAnchor[0] * skala) + 'px';
            el.style.marginTop = -(bazowyAnchor[1] * skala) + 'px';
          }
        }
      });

      requestAnimationFrame(krok);
    } else {
      wykonajDlaKazdejPodwarstwy(warstwa, layer => {
        if (layer._originalWeight !== undefined) {
          layer.setStyle({ weight: layer._originalWeight });
        }
        
        if (layer.getElement && layer.options && layer.options.icon) {
          const el = layer.getElement();
          const iconOpts = layer.options.icon.options;
          
          if (el && iconOpts && iconOpts.iconSize) {
            const bazowySize = iconOpts.iconSize;
            const bazowyAnchor = iconOpts.iconAnchor || [bazowySize[0] / 2, bazowySize[1] / 2];
            el.style.width = bazowySize[0] + 'px';
            el.style.height = bazowySize[1] + 'px';
            el.style.marginLeft = -bazowyAnchor[0] + 'px';
            el.style.marginTop = -bazowyAnchor[1] + 'px';
          }
        }
      });
    }
  }
  requestAnimationFrame(krok);
}
  
  function updateHistoryDescription(numerPunktu) {
    const obiektHistorii = sidePanel[currentScene].opisyHistorii[numerPunktu];
    
    if (obiektHistorii) {
      document.getElementById('opis-sceny-tekst').innerHTML = obiektHistorii.tekst;
      
      if (obiektHistorii.warstwaGeoJSON) {
        animateLayerPulse(obiektHistorii.warstwaGeoJSON);
      }

      const listaZdjec = sidePanel[currentScene].zdjeciaPanelu;
      if (listaZdjec && listaZdjec[numerPunktu - 1]) {
        fotoNumber = numerPunktu - 1;
        updateCarousel();
      }
    }
  }
  
  function changeScene(nr) {
    currentScene = nr;
    fotoNumber = 0;

    if (nr === 1 || nr === 2) {
      map.setView([52.94400963676573, 17.30015435448826], 18.5);
    } else if (nr === 3) {
      map.setView([52.94284493696121, 17.30075259704252], 18);
    }

    clearMarkers();
    if (map.hasLayer(layerTree1)) map.removeLayer(layerTree1);
    if (map.hasLayer(layerTree2)) map.removeLayer(layerTree2);
    if (map.hasLayer(layerTree3)) map.removeLayer(layerTree3);
    if (map.hasLayer(layerMonument3)) map.removeLayer(layerMonument3);
    if (map.hasLayer(layerMonument1)) map.removeLayer(layerMonument1);
    if (map.hasLayer(layerMonument2)) map.removeLayer(layerMonument2);
    if (map.hasLayer(layerChurch2)) map.removeLayer(layerChurch2);
    if (map.hasLayer(layerChurch3)) map.removeLayer(layerChurch3);
    if (map.hasLayer(layerChurch1)) map.removeLayer(layerChurch1);

    sidePanel[nr].funkcjaWlaczenia();

    document.getElementById('legenda-img').src = sidePanel[nr].legenda;
    document.getElementById('opis-sceny-tekst').innerHTML = sidePanel[nr].opis;

    document.querySelectorAll('.przycisk-sceny-nowy').forEach((btn, idx) => {
      btn.classList.toggle('aktywna', (idx + 1) === nr);
    });

    updateCarousel();
  }

  function updateCarousel() {
    const listaZdjec = sidePanel[currentScene].zdjeciaPanelu;
    const imgEl = document.getElementById('karuzela-foto');
    const licznikEl = document.getElementById('karuzela-licznik');

    if (listaZdjec && listaZdjec.length > 0) {
      imgEl.src = listaZdjec[fotoNumber];
      imgEl.style.display = 'block';
      if (licznikEl) licznikEl.textContent = `${fotoNumber + 1} / ${listaZdjec.length}`;
    } else {
      imgEl.style.display = 'none';
      if (licznikEl) licznikEl.textContent = "0 / 0";
    }
  }

  function openFullPhoto() {
    const listaZdjec = sidePanel[currentScene].zdjeciaPanelu;
    if (listaZdjec && listaZdjec[fotoNumber]) {
      showModal(listaZdjec[fotoNumber]);
    }
  }

  function showModal(src) {
    document.getElementById('modal-img').src = src;
    document.getElementById('modal-zdjecie').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('modal-zdjecie').style.display = 'none';
  }

  changeScene(1);
  document.getElementById('nazwa-podkladu').textContent = `Mapa z ${currentYear} roku`;
  
  const drawnElements = new L.FeatureGroup();
  map.addLayer(drawnElements);

  const drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnElements, 
      remove: true                     
    },
    draw: {
      polyline: { showMeasurements: true, showLength: true, metric: true },
      polygon: { showMeasurements: true, showArea: true, metric: true, allowIntersection: false },
      rectangle: { showMeasurements: true, metric: true },
      circle: true,
      marker: true
    }
  });
  map.addControl(drawControl);

  function formatDistance(dystans) {
    if (dystans >= 1000) return (dystans / 1000).toFixed(2) + ' km';
    return dystans.toFixed(2) + ' m';
  }

  function formatujPowierzchnie(pole) {
    if (pole >= 1000000) return (pole / 1000000).toFixed(2) + ' km²';
    return pole.toFixed(2) + ' m²';
  }

  function updateMeasurements(layer, type) {
    let opcjeTooltipa = {
      permanent: true,
      direction: "center",
      className: "etykieta-promienia"
    };

    if (type === 'polyline' || type === 'marker') {
      opcjeTooltipa.direction = 'top';
      opcjeTooltipa.offset = [0, -10];
    }

    if (!layer.getTooltip()) {
      layer.bindTooltip("", opcjeTooltipa);
    } else {
      L.extend(layer.getTooltip().options, opcjeTooltipa);
    }

    if (type === 'polyline') {
      const latlngs = layer.getLatLngs();
      let calkowitaDlugosc = 0;
      
      for (let i = 0; i < latlngs.length - 1; i++) {
        calkowitaDlugosc += latlngs[i].distanceTo(latlngs[i+1]);
      }
      
      layer.setTooltipContent("Długość: " + formatDistance(calkowitaDlugosc));
      
    } else if (type === 'polygon' || type === 'rectangle') {
      const latlngs = layer.getLatLngs()[0];
      const pole = L.GeometryUtil.geodesicArea(latlngs);
      layer.setTooltipContent("Powierzchnia: " + formatujPowierzchnie(pole));
      
    } else if (type === 'circle') {
      const radius = layer.getRadius();
      layer.setTooltipContent("Promień: " + formatDistance(radius));
      
    } else if (type === 'marker') {
      const coords = layer.getLatLng();
      layer.setTooltipContent(`Lat: ${coords.lat.toFixed(5)}, Lng: ${coords.lng.toFixed(5)}`);
    }
  }

map.on(L.Draw.Event.CREATED, function (e) {
  const layer = e.layer;
  drawnElements.addLayer(layer);
  updateMeasurements(layer, e.layerType);
});

map.on(L.Draw.Event.EDITED, function (e) {
  e.layers.eachLayer(function (layer) {
    let type = 'marker';
    if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) type = 'polyline';
    else if (layer instanceof L.Polygon) type = 'polygon';
    else if (layer instanceof L.Circle) type = 'circle';
    
    updateMeasurements(layer, type);
  });
});

function exportMap() {
    const starePrzesuniecie = map.options.fadeAnimation;
    map.options.fadeAnimation = false;

    const element = document.querySelector(".leaflet-container");

    setTimeout(() => {
        html2canvas(element, {
            useCORS: true,
            allowTaint: false,
            backgroundColor: "#ffffff",
            scale: 2,
            logging: false,
            scrollX: 0,
            scrollY: 0,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight
        }).then(function(canvas) {
            const link = document.createElement("a");
            link.download = "map.png";
            link.href = canvas.toDataURL("image/png");
            link.click();

            map.options.fadeAnimation = starePrzesuniecie;
        });
    }, 100);
}

/* =========================================================
   SYSTEM REJESTRACJI INTERAKCJI DLA BADANIA UŻYTECZNOŚCI
   ========================================================= */

// Tablica do przechowywania zdarzeń
const logiBadania = [];
let czasOstatniegoKlikniecia = Date.now();
const czasStartuBadania = Date.now();

// Funkcja pomocnicza do rejestrowania pojedynczego kliknięcia
function zarejestrujKlikniecie(nazwaOpisowa, szczegoly = {}) {
  const teraz = Date.now();
  const odOstatniego = ((teraz - czasOstatniegoKlikniecia) / 1000).toFixed(2);
  const odStartu = ((teraz - czasStartuBadania) / 1000).toFixed(2);
  
  czasOstatniegoKlikniecia = teraz;

  const wpis = {
    nr: logiBadania.length + 1,
    zdarzenie: nazwaOpisowa,
    czasOdOstatniegoKliknieciaSec: parseFloat(odOstatniego),
    czasOdStartuSec: parseFloat(odStartu),
    timestamp: new Date(teraz).toISOString(),
    ...szczegoly
  };

  logiBadania.push(wpis);
  console.log('[LOG BADANIA]:', wpis); // Podgląd w konsoli przeglądarki
}

// 1. Rejestracja kliknięć w całe okno (z wyłapywaniem id/klas/znaczka)
document.addEventListener('click', function(e) {
  // Ignoruj kliknięcie w sam przycisk pobierania logów
  if (e.target.closest('#btn-pobierz-logi')) return;

  const target = e.target;
  let opis = 'Kliknięcie elementu';

  // Rozpoznawanie konkretnych interakcji z UI
  if (target.closest('.przycisk-sceny-nowy')) {
    const btn = target.closest('.przycisk-sceny-nowy');
    opis = `Przełączenie sceny (Przycisk: ${btn.id || btn.textContent.trim()})`;
  } else if (target.closest('#suwak-czasu')) {
    opis = `Zmiana podkładu mapowego (Suwak: wartość ${target.value})`;
  } else if (target.closest('.print-button')) {
    opis = 'Eksport mapy (Przycisk drukowania)';
  } else if (target.closest('.leaflet-control-zoom-in')) {
    opis = 'Powiększenie mapy (+)';
  } else if (target.closest('.leaflet-control-zoom-out')) {
    opis = 'Pomniejszenie mapy (-)';
  } else if (target.closest('.leaflet-control-locate')) {
    opis = 'Geolokalizacja (Przycisk lokalizacji)';
  } else if (target.closest('.leaflet-draw-draw-polyline')) {
    opis = 'Narzędzie: Rysowanie linii';
  } else if (target.closest('.leaflet-draw-draw-polygon')) {
    opis = 'Narzędzie: Pomiar/Rysowanie powierzchni';
  } else if (target.closest('.leaflet-draw-draw-rectangle')) {
    opis = 'Narzędzie: Rysowanie prostokąta';
  } else if (target.closest('.leaflet-draw-draw-circle')) {
    opis = 'Narzędzie: Rysowanie okręgu';
  } else if (target.closest('.leaflet-draw-draw-marker')) {
    opis = 'Narzędzie: Dodawanie markera';
  } else if (target.closest('.leaflet-draw-edit-edit')) {
    opis = 'Narzędzie: Edycja rysunku';
  } else if (target.closest('.leaflet-draw-edit-remove')) {
    opis = 'Narzędzie: Usuwanie rysunku';
  } else if (target.closest('#karuzela-foto')) {
    opis = 'Otwarcie zdjęcia w oknie modalnym';
  } else if (target.closest('#modal-zdjecie .zamknij')) {
    opis = 'Zamknięcie zdjęcia w oknie modalnym';
  } else if (target.closest('#map')) {
    opis = 'Kliknięcie w obszar mapy';
  } else {
    // Opis domyślny dla pozostałych elementów
    const tag = target.tagName.toLowerCase();
    const id = target.id ? `#${target.id}` : '';
    const klasa = target.className ? `.${target.className.toString().split(' ')[0]}` : '';
    opis = `Kliknięcie: ${tag}${id}${klasa}`;
  }

  zarejestrujKlikniecie(opis);
}, true);

// 2. Podpięcie śledzenia do markerów na mapie Leaflet
function PodpnijSledzenieMarkerow() {
  markerTable.forEach((marker, idx) => {
    marker.off('click', marker._logHandler); // unikaj dublowania eventów
    marker._logHandler = () => {
      zarejestrujKlikniecie(`Kliknięcie w marker na mapie (ID/Indeks: ${idx + 1})`);
    };
    marker.on('click', marker._logHandler);
  });
}
// Wywołaj po inicjalizacji markerów
PodpnijSledzenieMarkerow();

// Overwrite/Rozszerzenie funkcji changeScene, aby po dodaniu nowych markerów też je śledziła
const oryginalneChangeScene = changeScene;
changeScene = function(nr) {
  oryginalneChangeScene(nr);
  PodpnijSledzenieMarkerow();
};

// 3. Eksport danych do pliku CSV/JSON dla badacza
function pobierzWynikiBadania(format = 'csv') {
  if (logiBadania.length === 0) {
    alert('Brak zarejestrowanych kliknięć do pobrania!');
    return;
  }

  let tresc = '';
  let mimeType = '';
  let rozszerzenie = '';

  if (format === 'json') {
    tresc = JSON.stringify(logiBadania, null, 2);
    mimeType = 'application/json';
    rozszerzenie = 'json';
  } else {
    // Domyślnie CSV
    const naglowki = ['Nr', 'Zdarzenie', 'Czas_Od_Ostatniego_Sec', 'Czas_Od_Startu_Sec', 'Timestamp'];
    const wiersze = logiBadania.map(l => 
      `"${l.nr}","${l.zdarzenie.replace(/"/g, '""')}","${l.czasOdOstatniegoKliknieciaSec}","${l.czasOdStartuSec}","${l.timestamp}"`
    );
    tresc = [naglowki.join(';'), ...wiersze].join('\n');
    mimeType = 'text/csv;charset=utf-8;';
    rozszerzenie = 'csv';
  }

  const blob = new Blob([tresc], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `badanie_uzytkownik_${new Date().toISOString().slice(0,19).replace(/[:T]/g, '-')}.${rozszerzenie}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}