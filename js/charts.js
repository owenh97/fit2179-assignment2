// ─────────────────────────────────────────────────────
// GLOBAL CONFIG
// ─────────────────────────────────────────────────────
const C = {
  green: "#2d4a3e", gold: "#c9a84c",
  cream: "#f5f0e8", grid: "#ede8df",
  text: "#1a1a1a", muted: "#888888", white: "#ffffff"
};

const globalConfig = {
  "font": "Inter, sans-serif",
  "background": C.white,
  "padding": {"top": 20, "right": 20, "bottom": 20, "left": 20},
  "view": {"stroke": null, "fill": C.white},
  "axis": {
    "labelFont": "Inter, sans-serif", "titleFont": "Inter, sans-serif",
    "labelFontSize": 11, "titleFontSize": 12, "titleFontWeight": 600,
    "titleColor": C.text, "labelColor": "#555",
    "gridColor": C.grid, "gridOpacity": 1,
    "domainColor": "#d0c9bc", "tickColor": "#d0c9bc",
    "labelPadding": 6, "titlePadding": 10
  },
  "legend": {
    "labelFont": "Inter, sans-serif", "titleFont": "Inter, sans-serif",
    "labelFontSize": 11, "titleFontSize": 11, "titleFontWeight": 600,
    "titleColor": C.text, "labelColor": "#555",
    "padding": 8, "cornerRadius": 5, "symbolSize": 100
  },
  "title": {
    "font": "Inter, sans-serif", "subtitleFont": "Inter, sans-serif",
    "fontSize": 14, "fontWeight": 700,
    "subtitleFontSize": 10, "subtitleColor": C.muted,
    "color": C.text, "anchor": "start", "offset": 10, "subtitlePadding": 4
  },
  "bar": {"cornerRadiusTopLeft": 3, "cornerRadiusTopRight": 3},
  "arc": {"stroke": C.white, "strokeWidth": 1.5},
  "line": {"strokeWidth": 2.5}
};
const embedOpts = { actions: false, config: globalConfig };

const industryDomain = ["Metals & Mining","Real Estate","Technology","Finance & Investments","Diversified","Manufacturing","Fashion & Retail","Food & Beverage","Construction & Engineering","Gambling & Casinos","Healthcare","Automotive","Energy","Logistics","Telecom"];
const industryRange  = ["#4e79a7","#f28e2b","#e15759","#76b7b2","#59a14f","#edc948","#b07aa1","#ff9da7","#9c755f","#bab0ac","#86bcb6","#e4a97a","#d4a6c8","#c5c9c7","#aecde8"];
const countryDomain  = ["Australia","Malaysia","United States","China","India","Germany","United Kingdom","Singapore","Other"];
const countryRange   = [C.green, C.gold, "#e15759","#4e79a7","#f28e2b","#76b7b2","#59a14f","#b07aa1","#d8d0c4"];


// ─── CHART 1: World Map ───────────────────────────────
vegaEmbed('#map_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Global Distribution of Billionaires",
            "subtitle": "Circle size = billionaire count  ·  Colour = wealth concentration  ·  Hover for details  ·  Source: Billionaires Statistics Dataset 2023"},
  "width": "container", "height": 480,
  "autosize": {"type": "fit", "contains": "padding"},
  "view": {"fill": "#c8e4f0", "stroke": null},
  "projection": {"type": "naturalEarth1"},
  "layer": [
    {"data": {"sphere": {}}, "mark": {"type": "geoshape", "fill": "#c8e4f0", "stroke": null}},
    {"data": {"url": "https://unpkg.com/world-atlas@2/countries-50m.json",
              "format": {"type": "topojson", "feature": "land"}},
     "mark": {"type": "geoshape", "fill": "#ddd5bf", "stroke": "#f0ece4", "strokeWidth": 0.7}},
    {"data": {"url": "https://unpkg.com/world-atlas@2/countries-50m.json",
              "format": {"type": "topojson", "feature": "countries"}},
     "mark": {"type": "geoshape", "fill": null, "stroke": "#f0ece4", "strokeWidth": 0.4}},
    {"data": {"url": "data/map_data.csv"},
     "mark": {"type": "circle", "opacity": 0.80, "stroke": "#ffffff", "strokeWidth": 0.8},
     "encoding": {
       "longitude": {"field": "lon", "type": "quantitative"},
       "latitude":  {"field": "lat", "type": "quantitative"},
       "size": {"field": "billionaire_count", "type": "quantitative", "title": "Billionaires",
                "scale": {"range": [20, 2800], "type": "sqrt"},
                "legend": {"orient": "bottom-left", "values": [1,10,50,200,754]}},
       "color": {"field": "billionaire_count", "type": "quantitative",
                 "scale": {"scheme": "orangered", "domain": [1,754]}, "legend": null},
       "tooltip": [
         {"field": "country", "title": "Country"},
         {"field": "billionaire_count", "title": "Billionaires"},
         {"field": "total_wealth", "title": "Total Wealth (USD B)", "format": ",.0f"}
       ]
     }
    }
  ]
}, embedOpts);


