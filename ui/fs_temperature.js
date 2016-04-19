var fs_temperature = {

	html : ' <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>'+
                '<span class="configuration"><button type="button" class="btn btn-mini" data-target="#fsEditorModal" role="button" data-toggle="modal">编辑</button></span>'+
                 '<div class="preview">温度计</div>' +
                 '<div class="view">' +
                   '<div id="fs_temperature">'+
                    '</div>'+
                  '</div>'+
         '</div>',

    configHtml : ' <div class="attr-header">属性设置</div>' +
      '<div class="attr-body">' +
        '<div class="form-group">' +
          '<span>标题</span>' +
          '<input type="text">' +
        '</div>' +
        '<div class="form-group">' +
          '<span>Mac地址：</span>' +
          '<input type="text">' +
          '<span>范围：</span>' +
          '<input type="text">' +
          '<span>颜色：</span>' +
          '<input type="text">' +
          '<span>横轴：</span>' +
          '<input type="text">' +
       '</div>' +
     ' </div>',

    create: function(){
    	var e = $(".demo #fs_temperature");
		var t = randomNumber();
		var n = "fs_temperature_" + t;
		e.attr("id", n);
        var properties = {
            tid: n,
            width: 240,
            height: 200,
            upperLimit: 100,
            lowerLimit: 0,
            numberSuffix: "℃",
            bgcolor: "#f3f5f7",
            gaugeFillColor: "#ffc420"
        };
        var ui = new TemperatureUI(properties);
        console.log("ui:"+ui);
        ui.render();
        return ui;
    },

    getUI: function(properties){
        var ui = new TemperatureUI(properties);
        return ui;
    }
}

 function TemperatureUI(prop) {

    this.properties = prop;

    this.Property = {
       WIDTH : "width",
       HEIGHT : "height"
    };

    var csatGauge = new FusionCharts({
        "type": "thermometer",
        "renderAt": prop.tid,
        "width": prop.width,
        "height": prop.height,
        "dataFormat": "json",
        "dataSource": {
            "chart": {
                "upperLimit": prop.upperLimit,
                "lowerLimit": prop.lowerLimit,
                "numberSuffix": prop.numberSuffix,
                "decimals": "1",
                "showhovereffect": "1",
                "gaugeFillColor": prop.gaugeFillColor,
                "gaugeBorderColor": "#008ee4",
                "showborder": "0",
                "bgcolor": prop.bgcolor,
                "tickmarkgap": "5",
                "theme": "fint"
            },
            "value": "28"
        }
    });
    
    var charData = csatGauge.getChartData("json");
    this.render = function(){
        csatGauge.render();
    };

    this.setUpperLimit = function(value){
        charData.chart.upperlimit = value;
        csatGauge.setChartData(charData);
    };

    this.setProperty = function(name,value){
        charData.chart[name] = value;
        csatGauge.setChartData(charData);
    };

    this.getProperty = function(name,value){
        console.log(charData.chart[name]);
        return charData.chart[name];
    };

    this.setValue = function(value){
        console.log("charData:"+charData);
        charData.value = value;
        csatGauge.setChartData(charData);
    }
};
