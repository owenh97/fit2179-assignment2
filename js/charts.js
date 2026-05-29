// ─────────────────────────────────────────
// GLOBAL VEGA-LITE CONFIG
// Applies Inter font, cream-card aesthetic,
// clean gridlines to every chart
// ─────────────────────────────────────────
const globalConfig = {
  "font": "Inter, sans-serif",
  "axis": {
    "labelFont": "Inter, sans-serif",
    "titleFont": "Inter, sans-serif",
    "labelFontSize": 11,
    "titleFontSize": 12,
    "titleFontWeight": 600,
    "titleColor": "#333333",
    "labelColor": "#555555",
    "gridColor": "#ede8df",
    "gridOpacity": 1,
    "domainColor": "#cccccc",
    "tickColor": "#cccccc"
  },
  "legend": {
    "labelFont": "Inter, sans-serif",
    "titleFont": "Inter, sans-serif",
    "labelFontSize": 11,
    "titleFontSize": 11,
    "titleFontWeight": 600,
    "titleColor": "#333333",
    "labelColor": "#555555",
    "padding": 6,
    "cornerRadius": 4
  },
  "title": {
    "font": "Inter, sans-serif",
    "subtitleFont": "Inter, sans-serif",
    "fontSize": 14,
    "fontWeight": 700,
    "subtitleFontSize": 10,
    "subtitleColor": "#888888",
    "color": "#1a1a1a",
    "anchor": "start",
    "offset": 12
  },
  "view": {
    "stroke": null,
    "fill": "#ffffff"
  },
  "background": "#ffffff",
  "padding": {"top": 16, "right": 16, "bottom": 16, "left": 16}
};

const embedOpts = { actions: false, config: globalConfig };


// ─────────────────────────────────────────
// CHART 1: World Map
// ─────────────────────────────────────────
const mapSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Global Distribution of Billionaires",
    "subtitle": "Circle size = number of billionaires  ·  Colour intensity = total wealth  ·  Hover for details  ·  Source: Billionaires Statistics Dataset 2023"
  },
  "width": "container",
  "height": 480,
  "autosize": {"type": "fit", "contains": "padding"},
  "view": {"fill": "#c9e8f5", "stroke": null},
  "projection": {"type": "naturalEarth1"},
  "layer": [
    {
      "data": {"sphere": {}},
      "mark": {"type": "geoshape", "fill": "#c9e8f5", "stroke": null}
    },
    {
      "data": {
        "url": "https://unpkg.com/world-atlas@2/countries-50m.json",
        "format": {"type": "topojson", "feature": "land"}
      },
      "mark": {
        "type": "geoshape",
        "fill": "#ddd5bf",
        "stroke": "#ffffff",
        "strokeWidth": 0.6
      }
    },
    {
      "data": {
        "url": "https://unpkg.com/world-atlas@2/countries-50m.json",
        "format": {"type": "topojson", "feature": "countries"}
      },
      "mark": {
        "type": "geoshape",
        "fill": null,
        "stroke": "#ffffff",
        "strokeWidth": 0.4
      }
    },
    {
      "data": {"url": "data/map_data.csv"},
      "mark": {"type": "circle", "opacity": 0.82, "tooltip": true},
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude": {"field": "lat", "type": "quantitative"},
        "size": {
          "field": "billionaire_count",
          "type": "quantitative",
          "title": "No. of Billionaires",
          "scale": {"range": [20, 2800], "type": "sqrt"},
          "legend": {
            "orient": "bottom-left",
            "title": "Billionaires",
            "values": [1, 10, 50, 200, 754],
            "titleFontSize": 11,
            "labelFontSize": 10
          }
        },
        "color": {
          "field": "billionaire_count",
          "type": "quantitative",
          "scale": {"scheme": "orangered", "domain": [1, 754]},
          "legend": null
        },
        "tooltip": [
          {"field": "country", "title": "Country"},
          {"field": "billionaire_count", "title": "Billionaires"},
          {"field": "total_wealth", "title": "Total Wealth (USD B)", "format": ",.0f"}
        ]
      }
    }
  ]
};

vegaEmbed('#map_chart', mapSpec, embedOpts);