// ─── CHART 2: Malaysia Choropleth Map ───
// Define the new TopoJSON object at the top of this chart segment
const topoJson_MY = {
  "type":"Topology",
  "transform":{"scale":[0.002840497942569259,0.0030113831331985866],"translate":[100.11978149414062,0.8623941932270406]},
  "arcs":[[[535,786],[42,-13],[-3,-45],[-29,-5],[-10,63]],[[4324,1503],[9,-33],[-19,-2],[-6,20],[16,15]],[[549,700],[19,-5],[0,-9],[-21,-2],[2,16]],[[1238,596],[42,-11],[29,-62],[42,-42],[1,-35],[53,-77],[61,-152],[-2,-50],[-170,39],[-68,-45],[-56,-9],[-30,73],[-147,67],[-43,38],[-47,6],[-69,75]],[[834,411],[18,96],[20,7]],[[872,514],[37,140]],[[909,654],[34,-10],[61,-70],[63,-24],[72,23],[89,-42],[10,65]],[[77,1566],[3,132],[-53,94]],[[27,1792],[60,65],[0,29]],[[87,1886],[101,-32],[56,0],[14,-70],[85,10],[9,-96],[-46,-64]],[[306,1634],[-21,-94],[-26,-52],[-41,-8],[-66,-79],[-21,16]],[[131,1417],[20,5],[-7,137],[-67,7]],[[851,1655],[-56,-51],[19,-107],[-7,-63],[33,-32],[12,-59],[41,-49]],[[893,1294],[-18,-24],[-85,8],[-47,-28],[-37,30],[-63,14],[-1,-34],[-43,20],[-70,-57],[-88,23]],[[441,1246],[-14,23],[39,59],[-8,39],[36,95],[75,29],[2,51],[-30,5],[12,78]],[[553,1625],[45,1],[45,37],[11,53],[40,69],[96,-33],[61,-97]],[[834,411],[-118,39],[-63,57]],[[653,507],[71,37],[66,-2],[82,-28]],[[653,507],[-42,8],[-21,54],[-29,6]],[[561,575],[13,92],[47,-1],[30,52],[-19,78]],[[632,796],[168,-47],[109,-95]],[[1162,1100],[6,-71],[-25,-14],[-14,-64],[53,-72],[-23,-52],[13,-51],[-6,-86],[14,-38],[58,-56]],[[632,796],[-54,47],[18,67],[-66,56]],[[530,966],[-18,108],[-42,41],[-6,56],[-29,4],[6,71]],[[893,1294],[67,-27],[12,-70],[44,-9],[-27,-51],[0,-63],[50,6],[83,-65],[5,84],[35,1]],[[97,1416],[4,71],[-24,79]],[[131,1417],[-34,-1]],[[48,1534],[32,-21],[-18,-43],[-35,6],[21,58]],[[245,992],[-40,13],[24,65],[-54,26],[-17,51],[15,36],[-24,150],[-37,12],[-15,71]],[[306,1634],[53,-56],[49,67],[108,40],[37,-60]],[[530,966],[-98,-20],[-96,8],[-6,21],[-85,17]],[[27,1792],[-27,52],[18,94],[43,4],[26,-56]],[[4381,1362],[53,57],[-72,60],[87,100],[47,-33],[50,22],[4,50],[52,28],[25,110],[195,191],[33,-46],[83,31],[26,98],[65,-16],[20,-107],[75,2],[74,-58],[0,-69],[-53,-20],[35,-91],[122,55],[37,-68],[317,-148],[31,18],[42,-26],[12,-63],[-75,-46],[-200,-47],[-54,35],[-73,-44],[52,-82],[174,-65],[-87,-29],[-197,-46],[-120,53],[-9,-69],[-50,4],[-73,63],[-81,-15],[-159,16],[-47,-27],[-26,30],[-71,-1],[-28,-37],[-67,38],[-26,-55],[-51,-36]],[[4473,1079],[0,68],[-32,15],[-12,82],[40,55],[-18,70],[-70,-7]],[[4473,1079],[-30,-170],[25,-57],[-28,5],[-26,-140],[-120,-27],[-25,-36],[1,-132],[-65,-60],[-34,7],[-8,-138],[-78,-141],[-60,26],[-66,-35],[-17,18],[-124,-30],[6,-25],[-76,-29],[-14,30],[-51,-5],[-30,29],[-66,4],[-25,53],[-210,14],[-96,-49],[-20,-102],[-80,-6],[-32,-40],[-61,13],[-45,-25],[-17,26],[-95,15],[-109,-20],[-31,-28],[-83,-24],[-106,45],[-32,63],[-42,7],[-41,64],[-40,9],[-63,64],[8,53],[-37,7],[-18,40],[32,20],[123,-102],[182,16],[2,-43],[94,-22],[18,25],[68,-33],[69,197],[0,97],[27,11],[6,118],[39,-47],[91,62],[466,106],[166,205],[124,120],[58,68],[-2,87],[98,-22],[29,-89],[41,5],[62,-85],[66,40],[31,91],[-26,11],[-23,96],[74,31],[21,-24],[26,-124],[68,-14],[-4,100],[-38,111],[54,-20],[27,18]],[[561,575],[-83,33],[-74,66],[33,36],[-20,75],[-42,42],[-46,82],[-83,59],[-1,24]],[[851,1655],[105,-86],[51,-23],[74,-83],[88,-161],[1,-103],[18,-49],[-26,-50]]],"objects":{"states":{"type":"GeometryCollection","geometries":[{"type":"Polygon","arcs":[[0]],"id":"Kuala Lumpur","properties":{"Name":"Kuala Lumpur"}},{"type":"Polygon","arcs":[[1]],"id":"Labuan","properties":{"Name":"Labuan"}},{"type":"Polygon","arcs":[[2]],"id":"Putrajaya","properties":{"Name":"Putrajaya"}},{"type":"Polygon","arcs":[[3,4,5,6]],"id":"Johor","properties":{"Name":"Johor"}},{"type":"Polygon","arcs":[[7,8,9,10,11]],"id":"Kedah","properties":{"Name":"Kedah"}},{"type":"Polygon","arcs":[[12,13,14,15]],"id":"Kelantan","properties":{"Name":"Kelantan"}},{"type":"Polygon","arcs":[[16,17,-5]],"id":"Melaka","properties":{"Name":"Melaka"}},{"type":"Polygon","arcs":[[18,19,20,-6,-18]],"id":"Negeri Sembilan","properties":{"Name":"Negeri Sembilan"}},{"type":"Polygon","arcs":[[21,-7,-21,22,23,-14,24]],"id":"Pahang","properties":{"Name":"Pahang"}},{"type":"MultiPolygon","arcs":[[[25,-12,26]],[[27]]],"id":"Penang","properties":{"Name":"Penang"}},{"type":"Polygon","arcs":[[28,-27,-11,29,-15,-24,30]],"id":"Perak","properties":{"Name":"Perak"}},{"type":"Polygon","arcs":[[31,-9]],"id":"Perlis","properties":{"Name":"Perlis"}},{"type":"Polygon","arcs":[[32,33]],"id":"Sabah","properties":{"Name":"Sabah"}},{"type":"Polygon","arcs":[[-34,34]],"id":"Sarawak","properties":{"Name":"Sarawak"}},{"type":"Polygon","arcs":[[35,-31,-23,-20],[-1],[-3]],"id":"Selangor","properties":{"Name":"Selangor"}},{"type":"Polygon","arcs":[[36,-25,-13]],"id":"Terengganu","properties":{"Name":"Terengganu"}}]}},"bbox":[100.11978149414062,0.8623941932270406,119.267578125,6.975501953620172]}
};

vegaEmbed('#malaysia_map', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Malaysian Billionaires by State",
            "subtitle": "Colour intensity = billionaires per state  ·  Circle = individual billionaire (size = wealth)  ·  Source: Forbes 2025"},
  "width": 820, "height": 460,
  "view": {"fill": "#c8e4f0", "stroke": null},
  "params": [{"name": "grid", "select": "interval", "bind": "scales"}],
  "projection": {"type": "mercator", "center": [109.5, 4.2], "scale": 3400}, // Adjusted zoom scale & center for Malaysia
  "layer": [
    {"data": {"sphere": {}}, "mark": {"type": "geoshape", "fill": "#c8e4f0"}},
    {
      "data": {
        "values": topoJson_MY,
        "format": {"type": "topojson", "feature": "states"}
      },
      "mark": {"type": "geoshape", "fill": "#e8e0c8", "stroke": "#c8b98a", "strokeWidth": 1.0}
    },
    {
      "data": {"values": [
        {"region": "Kuala Lumpur & Selangor", "lat": 3.14, "lon": 101.69, "billionaires": 17},
        {"region": "Penang",                  "lat": 5.41, "lon": 100.33, "billionaires": 1},
        {"region": "Johor Bahru",             "lat": 1.49, "lon": 103.74, "billionaires": 1}
      ]},
      "layer": [
        {
          "mark": {"type": "circle", "opacity": 0.18, "stroke": null},
          "encoding": {
            "longitude": {"field": "lon", "type": "quantitative"},
            "latitude": {"field": "lat", "type": "quantitative"},
            "size": {"field": "billionaires", "type": "quantitative", "scale": {"range": [400, 2500]}, "legend": null},
            "color": {"field": "billionaires", "type": "quantitative", "scale": {"scheme": "greens"}, "legend": null}
          }
        }
      ]
    },
    {
      "data": {"values": [
        {"label": "Kuala Lumpur", "lat": 3.16,  "lon": 101.69},
        {"label": "Penang",       "lat": 5.45,  "lon": 100.33},
        {"label": "Johor Bahru",  "lat": 1.52,  "lon": 103.74},
        {"label": "Kota Kinabalu","lat": 5.98,  "lon": 116.07},
        {"label": "Kuching",      "lat": 1.55,  "lon": 110.34}
      ]},
      "mark": {"type": "text", "fontSize": 10, "fontWeight": 600, "color": "#5a4a2a", "dy": -14},
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude": {"field": "lat", "type": "quantitative"},
        "text": {"field": "label", "type": "nominal"}
      }
    },
    {
      "data": {"url": "data/malaysia_billionaires.csv"},
      "mark": {"type": "circle", "opacity": 0.90, "stroke": "#ffffff", "strokeWidth": 1.8},
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude":  {"field": "lat", "type": "quantitative"},
        "size": {"field": "wealth", "type": "quantitative", "title": "Wealth (USD B)",
                 "scale": {"range": [40, 400], "type": "sqrt"},
                 "legend": {"orient": "bottom-right", "values": [1,3,6,9,12], "title": "Wealth (USD B)"}},
        "color": {"field": "industry", "type": "nominal", "title": "Industry",
                  "scale": {"domain": industryDomain, "range": industryRange},
                  "legend": {"orient": "right", "labelLimit": 180}},
        "tooltip": [
          {"field": "name",     "title": "Name"},
          {"field": "city",     "title": "City"},
          {"field": "wealth",   "title": "Wealth (USD B)", "format": ".1f"},
          {"field": "industry", "title": "Industry"}
        ]
      }
    }
  ]
}, embedOpts);

