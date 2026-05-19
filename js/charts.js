// =====================
// CHART 1: World Map — Proportional Symbol Map
// =====================
const mapSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Global Distribution of Billionaires",
    "subtitle": "Circle size = number of billionaires | Colour intensity = total wealth | Source: Billionaires Statistics Dataset 2023",
    "fontSize": 16,
    "subtitleFontSize": 11,
    "anchor": "start"
  },
  "width": 600,
  "height": 350,
  "projection": {"type": "naturalEarth1"},
  "layer": [
    {
      "data": {
        "url": "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/world-110m.json",
        "format": {"type": "topojson", "feature": "countries"}
      },
      "mark": {
        "type": "geoshape",
        "fill": "#e8e8e8",
        "stroke": "#ffffff",
        "strokeWidth": 0.5
      }
    },
    {
      "data": {"url": "data/map_data.csv"},
      "mark": {
        "type": "circle",
        "opacity": 0.7,
        "tooltip": true
      },
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude": {"field": "lat", "type": "quantitative"},
        "size": {
          "field": "billionaire_count",
          "type": "quantitative",
          "title": "No. of Billionaires",
          "scale": {"range": [20, 1500]},
          "legend": {"orient": "bottom-right"}
        },
        "color": {
          "field": "billionaire_count",
          "type": "quantitative",
          "title": "No. of Billionaires",
          "scale": {"scheme": "orangered"},
          "legend": null
        },
        "tooltip": [
          {"field": "country", "title": "Country"},
          {"field": "billionaire_count", "title": "Billionaires"},
          {"field": "total_wealth", "title": "Total Wealth (USD Billions)", "format": ",.0f"}
        ]
      }
    }
  ]
};

vegaEmbed('#map_chart', mapSpec, {actions: false});


// =====================
// CHART 2: Industry Grouped Bar Chart
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
  "data": {"url": "data/industry_data.csv"},
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
      {"field": "country", "title": "Country"},
      {"field": "industry", "title": "Industry"},
      {"field": "count", "title": "Count"}
    ]
  }
};

vegaEmbed('#industry_chart', industrySpec, {actions: false});


// =====================
// CHART 3: Bubble Chart — GDP vs Billionaire Count
// =====================
const bubbleSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "GDP vs Number of Billionaires",
    "subtitle": "Bubble size = Total Wealth (USD Billions) | Source: Billionaires Statistics Dataset 2023",
    "fontSize": 16,
    "subtitleFontSize": 11,
    "anchor": "start"
  },
  "width": 500,
  "height": 350,
  "data": {"url": "data/bubble_data.csv"},
  "layer": [
    {
      "mark": {"type": "circle", "opacity": 0.7, "tooltip": true},
      "encoding": {
        "x": {
          "field": "gdp_bn",
          "type": "quantitative",
          "title": "GDP (USD Billions)",
          "scale": {"type": "log"},
          "axis": {"format": ",.0f", "grid": false}
        },
        "y": {
          "field": "billionaire_count",
          "type": "quantitative",
          "title": "Number of Billionaires",
          "scale": {"type": "log"}
          "axis": {"grid": false}
        },
        "size": {
          "field": "total_worth_bn",
          "type": "quantitative",
          "title": "Total Wealth (USD Billions)",
          "scale": {"range": [50, 2000]},
          "legend": null
        },
        "color": {
          "field": "highlight",
          "type": "nominal",
          "title": "Country",
          "scale": {
            "domain": ["Australia","Malaysia","United States","China","India","Germany","United Kingdom","Singapore","Other"],
            "range": ["#1f77b4","#ff7f0e","#d62728","#8c564b","#e377c2","#7f7f7f","#17becf","#bcbd22","#dddddd"]
          }
        },
        "tooltip": [
          {"field": "country", "title": "Country"},
          {"field": "billionaire_count", "title": "Billionaires"},
          {"field": "gdp_bn", "title": "GDP (USD Billions)", "format": ",.0f"},
          {"field": "total_worth_bn", "title": "Total Wealth (USD Billions)", "format": ",.0f"}
        ]
      }
    },
    {
      "transform": [{"filter": "datum.highlight !== 'Other'"}],
      "mark": {"type": "text", "dy": -12, "fontSize": 11, "fontWeight": "bold"},
      "encoding": {
        "x": {"field": "gdp_bn", "type": "quantitative", "scale": {"type": "log"}},
        "y": {"field": "billionaire_count", "type": "quantitative", "scale": {"type": "log"}},
        "text": {"field": "country", "type": "nominal"},
        "color": {"value": "#333333"}
      }
    }
  ]
};

