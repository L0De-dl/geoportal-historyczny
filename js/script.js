/* --- Inicjalizacja Mapy --- */
const map = L.map('map', { 
    zoomControl: false, 
    zoomSnap: 0.5,
    preferCanvas: true
}).setView([52.9435, 17.3002], 17.5);

const currentYear = new Date().getFullYear();

// Ograniczenia widoku
map.setMaxBounds([
    [52.9490239, 17.2852683], // NW
    [52.9381943, 17.3122189]  // SE
]);

map.setMinZoom(map.getBoundsZoom([
    [52.9490239, 17.2852683],
    [52.9381943, 17.3122189]
]));

/* --- Kontrolki (Interfejs) --- */

// Własna kontrolka eksportu
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

// Kontrolka tytułu
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

// Pozostałe kontrolki
L.control.zoom({ position: "topleft" }).addTo(map);
L.control.locate({ position: "topleft" }).addTo(map);
new PrintControl().addTo(map);
L.control.scale({ imperial: false, metric: true, position: 'bottomleft' }).addTo(map);

// Kontrolka współrzędnych
const kontrolkaWspolrzednych = L.control({ position: 'bottomleft' });
kontrolkaWspolrzednych.onAdd = function() {
    const div = L.DomUtil.create('div', 'wspolrzedne-myszki');
    div.innerHTML = "X: - | Y: -";
    return div;
};
kontrolkaWspolrzednych.addTo(map);

map.on('mousemove', function(e) {
    const coords = e.latlng;
    document.querySelector('.wspolrzedne-myszki').innerHTML = 
        `X: ${coords.lat.toFixed(5)} &nbsp;&nbsp; Y: ${coords.lng.toFixed(5)}`;
});

/* --- Warstwy mapowe --- */
const layerOSM = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
}).addTo(map);

// Definicje podkładów historycznych
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

// Obsługa suwaka czasu
document.getElementById('suwak-czasu').addEventListener('input', function(e) {
    const indeks = parseInt(e.target.value);
    layerTable.forEach(p => { if (map.hasLayer(p)) map.removeLayer(p); });
    if (layerTable[indeks]) {
        layerTable[indeks].addTo(map);
    }
    document.getElementById('nazwa-podkladu').textContent = layerNames[indeks];
});

/* --- Definicje Ikon --- */
const iconConfig = (url, size) => L.icon({ iconUrl: url, iconSize: size });

const icon01 = iconConfig('assets/icon/icon-03.png', [25, 25]);
const icon02 = iconConfig('assets/icon/icon-04.png', [25, 25]);
const icon03 = iconConfig('assets/icon/icon-03.png', [25, 25]);
const icon04 = iconConfig('assets/icon/icon-04.png', [25, 25]);
const icon05 = iconConfig('assets/icon/icon-03.png', [25, 25]);
const icon06 = iconConfig('assets/icon/icon-04.png', [25, 25]);
const icon07 = iconConfig('assets/icon/icon-01.png', [25, 25]);
const icon08 = iconConfig('assets/icon/icon-02.png', [25, 25]);
const icon09 = iconConfig('assets/icon/icon-12.png', [35, 35]);
const icon10 = iconConfig('assets/icon/icon-13.png', [35, 35]);
const icon11 = iconConfig('assets/icon/icon-14.png', [35, 35]);
const icon12 = iconConfig('assets/icon/icon-15.png', [35, 35]);
const icon13 = iconConfig('assets/icon/icon-16.png', [35, 35]);
const icon14 = iconConfig('assets/icon/icon-17.png', [35, 35]);

/* --- Funkcje Pomocnicze dla Markerów --- */
const setupHistoryMarker = (latlng, iconNormal, iconHover, sceneId) => {
    const marker = L.marker(latlng, { icon: iconNormal })
        .bindTooltip("Kliknij aby poznać historię", { permanent: false, direction: "top" });
    marker.on('mouseover', () => marker.setIcon(iconHover));
    marker.on('mouseout', () => marker.setIcon(iconNormal));
    marker.on('click', () => updateHistoryDescription(sceneId));
    return marker;
};

/* --- Markery: Historia (Sceny) --- */
const markerHistoryScene1_1 = setupHistoryMarker([52.9437332, 17.2995651], icon09, icon10, 1);
const markerHistoryScene1_2 = setupHistoryMarker([52.9439926, 17.3003716], icon11, icon12, 2);
const markerHistoryScene1_3 = setupHistoryMarker([52.9443737, 17.2998894], icon13, icon14, 3);

