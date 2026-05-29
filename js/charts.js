// ─────────────────────────────────────────────────────
// GLOBAL CONFIG
// ─────────────────────────────────────────────────────
const C = {
  green: "#2d4a3e",
  gold:  "#c9a84c",
  cream: "#f5f0e8",
  grid:  "#ede8df",
  text:  "#1a1a1a",
  muted: "#888888",
  white: "#ffffff"
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
    "padding": 8, "cornerRadius": 5,
    "symbolSize": 100, "symbolStrokeWidth": 0
  },
  "title": {
    "font": "Inter, sans-serif", "subtitleFont": "Inter, sans-serif",
    "fontSize": 14, "fontWeight": 700,
    "subtitleFontSize": 10, "subtitleColor": C.muted,
    "color": C.text, "anchor": "start", "offset": 10,
    "subtitlePadding": 4
  },
  "bar":  {"cornerRadiusTopLeft": 3, "cornerRadiusTopRight": 3},
  "arc":  {"stroke": C.white, "strokeWidth": 1.5},
  "line": {"strokeWidth": 2.5}
};

const embedOpts = { actions: false, config: globalConfig };

const countryDomain = ["Australia","Malaysia","United States","China","India","Germany","United Kingdom","Singapore","Other"];
const countryRange  = [C.green, C.gold, "#e15759","#4e79a7","#f28e2b","#76b7b2","#59a14f","#b07aa1","#d8d0c4"];

const industryDomain = ["Metals & Mining","Real Estate","Technology","Finance & Investments","Diversified","Manufacturing","Fashion & Retail","Food & Beverage","Construction & Engineering","Gambling & Casinos","Healthcare","Automotive","Energy","Logistics","Telecom"];
const industryRange  = ["#4e79a7","#f28e2b","#e15759","#76b7b2","#59a14f","#edc948","#b07aa1","#ff9da7","#9c755f","#bab0ac","#86bcb6","#e4a97a","#d4a6c8","#c5c9c7","#aecde8"];


// ─────────────────────────────────────────────────────
// CHART 1 — World Map
// ─────────────────────────────────────────────────────
vegaEmbed('#map_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Global Distribution of Billionaires",
    "subtitle": "Circle size = billionaire count  ·  Colour intensity = wealth  ·  Hover for details  ·  Source: Billionaires Statistics Dataset 2023"
  },
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
       "size": {
         "field": "billionaire_count", "type": "quantitative", "title": "Billionaires",
         "scale": {"range": [20, 2800], "type": "sqrt"},
         "legend": {"orient": "bottom-left", "values": [1,10,50,200,754]}
       },
       "color": {
         "field": "billionaire_count", "type": "quantitative",
         "scale": {"scheme": "orangered", "domain": [1,754]}, "legend": null
       },
       "tooltip": [
         {"field": "country",           "title": "Country"},
         {"field": "billionaire_count", "title": "Billionaires"},
         {"field": "total_wealth",      "title": "Total Wealth (USD B)", "format": ",.0f"}
       ]
     }
    }
  ]
}, embedOpts);


// ─────────────────────────────────────────────────────
// CHART 2 — Malaysia Choropleth + Symbols
// Uses Malaysia states TopoJSON from a public CDN
// ─────────────────────────────────────────────────────
const MY_TOPO = "https://raw.githubusercontent.com/interactives-data/malaysia-topo/master/malaysia-states.json";

// Billionaire count per state for choropleth fill
const myStateData = [
  {"state": "Kuala Lumpur", "billionaires": 12, "note": "Financial & real estate hub"},
  {"state": "Selangor",     "billionaires": 4,  "note": "Industrial & banking corridor"},
  {"state": "Penang",       "billionaires": 2,  "note": "Manufacturing & trade"},
  {"state": "Johor",        "billionaires": 1,  "note": "Food & beverage"},
  {"state": "Sabah",        "billionaires": 0,  "note": ""},
  {"state": "Sarawak",      "billionaires": 0,  "note": ""},
  {"state": "Perak",        "billionaires": 0,  "note": ""},
  {"state": "Kedah",        "billionaires": 0,  "note": ""},
  {"state": "Kelantan",     "billionaires": 0,  "note": ""},
  {"state": "Terengganu",   "billionaires": 0,  "note": ""},
  {"state": "Pahang",       "billionaires": 0,  "note": ""},
  {"state": "Negeri Sembilan","billionaires": 0,"note": ""},
  {"state": "Melaka",       "billionaires": 0,  "note": ""},
  {"state": "Perlis",       "billionaires": 0,  "note": ""},
  {"state": "Putrajaya",    "billionaires": 0,  "note": ""},
  {"state": "Labuan",       "billionaires": 0,  "note": ""}
];

