import './style.css';
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
    layers: [
      {serverName: 'sfu:landuse', legendName: 'Землепользование'},
      {serverName: 'sfu:Kacha', legendName: 'Енисей и Кача'}, 
      {serverName: 'sfu:amenity', legendName: 'Школы и детские сады'}, 
      {serverName: 'sfu:bus', legendName: 'Остановки'}, 
      {serverName: 'sfu:kadastr', legendName: 'Межевание'}, 
      {serverName: 'sfu:krt', legendName: 'КРТ'}
    ]
  },
  {
    name: 'Student 2',
    source: 'nosova',
    layers: [
      {serverName: 'sfu:natural', legendName: 'Озеленение'},
      {serverName: 'sfu:railway1', legendName: 'Ж/д'},
      {serverName: 'sfu:river', legendName: 'Река'}
    ]
  },
  {
    name: 'Student 3',
    source: 'mashukova',
    layers: [
      {serverName: 'sfu:cemetry', legendName: 'Кладбище'},
      {serverName: 'sfu:griva', legendName: 'Гремячая Грива'},
      {serverName: 'sfu:university', legendName: 'Университет'}
    ]
  },
  {
    name: 'Student 4',
    source: 'block',
    layers: [
      {serverName: 'sfu:zone', legendName: 'Зона'},
      {serverName: 'sfu:grass', legendName: 'Озеленение'},
      {serverName: 'sfu:line', legendName: 'Граница'}
    ]
  },
  {
    name: 'Student 5',
    source: 'first',
    layers: [
      {serverName: 'sfu:highway_1', legendName: 'УДС'},
      {serverName: 'sfu:natural_1', legendName: 'Река'},
      {serverName: 'sfu:building_1', legendName: 'Застройка'}
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

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
      name: 'OSM',
    }),
  ],

  view: new View({
    center: fromLonLat([92.852572, 56.010569]),
    zoom: 11
  })
});

students.map((s, sIndex) => {
  var ul = document.getElementById('legend');
  var p = document.createElement('p');
  var p_text = document.createTextNode(s.name);
  p.classList.add('bold');
  p.appendChild(p_text);
  ul.appendChild(p);//.createTextNode(s.name).classList.add('bold'));
  var li = document.createElement('ul');
  ul.appendChild(li);
  ul = li;
  s.layers.map((l, lIndex) => {
    map.addLayer(geoLayer(l.serverName, '', sIndex * 10 + lIndex));
    var li = document.createElement('li');
    var legendIcon = document.createElement('img');
    legendIcon.src='https://geo.alexlipovka.com/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=60&HEIGHT=30&transparent=true&LAYER=' + l.serverName;
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
      console.log('Toggled layer: ' + layerName);
      break;
    }
  }
}

document.querySelector('#layerOSM').addEventListener('click', function () { toggleVisibility('OSM')});