const markerHistoryScene2_1 = setupHistoryMarker([52.9440873, 17.2994871], icon09, icon10, 1);
const markerHistoryScene2_2 = setupHistoryMarker([52.9439853, 17.3008281], icon11, icon12, 2);
const markerHistoryScene2_3 = setupHistoryMarker([52.9436735, 17.3002083], icon13, icon14, 3);

const markerHistoryScene3_1 = setupHistoryMarker([52.9429645, 17.3005167], icon09, icon10, 1);
const markerHistoryScene3_2 = setupHistoryMarker([52.9425239, 17.3009677], icon11, icon12, 2);
const markerHistoryScene3_3 = setupHistoryMarker([52.9434158, 17.3012779], icon13, icon14, 3);

/* --- Markery: Nawigacja --- */
const setupNavMarker = (latlng, iconNormal, iconHover, url) => {
    const marker = L.marker(latlng, { icon: iconNormal })
        .bindTooltip("Kliknij aby przejść do sceny", { permanent: false, direction: "top" });
    marker.on('mouseover', () => marker.setIcon(iconHover));
    marker.on('mouseout', () => marker.setIcon(iconNormal));
    marker.on('click', () => window.location.href = url);
    return marker;
};

const markerNavigation1 = setupNavMarker([52.944121, 17.299766], icon01, icon02, "https://l0de-dl.github.io/scena1");
const markerNavigation2 = setupNavMarker([52.9438219, 17.2995537], icon03, icon04, "https://l0de-dl.github.io/scena2");
const markerNavigation3 = setupNavMarker([52.942454, 17.300135], icon05, icon06, "https://l0de-dl.github.io/scena3");

/* --- Markery: Zdjęcia --- */
const setupPhotoMarker = (latlng, photoUrl) => {
    const marker = L.marker(latlng, { icon: icon07 })
        .bindTooltip("Kliknij aby zobaczyć zdjęcie", { permanent: false, direction: "top" });
    marker.on('mouseover', () => marker.setIcon(icon08));
    marker.on('mouseout', () => marker.setIcon(icon07));
    marker.on('click', () => showModal(photoUrl));
    return marker;
};

const markerFotoScene1_1 = setupPhotoMarker([52.9444936, 17.3006722], "assets/foto/foto-tree-04.jpg");
const markerFotoScene1_2 = setupPhotoMarker([52.9442156, 17.3003209], "assets/foto/foto-tree-05.jpg");
const markerFotoScene1_3 = setupPhotoMarker([52.9435723, 17.3002887], "assets/foto/foto-tree-06.jpg");
const markerFotoScene1_4 = setupPhotoMarker([52.9437548, 17.3000471], "assets/foto/foto-tree-07.jpg");
const markerFotoScene1_5 = setupPhotoMarker([52.9439776, 17.2997252], "assets/foto/foto-tree-08.jpg");

const markerFotoScene2_1 = setupPhotoMarker([52.9439052, 17.2999078], "assets/foto/foto-monument-04.jpg");
const markerFotoScene2_2 = setupPhotoMarker([52.9441089, 17.2998569], "assets/foto/foto-monument-05.jpg");
const markerFotoScene2_3 = setupPhotoMarker([52.9438147, 17.3008975], "assets/foto/foto-monument-06.jpg");
const markerFotoScene2_4 = setupPhotoMarker([52.9441765, 17.3002396], "assets/foto/foto-monument-07.jpg");
const markerFotoScene2_5 = setupPhotoMarker([52.9440242, 17.3000186], "assets/foto/foto-monument-08.jpg");

const markerFotoScene3_1 = setupPhotoMarker([52.942056, 17.3005111], "assets/foto/foto-church-04.jpg");
const markerFotoScene3_2 = setupPhotoMarker([52.9432168, 17.2998166], "assets/foto/foto-church-05.jpg");
const markerFotoScene3_3 = setupPhotoMarker([52.9428359, 17.3001202], "assets/foto/foto-church-06.jpg");
const markerFotoScene3_4 = setupPhotoMarker([52.9422689, 17.3003975], "assets/foto/foto-church-07.jpg");
const markerFotoScene3_5 = setupPhotoMarker([52.9425801, 17.3003208], "assets/foto/foto-church-08.jpg");

