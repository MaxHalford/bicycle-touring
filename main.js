import maplibregl from 'maplibre-gl';
import { Protocol } from 'pmtiles';
import { layers, namedFlavor } from '@protomaps/basemaps';
import { gpx } from "@tmcw/togeojson";


const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    glyphs:'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
    sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",
    sources: {
      protomaps: {
        type: "vector",
        url: `pmtiles://${location.protocol}//${location.host}${location.pathname}2023.pmtiles`,
        attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
      }
    },
    layers: layers("protomaps", namedFlavor("light"), {lang:"en"})
  }
});

map.on("load", () => {
  const myBounds = map.getSource("protomaps").bounds;
  map.setMaxBounds(myBounds);

  fetch("2023/2024-07-09_1229424080_Béziers Limoges.gpx")
  .then((res) => res.text())
  .then((gpxText) => {
    const parser = new DOMParser();
    const gpxDoc = parser.parseFromString(gpxText, "application/xml");
    const geojson = gpx(gpxDoc);

    // Add the GeoJSON to the map
    map.addSource("gpxData", {
      type: "geojson",
      data: geojson,
    });

    map.addLayer({
      id: "gpx-line",
      type: "line",
      source: "gpxData",
      paint: {
        "line-color": "#3b9ddd",
        "line-width": 4,
      },
    });
  });
});