vegaEmbed('#bubble_chart', bubbleSpec, {actions: false});


// =====================
// CHART 4: Age Dot/Strip Plot
// =====================
const ageSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Age Distribution of Billionaires",
    "subtitle": "Each dot = one billionaire | Source: Billionaires Statistics Dataset 2023",
    "fontSize": 16,
    "subtitleFontSize": 11,
    "anchor": "start"
  },
  "width": 500,
  "height": 150,
  "data": {"url": "data/age_data.csv"},
  "mark": {"type": "circle", "size": 80, "opacity": 0.7, "tooltip": true},
  "encoding": {
    "x": {
      "field": "age",
      "type": "quantitative",
      "title": "Age",
      "scale": {"domain": [30, 95]}
    },
    "y": {
      "field": "country",
      "type": "nominal",
      "title": null,
      "axis": {"labelFontSize": 13, "labelFontWeight": "bold"}
    },
    "color": {
      "field": "country",
      "type": "nominal",
      "scale": {
        "domain": ["Australia", "Malaysia"],
        "range": ["#1f77b4", "#ff7f0e"]
      },
      "legend": null
    },
    "tooltip": [
      {"field": "personName", "title": "Name"},
      {"field": "country", "title": "Country"},
      {"field": "age", "title": "Age"}
    ]
  }
};

vegaEmbed('#age_chart', ageSpec, {actions: false});


// =====================
// CHART 5: Small Multiple Donuts — Gender & Self-Made
// =====================
const colorScale = {
  "domain": ["Male","Female","Self-Made","Inherited"],
  "range": ["#4e79a7","#f28e2b","#59a14f","#e15759"]
};

const donutSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Gender & Self-Made Status: Malaysia vs Australia",
    "subtitle": "Gender: Forbes 2025 | Self-Made: Billionaires Statistics Dataset 2023",
    "fontSize": 16, "subtitleFontSize": 11, "anchor": "start"
  },
  "concat": [
    {
      "title": {"text": "Malaysia — Gender", "fontSize": 13},
      "width": 150, "height": 150,
      "data": {"url": "data/donut_my_gender.csv"},
      "mark": {"type": "arc", "innerRadius": 45, "tooltip": true},
      "encoding": {
        "theta": {"field": "value", "type": "quantitative"},
        "color": {"field": "label", "type": "nominal", "scale": colorScale, "legend": {"title": "Category"}},
        "tooltip": [{"field": "label", "title": "Type"}, {"field": "value", "title": "Count"}]
      }
    },
    {
      "title": {"text": "Australia — Gender", "fontSize": 13},
      "width": 150, "height": 150,
      "data": {"url": "data/donut_aus_gender.csv"},
      "mark": {"type": "arc", "innerRadius": 45, "tooltip": true},
      "encoding": {
        "theta": {"field": "value", "type": "quantitative"},
        "color": {"field": "label", "type": "nominal", "scale": colorScale, "legend": null},
        "tooltip": [{"field": "label", "title": "Type"}, {"field": "value", "title": "Count"}]
      }
    },
    {
      "title": {"text": "Malaysia — Self-Made", "fontSize": 13},
      "width": 150, "height": 150,
      "data": {"url": "data/donut_my_selfmade.csv"},
      "mark": {"type": "arc", "innerRadius": 45, "tooltip": true},
      "encoding": {
        "theta": {"field": "value", "type": "quantitative"},
        "color": {"field": "label", "type": "nominal", "scale": colorScale, "legend": null},
        "tooltip": [{"field": "label", "title": "Type"}, {"field": "value", "title": "Count"}]
      }
    },
    {
      "title": {"text": "Australia — Self-Made", "fontSize": 13},
      "width": 150, "height": 150,
      "data": {"url": "data/donut_aus_selfmade.csv"},
      "mark": {"type": "arc", "innerRadius": 45, "tooltip": true},
      "encoding": {
        "theta": {"field": "value", "type": "quantitative"},
        "color": {"field": "label", "type": "nominal", "scale": colorScale, "legend": null},
        "tooltip": [{"field": "label", "title": "Type"}, {"field": "value", "title": "Count"}]
      }
    }
  ],
  "columns": 2
};