const markerTable = [
    markerHistoryScene1_1, markerHistoryScene1_2, markerHistoryScene1_3, 
    markerHistoryScene2_1, markerHistoryScene2_2, markerHistoryScene2_3, 
    markerHistoryScene3_1, markerHistoryScene3_2, markerHistoryScene3_3, 
    markerNavigation1, markerNavigation2, markerNavigation3, 
    markerFotoScene1_1, markerFotoScene1_2, markerFotoScene1_3, markerFotoScene1_4, markerFotoScene1_5, 
    markerFotoScene2_1, markerFotoScene2_2, markerFotoScene2_3, markerFotoScene2_4, markerFotoScene2_5, 
    markerFotoScene3_1, markerFotoScene3_2, markerFotoScene3_3, markerFotoScene3_4, markerFotoScene3_5
];

/* --- Funkcje pomocnicze dla markerów --- */
function clearMarkers() {
    markerTable.forEach(z => { if (map.hasLayer(z)) map.removeLayer(z); });
}

/* --- Warstwy GeoJSON: Scena 1 (Zieleń) --- */
const layerTree1 = L.geoJSON({
    "type": "FeatureCollection",
    "features": [{ "type": "Feature", "geometry": { "type": "MultiPoint", "coordinates": [
        [17.2995881, 52.9440234], [17.2996245, 52.9438778], [17.2998895, 52.9436305], 
        [17.3001909, 52.9436743], [17.3004403, 52.9437275], [17.3006793, 52.9437808], 
        [17.3008404, 52.9439718], [17.3008092, 52.9441471], [17.3007209, 52.9443444], 
        [17.2995466, 52.9441894]
    ]}}]
}, {
    pointToLayer: (f, latlng) => L.marker(latlng, {
        icon: L.icon({ iconUrl: 'assets/icon/icon-06.png', iconSize: [18, 18], iconAnchor: [9, 9] })
    })
});

const layerTree2 = L.geoJSON({
    "type": "FeatureCollection",
    "features": [{ "type": "Feature", "geometry": { "type": "MultiPolygon", "coordinates": [[ [ 
        [17.3005556, 52.9443292], [17.2998073, 52.9439817], [17.2997376, 52.9438896],
        [17.2997242, 52.9438459], [17.2997268, 52.9437587], [17.2997564, 52.9437118],
        [17.2997897, 52.9436850], [17.2998127, 52.9436665], [17.2999119, 52.9436374],
        [17.2999843, 52.9436310], [17.3000680, 52.9436403], [17.3003464, 52.9436876],
        [17.3007085, 52.9437587], [17.3007939, 52.9437898], [17.3008477, 52.9438188],
        [17.3008453, 52.9438783], [17.3007836, 52.9438961], [17.3006924, 52.9442339],
        [17.3007246, 52.9442646], [17.3007112, 52.9442904], [17.3006790, 52.9443131],
        [17.3006281, 52.9443276], [17.3005905, 52.9443308], [17.3005556, 52.9443292]
    ] ]] }}]
}, {
    style: { color: "#398e3c", weight: 0.5, fillColor: "#79dc7d", fillOpacity: 0.5 }
});

const layerTree3 = L.geoJSON({
    "type": "FeatureCollection",
    "features": [{ "type": "Feature", "geometry": { "type": "MultiPoint", "coordinates": [
        [17.2998116, 52.9442583], [17.3000922, 52.9443459], [17.3003260, 52.9444242]
    ]}}]
}, {
    pointToLayer: (f, latlng) => L.marker(latlng, {
        icon: L.icon({ iconUrl: 'assets/icon/icon-05.png', iconSize: [24, 24], iconAnchor: [12, 12] })
    })
});

/* --- Warstwy GeoJSON: Scena 2 (Pomniki) --- */
const layerMonument1 = L.geoJSON({
    "type": "FeatureCollection",
    "features": [{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [17.2996556, 52.9440150] } }]
}, {
    pointToLayer: (f, latlng) => L.marker(latlng, {
        icon: L.icon({ iconUrl: 'assets/icon/icon-08.png', iconSize: [12, 22], iconAnchor: [6, 11] })
    })
});

const layerMonument2 = L.geoJSON({
    "type": "FeatureCollection",
    "features": [{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [17.3006194, 52.9438648] } }]
}, {
    pointToLayer: (f, latlng) => L.marker(latlng, {
        icon: L.icon({ iconUrl: 'assets/icon/icon-09.png', iconSize: [12, 22], iconAnchor: [6, 11] })
    })
});