// ─────────────────────────────────────────
// CHART 2: Malaysia Local Map
// ─────────────────────────────────────────
const malaysiaMapSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Malaysian Billionaires by Location",
    "subtitle": "Circle size = wealth (USD Billions)  ·  Colour = industry  ·  Hover for details  ·  Scroll to zoom  ·  Source: Forbes 2025"
  },
  "width": "container",
  "height": 460,
  "autosize": {"type": "fit", "contains": "padding"},
  "view": {"fill": "#d6eaf8", "stroke": null},
  "params": [
    {
      "name": "zoom",
      "select": "interval",
      "bind": "scales"
    }
  ],
  "projection": {
    "type": "mercator",
    "center": [108, 3.8],
    "scale": 2000
  },
  "layer": [
    {
      "data": {"sphere": {}},
      "mark": {"type": "geoshape", "fill": "#d6eaf8", "stroke": null}
    },
    {
      "data": {
        "url": "https://unpkg.com/world-atlas@2/countries-50m.json",
        "format": {"type": "topojson", "feature": "land"}
      },
      "mark": {
        "type": "geoshape",
        "fill": "#e8e0cc",
        "stroke": "#c8bfa0",
        "strokeWidth": 0.8
      }
    },
    {
      "data": {
        "url": "https://unpkg.com/world-atlas@2/countries-50m.json",
        "format": {"type": "topojson", "feature": "countries"}
      },
      "mark": {
        "type": "geoshape",
        "fill": null,
        "stroke": "#c8bfa0",
        "strokeWidth": 0.5
      }
    },
    {
      "data": {"url": "data/malaysia_billionaires.csv"},
      "mark": {
        "type": "circle",
        "opacity": 0.88,
        "stroke": "#ffffff",
        "strokeWidth": 1.2,
        "tooltip": true
      },
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude": {"field": "lat", "type": "quantitative"},
        "size": {
          "field": "wealth",
          "type": "quantitative",
          "title": "Wealth (USD Billions)",
          "scale": {"range": [120, 2200], "type": "sqrt"},
          "legend": {
            "orient": "bottom-right",
            "title": "Wealth (USD B)",
            "values": [1, 3, 6, 10, 12],
            "titleFontSize": 11,
            "labelFontSize": 10
          }
        },
        "color": {
          "field": "industry",
          "type": "nominal",
          "title": "Industry",
          "scale": {
            "domain": ["Diversified","Manufacturing","Food & Beverage","Real Estate","Construction & Engineering","Gambling & Casinos","Metals & Mining","Finance & Investments","Energy","Fashion & Retail"],
            "range": ["#4e79a7","#f28e2b","#e15759","#76b7b2","#59a14f","#edc948","#b07aa1","#ff9da7","#9c755f","#bab0ac"]
          },
          "legend": {
            "orient": "right",
            "title": "Industry",
            "labelLimit": 160
          }
        },
        "tooltip": [
          {"field": "name", "title": "Name"},
          {"field": "city", "title": "City"},
          {"field": "wealth", "title": "Wealth (USD Billions)", "format": ".1f"},
          {"field": "industry", "title": "Industry"}
        ]
      }
    }
  ]
};

vegaEmbed('#malaysia_map', malaysiaMapSpec, embedOpts);