// Fallback: proportional symbol map zoomed to Malaysia
// using world-atlas (guaranteed to load) + billionaire dots
vegaEmbed('#malaysia_map', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Malaysian Billionaires by City",
    "subtitle": "Circle size = wealth (USD B)  ·  Colour = industry  ·  Scroll to zoom  ·  Drag to pan  ·  Source: Forbes 2025"
  },
  "width": 820, "height": 440,
  "view": {"fill": "#c8e4f0", "stroke": null},
  "params": [{"name": "grid", "select": "interval", "bind": "scales"}],
  "projection": {"type": "mercator", "center": [109.5, 3.8], "scale": 2200},
  "layer": [
    {"data": {"sphere": {}},
     "mark": {"type": "geoshape", "fill": "#c8e4f0"}},
    {"data": {"url": "https://unpkg.com/world-atlas@2/countries-50m.json",
              "format": {"type": "topojson", "feature": "land"}},
     "mark": {"type": "geoshape", "fill": "#e6dfc8", "stroke": "#bfb89a", "strokeWidth": 1.2}},
    {"data": {"url": "https://unpkg.com/world-atlas@2/countries-50m.json",
              "format": {"type": "topojson", "feature": "countries"}},
     "mark": {"type": "geoshape", "fill": null, "stroke": "#bfb89a", "strokeWidth": 0.6}},
    {"data": {"values": [
        {"label": "Kuala Lumpur",  "lat": 3.139,  "lon": 101.687, "type": "city"},
        {"label": "Penang",        "lat": 5.414,  "lon": 100.329, "type": "city"},
        {"label": "Johor Bahru",   "lat": 1.485,  "lon": 103.762, "type": "city"},
        {"label": "Selangor",      "lat": 3.074,  "lon": 101.518, "type": "city"}
      ]},
     "mark": {"type": "text", "fontSize": 10, "fontWeight": 600, "color": "#6b5e3e", "dy": -12},
     "encoding": {
       "longitude": {"field": "lon", "type": "quantitative"},
       "latitude":  {"field": "lat", "type": "quantitative"},
       "text":      {"field": "label", "type": "nominal"}
     }
    },
    {"data": {"url": "data/malaysia_billionaires.csv"},
     "mark": {"type": "circle", "opacity": 0.88, "stroke": "#ffffff", "strokeWidth": 1.8},
     "encoding": {
       "longitude": {"field": "lon", "type": "quantitative"},
       "latitude":  {"field": "lat", "type": "quantitative"},
       "size": {
         "field": "wealth", "type": "quantitative", "title": "Wealth (USD B)",
         "scale": {"range": [200, 2600], "type": "sqrt"},
         "legend": {"orient": "bottom-right", "values": [1,3,6,9,12], "title": "Wealth (USD B)"}
       },
       "color": {
         "field": "industry", "type": "nominal", "title": "Industry",
         "scale": {"domain": industryDomain, "range": industryRange},
         "legend": {"orient": "right", "labelLimit": 180, "title": "Industry"}
       },
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


// ─────────────────────────────────────────────────────
// CHART 3 — Australia Proportional Symbol Map
// ─────────────────────────────────────────────────────
vegaEmbed('#australia_map', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Australian Billionaires by State",
    "subtitle": "Circle size = wealth (USD B)  ·  Colour = industry  ·  Scroll to zoom  ·  Drag to pan  ·  Source: Forbes 2025"
  },
  "width": 820, "height": 440,
  "view": {"fill": "#c8e4f0", "stroke": null},
  "params": [{"name": "grid", "select": "interval", "bind": "scales"}],
  "projection": {"type": "mercator", "center": [134, -28], "scale": 700},
  "layer": [
    {"data": {"sphere": {}},
     "mark": {"type": "geoshape", "fill": "#c8e4f0"}},
    {"data": {"url": "https://unpkg.com/world-atlas@2/countries-50m.json",
              "format": {"type": "topojson", "feature": "land"}},
     "mark": {"type": "geoshape", "fill": "#e6dfc8", "stroke": "#bfb89a", "strokeWidth": 1.2}},
    {"data": {"url": "https://unpkg.com/world-atlas@2/countries-50m.json",
              "format": {"type": "topojson", "feature": "countries"}},
     "mark": {"type": "geoshape", "fill": null, "stroke": "#bfb89a", "strokeWidth": 0.6}},
    {"data": {"values": [
        {"label": "Perth",    "lat": -31.95, "lon": 115.86},
        {"label": "Sydney",   "lat": -33.87, "lon": 151.21},
        {"label": "Melbourne","lat": -37.81, "lon": 144.96},
        {"label": "Brisbane", "lat": -27.47, "lon": 153.02}
      ]},
     "mark": {"type": "text", "fontSize": 10, "fontWeight": 600, "color": "#6b5e3e", "dy": -12},
     "encoding": {
       "longitude": {"field": "lon", "type": "quantitative"},
       "latitude":  {"field": "lat", "type": "quantitative"},
       "text":      {"field": "label", "type": "nominal"}
     }
    },
    {"data": {"url": "data/australia_billionaires.csv"},
     "mark": {"type": "circle", "opacity": 0.88, "stroke": "#ffffff", "strokeWidth": 1.8},
     "encoding": {
       "longitude": {"field": "lon", "type": "quantitative"},
       "latitude":  {"field": "lat", "type": "quantitative"},
       "size": {
         "field": "wealth", "type": "quantitative", "title": "Wealth (USD B)",
         "scale": {"range": [200, 4000], "type": "sqrt"},
         "legend": {"orient": "bottom-right", "values": [3,8,15,20,29], "title": "Wealth (USD B)"}
       },
       "color": {
         "field": "industry", "type": "nominal", "title": "Industry",
         "scale": {"domain": industryDomain, "range": industryRange},
         "legend": {"orient": "right", "labelLimit": 180, "title": "Industry"}
       },
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


// ─────────────────────────────────────────────────────
// CHART 4 — Industry Grouped Bar
// ─────────────────────────────────────────────────────
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
    "tooltip": [{"field": "country","title":"Country"},{"field":"industry","title":"Industry"},{"field":"count","title":"Billionaires"}]
  }
}, embedOpts);


// ─────────────────────────────────────────────────────
// CHART 5 — Heatmap
// ─────────────────────────────────────────────────────
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


// ─────────────────────────────────────────────────────
// CHART 6 — Slope Chart: 2023 vs 2025 (Malaysia & Australia only)
// ─────────────────────────────────────────────────────
vegaEmbed('#slope_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Billionaire Count: 2023 vs 2025",
    "subtitle": "Each line = one country  ·  Source: Billionaires Statistics Dataset 2023 & Forbes Billionaire List 2025"
  },
  "width": "container", "height": 320,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/slope_data.csv"},
  "layer": [
    {
      "mark": {"type": "line", "strokeWidth": 3, "point": {"filled": true, "size": 80, "stroke": C.white, "strokeWidth": 2}},
      "encoding": {
        "x": {"field": "year", "type": "ordinal", "title": null,
              "axis": {"labelFontSize": 14, "labelFontWeight": 700, "domainColor": "#ccc"}},
        "y": {"field": "count", "type": "quantitative", "title": "Number of Billionaires",
              "scale": {"domain": [0, 55]},
              "axis": {"gridColor": C.grid}},
        "color": {"field": "country", "type": "nominal", "title": "Country",
                  "scale": {"domain": ["Australia","Malaysia"], "range": [C.green, C.gold]}},
        "detail": {"field": "country", "type": "nominal"}
      }
    },
    {
      "mark": {"type": "text", "align": "left", "dx": 10, "fontSize": 13, "fontWeight": 700},
      "transform": [{"filter": "datum.year === '2025'"}],
      "encoding": {
        "x": {"field": "year", "type": "ordinal"},
        "y": {"field": "count", "type": "quantitative", "scale": {"domain": [0,55]}},
        "text": {"field": "country", "type": "nominal"},
        "color": {"field": "country", "type": "nominal",
                  "scale": {"domain": ["Australia","Malaysia"], "range": [C.green, C.gold]},
                  "legend": null}
      }
    },
    {
      "mark": {"type": "text", "align": "right", "dx": -10, "fontSize": 12, "fontWeight": 600},
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
      "mark": {"type": "text", "align": "left", "dx": 10, "fontSize": 12, "fontWeight": 600},
      "transform": [{"filter": "datum.year === '2025'"}],
      "encoding": {
        "x": {"field": "year", "type": "ordinal"},
        "y": {"field": "count", "type": "quantitative", "scale": {"domain": [0,55]}},
        "text": {"field": "count", "type": "quantitative"},
        "color": {"field": "country", "type": "nominal",
                  "scale": {"domain": ["Australia","Malaysia"], "range": [C.green, C.gold]},
                  "legend": null}
      }
    }
  ]
}, embedOpts);


// ─────────────────────────────────────────────────────
// CHART 7 — Bubble Chart
// ─────────────────────────────────────────────────────
vegaEmbed('#bubble_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "GDP vs Number of Billionaires",
            "subtitle": "Bubble size = total wealth  ·  Log scale  ·  Source: Billionaires Statistics Dataset 2023"},
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
          {"field": "country",           "title": "Country"},
          {"field": "billionaire_count", "title": "Billionaires"},
          {"field": "gdp_bn",            "title": "GDP (USD B)", "format": ",.0f"},
          {"field": "total_worth_bn",    "title": "Total Wealth (USD B)", "format": ",.0f"}
        ]
      }
    },
    {
      "transform": [{"filter": "datum.highlight !== 'Other'"}],
      "mark": {"type": "text", "dy": -13, "fontSize": 10, "fontWeight": 600},
      "encoding": {
        "x": {"field": "gdp_bn", "type": "quantitative", "scale": {"type": "log"}},
        "y": {"field": "billionaire_count", "type": "quantitative", "scale": {"type": "log"}},
        "text":  {"field": "country",   "type": "nominal"},
        "color": {"value": "#333333"}
      }
    }
  ]
}, embedOpts);


