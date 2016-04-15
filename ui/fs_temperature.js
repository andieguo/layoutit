var fs_temperature = {

	html : ' <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>'+
                '<span class="configuration"><button type="button" class="btn btn-mini" data-target="#fsEditorModal" role="button" data-toggle="modal">编辑</button></span>'+
                 '<div class="preview">温度计</div>' +
                 '<div class="view">' +
                   '<div id="fs_temperature">'+
                    '</div>'+
                  '</div>'+
         '</div>',

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
    }

}