// ─────────────────────────────────────────
// CHART 3: Australia Local Map
// ─────────────────────────────────────────
const australiaMapSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Australian Billionaires by Location",
    "subtitle": "Circle size = wealth (USD Billions)  ·  Colour = industry  ·  Hover for details  ·  Scroll to zoom  ·  Source: Forbes 2025"
  },
  "width": "container",
  "height": 460,
  "autosize": {"type": "fit", "contains": "padding"},
  "view": {"fill": "#d6eaf8", "stroke": null},
  "params": [
    {
      "name": "zoom",
      "select": "interval",
      "bind": "scales"
    }
  ],
  "projection": {
    "type": "mercator",
    "center": [134, -27],
    "scale": 660
  },
  "layer": [
    {
      "data": {"sphere": {}},
      "mark": {"type": "geoshape", "fill": "#d6eaf8", "stroke": null}
    },
    {
      "data": {
        "url": "https://unpkg.com/world-atlas@2/countries-50m.json",
        "format": {"type": "topojson", "feature": "land"}
      },
      "mark": {
        "type": "geoshape",
        "fill": "#e8e0cc",
        "stroke": "#c8bfa0",
        "strokeWidth": 0.8
      }
    },
    {
      "data": {
        "url": "https://unpkg.com/world-atlas@2/countries-50m.json",
        "format": {"type": "topojson", "feature": "countries"}
      },
      "mark": {
        "type": "geoshape",
        "fill": null,
        "stroke": "#c8bfa0",
        "strokeWidth": 0.5
      }
    },
    {
      "data": {"url": "data/australia_billionaires.csv"},
      "mark": {
        "type": "circle",
        "opacity": 0.88,
        "stroke": "#ffffff",
        "strokeWidth": 1.2,
        "tooltip": true
      },
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude": {"field": "lat", "type": "quantitative"},
        "size": {
          "field": "wealth",
          "type": "quantitative",
          "title": "Wealth (USD Billions)",
          "scale": {"range": [120, 3500], "type": "sqrt"},
          "legend": {
            "orient": "bottom-right",
            "title": "Wealth (USD B)",
            "values": [3, 8, 15, 20, 29],
            "titleFontSize": 11,
            "labelFontSize": 10
          }
        },
        "color": {
          "field": "industry",
          "type": "nominal",
          "title": "Industry",
          "scale": {
            "domain": ["Metals & Mining","Real Estate","Technology","Manufacturing","Finance & Investments","Diversified","Food & Beverage","Fashion & Retail","Healthcare","Automotive"],
            "range": ["#4e79a7","#f28e2b","#e15759","#76b7b2","#59a14f","#edc948","#b07aa1","#ff9da7","#9c755f","#bab0ac"]
          },
          "legend": {
            "orient": "right",
            "title": "Industry",
            "labelLimit": 160
          }
        },
        "tooltip": [
          {"field": "name", "title": "Name"},
          {"field": "state", "title": "State"},
          {"field": "wealth", "title": "Wealth (USD Billions)", "format": ".1f"},
          {"field": "industry", "title": "Industry"}
        ]
      }
    }
  ]
};

vegaEmbed('#australia_map', australiaMapSpec, embedOpts);


// ─────────────────────────────────────────
// CHART 4: Industry Grouped Bar Chart
// ─────────────────────────────────────────
const industrySpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Billionaire Industries: Malaysia vs Australia",
    "subtitle": "Source: Forbes Billionaire List 2025"
  },
  "width": "container",
  "height": 280,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/industry_data.csv"},
  "mark": {"type": "bar", "tooltip": true, "cornerRadiusTopLeft": 3, "cornerRadiusTopRight": 3},
  "encoding": {
    "x": {
      "field": "industry", "type": "nominal", "title": null,
      "sort": "-y",
      "axis": {"labelAngle": -35, "labelFontSize": 10, "labelLimit": 120}
    },
    "y": {
      "field": "count", "type": "quantitative",
      "title": "Number of Billionaires",
      "axis": {"gridColor": "#ede8df"}
    },
    "color": {
      "field": "country", "type": "nominal", "title": "Country",
      "scale": {"domain": ["Australia","Malaysia"], "range": ["#2d4a3e","#c9a84c"]}
    },
    "xOffset": {"field": "country", "type": "nominal"},
    "tooltip": [
      {"field": "country", "title": "Country"},
      {"field": "industry", "title": "Industry"},
      {"field": "count", "title": "Billionaires"}
    ]
  }
};

vegaEmbed('#industry_chart', industrySpec, embedOpts);


// ─────────────────────────────────────────
// CHART 5: Heatmap
// ─────────────────────────────────────────
const heatmapSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Industry Heatmap",
    "subtitle": "Darker = more billionaires  ·  Source: Forbes 2025"
  },
  "width": "container",
  "height": 320,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/industry_data.csv"},
  "mark": {"type": "rect", "tooltip": true, "cornerRadius": 2},
  "encoding": {
    "x": {
      "field": "country", "type": "nominal", "title": null,
      "axis": {"labelFontSize": 12, "labelFontWeight": 600}
    },
    "y": {
      "field": "industry", "type": "nominal", "title": null,
      "sort": {"field": "count", "order": "descending"}
    },
    "color": {
      "field": "count", "type": "quantitative", "title": "Billionaires",
      "scale": {"scheme": "oranges", "domain": [0, 10]}
    },
    "tooltip": [
      {"field": "country", "title": "Country"},
      {"field": "industry", "title": "Industry"},
      {"field": "count", "title": "Billionaires"}
    ]
  }
};

