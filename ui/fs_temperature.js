var fs_temperature = {

	html : ' <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>'+
                 '<div class="preview">温度计</div>' +
                 '<div class="view">' +
                   '<div id="fs_temperature">'+
                    '</div>'+
                  '</div>'+
         '</div>',

    create: function(){
    	var e = $(".demo #fs_temperature");
		var t = randomNumber();
		var n = "fs_temperature-" + t;
		var r;
		e.attr("id", n);
        var a = tempratureUI(n);
        var fs = {

        }
        var x = {
            id:n,
            //["upperlimit", "lowerlimit", "numbersuffix", "decimals", "showhovereffect", "gaugefillcolor", "gaugebordercolor", "showborder", "bgcolor", "tickmarkgap", "theme"]
            properties: function(){
                var d = a.getChartData("json");
                var properties = [];
                for(x in d.chart){
                    properties.push(x); 
                }
                return properties;
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
            setValue:function(value){
                var d = a.getChartData("json");
                console.log("d:"+d);
                d.value = value;
                a.setChartData(d);
            },
            render:function(){
               a.render();
            },
            fs: a  
        };
        return x;
    }

}
