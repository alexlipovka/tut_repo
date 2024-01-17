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
    // layers: ['amenity']
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