// ─── CHART 3: Australia Choropleth Map ───
// Define the Australia TopoJSON object
const topoJson_AUS = {
  "type": "Topology",
  "objects": {
    "collection": {
      "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:EPSG:3112"}},
      "type": "GeometryCollection",
      "ac-tx": {
        "default": {
          "crs": "+proj=lcc +lat_1=-18 +lat_2=-36 +lat_0=0 +lon_0=134 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
          "scale": 0.0020146392149223303
        }
      },
      "geometries": [{"type": "Polygon", "arcs": [[0, 1]]}, {
        "type": "MultiPolygon",
        "arcs": [[[2]], [[3]], [[4]], [[5]], [[6]], [[7]], [[8]], [[9]], [[10]], [[11]], [[12, 13, 14, 15]], [[16]], [[17]]]
      }, {
        "type": "MultiPolygon",
        "arcs": [[[18]], [[19]], [[20]], [[21]], [[22]], [[-15, 23, 24]]]
      }, {"type": "Polygon", "arcs": [[25]]}, {
        "type": "Polygon",
        "arcs": [[-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72], [-26]]
      }, {
        "type": "MultiPolygon",
        "arcs": [[[73]], [[74, 75, -24, -14, 76, 77, 78]]]
      }, {
        "type": "MultiPolygon",
        "arcs": [[[79]], [[80]], [[-75, -54, 81, -52, 82, -50, 83, -48, 84, 85, -45, 86, -43, 87, -41, 88, -39, 89, -37, 90, -35, 91, -33, 92, -31, 93, -29, 94, 95]]]
      }, {
        "type": "MultiPolygon",
        "arcs": [[[96]], [[97]], [[98]], [[99]], [[100]], [[101]], [[102]], [[103]], [[104]], [[-77, -13, 105, -72, 106, -70, 107, -68, 108, 109, -65, 110, 111, -62, 112, -60, 113, -58, 114]], [[115]], [[116]]]
      }, {
        "type": "MultiPolygon",
        "arcs": [[[117]], [[118]], [[119]], [[120]], [[121]], [[122]], [[123]], [[124]], [[125]]]
      }]
    }
  },
  "arcs": [[[8951, 2414], [22, 16]], [[8973, 2430], [11, -18], [-33, 2]], [[6001, 8430], [24, -19], [-5, -57], [-36, 39], [17, 37]], [[5895, 8427], [-28, -4], [8, 27], [21, 5], [-1, -28]], [[5672, 8646], [-21, -4], [11, 21], [10, -17]], [[5818, 8988], [-13, -32], [-16, 26], [-17, -16], [27, 46], [19, -24]], [[5939, 9001], [1, -46], [26, 0], [5, 27], [23, -18], [-44, -41], [-16, -69], [72, 7], [-9, -39], [-171, 19], [33, 32], [-7, 90], [51, 1], [-5, 39], [41, -2]], [[5797, 9073], [-16, -30], [-13, 59], [29, -29]], [[4798, 9622], [14, -18], [-32, 10], [18, 8]], [[5878, 9654], [-79, -48], [86, 67], [-7, -19]], [[4186, 9662], [19, -69], [51, -30], [-164, -7], [7, 42], [36, 7], [-16, 49], [34, 47], [20, 8], [13, -47]], [[4218, 9722], [54, -47], [62, 40], [29, -30], [35, 50], [20, -45], [13, 64], [9, -27], [35, 9], [32, -63], [-17, -43], [-25, 7], [-115, -110], [-132, 82], [-36, 145], [36, -32]], [[6264, 8139], [-42, -1397], [-41, -1383]], [[6181, 5359], [-1112, 17], [-1110, -26]], [[3959, 5350], [-29, 814], [-31, 816], [-31, 820], [-30, 827]], [[3838, 8627], [51, -31], [11, -76], [-1, 119], [68, -26], [57, -77], [-11, 109], [90, 12], [-1, 27], [-48, -33], [-36, 18], [-24, 41], [55, 26], [-70, -6], [-46, 62], [26, 85], [29, -12], [5, 29], [36, 3], [37, 168], [22, -28], [98, 59], [-59, 53], [0, 67], [52, 12], [8, 71], [41, 23], [23, -33], [29, 4], [-37, 22], [4, 67], [57, -8], [2, -45], [31, -16], [19, 4], [-27, 33], [27, -5], [-41, 40], [62, 9], [-9, 69], [66, -26], [9, 58], [43, -73], [125, 25], [45, -26], [53, 46], [36, -18], [2, -50], [14, 69], [88, 7], [-35, 20], [-12, 85], [28, 40], [-79, 63], [-92, -25], [-31, 51], [-58, 11], [31, 43], [18, -24], [9, 37], [39, -24], [26, -61], [-17, 84], [38, -40], [16, 45], [10, -49], [27, 15], [57, -83], [61, 28], [5, 27], [72, -112], [101, -13], [0, -36], [107, 44], [-20, -40], [82, -8], [13, -59], [28, 33], [85, -29], [48, 34], [26, -54], [98, -53], [-12, 22], [46, -6], [-31, 17], [39, 30], [62, -4], [35, 24], [-37, -10], [4, 27], [50, 12], [36, 49], [-52, -72], [56, 9], [-75, -59], [22, -45], [90, 75], [-33, -45], [35, -7], [-12, -66], [64, 2], [33, 60], [-53, 22], [109, 83], [-26, -28], [52, -85], [22, -1], [-19, 18], [24, 12], [61, -57], [-61, -57], [10, 25], [-17, -5], [-39, -106], [-13, 26], [-25, -8], [51, -69], [-45, 8], [19, -25], [-28, -56], [-41, -18], [19, 25], [-15, 53], [-48, -64], [-3, 43], [-27, -57], [-11, 29], [-35, -32], [23, -30], [-31, -10], [7, -76], [52, 14], [-48, -159], [-149, -155], [21, -59], [208, -150], [13, -45], [85, -46], [31, -69], [76, 20], [96, -80], [103, -41], [66, -89]], [[5966, 9805], [-13, -57], [-68, -71], [81, 128]], [[4798, 9805], [4, -93], [-37, 96], [36, 20], [-3, -23]], [[0, 5062], [90, -179], [-79, 94], [-11, 85]], [[414, 6509], [-30, -9], [32, 61], [-2, -52]], [[2644, 8438], [27, -40], [-31, -16], [12, 21], [-34, 2], [26, 33]], [[2738, 8532], [0, -19], [-19, 16], [19, 3]], [[2804, 8682], [-17, -51], [-8, 44], [25, 7]], [[3959, 5350], [31, -832], [31, -833]], [[4021, 3685], [-392, -191], [-305, -23], [-254, -189], [-143, -63], [-45, -160], [-91, -117], [-33, 11], [-50, -40], [-33, 41], [-103, -40], [-50, 10], [-18, -35], [-37, -3], [-26, 56], [-46, -26], [-108, 12], [-209, -71], [-88, 6], [-96, -77], [-17, -53], [22, -19], [-34, 0], [-35, -52], [-92, 12], [-20, -57], [-59, -40], [-5, -47], [-52, -22], [11, -20], [-82, -14], [29, -23], [-62, 14], [-11, -30], [-102, 26], [-123, -32], [-58, 21], [24, 7], [-29, 21], [-1, -19], [-92, 11], [-99, 101], [-78, 30], [-36, -24], [-30, 31], [-34, 209], [52, -27], [38, 9], [63, 118], [-49, 174], [17, 46], [14, -77], [-39, 293], [-204, 339], [-48, 138], [-14, 160], [-48, 102], [-67, 69], [-31, 89], [-105, 105], [-71, 223], [-259, 298], [33, -18], [-3, 70], [36, -108], [-21, 105], [50, -128], [5, 58], [18, -80], [8, 39], [21, -60], [43, 47], [-4, 51], [-87, 61], [-53, 97], [14, 68], [75, -98], [6, -92], [26, 27], [-6, 51], [60, -122], [22, -13], [27, 44], [-15, 138], [-176, 195], [-109, 228], [14, 146], [47, 99], [-14, 154], [-55, 96], [65, 230], [34, 16], [-9, -111], [30, -37], [-4, -56], [53, 12], [20, 149], [15, -10], [16, 63], [197, 132], [156, 219], [65, 20], [76, 94], [23, -49], [73, 45], [56, -32], [95, 35], [95, 103], [166, 44], [65, 101], [131, -12], [34, 35], [161, 47], [187, 124], [89, 143], [15, 107], [39, 22], [5, 58], [135, 125], [-7, 30], [-46, -4], [-22, 187], [27, 78], [48, 56], [34, -12], [-8, 56], [64, 7], [-20, 53], [59, 71], [-1, -75], [42, -15], [9, -66], [130, -190], [-9, 179], [89, -61], [-35, 61], [18, -5], [20, 60], [-42, -22], [-81, 64], [25, 33], [-51, 12], [60, -5], [-40, 32], [56, -2], [-24, 18], [21, 11], [-47, 16], [4, 24], [56, 12], [16, -18], [-25, -11], [36, -17], [2, -31], [7, 28], [27, -9], [-25, 45], [87, -45], [182, 12], [-135, 10], [2, 83], [26, -35], [19, 20], [-1, 65], [31, 31], [-32, -3], [-30, -60], [-40, 138], [68, 12], [2, 27], [12, -18], [-10, 67], [146, -69], [-32, 28], [17, 33], [-70, -2], [43, 44], [-48, -30], [-10, 32], [48, 15], [-8, 39], [19, 3], [29, -56], [-3, 45], [35, -36], [40, 3], [-20, 25], [16, 13], [-67, 15], [32, 20], [-49, 41], [52, 75], [1, -33], [11, 22], [16, -30], [11, 47], [28, -15], [-2, 94], [35, -9], [-18, -111], [17, 71], [37, -14], [20, -53], [1, 37], [30, 1], [-18, 40], [43, 77], [-44, 16], [-5, 24], [32, -8], [-23, 29], [36, 3], [-9, -30], [29, 20], [-13, -40], [36, -39], [8, 51], [52, 43], [-18, -47], [44, -42], [25, 76], [39, 11], [-32, 46], [26, -7], [5, 24], [43, -8], [32, -56], [9, 27], [10, -20], [61, 6], [152, -181], [79, -39], [-29, -42], [-16, -193], [23, 95], [47, -64], [-30, 102], [30, 47], [11, -39], [28, 0], [-18, 73], [165, -15]], [[8661, 2402], [-48, -14], [-25, -125], [-35, -5], [-32, 75], [19, 93], [78, 47], [43, -71]], [[8951, 2414], [-92, -147], [-22, 1], [6, -32], [-43, -69], [5, -71], [-87, -222], [33, -55], [-23, -2], [2, -16], [-5, -22], [3, -25], [-3, -4]], [[8725, 1750], [-89, 63]], [[8636, 1813], [-89, 65], [-45, 32], [-45, 32], [-91, 64], [-5, 4], [-12, 2], [-6, 2], [-3, 2], [22, 32], [4, 16]], [[8366, 2064], [-49, 188]], [[8317, 2252], [-41, 26], [-37, -14]], [[8239, 2264], [-4, 3], [-1, 5], [-3, 4]], [[8231, 2276], [-4, 4], [-3, 2], [-36, -36], [-4, 5], [-4, 3], [-27, 0], [-10, 9], [-10, -9], [-1, -3], [0, -1], [-4, -6], [2, -18], [4, -9]], [[8134, 21217], [18, -10]], [[8152, 2207], [-21, -4], [-13, 22], [0, 10], [3, 9]], [[8121, 2244], [-9, 7], [-11, -8]], [[8101, 2243], [-17, 12], [-8, -3], [-47, 36], [-93, -8], [-156, 82], [-109, 0], [-4, -1], [-5, -4], [-1, -2], [-2, -18], [-6, -9], [-2, -5]], [[7651, 2323], [2, -6], [6, -12]], [[7659, 2305], [1, -5], [-2, -5]], [[7658, 2295], [-54, -7]], [[7604, 2288], [-131, 175], [-110, 80]], [[7363, 2543], [-3, 6], [4, 7]], [[7364, 2556], [1, 12], [-1, 5], [-4, 4], [-4, 3], [-19, 7], [-9, 8]], [[7328, 2595], [-7, 12], [-4, 11]], [[7317, 2618], [-1, 97], [-119, 69], [-3, -1], [-5, -3], [-7, -1], [-23, -53], [-21, 7]], [[7138, 2733], [-5, 6], [0, 8], [-9, 24], [0, 12]], [[7124, 2783], [-17, 17]], [[7107, 2800], [-1, 4], [-1, 27], [0, 6], [7, 26], [-75, 70], [-48, -1], [-20, 10], [-10, -1], [-39, -31]], [[6920, 2910], [-68, 47]], [[6852, 2957], [-1, 0], [-1, 0]], [[6850, 2957], [-5, -3]], [[6845, 2954], [-4, 0]], [[6841, 2954], [-7, 7], [-26, 2]], [[6808, 2963], [-4, 4], [-6, 10]], [[6798, 2977], [38, 736]], [[6836, 3713], [39, 736]], [[6875, 4449], [116, -8], [116, -7], [235, -17], [464, -40]], [[7806, 4377], [466, -4], [232, -27], [116, -14], [115, -15], [47, -5], [2, 0], [33, 40], [16, 4], [5, 2]], [[8838, 4316], [62, 32]], [[8900, 4348], [20, 27], [196, -12], [6, -4], [9, -9], [11, -18], [6, -8], [10, -4], [31, -5], [10, 0], [22, 3], [10, -2]], [[9231, 4316], [57, -37]], [[9288, 4279], [1, -6], [-2, -16], [1, -6], [4, -4], [18, -5], [29, -25], [0, -53], [5, -8], [-2, -9], [2, -4], [6, -2], [2, 0], [5, 2], [5, 1]], [[9362, 4144], [26, 24]], [[9388, 4168], [0, 1], [1, 8], [3, 5]], [[9392, 4182], [6, 11], [3, 4]], [[9401, 4197], [2, 1]], [[9403, 4198], [3, 0], [5, 0], [14, 4], [19, 8]], [[9444, 4210], [20, -29], [48, 16]], [[9512, 4197], [10, 24], [5, 21]], [[9527, 4242], [0, 1], [1, 2], [3, 4], [1, 2], [-17, 51], [135, 61], [16, -23], [13, 10], [3, -2]], [[9682, 4348], [5, -6], [1, -3]], [[9688, 4339], [21, -13], [86, -14]], [[9795, 4312], [116, 35], [-19, -203], [-78, -109], [-36, -156], [-110, -251], [15, -60], [-58, -155], [-113, -149], [-17, -115], [-84, -62], [-36, 5], [26, -25], [-95, -23], [-68, -109], [-27, 2], [-15, -65], [-44, 5], [22, -28], [-26, -97], [-45, -10], [30, -13], [-116, -134], [23, -20], [-52, -73], [24, -48], [-15, -24], [0, 28], [-21, 0], [-3, -28]], [[6012, 2551], [-6, -48], [47, -22], [35, 23], [35, -41], [-112, -10], [-40, -49], [-52, 31], [-115, -22], [-41, 46], [16, 45], [233, 47]], [[6798, 2977], [-68, -1196]], [[6730, 1781], [-62, 0], [-62, 48], [-137, 228], [-12, 68], [46, 53], [-25, 119], [-57, 126], [-116, 119], [115, -109], [47, -92], [-41, 100], [-94, 91], [27, 28], [15, -56], [24, 0], [-25, 55], [32, 4], [2, 33], [-40, 20], [-51, -27], [15, -32], [-54, 12], [45, -20], [-56, 6], [-49, -31], [-96, 11], [77, 79], [31, 166], [-101, 197], [-84, -294], [-208, -31], [44, 103], [98, -7], [6, 225], [37, 82], [78, 74], [-25, 105], [55, 52], [-57, 167], [-4, -137], [-33, 8], [-44, -52], [-56, -149], [-64, -7], [-15, -21], [19, 0], [-83, -43], [-109, -131], [-10, -53], [-37, 1], [-33, -79], [50, 17], [-14, -77], [-41, 44], [-33, -27], [-78, 108], [-41, -2], [24, 49], [36, -58], [31, 4], [-26, 13], [-29, 169], [-95, 108], [-30, 136], [-29, 8], [10, -29], [-34, 26], [-34, -15], [-42, 54], [15, 13], [-34, 14], [-1, 61], [36, 0], [0, -23], [13, 63], [-33, 40], [-64, -25], [22, 44], [-65, 82], [-93, -32], [-117, 77], [-126, -25], [-107, 87], [-143, 71], [-91, -42], [-149, 7], [-270, -45]], [[6181, 5359], [739, -35], [-45, -875]], [[6875, 4449], [-5, -92], [-4, -92], [-10, -183], [-20, -369]], [[6836, 3713], [-18, -369], [-10, -184], [-5, -92], [-5, -91]], [[7680, 1569], [-51, 2], [38, 19], [13, -21]], [[7688, 1626], [29, -14], [-40, -14], [-3, 36], [14, -8]], [[6808, 2963], [33, -9]], [[6845, 2954], [1, 0], [4, 3]], [[6852, 2957], [61, -32], [7, -15]], [[7107, 2800], [14, -13], [3, -4]], [[7124, 2783], [14, -50]], [[7317, 2618], [11, -23]], [[7364, 2556], [-1, -13]], [[7604, 2288], [35, 1], [15, -8], [4, 0]], [[7659, 2305], [-8, 18]], [[8101, 2243], [20, 1]], [[8152, 2207], [-3, 4], [-15, 6]], [[8231, 2276], [8, -12]], [[8317, 2252], [18, -18], [31, -170]], [[8636, 1813], [46, -32], [43, -31]], [[8725, 1750], [-18, -10], [-26, 2], [-13, 14], [-14, -51], [-44, -22], [-261, 22], [-127, -34], [-219, -185], [-136, 5], [7, -60], [45, 25], [-27, -96], [-39, 86], [-18, 17], [-40, -22], [-17, 79], [-46, -5], [-46, 48], [43, 41], [-16, 47], [-46, 2], [-9, -51], [-65, -22], [-54, 58], [66, -9], [34, 52], [-34, 90], [-128, -62], [71, -16], [-14, -40], [-55, 0], [-202, -150], [-217, 162], [-71, -3], [-88, 48], [-49, -51], [-34, 14], [-3, 33], [-85, 75]], [[9914, 4588], [-4, 87], [23, 10], [-19, -97]], [[9989, 5351], [10, -82], [-111, -215], [-18, 66], [41, 69], [-9, 36], [60, 45], [-14, 64], [41, 17]], [[9481, 5811], [48, -18], [-1, -84], [-63, 93], [16, 9]], [[9403, 6164], [-22, -12], [4, 37], [18, -25]], [[9086, 6805], [-31, 0], [20, 38], [11, -38]], [[8507, 7330], [-17, -5], [5, 22], [12, -17]], [[8417, 7492], [25, -58], [-18, -23], [-47, 72], [40, 9]], [[6676, 7958], [-44, 1], [26, 33], [18, -34]], [[6718, 8149], [2, -23], [-41, 15], [-31, -53], [-56, -15], [-15, 19], [-10, -28], [6, 41], [35, 42], [110, 2]], [[6264, 8139], [77, -62], [188, -53], [38, -43], [19, -86], [197, -123], [135, 13], [93, 53], [33, 124], [101, 149], [43, 126], [10, 122], [68, 162], [-27, 185], [27, 108], [-32, 77], [73, 181], [-26, 81], [68, 91], [31, -74], [-6, 45], [28, 12], [-49, 21], [42, 17], [-48, 6], [-28, 25], [15, 13], [-43, -22], [39, 90], [26, -3], [10, 69], [24, 13], [-1, -45], [32, 18], [-21, 45], [62, 166], [12, 116], [117, 71], [17, -20], [-36, -57], [26, 23], [19, -43], [22, 6], [28, -126], [-12, -136], [104, -48], [-48, -50], [-6, -55], [47, -22], [46, -71], [-27, -79], [51, 10], [0, -208], [-22, -66], [54, -201], [41, -35], [76, 71], [27, -21], [53, 41], [43, -122], [59, -24], [30, -59], [82, -50], [-35, -63], [28, -28], [-33, -50], [43, -193], [-26, -113], [76, -114], [10, -55], [51, 29], [-25, -53], [56, -177], [-53, -175], [45, -86], [34, -8], [-28, -93], [14, -33], [140, -118], [35, 35], [21, -72], [75, -9], [-2, 31], [58, -161], [26, -6], [-5, 44], [19, -9], [21, -57], [88, -31], [-7, -34], [31, -37], [15, 38], [31, -1], [8, -49], [43, -14], [31, -91], [-58, 36], [-15, -37], [41, -67], [-8, -32], [59, -9], [-10, -22], [48, -40], [1, -125], [49, -13], [-21, -73], [22, -149], [25, -21], [-14, -42], [42, 27], [50, -84], [-19, 104], [38, 41], [28, -74], [96, -82], [-8, 73], [28, -19], [6, 18], [16, -36], [-23, -24], [11, -21], [14, 26], [7, -50], [-31, -65], [16, -166], [-17, -4], [47, -24], [114, -172], [36, -7], [-9, 36], [34, -17], [62, -178], [78, -76], [26, -105], [-18, -7], [81, -46], [-19, -51], [24, -11], [-27, -48], [21, -90], [16, 41], [29, -40], [-47, -104], [2, -226], [-47, -26], [74, -189], [-19, -45], [18, -61], [-104, -44]], [[9688, 4339], [-6, 9]], [[9527, 4242], [-15, -45]], [[9444, 4210], [-41, -12]], [[9403, 4198], [-1, -1], [-1, 0]], [[9392, 4182], [-4, -14]], [[9388, 4168], [-1, -2], [-9, -5], [-16, -17]], [[9288, 4279], [-5, 3], [-11, 3], [-41, 31]], [[8900, 4348], [-38, -12], [-24, -20]], [[7806, 4377], [-931, 72]], [[7515, 9825], [-27, -16], [-18, 37], [28, 15], [17, -36]], [[7534, 9976], [-34, 8], [29, 15], [5, -23]], [[7975, 61], [-16, -38], [-43, 29], [19, -10], [31, 56], [9, -37]], [[7994, 102], [-27, 25], [16, 27], [11, -52]], [[8167, 263], [-37, -27], [9, 44], [28, -17]], [[7500, 921], [73, -36], [35, 26], [10, -36], [41, -6], [57, -61], [160, -64], [37, 32], [41, -34], [-25, 29], [44, 25], [91, -20], [49, 49], [40, -22], [34, 42], [44, -37], [21, -52], [-39, -239], [8, -124], [-25, -10], [18, 36], [-31, 23], [7, 33], [-13, -33], [16, -12], [-26, 1], [-31, -123], [-26, -7], [8, -54], [-27, -41], [32, -18], [-12, -96], [-21, 31], [-22, -31], [-28, 65], [16, 31], [39, -35], [-6, 42], [-62, 27], [1, -43], [-27, -18], [12, 41], [-36, 43], [11, -46], [-31, -97], [-55, 44], [21, -54], [-30, -10], [18, -6], [-29, -20], [18, -18], [-22, -38], [-46, 0], [-27, 52], [-113, -14], [-11, 59], [43, -20], [18, 28], [-44, 2], [-18, 43], [-20, -28], [-100, 220], [-7, 126], [52, -102], [23, 51], [-40, 63], [-26, -13], [1, 70], [-83, 177], [-21, 128], [34, 105], [7, -26]], [[7561, 927], [-37, -6], [15, 29], [22, -23]], [[8239, 885], [-20, 18], [33, 8], [-13, -26]], [[8288, 946], [16, -23], [-33, -18], [-1, 21], [-70, 13], [73, 27], [15, -20]], [[8213, 1151], [66 Heckel -83], [-22, -47], [17, 6], [-2, -41], [-56, 5], [-25, 109], [-26, 6], [48, 45]], [[7366, 1135], [-37, -18], [-10, 58], [37, 106], [28, -34], [-18, -112]]],
  "bbox": [-4192, -9999, 3879, -2461],
  "transform": {"scale": [0.8071807180718071, 0.7538753875387538], "translate": [-4192, -9999]}
};