vegaEmbed('#donut_chart', donutSpec, {actions: false});

// =====================
// CHART 6: Heatmap wealth by indusry x country
// =====================

const heatmapSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {"text": "Industry Wealth Heatmap", "anchor": "start", "fontSize": 16},
  "width": 200, "height": 300,
  "data": {"url": "data/industry_data.csv"},
  "mark": {"type": "rect", "tooltip": true},
  "encoding": {
    "x": {"field": "country", "type": "nominal", "title": null},
    "y": {"field": "industry", "type": "nominal", "title": null, "sort": "-x"},
    "color": {
      "field": "count", "type": "quantitative",
      "title": "Billionaires",
      "scale": {"scheme": "oranges"}
    },
    "tooltip": [
      {"field": "country", "title": "Country"},
      {"field": "industry", "title": "Industry"},
      {"field": "count", "title": "Count"}
    ]
  }
};
vegaEmbed('#heatmap_chart', heatmapSpec, {actions: false});

// =====================
// CHART 7: Interactive Top Billionaires — Malaysia vs Australia
// =====================
const topSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Top 10 Billionaires: Malaysia vs Australia",
    "subtitle": "Source: Forbes Billionaire List 2025",
    "fontSize": 16, "subtitleFontSize": 11, "anchor": "start"
  },
  "width": 450, "height": 300,
  "data": {"url": "data/top_billionaires.csv"},
  "params": [{
    "name": "countrySelect",
    "select": {"type": "point", "fields": ["country"]},
    "bind": "legend"
  }],
  "mark": {"type": "bar", "tooltip": true},
  "encoding": {
    "y": {
      "field": "name", "type": "nominal",
      "sort": "-x", "title": null,
      "axis": {"labelFontSize": 11}
    },
    "x": {
      "field": "wealth", "type": "quantitative",
      "title": "Wealth (USD Billions)"
    },
    "color": {
      "field": "country", "type": "nominal",
      "scale": {"domain": ["Malaysia","Australia"], "range": ["#ff7f0e","#1f77b4"]},
      "title": "Country"
    },
    "opacity": {
      "condition": {"param": "countrySelect", "value": 1},
      "value": 0.2
    },
    "tooltip": [
      {"field": "name", "title": "Name"},
      {"field": "country", "title": "Country"},
      {"field": "wealth", "title": "Wealth (USD Billions)"},
      {"field": "industry", "title": "Industry"}
    ]
  }
};

vegaEmbed('#top_chart', topSpec, {actions: false});

// =====================
// CHART 8: Education vs Billionaires per Million — Scatter
// =====================
const factorsSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Does Education Produce Billionaires?",
    "subtitle": "X = Tertiary education enrollment (%) | Y = Billionaires per million people | Source: Billionaires Statistics Dataset 2023",
    "fontSize": 16, "subtitleFontSize": 11, "anchor": "start"
  },
  "width": 480, "height": 320,
  "data": {"url": "data/country_factors.csv"},
  "layer": [
    {
      "mark": {"type": "circle", "size": 120, "opacity": 0.8, "tooltip": true},
      "encoding": {
        "x": {
          "field": "education", "type": "quantitative",
          "title": "Tertiary Education Enrollment (%)"
        },
        "y": {
          "field": "per_million", "type": "quantitative",
          "title": "Billionaires per Million People"
        },
        "color": {
          "field": "country", "type": "nominal",
          "scale": {
            "domain": ["Malaysia","Australia","Singapore","United States","China","Germany","United Kingdom","India","France","Japan"],
            "range": ["#ff7f0e","#1f77b4","#2ca02c","#d62728","#8c564b","#9467bd","#17becf","#e377c2","#bcbd22","#7f7f7f"]
          },
          "legend": null
        },
        "tooltip": [
          {"field": "country", "title": "Country"},
          {"field": "education", "title": "Education Enrollment (%)"},
          {"field": "per_million", "title": "Billionaires per Million"},
          {"field": "tax_rate", "title": "Tax Rate (%)"}
        ]
      }
    },
    {
      "mark": {"type": "text", "dy": -12, "fontSize": 11, "fontWeight": "bold"},
      "encoding": {
        "x": {"field": "education", "type": "quantitative"},
        "y": {"field": "per_million", "type": "quantitative"},
        "text": {"field": "country", "type": "nominal"},
        "color": {"value": "#333"}
      }
    }
  ]
};