const layerMonument3 = L.geoJSON({
    "type": "FeatureCollection",
    "features": [{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [17.3001883, 52.9438316] } }]
}, {
    pointToLayer: (f, latlng) => L.marker(latlng, {
        icon: L.icon({ iconUrl: 'assets/icon/icon-07.png', iconSize: [12, 22], iconAnchor: [6, 11] })
    })
});

/* --- Warstwy GeoJSON: Scena 3 (Kościoły) --- */
const layerChurch1 = L.geoJSON({
    "type": "FeatureCollection",
    "features": [{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [17.3001727, 52.9430590] } }]
}, {
    pointToLayer: (f, latlng) => L.marker(latlng, {
        icon: L.icon({ iconUrl: 'assets/icon/icon-11.png', iconSize: [18, 22], iconAnchor: [9, 11] })
    })
});

const layerChurch2 = L.geoJSON({
    "type": "FeatureCollection",
    "features": [{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [17.3009418, 52.9422824] } }]
}, {
    pointToLayer: (f, latlng) => L.marker(latlng, {
        icon: L.icon({ iconUrl: 'assets/icon/icon-10.png', iconSize: [18, 22], iconAnchor: [9, 11] })
    })
});

const layerChurch3 = L.geoJSON({
    "type": "FeatureCollection",
    "features": [{ "type": "Feature", "geometry": { "type": "LineString", "coordinates": [
        [17.2997264, 52.9431879], [17.3005731, 52.9433809], 
        [17.3017122, 52.9436798], [17.3025476, 52.9440324]
    ]}}]
}, {
    style: { color: '#0147D9', weight: 4, opacity: 0.8 }
});

/* --- Konfiguracja Panelu Bocznego --- */
const sidePanel = {
    1: {
        legenda: "assets/legend/legend-tree-01.png",
        opis: "Pierwotnie plac rynkowy otaczał pas zadrzewień...",
        opisyHistorii: {
            1: { tekst: "Pierwotnie plac rynkowy otaczał pas zadrzewień...", warstwaGeoJSON: layerTree1 },
            2: { tekst: "Po II wojnie światowej zmieniono koncepcję układu zieleni...", warstwaGeoJSON: layerTree2 },
            3: { tekst: "Dzisiaj po dawnej linii drzew pozostały jedynie nieliczne...", warstwaGeoJSON: layerTree3 }
        },
        zdjeciaPanelu: ["assets/foto/foto-tree-01.jpg", "assets/foto/foto-tree-02.jpg", "assets/foto/foto-tree-03.jpg"],
        funkcjaWlaczenia: function() {
            map.addLayer(markerNavigation1); 
            [markerFotoScene1_1, markerFotoScene1_2, markerFotoScene1_3, markerFotoScene1_4, markerFotoScene1_5, 
             markerHistoryScene1_1, markerHistoryScene1_2, markerHistoryScene1_3].forEach(m => m.addTo(map));
            [layerTree1, layerTree2, layerTree3].forEach(l => l.addTo(map));
        }
    },
    2: {
        legenda: "assets/legend/legend-monument-01.png",
        opis: "Na miejscu dawnego pominika stoi obecne inny monument...",
        opisyHistorii: {
            1: { tekst: "Pomnik św. Wawrzyńca wzniesiono w 1925 roku...", warstwaGeoJSON: layerMonument1 },
            2: { tekst: "Podczas II wojny światowej Niemcy wybudowali własny pomnik...", warstwaGeoJSON: layerMonument2 },
            3: { tekst: "Przełom nastąpił w 1999 roku...", warstwaGeoJSON: layerMonument3 }
        },
        zdjeciaPanelu: ["assets/foto/foto-monument-01.jpg", "assets/foto/foto-monument-02.jpg", "assets/foto/foto-monument-03.jpg"],
        funkcjaWlaczenia: function() {
            map.addLayer(markerNavigation2); 
            [markerFotoScene2_1, markerFotoScene2_2, markerFotoScene2_3, markerFotoScene2_4, markerFotoScene2_5, 
             markerHistoryScene2_1, markerHistoryScene2_2, markerHistoryScene2_3].forEach(m => m.addTo(map));
            [layerMonument1, layerMonument2, layerMonument3].forEach(l => l.addTo(map));
        }
    },
    3: {
        legenda: "assets/legend/legend-church-01.png",
        opis: "Obecnie przy ulicy Kościelnej nie ma żadnego kościoła...",
        opisyHistorii: {
            1: { tekst: "Na obecnym placu przy ulicy Kościelnej znajdował się drewniany kościół...", warstwaGeoJSON: layerChurch1 },
            2: { tekst: "W 1934 roku funkcję głównej świątyni przejął nowy, murowany kościół...", warstwaGeoJSON: layerChurch2 },
            3: { tekst: "Nazwa ulicy Kościelnej stanowi dziś jedyną pamiątkę...", warstwaGeoJSON: layerChurch3 }
        },
        zdjeciaPanelu: ["assets/foto/foto-church-01.jpg", "assets/foto/foto-church-02.jpg", "assets/foto/foto-church-03.jpg"],
        funkcjaWlaczenia: function() {
            map.addLayer(markerNavigation3); 
            [markerFotoScene3_1, markerFotoScene3_2, markerFotoScene3_3, markerFotoScene3_4, markerFotoScene3_5, 
             markerHistoryScene3_1, markerHistoryScene3_2, markerHistoryScene3_3].forEach(m => m.addTo(map));
            [layerChurch1, layerChurch2, layerChurch3].forEach(l => l.addTo(map));
        }
    }
};