// ─────────────────────────────────────────────────────
// CHART 8 — Age Strip Plot (jitter to reduce clutter)
// ─────────────────────────────────────────────────────
vegaEmbed('#age_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Age Distribution of Billionaires",
            "subtitle": "Each dot = one billionaire  ·  Hover for name  ·  Source: Billionaires Statistics Dataset 2023"},
  "width": "container", "height": 180,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/age_data.csv"},
  "transform": [
    {"calculate": "random() * 0.6 - 0.3", "as": "jitter"}
  ],
  "mark": {"type": "circle", "size": 70, "opacity": 0.65, "stroke": C.white, "strokeWidth": 0.6},
  "encoding": {
    "x": {"field": "age", "type": "quantitative", "title": "Age",
          "scale": {"domain": [30,95]}, "axis": {"gridColor": C.grid}},
    "y": {"field": "jitter", "type": "quantitative", "title": null,
          "scale": {"domain": [-1,1]},
          "axis": null},
    "row": {"field": "country", "type": "nominal", "title": null,
            "header": {"labelFontSize": 12, "labelFontWeight": 700,
                       "labelColor": C.text, "labelPadding": 5}},
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


// ─────────────────────────────────────────────────────
// CHART 9 — Small Multiple Donuts
// ─────────────────────────────────────────────────────
const donutColors = {
  "domain": ["Male","Female","Self-Made","Inherited"],
  "range":  [C.green, C.gold, "#4e79a7", "#e15759"]
};

function makeDonut(dataUrl, titleText, showLegend) {
  return {
    "title": {"text": titleText, "fontSize": 11, "fontWeight": 600, "color": "#444"},
    "width": 145, "height": 145,
    "data": {"url": dataUrl},
    "layer": [
      {
        "mark": {"type": "arc", "innerRadius": 40, "outerRadius": 68},
        "encoding": {
          "theta": {"field": "value", "type": "quantitative"},
          "color": {
            "field": "label", "type": "nominal",
            "scale": donutColors,
            "legend": showLegend ? {"title": null, "orient": "right", "labelFontSize": 11, "symbolSize": 90} : null
          },
          "tooltip": [
            {"field": "label",   "title": "Category"},
            {"field": "value",   "title": "Count"},
            {"field": "percent", "title": "%", "format": ".1f"}
          ]
        }
      },
      {
        "mark": {"type": "text", "radius": 84, "fontSize": 10, "fontWeight": 600, "color": "#444"},
        "transform": [{"filter": "datum.percent >= 10"}],
        "encoding": {
          "theta": {"field": "value", "type": "quantitative", "stack": true},
          "text":  {"field": "percent", "type": "quantitative", "format": ".0f"}
        }
      }
    ]
  };
}

vegaEmbed('#donut_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Gender & Self-Made Status: Malaysia vs Australia",
            "subtitle": "Gender: Forbes 2025  ·  Self-Made: Billionaires Statistics Dataset 2023"},
  "spacing": 32, "columns": 2,
  "concat": [
    makeDonut("data/donut_my_gender.csv",    "Malaysia — Gender",     true),
    makeDonut("data/donut_aus_gender.csv",   "Australia — Gender",    false),
    makeDonut("data/donut_my_selfmade.csv",  "Malaysia — Self-Made",  false),
    makeDonut("data/donut_aus_selfmade.csv", "Australia — Self-Made", false)
  ]
}, embedOpts);


