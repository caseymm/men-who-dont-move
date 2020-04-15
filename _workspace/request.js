const request = require('request');
const simplify = require('simplify-geojson');
const slim = require('json-slim');
const fs = require('fs');
const moment = require('moment');

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
          display_date: moment(simpleFeature.properties.date).format("dddd, MMMM Do")
        };
        if(simpleFeature.properties.loc){
          feat.loc = simpleFeature.properties.loc;
        }
        // new new ck91o0ej104v81jmngco5ixys
        // new ck90fc7ky060z1ilccrdhliaa
        feat.mapbox_url = encodeURI(
          `https://api.mapbox.com/styles/v1/caseymmiler/ck91o0ej104v81jmngco5ixys/static/geojson(${slim(
            simpleFeature
          )})/auto/250x250@2x?access_token=pk.eyJ1IjoiY2FzZXltbWlsZXIiLCJhIjoiY2lpeHY1bnJ1MDAyOHVkbHpucnB1dGRmbyJ9.TzUoCLwyeDoLjh3tkDSD4w&before_layer=all-routes-symbols&setfilter=["==","point_date","${
            simpleFeature.properties.date
          }"]&layer_id=all-routes-symbols`
        ).replace('#', '%23');
        feat.mapbox_url_small = feat.mapbox_url.replace('250x250', '150x150')
        console.log(simpleFeature.properties.date)
        allRoutes.push(feat);
      } else {
        feature.num = feature.properties.num;
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


    let finalData = [];
    allRoutes.forEach(r => {
      let item ={
        mapbox_url: r.mapbox_url,
        mapbox_url_small: r.mapbox_url_small,
        route_date: r.route_date,
        display_date: r.display_date,
        points: allPoints[r.route_date]
      }
      if(r.loc){
        item.loc = r.loc;
      }
      finalData.push(item);
    })
    fs.writeFile('_data/final.json', slim(finalData), function (err) {
      if (err) return console.log(err);
      console.log('wrote combo data!');
    });
  }
);
