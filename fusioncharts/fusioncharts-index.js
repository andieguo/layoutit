
function tempratureUI(tid) {
    var csatGauge = new FusionCharts({
        "type": "thermometer",
        "renderAt": tid,
        "width": "140",
        "height": "200",
        "dataFormat": "json",
        "dataSource": {
            "chart": {
                "upperLimit": "50",
                "lowerLimit": "0",
                "numberSuffix": "℃",
                "decimals": "1",
                "showhovereffect": "1",
                "gaugeFillColor": "#ff2400",
                "gaugeBorderColor": "#008ee4",
                "showborder": "0",
                "bgcolor": "#f2f5f7",
                "tickmarkgap": "5",
                "theme": "fint"
            },
            "value": "28"
        }
    });
    csatGauge.render();
};


