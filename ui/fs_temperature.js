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
        tempratureUI(n);
    }

}
