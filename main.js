// import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';


// const geoserver_addr = 'http://localhost:8080/geoserver';
const geoserver_addr = 'https://geo.alexlipovka.com/geoserver';

// new TileLayer({
//   source: new TileWMS({
//     url: geoserver_addr + '/wms',
//     params: {'LAYERS': 'kras:water_poly', 'TILED': true, 'STYLES': 'kras:water_poly' },
//     serverType: 'geoserver',
//     transition: 0,
//   }),
// }),
var students = [
  {
    name: 'Student 1',
    source: '1',
    center: [92.852572, 56.010569],
    layers: [
      { serverName: 'sfu:landuse', legendName: 'Землепользование' },
      { serverName: 'sfu:Kacha', legendName: 'Енисей и Кача' },
      { serverName: 'sfu:amenity', legendName: 'Школы и детские сады' },
      { serverName: 'sfu:bus', legendName: 'Остановки' },
      { serverName: 'sfu:kadastr', legendName: 'Межевание' },
      { serverName: 'sfu:krt', legendName: 'КРТ' }
    ]
  },
  {
    name: 'Student 2',
    source: 'nosova',
    center: [92.852572, 56.010569],
    layers: [
      { serverName: 'sfu:natural', legendName: 'Озеленение' },
      { serverName: 'sfu:railway1', legendName: 'Ж/д' },
      { serverName: 'sfu:river', legendName: 'Река' }
    ]
  },
  {
    name: 'Student 3',
    source: 'mashukova',
    center: [92.852572, 56.010569],
    layers: [
      { serverName: 'sfu:cemetry', legendName: 'Кладбище' },
      { serverName: 'sfu:griva', legendName: 'Гремячая Грива' },
      { serverName: 'sfu:university', legendName: 'Университет' }
    ]
  },
  {
    name: 'Student 4',
    source: 'block',
    center: [92.852572, 56.010569],
    layers: [
      { serverName: 'sfu:zone', legendName: 'Зона' },
      { serverName: 'sfu:grass', legendName: 'Озеленение' },
      { serverName: 'sfu:line', legendName: 'Граница' }
    ]
  },
  {
    name: 'Student 5',
    source: 'first',
    center: [92.852572, 56.010569],
    layers: [
      { serverName: 'sfu:highway_1', legendName: 'УДС' },
      { serverName: 'sfu:natural_1', legendName: 'Река' },
      { serverName: 'sfu:building_1', legendName: 'Застройка' }
    ]
  },
  {
    name: 'Student 6',
    source: 'minusinsk',
    center: [91.686981, 53.710015],
    layers: [
      { serverName: 'sfu:graniza', legendName: 'Граница' },
      { serverName: 'sfu:highway', legendName: 'УДС' },
      { serverName: 'sfu:park', legendName: 'Парк' }
    ]
  },
  {
    name: 'Student 7',
    source: 'pilipenko',
    center: [92.852572, 56.010569],
    layers: [
      { serverName: 'sfu:building', legendName: 'Застройка'},
      { serverName: 'sfu:granica', legendName: 'Граница'},
      { serverName: 'sfu:landscaping', legendName: 'Ландшафт'},
      { serverName: 'sfu:slope', legendName: 'Уклоны'},
      { serverName: 'sfu:transportway', legendName: 'УДС'}
    ]
  },
  {
    name: 'Student 8',
    source: 'semchencko_k',
    center: [92.852572, 56.010569],
    layers: [
      { serverName: 'sfu:rekonstruktsia', legendName: 'Реконструкция'},
      { serverName: 'sfu:krt_nikolaevka', legendName: 'КРТ'},
      { serverName: 'sfu:vethoe', legendName: 'Ветхое жилье'}
    ]
  },
  {
    name: 'Student 9',
    source: 'barsegyan',
    center: [92.852572, 56.010569],
    layers: [
      { serverName: 'sfu:granica_jeleznodorojnikov', legendName: 'Граница'},
      { serverName: 'sfu:pechexod_dvijenie', legendName: 'Пешеходное движение'},
      { serverName: 'sfu:plochadi_svobodn', legendName: 'Свободные площади'}
    ]
  },
  {
    name: 'Student 10',
    source: 'semchenko_a',
    center: [92.852572, 56.010569],
    layers: [
      { serverName: 'sfu:GRANITsY_REKONSTRUKTsII_granica', legendName: 'Граница'},
      { serverName: 'sfu:mini_cores', legendName: 'Мини ядра'},
      { serverName: 'sfu:river_front', legendName: 'Речной фасад'}
    ]
  },
  {
    name: 'Student 11',
    source: 'khrushchev_e',
    center: [92.852572, 56.010569],
    layers: [
      { serverName: 'sfu:Project_border', legendName: 'Граница'},
      { serverName: 'sfu:border_terr_okn', legendName: 'Граница ОКН'},
      { serverName: 'sfu:object_okn', legendName: 'ОКН'}
    ]
  },
  {
    name: 'Student 12',
    source: 'alekseeva',
    center: [92.852572, 56.010569],
    layers: [
      { serverName: 'sfu:building', legendName: 'Застройка'},
      { serverName: 'sfu:highway', legendName: 'УДС'},
      { serverName: 'sfu:natural', legendName: 'Озеленение'}
    ]
  },
  {
    name: 'Student 13',
    source: 'alsu_minutdinova',
    center: [92.852572, 56.010569],
    layers: [
      { serverName: 'sfu:Highway', legendName: 'Подложка УДС'},
      { serverName: 'sfu:railway', legendName: 'ЖД пути'},
      { serverName: 'sfu:boundary', legendName: 'Граница анализируемой территории'}
    ]
  }
];

