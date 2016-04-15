var hg_dial = {

	html : ' <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>'+
                 '<div class="preview">表盘</div>' +
                 '<div class="view">' +
                   '<div id="hg_dial" style="width:300px;height:300px">'+
                    '</div>'+
                  '</div>'+
         '</div>',

    create: function() {
        var e = $(".demo #hg_dial");
        var t = randomNumber();
        var n = "hg_dial_" + t;
        var r;
        e.attr("id", n);
        //绘制表盘样式
        var chart = getDial("#" + n, "", "温度", "℃", 0, 100, {
            layer1: {
                from: 30,
                to: 50,
                color: green
            },
            layer2: {
                from: 0,
                to: 30,
                color: yellow
            },
            layer3: {
                from: 50,
                to: 100,
                color: red
            }
        });
        var x = {
            id:n,
            setValue:function(value){
                var point = chart.series[0].points[0];
                point.update(value);
            },
            getName:function(){
                var title  = chart.title.textStr; 
                console.log("title:"+title);
                return title;
            },
            setName:function(title){
                chart.setTitle(title);
            },
            hg: chart  
        };

        return x;
    }
}