// ─────────────────────────────────────────────────────
// CHART 10 — Education Scatter (manual label offsets)
// ─────────────────────────────────────────────────────
const countryColorScale = {"domain": countryDomain.slice(0,9), "range": countryRange.slice(0,9)};

const eduOffsets = {
  "Malaysia":       {"dx":  9, "dy": -9, "align": "left"},
  "Australia":      {"dx":  9, "dy":  7, "align": "left"},
  "Singapore":      {"dx":  9, "dy": -9, "align": "left"},
  "United States":  {"dx": -9, "dy":-12, "align": "right"},
  "China":          {"dx":  9, "dy":  9, "align": "left"},
  "Germany":        {"dx": -9, "dy": -9, "align": "right"},
  "United Kingdom": {"dx": -9, "dy":  7, "align": "right"},
  "India":          {"dx":  9, "dy":  9, "align": "left"},
  "France":         {"dx":  9, "dy": -9, "align": "left"},
  "Japan":          {"dx":  9, "dy":  9, "align": "left"}
};

const taxOffsets = {
  "Malaysia":       {"dx":  9, "dy":  7, "align": "left"},
  "Australia":      {"dx":  9, "dy": -9, "align": "left"},
  "Singapore":      {"dx":  9, "dy": -9, "align": "left"},
  "United States":  {"dx": -9, "dy": -9, "align": "right"},
  "China":          {"dx":  9, "dy":  9, "align": "left"},
  "Germany":        {"dx":  9, "dy": -9, "align": "left"},
  "United Kingdom": {"dx": -9, "dy":  7, "align": "right"},
  "India":          {"dx":  9, "dy":  9, "align": "left"},
  "France":         {"dx": -9, "dy":  9, "align": "right"},
  "Japan":          {"dx": -9, "dy": -9, "align": "right"}
};

