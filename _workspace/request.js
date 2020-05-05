const request = require('request');
const simplify = require('simplify-geojson');
const slim = require('json-slim');
const fs = require('fs');
const moment = require('moment');

// all-routes (full) = ck8xmyoke0ftj2knpmsoifr8c
// all-routes-b = ck9boxlpp60732tpfg9aquu7o
// all-routes-c = ck9n4gqi43gz32kmn6v9aogxs

request(
  'https://api.mapbox.com/datasets/v1/caseymmiler/ck9n4gqi43gz32kmn6v9aogxs/features?access_token=pk.eyJ1IjoiY2FzZXltbWlsZXIiLCJhIjoiY2lpeHY1bnJ1MDAyOHVkbHpucnB1dGRmbyJ9.TzUoCLwyeDoLjh3tkDSD4w',
  function (error, response, body) {
    let allRoutes = [];
    let allPoints = {};
    let totalPoints = 0;
    let egregious = 0;
    JSON.parse(body).features.forEach((feature) => {
      delete feature.id;
      if (feature.geometry.type == 'LineString') {
        let simpleFeature = simplify(feature, 0.00001);
        if (simpleFeature.geometry.coordinates.length > 150) {
          simpleFeature = simplify(feature, 0.00005);
        }
        if (simpleFeature.geometry.coordinates.length > 200) {
          simpleFeature = simplify(feature, 0.00009);
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
        // new (full) ck91o0ej104v81jmngco5ixys
        // new current ck9ekda8o0izd1ipjkxmdq5kb > ck9el8wms04nt1iqghqoqei5i
        // all routes c ck9ua93tp04tn1ilhtall5kkp
        feat.mapbox_url = encodeURI(
          `https://api.mapbox.com/styles/v1/caseymmiler/ck9ua93tp04tn1ilhtall5kkp/static/geojson(${slim(
            simpleFeature
          )})/auto/250x250@2x?access_token=pk.eyJ1IjoiY2FzZXltbWlsZXIiLCJhIjoiY2lpeHY1bnJ1MDAyOHVkbHpucnB1dGRmbyJ9.TzUoCLwyeDoLjh3tkDSD4w&before_layer=all-routes-symbols&setfilter=["==","point_date","${
            simpleFeature.properties.date
          }"]&layer_id=all-routes-symbols`
        ).replace('#', '%23');
        feat.mapbox_url_small = feat.mapbox_url.replace('250x250', '170x170')
        console.log(simpleFeature.properties.date)
        allRoutes.push(feat);
      } else {
        feature.num = parseInt(feature.properties.num);
        totalPoints ++;
        if(feature.properties.flag === 'yes'){
          egregious ++;
        }
        if (allPoints[feature.properties.point_date]) {
          allPoints[feature.properties.point_date].push(feature);
        } else {
          allPoints[feature.properties.point_date] = [feature];
        }
      }
    });
    allRoutes.sort((a, b) => new Date(b.route_date) - new Date(a.route_date));
    fs.writeFile('_data/simpleRoutesC.json', slim(allRoutes), function (err) {
      if (err) return console.log(err);
      console.log('wrote routes!');
    });
    allPoints.total = totalPoints;
    allPoints.egregious = egregious;
    fs.writeFile('_data/pointsC.json', slim(allPoints), function (err) {
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
    fs.writeFile('_data/finalC.json', slim(finalData), function (err) {
      if (err) return console.log(err);
      console.log('wrote combo data!');
    });
  }
);
