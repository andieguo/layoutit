var fs_dial = {

	html : ' <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>'+
                 '<div class="preview">表盘-fs</div>' +
                 '<div class="view">' +
                   '<div id="fs_dial">'+
                    '</div>'+
                  '</div>'+
         '</div>',

    create: function(){
    	var e = $(".demo #fs_dial");
		var t = randomNumber();
		var n = "fs_dial_" + t;
		e.attr("id", n);
        var a = dialUI(n);
        var x = {
            id:n,
            properties: function(){
                var d = a.getChartData("json");
                var properties = [];
                for(x in d.chart){
                    properties.push(x); 
                }
                return properties;
            },
            setLowerlimit:function(value){
                var d = a.getChartData("json");
                d.chart.lowerlimit = value;
                a.setChartData(d);
            },
            setUpperLimit:function(value){
                var d = a.getChartData("json");
                d.chart.upperlimit = value;
                a.setChartData(d);
            },
            setProperty:function(name,value){
                var d = a.getChartData("json");
                d.chart[name] = value;
                a.setChartData(d);
            },
            getProperty:function(name,value){
                var d = a.getChartData("json");
                console.log(d.chart[name]);
                return d.chart[name];
            },
            setLabel:function(label){
                var d = a.getChartData("json");
                d.annotations.groups[1].items[0].label = label;
                a.setChartData(d);
            },
            setValue:function(value){
                var d = a.getChartData("json");
                console.log("d:"+d);
                d.dials.dial[0].value = value;
                a.setChartData(d);
            },
            fs: a  
        };
        return x;
    }

}
