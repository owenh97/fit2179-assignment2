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


// ─── CHART 2: Malaysia Choropleth + Symbol overlay ───
// Uses inline GeoJSON rectangles approximating Malaysia states
// since a reliable Malaysia TopoJSON CDN is unavailable
// We use a proportional symbol map zoomed tightly to Malaysia
// with state-level choropleth effect via background rectangles

vegaEmbed('#malaysia_map', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Malaysian Billionaires by State",
            "subtitle": "Colour intensity = billionaires per state  ·  Circle = individual billionaire (size = wealth)  ·  Source: Forbes 2025"},
  "width": 820, "height": 460,
  "view": {"fill": "#c8e4f0", "stroke": null},
  "params": [{"name": "grid", "select": "interval", "bind": "scales"}],
  "projection": {"type": "mercator", "center": [109.5, 3.8], "scale": 2200},
  "layer": [
    {"data": {"sphere": {}}, "mark": {"type": "geoshape", "fill": "#c8e4f0"}},
    {"data": {"url": "https://unpkg.com/world-atlas@2/countries-50m.json",
              "format": {"type": "topojson", "feature": "land"}},
     "mark": {"type": "geoshape", "fill": "#e8e0c8", "stroke": "#c8b98a", "strokeWidth": 1.0}},
    {"data": {"url": "https://unpkg.com/world-atlas@2/countries-50m.json",
              "format": {"type": "topojson", "feature": "countries"}},
     "mark": {"type": "geoshape", "fill": null, "stroke": "#c8b98a", "strokeWidth": 0.5}},
    {
      "data": {"values": [
        {"region": "Kuala Lumpur & Selangor", "lat": 3.14, "lon": 101.69, "billionaires": 17, "wealth": 49.4, "note": "Financial & industrial hub"},
        {"region": "Penang",                  "lat": 5.41, "lon": 100.33, "billionaires": 1,  "wealth": 4.2,  "note": "Manufacturing & trade"},
        {"region": "Johor Bahru",             "lat": 1.49, "lon": 103.74, "billionaires": 1,  "wealth": 3.7,  "note": "Food & beverage"}
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
                 "scale": {"range": [180, 2800], "type": "sqrt"},
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


// ─── CHART 3: Australia Choropleth + Symbol overlay ──
vegaEmbed('#australia_map', {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Australian Billionaires by State",
            "subtitle": "Colour intensity = state wealth cluster  ·  Circle = individual billionaire (size = wealth)  ·  Source: Forbes 2025"},
  "width": 820, "height": 460,
  "view": {"fill": "#c8e4f0", "stroke": null},
  "params": [{"name": "grid", "select": "interval", "bind": "scales"}],
  "projection": {"type": "mercator", "center": [134, -28], "scale": 700},
  "layer": [
    {"data": {"sphere": {}}, "mark": {"type": "geoshape", "fill": "#c8e4f0"}},
    {"data": {"url": "https://unpkg.com/world-atlas@2/countries-50m.json",
              "format": {"type": "topojson", "feature": "land"}},
     "mark": {"type": "geoshape", "fill": "#e8e0c8", "stroke": "#c8b98a", "strokeWidth": 1.0}},
    {"data": {"url": "https://unpkg.com/world-atlas@2/countries-50m.json",
              "format": {"type": "topojson", "feature": "countries"}},
     "mark": {"type": "geoshape", "fill": null, "stroke": "#c8b98a", "strokeWidth": 0.5}},
    {
      "data": {"values": [
        {"region": "New South Wales", "lat": -33.87, "lon": 151.21, "billionaires": 15, "wealth": 107.2},
        {"region": "Victoria",        "lat": -37.81, "lon": 144.96, "billionaires": 2,  "wealth": 11.9},
        {"region": "Western Australia","lat": -25.0,  "lon": 118.0,  "billionaires": 3,  "wealth": 51.4}
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
                 "scale": {"range": [180, 4200], "type": "sqrt"},
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
