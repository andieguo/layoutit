var hc_dial = {

	html : ' <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>'+
                '<span class="configuration"><button type="button" class="btn btn-mini" data-target="#attrEditorModal" role="button" data-toggle="modal">编辑</button></span>'+
                 '<div class="preview">表盘</div>' +
                 '<div class="view">' +
                   '<div id="hc_dial" style="width:300px;height:300px">'+
                    '</div>'+
                 '</div>'+
            '</div>'+
         '<script>'+
            '//getDial("#hc_dial", "", "温度", "℃", 0, 100, { layer1: { from: 30, to: 50, color: green }, layer2: { from: 0, to: 30, color: yellow }, layer3: { from: 50, to: 100, color: red } });'+
         '</script>',

    configHtml : ' <div class="attr-header" id="attr_hc_dial">属性设置</div>' +
    '<div class="attr-body">' +
      '<div class="form-group">' +
        '<span>标题</span>' +
        '<input type="text" id="widget_title">' +
        '<input type="button" value="更新控件" id="widget_update">'+
      '</div>' +
      '<div class="form-group">'+
        '<span>控件高度：</span>'+
        '<input type="text" id="widget_height">'+
        '<span>最小值：</span>'+
        '<input type="text" id="min_value">'+
        '<span>最大值：</span>'+
        '<input type="text" id="max_value">'+
        '<span>单位：</span>'+
        '<input type="text" id="value_unit">'+
      '</div>'+
      '<div class="form-group">'+
        '<span>layer1： From</span>'+
        '<input type="text" id="layer1_from">'+
        '<span>To:</span>'+
        '<input type="text" id="layer1_to">'+
        '<span>颜色:</span>'+
        '<input type="text" id="layer1_color">'+
      '</div>'+
      '<div class="form-group">'+
        '<span>layer2： From</span>'+
        '<input type="text" id="layer2_from">'+
        '<span>To:</span>'+
        '<input type="text" id="layer2_to">'+
        '<span>颜色:</span>'+
        '<input type="text" id="layer2_color">'+
      '</div>'+
      '<div class="form-group">'+
        '<span>layer3： From</span>'+
        '<input type="text" id="layer3_from">'+
        '<span>To:</span>'+
        '<input type="text" id="layer3_to">'+
        '<span>颜色:</span>'+
        '<input type="text" id="layer3_color">'+
      '</div>'+
    '</div>',

    create: function() {
        var e = $(".demo #hc_dial");
        var t = randomNumber();
        var n = "hc_dial_" + t;
        var r;
        e.attr("id", n);

        var properties = {
            tid: n,
            title:"温度",
            //width: 240,
            height: 300,
            max: 100,
            min: 0,
            unit: "℃",
            layer1:{from:30,to:50,color:green},
            layer2:{from:0,to:30,color:yellow},
            layer3:{from:50,to:100,color:red}
        };
        var ui = new HCDialUI(properties);
        console.log("ui:"+ui);
        //ui.render();
        return ui;
    },

    getUI: function(properties){
      var ui = new HCDialUI(properties);
      return ui;
    },

    showAttr: function(properties){
        $("#widget_title").val(properties.title);
        $("#widget_height").val(properties.height);
        $("#min_value").val(properties.min);
        $("#max_value").val(properties.max);
        $("#value_unit").val(properties.unit);

        $("#layer1_from").val(properties.layer1.from);
        $("#layer1_to").val(properties.layer1.to);
        $("#layer1_color").val(properties.layer1.color);

        $("#layer2_from").val(properties.layer2.from);
        $("#layer2_to").val(properties.layer2.to);
        $("#layer2_color").val(properties.layer2.color);

        $("#layer3_from").val(properties.layer3.from);
        $("#layer3_to").val(properties.layer3.to);
        $("#layer3_color").val(properties.layer3.color);     
    },
    updateAttr: function(divid){
        var title = $("#widget_title").val();
        var height = parseInt($("#widget_height").val());
        var max = parseInt($("#max_value").val());
        var min = parseInt($("#min_value").val());
        var unit = $("#value_unit").val();
        var layer1_from = parseInt($("#layer1_from").val());
        var layer1_to = parseInt($("#layer1_to").val());
        var layer1_color = $("#layer1_color").val();
        var layer2_from = parseInt($("#layer2_from").val());
        var layer2_to = parseInt($("#layer2_to").val());
        var layer2_color = $("#layer2_color").val(); 
        var layer3_from = parseInt($("#layer3_from").val());
        var layer3_to = parseInt($("#layer3_to").val());
        var layer3_color = $("#layer3_color").val();               
        var properties = {
            tid: divid,
            title:title,
            height: height,
            max: max,
            min: min,
            unit: unit,
            layer1:{from:layer1_from,to:layer1_to,color:layer1_color},
            layer2:{from:layer2_from,to:layer2_to,color:layer2_color},
            layer3:{from:layer3_from,to:layer3_to,color:layer3_color}
        };
        var ui = new HCDialUI(properties);
        console.log(JSON.stringify(properties));
        setTimeout(function(){HCDialUI(properties);},500);

        
/*        var dial = new Highcharts.Chart({
            chart: {
                type:"gauge",
                renderTo: $('#'+divid)[0],
                height: 300,
            },
            title: {
                text: "湿度111"
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },
            // the value axis
            yAxis: {
                min: 0,
                max: 100,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: "%"
                },
                plotBands: [{ from: 30, to: 70, color: green }, { from: 0, to: 30, color: yellow }, { from: 70, to: 100, color: red }]
            },

            series: [{
                name: "湿度",
                data: [0],
                tooltip: {
                    valueSuffix: "%"
                }
            }]
          });*/
    }
}

function HCDialUI(prop) {

  this.properties = prop;

  console.log("prop:"+prop);

  var dial = new Highcharts.Chart({
    chart: {
        type:"gauge",
        renderTo: $('#'+prop.tid)[0],
        height: prop.height,
    },
    title: {
        text: prop.title
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },
    // the value axis
    yAxis: {
        min: prop.min,
        max: prop.max,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: prop.init
        },
        plotBands: [prop.layer1, prop.layer2, prop.layer3]
    },

    series: [{
        name: prop.title,
        data: [0],
        tooltip: {
            valueSuffix: prop.unit
        }
    }]
  });

};
