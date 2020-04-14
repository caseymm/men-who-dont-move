const request = require('request');
const simplify = require('simplify-geojson');
const slim = require('json-slim');
const fs = require('fs');

request(
  'https://api.mapbox.com/datasets/v1/caseymmiler/ck8xmyoke0ftj2knpmsoifr8c/features?access_token=pk.eyJ1IjoiY2FzZXltbWlsZXIiLCJhIjoiY2lpeHY1bnJ1MDAyOHVkbHpucnB1dGRmbyJ9.TzUoCLwyeDoLjh3tkDSD4w',
  function (error, response, body) {
    let allRoutes = [];
    let allPoints = {};
    JSON.parse(body).features.forEach((feature) => {
      delete feature.id;
      if (feature.geometry.type == 'LineString') {
        let simpleFeature = simplify(feature, 0.00001);
        if (simpleFeature.geometry.coordinates.length > 150) {
          simpleFeature = simplify(feature, 0.00005);
        }
        simpleFeature.properties.stroke = '#391bfe';
        simpleFeature.properties['stroke-width'] = 1.5;
        delete simpleFeature.properties.coordTimes;
        console.log(simpleFeature.geometry.coordinates.length);
        let feat = {
          type: 'FeatureCollection',
          features: [simpleFeature],
          mapbox_url: '',
          route_date: simpleFeature.properties.date,
        };
        feat.mapbox_url = encodeURI(
          `https://api.mapbox.com/styles/v1/caseymmiler/ck8xp2wax4aev1iqi3dvpggnp/static/geojson(${slim(
            simpleFeature
          )})/auto/300x300@2x?access_token=pk.eyJ1IjoiY2FzZXltbWlsZXIiLCJhIjoiY2lpeHY1bnJ1MDAyOHVkbHpucnB1dGRmbyJ9.TzUoCLwyeDoLjh3tkDSD4w&before_layer=all-routes-points&setfilter=["==","point_date","${
            simpleFeature.properties.date
          }"]&layer_id=all-routes-points`
        ).replace('#', '%23');
        allRoutes.push(feat);
      } else {
        if (allPoints[feature.properties.point_date]) {
          allPoints[feature.properties.point_date].push(feature);
        } else {
          allPoints[feature.properties.point_date] = [feature];
        }
      }
    });
    allRoutes.sort((a, b) => new Date(b.route_date) - new Date(a.route_date));
    fs.writeFile('_data/simpleRoutes.json', slim(allRoutes), function (err) {
      if (err) return console.log(err);
      console.log('wrote routes!');
    });
    fs.writeFile('_data/points.json', slim(allPoints), function (err) {
      if (err) return console.log(err);
      console.log('wrote points!');
    });
  }
);
