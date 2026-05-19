// =====================
// CHART 1: Industry Bar Chart
// =====================
const industrySpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Billionaire Industries: Malaysia vs Australia",
    "subtitle": "Source: Forbes Billionaire List 2025",
    "fontSize": 16,
    "subtitleFontSize": 11,
    "anchor": "start"
  },
  "width": 500,
  "height": 300,
  "data": {
    "url": "data/industry_data.csv"
  },
  "mark": {"type": "bar", "tooltip": true},
  "encoding": {
    "x": {
      "field": "industry",
      "type": "nominal",
      "title": "Industry",
      "sort": "-y",
      "axis": {"labelAngle": -30, "labelFontSize": 11}
    },
    "y": {
      "field": "count",
      "type": "quantitative",
      "title": "Number of Billionaires"
    },
    "color": {
      "field": "country",
      "type": "nominal",
      "title": "Country",
      "scale": {
        "domain": ["Australia", "Malaysia"],
        "range": ["#1f77b4", "#ff7f0e"]
      }
    },
    "xOffset": {
      "field": "country",
      "type": "nominal"
    },
    "tooltip": [
      {"field": "country", "type": "nominal", "title": "Country"},
      {"field": "industry", "type": "nominal", "title": "Industry"},
      {"field": "count", "type": "quantitative", "title": "Count"}
    ]
  }
};

vegaEmbed('#industry_chart', industrySpec, {actions: false});