let currentScene = 1;
let fotoNumber = 0;

/* --- Preload zdjęć --- */
const preLoading = [/* tablica ścieżek do zdjęć */]; 

function preloadImages(tablicaZdjec) {
    tablicaZdjec.forEach(url => { new Image().src = url; });
}
preloadImages(preLoading);

/* --- Animacja pulsująca warstw --- */
function animateLayerPulse(warstwa, maxDodatkowyWeight = 6, czasTrwania = 1500) {
    if (!map.hasLayer(warstwa)) return;
    const start = performance.now();
    
    function wykonajDlaKazdejPodwarstwy(layer, akcja) {
        if (typeof layer.eachLayer === 'function') layer.eachLayer(sub => wykonajDlaKazdejPodwarstwy(sub, akcja));
        else akcja(layer);
    }

    wykonajDlaKazdejPodwarstwy(warstwa, layer => {
        if (layer.options && layer.options.weight !== undefined) layer._originalWeight = layer.options.weight;
    });

    function krok(timestamp) {
        const progres = (timestamp - start) / czasTrwania;
        if (progres < 1) {
            const fala = Math.sin(progres * Math.PI); 
            wykonajDlaKazdejPodwarstwy(warstwa, layer => {
                if (layer.options && layer._originalWeight !== undefined) layer.setStyle({ weight: layer._originalWeight + (fala * maxDodatkowyWeight) });
            });
            requestAnimationFrame(krok);
        } else {
            wykonajDlaKazdejPodwarstwy(warstwa, layer => {
                if (layer._originalWeight !== undefined) layer.setStyle({ weight: layer._originalWeight });
            });
        }
    }
    requestAnimationFrame(krok);
}

/* --- Obsługa Panelu Bocznego i Scen --- */
function updateHistoryDescription(idSceny) {
    const dane = sidePanel[currentScene].opisyHistorii[idSceny];
    document.getElementById('opis-tekstowy').innerHTML = dane.tekst;
    
    // Animate and highlight selected layer
    animateLayerPulse(dane.warstwaGeoJSON);
}

function switchScene(id) {
    // Czyszczenie mapy
    clearMarkers();
    Object.values(sidePanel).forEach(s => {
        [s.opisyHistorii[1].warstwaGeoJSON, s.opisyHistorii[2].warstwaGeoJSON, s.opisyHistorii[3].warstwaGeoJSON]
            .forEach(l => { if (map.hasLayer(l)) map.removeLayer(l); });
    });

    // Ustawienie nowej sceny
    currentScene = id;
    sidePanel[id].funkcjaWlaczenia();
    document.getElementById('legenda-img').src = sidePanel[id].legenda;
    document.getElementById('opis-tekstowy').innerHTML = sidePanel[id].opis;
}

/* --- Obsługa Modali --- */
function showModal(url) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-image');
    modalImg.src = url;
    modal.style.display = "block";
}

document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('modal').style.display = "none";
});

/* --- Eksport Mapy --- */
function exportMap() {
    leafletImage(map, function(err, canvas) {
        const link = document.createElement('a');
        link.download = 'geoportal-golancz.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

/* --- Inicjalizacja Początkowa --- */
document.addEventListener('DOMContentLoaded', () => {
    switchScene(1); // Uruchomienie domyślnej sceny
    
    // Przyciski zmiany scen w interfejsie
    document.querySelectorAll('.scene-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => switchScene(index + 1));
    });
});