function scatterLabels(offsets, xField) {
  return Object.entries(offsets).map(([country, off]) => ({
    "transform": [{"filter": `datum.country === '${country}'`}],
    "mark": {"type": "text", "fontSize": 10, "fontWeight": 600,
             "dx": off.dx, "dy": off.dy, "align": off.align},
    "encoding": {
      "x":    {"field": xField,       "type": "quantitative"},
      "y":    {"field": "per_million","type": "quantitative"},
      "text": {"field": "country",    "type": "nominal"},
      "color": {"value": "#444444"}
    }
  }));
}

vegaEmbed('#factors_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Does Education Produce Billionaires?",
            "subtitle": "X = Tertiary enrollment (%)  ·  Y = Billionaires per million  ·  Source: Billionaires Statistics Dataset 2023"},
  "width": "container", "height": 280,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/country_factors.csv"},
  "layer": [
    {"mark": {"type": "circle", "size": 95, "opacity": 0.88, "stroke": C.white, "strokeWidth": 1.2},
     "encoding": {
       "x": {"field": "education",   "type": "quantitative",
             "title": "Tertiary Education Enrollment (%)", "axis": {"gridColor": C.grid}},
       "y": {"field": "per_million", "type": "quantitative",
             "title": "Billionaires per Million", "axis": {"gridColor": C.grid}},
       "color": {"field": "country", "type": "nominal", "scale": countryColorScale, "legend": null},
       "tooltip": [
         {"field": "country",    "title": "Country"},
         {"field": "education",  "title": "Education (%)"},
         {"field": "per_million","title": "Per Million",  "format": ".2f"},
         {"field": "tax_rate",   "title": "Tax Rate (%)"}
       ]
     }
    },
    ...scatterLabels(eduOffsets, "education")
  ]
}, embedOpts);