vegaEmbed('#australia_map', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Australian Billionaires by State",
            "subtitle": "Colour intensity = state wealth cluster  ·  Circle = individual billionaire (size = wealth)  ·  Source: Forbes 2025"},
  "width": 820, "height": 460,
  "view": {"fill": "#c8e4f0", "stroke": null},
  "params": [{"name": "grid", "select": "interval", "bind": "scales"}],
  "projection": {"type": "mercator", "center": [134, -28], "scale": 850}, // Tuned projection for Australia custom map geometry
  "layer": [
    {"data": {"sphere": {}}, "mark": {"type": "geoshape", "fill": "#c8e4f0"}},
    {
      "data": {
        "values": topoJson_AUS,
        "format": {"type": "topojson", "feature": "collection"} // Pulls the collection feature key from the AnyChart sample file structure
      },
      "mark": {"type": "geoshape", "fill": "#e8e0c8", "stroke": "#c8b98a", "strokeWidth": 1.0}
    },
    {
      "data": {"values": [
        {"region": "New South Wales", "lat": -33.87, "lon": 151.21, "billionaires": 15},
        {"region": "Victoria",        "lat": -37.81, "lon": 144.96, "billionaires": 2},
        {"region": "Western Australia","lat": -25.0,  "lon": 118.0,  "billionaires": 3}
      ]},
      "layer": [
        {
          "mark": {"type": "circle", "opacity": 0.15, "stroke": null},
          "encoding": {
            "longitude": {"field": "lon", "type": "quantitative"},
            "latitude": {"field": "lat", "type": "quantitative"},
            "size": {"field": "billionaires", "type": "quantitative", "scale": {"range": [600, 3500]}, "legend": null},
            "color": {"field": "billionaires", "type": "quantitative", "scale": {"scheme": "greens"}, "legend": null}
          }
        }
      ]
    },
    {
      "data": {"values": [
        {"label": "Perth",    "lat": -31.95, "lon": 115.86},
        {"label": "Sydney",   "lat": -33.60, "lon": 151.21},
        {"label": "Melbourne","lat": -37.60, "lon": 144.96},
        {"label": "Brisbane", "lat": -27.30, "lon": 153.02},
        {"label": "Adelaide", "lat": -34.70, "lon": 138.60},
        {"label": "Darwin",   "lat": -12.20, "lon": 130.84}
      ]},
      "mark": {"type": "text", "fontSize": 10, "fontWeight": 600, "color": "#5a4a2a", "dy": -14},
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude": {"field": "lat", "type": "quantitative"},
        "text": {"field": "label", "type": "nominal"}
      }
    },
    {
      "data": {"url": "data/australia_billionaires.csv"},
      "mark": {"type": "circle", "opacity": 0.90, "stroke": "#ffffff", "strokeWidth": 1.8},
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude":  {"field": "lat", "type": "quantitative"},
        "size": {"field": "wealth", "type": "quantitative", "title": "Wealth (USD B)",
                 "scale": {"range": [30, 500], "type": "sqrt"},
                 "legend": {"orient": "bottom-right", "values": [3,8,15,20,29], "title": "Wealth (USD B)"}},
        "color": {"field": "industry", "type": "nominal", "title": "Industry",
                  "scale": {"domain": industryDomain, "range": industryRange},
                  "legend": {"orient": "right", "labelLimit": 180}},
        "tooltip": [
          {"field": "name",     "title": "Name"},
          {"field": "state",    "title": "State"},
          {"field": "wealth",   "title": "Wealth (USD B)", "format": ".1f"},
          {"field": "industry", "title": "Industry"}
        ]
      }
    }
  ]
}, embedOpts);