vegaEmbed('#heatmap_chart', heatmapSpec, embedOpts);


// ─────────────────────────────────────────
// CHART 6: Bubble Chart
// ─────────────────────────────────────────
const bubbleSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "GDP vs Number of Billionaires",
    "subtitle": "Bubble size = total wealth (USD B)  ·  Log scales  ·  Source: Billionaires Statistics Dataset 2023"
  },
  "width": "container",
  "height": 340,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/bubble_data.csv"},
  "layer": [
    {
      "mark": {"type": "circle", "opacity": 0.75, "tooltip": true},
      "encoding": {
        "x": {
          "field": "gdp_bn", "type": "quantitative",
          "title": "GDP (USD Billions)",
          "scale": {"type": "log", "domain": [1, 150000]},
          "axis": {"format": ",.0f", "grid": true, "gridColor": "#ede8df",
                   "values": [1, 10, 100, 1000, 10000, 100000]}
        },
        "y": {
          "field": "billionaire_count", "type": "quantitative",
          "title": "Number of Billionaires",
          "scale": {"type": "log", "domain": [1, 1200]},
          "axis": {"grid": true, "gridColor": "#ede8df",
                   "values": [1, 3, 10, 30, 100, 300, 1000]}
        },
        "size": {
          "field": "total_worth_bn", "type": "quantitative",
          "scale": {"range": [40, 2400], "type": "sqrt"}, "legend": null
        },
        "color": {
          "field": "highlight", "type": "nominal",
          "scale": {
            "domain": ["Australia","Malaysia","United States","China","India","Germany","United Kingdom","Singapore","Other"],
            "range": ["#2d4a3e","#c9a84c","#e15759","#4e79a7","#f28e2b","#76b7b2","#59a14f","#b07aa1","#e0d9cc"]
          }
        },
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
      "mark": {"type": "text", "dy": -14, "fontSize": 10, "fontWeight": 600},
      "encoding": {
        "x": {"field": "gdp_bn", "type": "quantitative", "scale": {"type": "log"}},
        "y": {"field": "billionaire_count", "type": "quantitative", "scale": {"type": "log"}},
        "text": {"field": "country", "type": "nominal"},
        "color": {"value": "#333333"}
      }
    }
  ]
};

vegaEmbed('#bubble_chart', bubbleSpec, embedOpts);


// ─────────────────────────────────────────
// CHART 7: Age Strip Plot
// ─────────────────────────────────────────
const ageSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Age Distribution of Billionaires",
    "subtitle": "Each dot = one billionaire  ·  Source: Billionaires Statistics Dataset 2023"
  },
  "width": "container",
  "height": 140,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/age_data.csv"},
  "mark": {
    "type": "circle",
    "size": 90,
    "opacity": 0.75,
    "stroke": "#ffffff",
    "strokeWidth": 0.8,
    "tooltip": true
  },
  "encoding": {
    "x": {
      "field": "age", "type": "quantitative", "title": "Age",
      "scale": {"domain": [30, 95]},
      "axis": {"gridColor": "#ede8df"}
    },
    "y": {
      "field": "country", "type": "nominal", "title": null,
      "axis": {"labelFontSize": 12, "labelFontWeight": 600}
    },
    "color": {
      "field": "country", "type": "nominal",
      "scale": {"domain": ["Australia","Malaysia"], "range": ["#2d4a3e","#c9a84c"]},
      "legend": null
    },
    "tooltip": [
      {"field": "personName", "title": "Name"},
      {"field": "country", "title": "Country"},
      {"field": "age", "title": "Age"}
    ]
  }
};

vegaEmbed('#age_chart', ageSpec, embedOpts);


// ─────────────────────────────────────────
// CHART 8: Small Multiple Donuts
// ─────────────────────────────────────────
const donutColor = {
  "domain": ["Male","Female","Self-Made","Inherited"],
  "range": ["#2d4a3e","#c9a84c","#4e79a7","#e15759"]
};

