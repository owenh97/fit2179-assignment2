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
vegaEmbed('#malaysia_map', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Malaysian Billionaires by State",
            "subtitle": "State colour = billionaire count  ·  Circle = individual billionaire  ·  Size = wealth (USD B)  ·  Source: Forbes 2025"},
  "width": 860, "height": 480,
  "view": {"fill": "#c8e4f0", "stroke": null},
  "projection": {"type": "mercator", "center": [108.5, 3.8], "scale": 2400},
  "layer": [
    {
      "data": {"sphere": {}},
      "mark": {"type": "geoshape", "fill": "#c8e4f0", "stroke": null}
    },
    {
      "data": {"url": "data/malaysia_states.json", "format": {"type": "json", "property": "features"}},
      "mark": {"type": "geoshape", "stroke": "#a8977a", "strokeWidth": 1.2},
      "encoding": {
        "color": {
          "field": "properties.billionaires",
          "type": "quantitative",
          "title": "Billionaires",
          "scale": {"scheme": "greens", "domain": [0, 14]},
          "legend": {"orient": "bottom-left", "title": "Billionaires per State"}
        },
        "tooltip": [
          {"field": "properties.name", "title": "State"},
          {"field": "properties.billionaires", "title": "Billionaires"}
        ]
      }
    },
    {
      "data": {"values": [
        {"label": "Kuala Lumpur", "lat": 3.17, "lon": 101.69},
        {"label": "Penang",       "lat": 5.46, "lon": 100.33},
        {"label": "Johor Bahru",  "lat": 1.52, "lon": 103.74},
        {"label": "Kota Kinabalu","lat": 5.98, "lon": 116.08},
        {"label": "Kuching",      "lat": 1.56, "lon": 110.34}
      ]},
      "mark": {"type": "text", "fontSize": 10, "fontWeight": 600, "color": "#4a3a1e", "dy": -10},
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude":  {"field": "lat", "type": "quantitative"},
        "text":      {"field": "label", "type": "nominal"}
      }
    },
    {
      "data": {"url": "data/malaysia_billionaires.csv"},
      "mark": {"type": "circle", "opacity": 0.88, "stroke": "#ffffff", "strokeWidth": 1.8},
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude":  {"field": "lat", "type": "quantitative"},
        "size": {
          "field": "wealth", "type": "quantitative", "title": "Wealth (USD B)",
          "scale": {"range": [60, 1400], "type": "sqrt"},
          "legend": {"orient": "bottom-right", "values": [1,3,6,9,12]}
        },
        "color": {
          "field": "industry", "type": "nominal", "title": "Industry",
          "scale": {"domain": industryDomain, "range": industryRange},
          "legend": {"orient": "right", "labelLimit": 180}
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


// ─── CHART 3: Australia Choropleth Map ───
vegaEmbed('#australia_map', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Australian Billionaires by State",
            "subtitle": "State colour = billionaire count  ·  Circle = individual billionaire  ·  Size = wealth (USD B)  ·  Source: Forbes 2025"},
  "width": 860, "height": 480,
  "view": {"fill": "#c8e4f0", "stroke": null},
  "projection": {"type": "mercator", "center": [134, -28], "scale": 680},
  "layer": [
    {
      "data": {"sphere": {}},
      "mark": {"type": "geoshape", "fill": "#c8e4f0", "stroke": null}
    },
    {
      "data": {"url": "data/australia_states.json", "format": {"type": "json", "property": "features"}},
      "mark": {"type": "geoshape", "stroke": "#a8977a", "strokeWidth": 1.2},
      "encoding": {
        "color": {
          "field": "properties.billionaires",
          "type": "quantitative",
          "title": "Billionaires",
          "scale": {"scheme": "greens", "domain": [0, 15]},
          "legend": {"orient": "bottom-left", "title": "Billionaires per State"}
        },
        "tooltip": [
          {"field": "properties.name", "title": "State"},
          {"field": "properties.billionaires", "title": "Billionaires"},
          {"field": "properties.total_wealth", "title": "Total Wealth (USD B)"}
        ]
      }
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
      "mark": {"type": "text", "fontSize": 10, "fontWeight": 600, "color": "#4a3a1e", "dy": -10},
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude":  {"field": "lat", "type": "quantitative"},
        "text":      {"field": "label", "type": "nominal"}
      }
    },
    {
      "data": {"url": "data/australia_billionaires.csv"},
      "mark": {"type": "circle", "opacity": 0.88, "stroke": "#ffffff", "strokeWidth": 1.8},
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude":  {"field": "lat", "type": "quantitative"},
        "size": {
          "field": "wealth", "type": "quantitative", "title": "Wealth (USD B)",
          "scale": {"range": [60, 2000], "type": "sqrt"},
          "legend": {"orient": "bottom-right", "values": [3,8,15,20,29]}
        },
        "color": {
          "field": "industry", "type": "nominal", "title": "Industry",
          "scale": {"domain": industryDomain, "range": industryRange},
          "legend": {"orient": "right", "labelLimit": 180}
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