// ─── CHART 4: Industry Grouped Bar ───────────────────
vegaEmbed('#industry_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Billionaire Industries: Malaysia vs Australia",
            "subtitle": "Source: Forbes Billionaire List 2025"},
  "width": "container", "height": 280,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/industry_data.csv"},
  "mark": {"type": "bar"},
  "encoding": {
    "x": {"field": "industry", "type": "nominal", "title": null, "sort": "-y",
          "axis": {"labelAngle": -35, "labelFontSize": 10, "labelLimit": 130}},
    "y": {"field": "count", "type": "quantitative", "title": "Billionaires",
          "axis": {"gridColor": C.grid}},
    "color": {"field": "country", "type": "nominal", "title": "Country",
              "scale": {"domain": ["Australia","Malaysia"], "range": [C.green, C.gold]}},
    "xOffset": {"field": "country", "type": "nominal"},
    "tooltip": [{"field":"country","title":"Country"},{"field":"industry","title":"Industry"},{"field":"count","title":"Billionaires"}]
  }
}, embedOpts);


// ─── CHART 5: Heatmap ─────────────────────────────────
vegaEmbed('#heatmap_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Industry Heatmap",
            "subtitle": "Darker = more billionaires  ·  Source: Forbes 2025"},
  "width": "container", "height": 320,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/industry_data.csv"},
  "mark": {"type": "rect", "cornerRadius": 3},
  "encoding": {
    "x": {"field": "country", "type": "nominal", "title": null,
          "axis": {"labelFontSize": 12, "labelFontWeight": 600}},
    "y": {"field": "industry", "type": "nominal", "title": null,
          "sort": {"field": "count", "order": "descending"},
          "axis": {"labelFontSize": 11}},
    "color": {"field": "count", "type": "quantitative", "title": "Billionaires",
              "scale": {"scheme": "oranges", "domain": [0,10]}},
    "tooltip": [{"field":"country","title":"Country"},{"field":"industry","title":"Industry"},{"field":"count","title":"Billionaires"}]
  }
}, embedOpts);