vegaEmbed('#tax_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Do Lower Taxes Produce More Billionaires?",
            "subtitle": "X = Total tax rate (%)  ·  Y = Billionaires per million  ·  Source: Billionaires Statistics Dataset 2023"},
  "width": "container", "height": 280,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/country_factors.csv"},
  "layer": [
    {"mark": {"type": "circle", "size": 95, "opacity": 0.88, "stroke": C.white, "strokeWidth": 1.2},
     "encoding": {
       "x": {"field": "tax_rate",    "type": "quantitative",
             "title": "Total Tax Rate (%)", "axis": {"gridColor": C.grid}},
       "y": {"field": "per_million", "type": "quantitative",
             "title": "Billionaires per Million", "axis": {"gridColor": C.grid}},
       "color": {"field": "country", "type": "nominal", "scale": countryColorScale, "legend": null},
       "tooltip": [
         {"field": "country",    "title": "Country"},
         {"field": "tax_rate",   "title": "Tax Rate (%)"},
         {"field": "per_million","title": "Per Million", "format": ".2f"},
         {"field": "education",  "title": "Education (%)"}
       ]
     }
    },
    ...scatterLabels(taxOffsets, "tax_rate")
  ]
}, embedOpts);


// ─────────────────────────────────────────────────────
// CHART 11 — Wealth Distribution
// ─────────────────────────────────────────────────────
vegaEmbed('#wealth_dist_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Wealth Distribution by Bracket",
            "subtitle": "Source: Billionaires Statistics Dataset 2023"},
  "width": "container", "height": 260,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/wealth_distribution.csv"},
  "mark": {"type": "bar"},
  "encoding": {
    "x": {"field": "wealth_bracket", "type": "ordinal", "title": "Wealth Bracket",
          "sort": ["$1-2B","$2-5B","$5-10B","$10-20B","$20-50B","$50B+"],
          "axis": {"labelAngle": -20}},
    "y": {"field": "count", "type": "quantitative", "title": "Billionaires",
          "axis": {"gridColor": C.grid}},
    "color": {"field": "country", "type": "nominal", "title": "Country",
              "scale": {"domain": ["Malaysia","Australia"], "range": [C.gold, C.green]}},
    "xOffset": {"field": "country", "type": "nominal"},
    "tooltip": [
      {"field": "country",        "title": "Country"},
      {"field": "wealth_bracket", "title": "Bracket"},
      {"field": "count",          "title": "Count"}
    ]
  }
}, embedOpts);


// ─────────────────────────────────────────────────────
// CHART 12 — Interactive Top Billionaires
// ─────────────────────────────────────────────────────
vegaEmbed('#top_chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Top Billionaires by Wealth",
            "subtitle": "Click legend to filter by country  ·  Source: Forbes Billionaire List 2025"},
  "width": "container", "height": 330,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/top_billionaires.csv"},
  "params": [{"name": "sel", "select": {"type": "point", "fields": ["country"]}, "bind": "legend"}],
  "mark": {"type": "bar", "cornerRadiusTopRight": 3, "cornerRadiusBottomRight": 3},
  "encoding": {
    "y": {"field": "name", "type": "nominal", "sort": "-x", "title": null,
          "axis": {"labelFontSize": 10, "labelLimit": 170}},
    "x": {"field": "wealth", "type": "quantitative", "title": "Wealth (USD Billions)",
          "axis": {"gridColor": C.grid}},
    "color": {"field": "country", "type": "nominal", "title": "Country",
              "scale": {"domain": ["Malaysia","Australia"], "range": [C.gold, C.green]}},
    "opacity": {"condition": {"param": "sel", "value": 1}, "value": 0.15},
    "tooltip": [
      {"field": "name",     "title": "Name"},
      {"field": "country",  "title": "Country"},
      {"field": "wealth",   "title": "Wealth (USD B)", "format": ".1f"},
      {"field": "industry", "title": "Industry"}
    ]
  }
}, embedOpts);
