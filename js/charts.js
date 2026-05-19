// =====================
// CHART 2: Bubble Chart — GDP vs Billionaire Count
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
      "mark": {
        "type": "circle",
        "opacity": 0.7,
        "tooltip": true
      },
      "encoding": {
        "x": {
          "field": "gdp_bn",
          "type": "quantitative",
          "title": "GDP (USD Billions)",
          "scale": {"type": "log"},
          "axis": {"format": ",.0f"}
        },
        "y": {
          "field": "billionaire_count",
          "type": "quantitative",
          "title": "Number of Billionaires",
          "scale": {"type": "log"}
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
      "mark": {
        "type": "text",
        "dy": -12,
        "fontSize": 11,
        "fontWeight": "bold"
      },
      "transform": [
        {"filter": "datum.highlight !== 'Other'"}
      ],
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
// CHART 3: Age Dot/Strip Plot
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
  "mark": {
    "type": "circle",
    "size": 80,
    "opacity": 0.7,
    "tooltip": true
  },
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
      "title": "Country",
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
// CHART 4 & 5: Small Multiple Donuts (2x2 grid)
// =====================
const donutSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Gender & Self-Made Status",
    "subtitle": "Gender: Forbes 2025 | Self-Made: Billionaires Statistics 2023",
    "fontSize": 16,
    "subtitleFontSize": 11,
    "anchor": "start"
  },
  "data": {"url": "data/donut_data.csv"},
  "facet": {
    "row": {
      "field": "category",
      "type": "nominal",
      "title": null,
      "header": {
        "labelFontSize": 13,
        "labelFontWeight": "bold",
        "labelAngle": 0
      }
    },
    "column": {
      "field": "country",
      "type": "nominal",
      "title": null,
      "header": {
        "labelFontSize": 13,
        "labelFontWeight": "bold"
      }
    }
  },
  "spec": {
    "width": 150,
    "height": 150,
    "mark": {"type": "arc", "innerRadius": 45, "tooltip": true},
    "encoding": {
      "theta": {
        "field": "value",
        "type": "quantitative"
      },
      "color": {
        "field": "label",
        "type": "nominal",
        "title": "Category",
        "scale": {
          "domain": ["Male","Female","Self-Made","Inherited"],
          "range": ["#4e79a7","#f28e2b","#59a14f","#e15759"]
        }
      },
      "tooltip": [
        {"field": "country", "title": "Country"},
        {"field": "category", "title": "Category"},
        {"field": "label", "title": "Type"},
        {"field": "value", "title": "Count"}
      ]
    }
  }
};

vegaEmbed('#donut_chart', donutSpec, {actions: false});