// ─── CHART 6: Slope Chart — MY vs AUS only ───────────
vegaEmbed('#slope_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Billionaire Count: 2023 vs 2025",
            "subtitle": "Source: Billionaires Statistics Dataset 2023 & Forbes Billionaire List 2025"},
  "width": "container", "height": 300,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/slope_data.csv"},
  "layer": [
    {
      "mark": {"type": "line", "strokeWidth": 3,
               "point": {"filled": true, "size": 90, "stroke": C.white, "strokeWidth": 2}},
      "encoding": {
        "x": {"field": "year", "type": "ordinal", "title": null,
              "axis": {"labelFontSize": 14, "labelFontWeight": 700, "domainColor": "#ccc"}},
        "y": {"field": "count", "type": "quantitative", "title": "Number of Billionaires",
              "scale": {"domain": [0, 55]}, "axis": {"gridColor": C.grid}},
        "color": {"field": "country", "type": "nominal",
                  "scale": {"domain": ["Australia","Malaysia"], "range": [C.green, C.gold]}},
        "detail": {"field": "country", "type": "nominal"}
      }
    },
    {
      "mark": {"type": "text", "align": "right", "dx": -14, "dy": 0,
               "fontSize": 12, "fontWeight": 600},
      "transform": [{"filter": "datum.year === '2023'"}],
      "encoding": {
        "x": {"field": "year", "type": "ordinal"},
        "y": {"field": "count", "type": "quantitative", "scale": {"domain": [0,55]}},
        "text": {"field": "count", "type": "quantitative"},
        "color": {"field": "country", "type": "nominal",
                  "scale": {"domain": ["Australia","Malaysia"], "range": [C.green, C.gold]},
                  "legend": null}
      }
    },
    {
      "mark": {"type": "text", "align": "left", "dx": 14, "dy": 0,
               "fontSize": 12, "fontWeight": 600},
      "transform": [{"filter": "datum.year === '2025'"}],
      "encoding": {
        "x": {"field": "year", "type": "ordinal"},
        "y": {"field": "count", "type": "quantitative", "scale": {"domain": [0,55]}},
        "text": {"field": "count", "type": "quantitative"},
        "color": {"field": "country", "type": "nominal",
                  "scale": {"domain": ["Australia","Malaysia"], "range": [C.green, C.gold]},
                  "legend": null}
      }
    },
    {
      "mark": {"type": "text", "align": "left", "dx": 14, "dy": -16,
               "fontSize": 13, "fontWeight": 700},
      "transform": [{"filter": "datum.year === '2025'"}],
      "encoding": {
        "x": {"field": "year", "type": "ordinal"},
        "y": {"field": "count", "type": "quantitative", "scale": {"domain": [0,55]}},
        "text": {"field": "country", "type": "nominal"},
        "color": {"field": "country", "type": "nominal",
                  "scale": {"domain": ["Australia","Malaysia"], "range": [C.green, C.gold]},
                  "legend": null}
      }
    }
  ]
}, embedOpts);