var layers = [
  'sfu:amenity',
];

function geoLayer(layer, style = '', z) {
  var params = {}
  params['TILED'] = true;
  params['LAYERS'] = layer;
  params['STYLES'] = style;
  return new TileLayer({
    source: new TileWMS({
      url: geoserver_addr + '/wms',
      params: params,
      serverType: 'geoserver',
      transition: 0,
    }),
    name: layer,
    zIndex: z,
  });
}

const view = new View({
  center: fromLonLat([92.852572, 56.010569]),
  zoom: 11
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
      name: 'OSM',
    }),
  ],

  view: view,
});

students.map((s, sIndex) => {
  var ul = document.getElementById('legend');
  var p = document.createElement('p');
  var p_text = document.createTextNode(s.name);
  p.classList.add('bold');
  p.addEventListener('click', function () { view.setCenter(fromLonLat(s.center)) });
  p.appendChild(p_text);
  // var map_icon = document.createElement('img');
  // map_icon.src='/img/map.png';
  // p.appendChild(map_icon);
  // var view_icon = document.createElement('img');
  // view_icon.src='/img/view.png';
  // p.appendChild(view_icon);
  // var hide_icon = document.createElement('img');
  // hide_icon.src='/img/hide.png';
  // p.appendChild(hide_icon);
  ul.appendChild(p);//.createTextNode(s.name).classList.add('bold'));
  var li = document.createElement('ul');
  ul.appendChild(li);
  ul = li;
  s.layers.map((l, lIndex) => {
    map.addLayer(geoLayer(l.serverName, '', sIndex * 10 + lIndex));
    var li = document.createElement('li');
    li.id = l.serverName;
    var legendIcon = document.createElement('img');
    legendIcon.src = 'https://geo.alexlipovka.com/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=60&HEIGHT=30&transparent=true&LAYER=' + l.serverName;
    li.appendChild(legendIcon);
    li.appendChild(document.createTextNode(l.legendName));
    ul.appendChild(li);
    li.addEventListener('click', function () { toggleVisibility(l.serverName); });
  })
});

function switchVisibility() {
  for (let i = 0; i < map.getLayers("OSM").getArray().length; i++) {
    var l = map.getLayers("OSM").getArray()[i];
    // if(l.values_.name === "kras:border") l.setVisible(!l.getVisible());
    console.log(l.values_.name);
  }
}

document.querySelector('#listLayers').addEventListener('click', switchVisibility);

function toggleVisibility(layerName) {
  console.log('Searching for layer: ' + layerName);
  for (let i = 0; i < map.getLayers().getArray().length; i++) {
    var l = map.getLayers().getArray()[i];
    if (l.values_.name === layerName) {
      l.setVisible(!l.getVisible());
      var li = document.getElementById(layerName);
      l.getVisible() ? li.classList.remove('layerInvisible') : li.classList.add('layerInvisible');
      console.log('Toggled layer: ' + layerName);
      break;
    }
  }
}

document.querySelector('#layerOSM').addEventListener('click', function () { toggleVisibility('OSM') });