function donutLayer(dataUrl, titleText, showLegend) {
  return {
    "title": {"text": titleText, "fontSize": 12, "fontWeight": 600, "color": "#333"},
    "width": 148, "height": 148,
    "data": {"url": dataUrl},
    "layer": [
      {
        "mark": {"type": "arc", "innerRadius": 42, "outerRadius": 70, "tooltip": true},
        "encoding": {
          "theta": {"field": "value", "type": "quantitative"},
          "color": {
            "field": "label", "type": "nominal",
            "scale": donutColor,
            "legend": showLegend ? {"title": null, "orient": "right", "labelFontSize": 11} : null
          },
          "tooltip": [
            {"field": "label", "title": "Category"},
            {"field": "value", "title": "Count"},
            {"field": "percent", "title": "%", "format": ".1f"}
          ]
        }
      },
      {
        "mark": {"type": "text", "radius": 88, "fontSize": 10, "fontWeight": 600, "color": "#444"},
        "encoding": {
          "theta": {"field": "value", "type": "quantitative", "stack": true},
          "text": {
            "field": "percent", "type": "quantitative",
            "format": ".0f",
            "condition": {"test": "datum.percent > 8", "value": {"expr": "datum.percent + '%'"}}
          }
        }
      }
    ]
  };
}

const donutSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Gender & Self-Made Status",
    "subtitle": "Gender: Forbes 2025  ·  Self-Made: Billionaires Statistics Dataset 2023"
  },
  "spacing": 28,
  "concat": [
    donutLayer("data/donut_my_gender.csv",    "Malaysia — Gender",     true),
    donutLayer("data/donut_aus_gender.csv",   "Australia — Gender",    false),
    donutLayer("data/donut_my_selfmade.csv",  "Malaysia — Self-Made",  false),
    donutLayer("data/donut_aus_selfmade.csv", "Australia — Self-Made", false)
  ],
  "columns": 2
};

vegaEmbed('#donut_chart', donutSpec, embedOpts);


// ─────────────────────────────────────────
// CHART 9: Education Scatter
// ─────────────────────────────────────────
const countryColors = {
  "domain": ["Malaysia","Australia","Singapore","United States","China","Germany","United Kingdom","India","France","Japan"],
  "range": ["#c9a84c","#2d4a3e","#4e79a7","#e15759","#f28e2b","#76b7b2","#59a14f","#b07aa1","#edc948","#9c755f"]
};

const factorsSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Does Education Produce Billionaires?",
    "subtitle": "X = Tertiary enrollment (%)  ·  Y = Billionaires per million  ·  Source: Billionaires Statistics Dataset 2023"
  },
  "width": "container",
  "height": 280,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/country_factors.csv"},
  "layer": [
    {
      "mark": {"type": "circle", "size": 100, "opacity": 0.85, "tooltip": true,
               "stroke": "#ffffff", "strokeWidth": 1},
      "encoding": {
        "x": {"field": "education", "type": "quantitative",
              "title": "Tertiary Education Enrollment (%)",
              "axis": {"gridColor": "#ede8df"}},
        "y": {"field": "per_million", "type": "quantitative",
              "title": "Billionaires per Million People",
              "axis": {"gridColor": "#ede8df"}},
        "color": {"field": "country", "type": "nominal", "scale": countryColors, "legend": null},
        "tooltip": [
          {"field": "country", "title": "Country"},
          {"field": "education", "title": "Education (%)"},
          {"field": "per_million", "title": "Per Million", "format": ".2f"},
          {"field": "tax_rate", "title": "Tax Rate (%)"}
        ]
      }
    },
    {
      "mark": {"type": "text", "fontSize": 10, "fontWeight": 600, "dx": 9, "dy": -4},
      "encoding": {
        "x": {"field": "education", "type": "quantitative"},
        "y": {"field": "per_million", "type": "quantitative"},
        "text": {"field": "country", "type": "nominal"},
        "color": {"value": "#444444"}
      }
    }
  ]
};

vegaEmbed('#factors_chart', factorsSpec, embedOpts);