// ─── CHART 7: Bubble Chart ────────────────────────────
vegaEmbed('#bubble_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "GDP vs Number of Billionaires",
            "subtitle": "Bubble size = total wealth  ·  Log scale on both axes  ·  Source: Billionaires Statistics Dataset 2023"},
  "width": "container", "height": 340,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/bubble_data.csv"},
  "layer": [
    {
      "mark": {"type": "circle", "opacity": 0.78, "stroke": C.white, "strokeWidth": 1},
      "encoding": {
        "x": {"field": "gdp_bn", "type": "quantitative", "title": "GDP (USD Billions)",
              "scale": {"type": "log", "domain": [1,150000]},
              "axis": {"format": ",.0f", "gridColor": C.grid, "values": [1,10,100,1000,10000,100000]}},
        "y": {"field": "billionaire_count", "type": "quantitative", "title": "Billionaires",
              "scale": {"type": "log", "domain": [1,1200]},
              "axis": {"gridColor": C.grid, "values": [1,3,10,30,100,300,1000]}},
        "size": {"field": "total_worth_bn", "type": "quantitative",
                 "scale": {"range": [40,2200], "type": "sqrt"}, "legend": null},
        "color": {"field": "highlight", "type": "nominal",
                  "scale": {"domain": countryDomain, "range": countryRange}},
        "tooltip": [
          {"field": "country", "title": "Country"},
          {"field": "billionaire_count", "title": "Billionaires"},
          {"field": "gdp_bn", "title": "GDP (USD B)", "format": ",.0f"},
          {"field": "total_worth_bn", "title": "Total Wealth (USD B)", "format": ",.0f"}
        ]
      }
    },
    {
      "transform": [{"filter": "datum.highlight !== 'Other'"}],
      "mark": {"type": "text", "dy": -13, "fontSize": 10, "fontWeight": 600},
      "encoding": {
        "x": {"field": "gdp_bn", "type": "quantitative", "scale": {"type": "log"}},
        "y": {"field": "billionaire_count", "type": "quantitative", "scale": {"type": "log"}},
        "text": {"field": "country", "type": "nominal"},
        "color": {"value": "#333333"}
      }
    }
  ]
}, embedOpts);


// ─── CHART 8: Age Strip — jitter + row facet ─────────
vegaEmbed('#age_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Age Distribution of Billionaires",
            "subtitle": "Each dot = one billionaire  ·  Hover for name  ·  Source: Billionaires Statistics Dataset 2023"},
  "width": "container", "height": 80,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/age_data.csv"},
  "transform": [{"calculate": "random() * 0.5 - 0.25", "as": "jitter"}],
  "mark": {"type": "circle", "size": 65, "opacity": 0.68, "stroke": C.white, "strokeWidth": 0.5},
  "encoding": {
    "x": {"field": "age", "type": "quantitative", "title": "Age",
          "scale": {"domain": [30,95]}, "axis": {"gridColor": C.grid}},
    "y": {"field": "jitter", "type": "quantitative", "title": null,
          "scale": {"domain": [-1,1]}, "axis": null},
    "row": {
      "field": "country", "type": "nominal", "title": null,
      "header": {"labelFontSize": 12, "labelFontWeight": 700,
                 "labelColor": C.text, "labelPadding": 4}
    },
    "color": {"field": "country", "type": "nominal",
              "scale": {"domain": ["Australia","Malaysia"], "range": [C.green, C.gold]},
              "legend": null},
    "tooltip": [
      {"field": "personName", "title": "Name"},
      {"field": "country",    "title": "Country"},
      {"field": "age",        "title": "Age"}
    ]
  }
}, embedOpts);


// ─── CHART 9: Donuts with % labels ───────────────────
const donutColors = {
  "domain": ["Male","Female","Self-Made","Inherited"],
  "range": [C.green, C.gold, "#4e79a7", "#e15759"]
};

function makeDonut(dataUrl, titleText, showLegend) {
  return {
    "title": {"text": titleText, "fontSize": 11, "fontWeight": 600, "color": "#444"},
    "width": 140, "height": 140,
    "data": {"url": dataUrl},
    "layer": [
      {
        "mark": {"type": "arc", "innerRadius": 38, "outerRadius": 64},
        "encoding": {
          "theta": {"field": "value", "type": "quantitative"},
          "color": {"field": "label", "type": "nominal", "scale": donutColors,
                    "legend": showLegend
                      ? {"title": null, "orient": "right", "labelFontSize": 11, "symbolSize": 90}
                      : null},
          "tooltip": [{"field":"label","title":"Category"},{"field":"value","title":"Count"},{"field":"percent","title":"%","format":".1f"}]
        }
      },
      {
        "mark": {"type": "text", "radius": 80, "fontSize": 10, "fontWeight": 700},
        "transform": [{"filter": "datum.percent >= 8"}],
        "encoding": {
          "theta": {"field": "value", "type": "quantitative", "stack": true},
          "text": {"field": "percent", "type": "quantitative",
                   "format": ".0f",
                   "condition": {"test": "datum.percent >= 8",
                                 "value": {"expr": "datum.percent + '%'"}}},
          "color": {"value": "#333"}
        }
      }
    ]
  };
}