vegaEmbed('#factors_chart', factorsSpec, {actions: false});

// =====================
// CHART 9: Wealth Distribution — Grouped Bar with Median Rule
// =====================
const wealthDistSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "How Wealthy Are the Billionaires?",
    "subtitle": "Distribution by wealth bracket | Source: Billionaires Statistics Dataset 2023",
    "fontSize": 16, "subtitleFontSize": 11, "anchor": "start"
  },
  "width": 450, "height": 280,
  "data": {"url": "data/wealth_distribution.csv"},
  "mark": {"type": "bar", "tooltip": true},
  "encoding": {
    "x": {
      "field": "wealth_bracket", "type": "ordinal",
      "title": "Wealth Bracket",
      "sort": ["$1-2B","$2-5B","$5-10B","$10-20B","$20-50B","$50B+"],
      "axis": {"labelAngle": -20}
    },
    "y": {
      "field": "count", "type": "quantitative",
      "title": "Number of Billionaires"
    },
    "color": {
      "field": "country", "type": "nominal",
      "scale": {"domain": ["Malaysia","Australia"], "range": ["#ff7f0e","#1f77b4"]},
      "title": "Country"
    },
    "xOffset": {"field": "country", "type": "nominal"},
    "tooltip": [
      {"field": "country", "title": "Country"},
      {"field": "wealth_bracket", "title": "Wealth Bracket"},
      {"field": "count", "title": "Count"}
    ]
  }
};

vegaEmbed('#wealth_dist_chart', wealthDistSpec, {actions: false});

// =====================
// CHART 10: Tax Rate vs Billionaires per Million
// =====================
const taxSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Do Lower Taxes Produce More Billionaires?",
    "subtitle": "X = Total tax rate (%) | Y = Billionaires per million people | Source: Billionaires Statistics Dataset 2023",
    "fontSize": 16, "subtitleFontSize": 11, "anchor": "start"
  },
  "width": 480, "height": 320,
  "data": {"url": "data/country_factors.csv"},
  "layer": [
    {
      "mark": {"type": "circle", "size": 120, "opacity": 0.8, "tooltip": true},
      "encoding": {
        "x": {
          "field": "tax_rate", "type": "quantitative",
          "title": "Total Tax Rate (%)"
        },
        "y": {
          "field": "per_million", "type": "quantitative",
          "title": "Billionaires per Million People"
        },
        "color": {
          "field": "country", "type": "nominal",
          "scale": {
            "domain": ["Malaysia","Australia","Singapore","United States","China","Germany","United Kingdom","India","France","Japan"],
            "range": ["#ff7f0e","#1f77b4","#2ca02c","#d62728","#8c564b","#9467bd","#17becf","#e377c2","#bcbd22","#7f7f7f"]
          },
          "legend" : null
        },
        "tooltip": [
          {"field": "country", "title": "Country"},
          {"field": "tax_rate", "title": "Tax Rate (%)"},
          {"field": "per_million", "title": "Billionaires per Million"},
          {"field": "education", "title": "Education Enrollment (%)"}
        ]
      }
    },
    {
      "mark": {"type": "text", "dy": -12, "fontSize": 11, "fontWeight": "bold"},
      "encoding": {
        "x": {"field": "tax_rate", "type": "quantitative"},
        "y": {"field": "per_million", "type": "quantitative"},
        "text": {"field": "country", "type": "nominal"},
        "color": {"value": "#333"}
      }
    }
  ]
};

vegaEmbed('#tax_chart', taxSpec, {actions: false});