// ─────────────────────────────────────────
// CHART 10: Tax Scatter
// ─────────────────────────────────────────
const taxSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Do Lower Taxes Produce More Billionaires?",
    "subtitle": "X = Total tax rate (%)  ·  Y = Billionaires per million  ·  Source: Billionaires Statistics Dataset 2023"
  },
  "width": "container",
  "height": 280,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/country_factors.csv"},
  "layer": [
    {
      "mark": {"type": "circle", "size": 100, "opacity": 0.85, "tooltip": true,
               "stroke": "#ffffff", "strokeWidth": 1},
      "encoding": {
        "x": {"field": "tax_rate", "type": "quantitative",
              "title": "Total Tax Rate (%)",
              "axis": {"gridColor": "#ede8df"}},
        "y": {"field": "per_million", "type": "quantitative",
              "title": "Billionaires per Million People",
              "axis": {"gridColor": "#ede8df"}},
        "color": {"field": "country", "type": "nominal", "scale": countryColors, "legend": null},
        "tooltip": [
          {"field": "country", "title": "Country"},
          {"field": "tax_rate", "title": "Tax Rate (%)"},
          {"field": "per_million", "title": "Per Million", "format": ".2f"},
          {"field": "education", "title": "Education (%)"}
        ]
      }
    },
    {
      "mark": {"type": "text", "fontSize": 10, "fontWeight": 600, "dx": 9, "dy": -4},
      "encoding": {
        "x": {"field": "tax_rate", "type": "quantitative"},
        "y": {"field": "per_million", "type": "quantitative"},
        "text": {"field": "country", "type": "nominal"},
        "color": {"value": "#444444"}
      }
    }
  ]
};

vegaEmbed('#tax_chart', taxSpec, embedOpts);


// ─────────────────────────────────────────
// CHART 11: Wealth Distribution
// ─────────────────────────────────────────
const wealthDistSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Wealth Distribution by Bracket",
    "subtitle": "Source: Billionaires Statistics Dataset 2023"
  },
  "width": "container",
  "height": 260,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/wealth_distribution.csv"},
  "mark": {
    "type": "bar", "tooltip": true,
    "cornerRadiusTopLeft": 3, "cornerRadiusTopRight": 3
  },
  "encoding": {
    "x": {
      "field": "wealth_bracket", "type": "ordinal", "title": "Wealth Bracket",
      "sort": ["$1-2B","$2-5B","$5-10B","$10-20B","$20-50B","$50B+"],
      "axis": {"labelAngle": -20}
    },
    "y": {
      "field": "count", "type": "quantitative", "title": "Number of Billionaires",
      "axis": {"gridColor": "#ede8df"}
    },
    "color": {
      "field": "country", "type": "nominal", "title": "Country",
      "scale": {"domain": ["Malaysia","Australia"], "range": ["#c9a84c","#2d4a3e"]}
    },
    "xOffset": {"field": "country", "type": "nominal"},
    "tooltip": [
      {"field": "country", "title": "Country"},
      {"field": "wealth_bracket", "title": "Bracket"},
      {"field": "count", "title": "Count"}
    ]
  }
};

vegaEmbed('#wealth_dist_chart', wealthDistSpec, embedOpts);


// ─────────────────────────────────────────
// CHART 12: Interactive Top Billionaires
// ─────────────────────────────────────────
const topSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Top 10 Billionaires by Wealth",
    "subtitle": "Click legend to filter by country  ·  Source: Forbes Billionaire List 2025"
  },
  "width": "container",
  "height": 300,
  "autosize": {"type": "fit", "contains": "padding"},
  "data": {"url": "data/top_billionaires.csv"},
  "params": [{
    "name": "countrySelect",
    "select": {"type": "point", "fields": ["country"]},
    "bind": "legend"
  }],
  "mark": {
    "type": "bar", "tooltip": true,
    "cornerRadiusTopRight": 3, "cornerRadiusBottomRight": 3
  },
  "encoding": {
    "y": {
      "field": "name", "type": "nominal", "sort": "-x", "title": null,
      "axis": {"labelFontSize": 10, "labelLimit": 160}
    },
    "x": {
      "field": "wealth", "type": "quantitative",
      "title": "Wealth (USD Billions)",
      "axis": {"gridColor": "#ede8df"}
    },
    "color": {
      "field": "country", "type": "nominal", "title": "Country",
      "scale": {"domain": ["Malaysia","Australia"], "range": ["#c9a84c","#2d4a3e"]}
    },
    "opacity": {
      "condition": {"param": "countrySelect", "value": 1},
      "value": 0.15
    },
    "tooltip": [
      {"field": "name", "title": "Name"},
      {"field": "country", "title": "Country"},
      {"field": "wealth", "title": "Wealth (USD B)", "format": ".1f"},
      {"field": "industry", "title": "Industry"}
    ]
  }
};

vegaEmbed('#top_chart', topSpec, embedOpts);