vegaEmbed('#donut_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Gender & Self-Made Status",
            "subtitle": "Gender: Forbes 2025  ·  Self-Made: Billionaires Statistics Dataset 2023"},
  "spacing": 20, "columns": 2,
  "concat": [
    makeDonut("data/donut_my_gender.csv",    "Malaysia — Gender",     true),
    makeDonut("data/donut_aus_gender.csv",   "Australia — Gender",    false),
    makeDonut("data/donut_my_selfmade.csv",  "Malaysia — Self-Made",  false),
    makeDonut("data/donut_aus_selfmade.csv", "Australia — Self-Made", false)
  ]
}, embedOpts);


// ─── CHART 10: Education Scatter ──────────────────────
const cScale = {"domain": countryDomain.slice(0,9), "range": countryRange.slice(0,9)};

const eduOff = {
  "Malaysia":      {dx:  9, dy:  7, align:"left"},
  "Australia":     {dx:  9, dy: -9, align:"left"},
  "Singapore":     {dx:  9, dy: -9, align:"left"},
  "United States": {dx: -9, dy:-13, align:"right"},
  "China":         {dx:  9, dy:  9, align:"left"},
  "Germany":       {dx: -9, dy: -9, align:"right"},
  "United Kingdom":{dx: -9, dy:  7, align:"right"},
  "India":         {dx:  9, dy:  9, align:"left"},
  "France":        {dx:  9, dy: -9, align:"left"},
  "Japan":         {dx:  9, dy:  9, align:"left"}
};
const taxOff = {
  "Malaysia":      {dx:  9, dy:  7, align:"left"},
  "Australia":     {dx:  9, dy: -9, align:"left"},
  "Singapore":     {dx:  9, dy: -9, align:"left"},
  "United States": {dx: -9, dy: -9, align:"right"},
  "China":         {dx:  9, dy:  9, align:"left"},
  "Germany":       {dx:  9, dy: -9, align:"left"},
  "United Kingdom":{dx: -9, dy:  7, align:"right"},
  "India":         {dx:  9, dy:  9, align:"left"},
  "France":        {dx: -9, dy:  9, align:"right"},
  "Japan":         {dx: -9, dy: -9, align:"right"}
};

function scatterLabels(offsets, xf) {
  return Object.entries(offsets).map(([c, o]) => ({
    "transform": [{"filter": `datum.country === '${c}'`}],
    "mark": {"type":"text","fontSize":10,"fontWeight":600,"dx":o.dx,"dy":o.dy,"align":o.align},
    "encoding": {
      "x": {"field": xf, "type":"quantitative"},
      "y": {"field": "per_million","type":"quantitative"},
      "text": {"field":"country","type":"nominal"},
      "color": {"value":"#444"}
    }
  }));
}

vegaEmbed('#factors_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Does Education Produce Billionaires?",
            "subtitle": "X = Tertiary enrollment (%)  ·  Y = Billionaires per million  ·  Source: Billionaires Statistics Dataset 2023"},
  "width": "container", "height": 260,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/country_factors.csv"},
  "layer": [
    {"mark": {"type":"circle","size":95,"opacity":0.88,"stroke":C.white,"strokeWidth":1.2},
     "encoding": {
       "x": {"field":"education","type":"quantitative","title":"Tertiary Education Enrollment (%)","axis":{"gridColor":C.grid}},
       "y": {"field":"per_million","type":"quantitative","title":"Billionaires per Million","axis":{"gridColor":C.grid}},
       "color": {"field":"country","type":"nominal","scale":cScale,"legend":null},
       "tooltip": [{"field":"country","title":"Country"},{"field":"education","title":"Education (%)"},{"field":"per_million","title":"Per Million","format":".2f"},{"field":"tax_rate","title":"Tax Rate (%)"}]
     }
    },
    ...scatterLabels(eduOff, "education")
  ]
}, embedOpts);

vegaEmbed('#tax_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Do Lower Taxes Produce More Billionaires?",
            "subtitle": "X = Total tax rate (%)  ·  Y = Billionaires per million  ·  Source: Billionaires Statistics Dataset 2023"},
  "width": "container", "height": 260,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/country_factors.csv"},
  "layer": [
    {"mark": {"type":"circle","size":95,"opacity":0.88,"stroke":C.white,"strokeWidth":1.2},
     "encoding": {
       "x": {"field":"tax_rate","type":"quantitative","title":"Total Tax Rate (%)","axis":{"gridColor":C.grid}},
       "y": {"field":"per_million","type":"quantitative","title":"Billionaires per Million","axis":{"gridColor":C.grid}},
       "color": {"field":"country","type":"nominal","scale":cScale,"legend":null},
       "tooltip": [{"field":"country","title":"Country"},{"field":"tax_rate","title":"Tax Rate (%)"},{"field":"per_million","title":"Per Million","format":".2f"},{"field":"education","title":"Education (%)"}]
     }
    },
    ...scatterLabels(taxOff, "tax_rate")
  ]
}, embedOpts);


// ─── CHART 11: Wealth Distribution ───────────────────
vegaEmbed('#wealth_dist_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Wealth Distribution by Bracket",
            "subtitle": "Source: Billionaires Statistics Dataset 2023"},
  "width": "container", "height": 240,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/wealth_distribution.csv"},
  "mark": {"type": "bar"},
  "encoding": {
    "x": {"field":"wealth_bracket","type":"ordinal","title":"Wealth Bracket",
          "sort":["$1-2B","$2-5B","$5-10B","$10-20B","$20-50B","$50B+"],
          "axis":{"labelAngle":-20}},
    "y": {"field":"count","type":"quantitative","title":"Billionaires","axis":{"gridColor":C.grid}},
    "color": {"field":"country","type":"nominal","title":"Country",
              "scale":{"domain":["Malaysia","Australia"],"range":[C.gold, C.green]}},
    "xOffset": {"field":"country","type":"nominal"},
    "tooltip": [{"field":"country","title":"Country"},{"field":"wealth_bracket","title":"Bracket"},{"field":"count","title":"Count"}]
  }
}, embedOpts);


// ─── CHART 12: Top Billionaires Interactive ───────────
vegaEmbed('#top_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Top Billionaires by Wealth",
            "subtitle": "Click legend to filter by country  ·  Source: Forbes Billionaire List 2025"},
  "width": "container", "height": 310,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/top_billionaires.csv"},
  "params": [{"name":"sel","select":{"type":"point","fields":["country"]},"bind":"legend"}],
  "mark": {"type":"bar","cornerRadiusTopRight":3,"cornerRadiusBottomRight":3},
  "encoding": {
    "y": {"field":"name","type":"nominal","sort":"-x","title":null,"axis":{"labelFontSize":10,"labelLimit":170}},
    "x": {"field":"wealth","type":"quantitative","title":"Wealth (USD Billions)","axis":{"gridColor":C.grid}},
    "color": {"field":"country","type":"nominal","title":"Country",
              "scale":{"domain":["Malaysia","Australia"],"range":[C.gold, C.green]}},
    "opacity": {"condition":{"param":"sel","value":1},"value":0.15},
    "tooltip": [
      {"field":"name","title":"Name"},{"field":"country","title":"Country"},
      {"field":"wealth","title":"Wealth (USD B)","format":".1f"},{"field":"industry","title":"Industry"}
    ]
  }
}, embedOpts);
