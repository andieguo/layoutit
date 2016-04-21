function supportstorage() {
	if (typeof window.localStorage=='object') 
		return true;
	else
		return false;		
}

function handleSaveLayout() {
	var e = $(".demo").html();
	if (!stopsave && e != window.demoHtml) {
		stopsave++;
		window.demoHtml = e;
		saveLayout();
		stopsave--;
	}
}

var layouthistory; 
function saveLayout(){
	var data = layouthistory;
	if (!data) {
		data={};
		data.count = 0;
		data.list = [];
	}
	if (data.list.length>data.count) {
		for (i=data.count;i<data.list.length;i++)
			data.list[i]=null;
	}
	data.list[data.count] = window.demoHtml;
	data.count++;
	if (supportstorage()) {
		localStorage.setItem("layoutconfig",JSON.stringify(layoutconfig));
		localStorage.setItem("layoutdata",JSON.stringify(data));
	}
	layouthistory = data;
	//console.log(data);
	/*$.ajax({  
		type: "POST",  
		url: "/build/saveLayout",  
		data: { layout: $('.demo').html() },  
		success: function(data) {
			//updateButtonsVisibility();
		}
	});*/
}

function downloadLayout(){
	$.ajax({  
		type: "POST",  
		url: "/build/downloadLayout",  
		data: { layout: $('#download-layout').html() },  
		success: function(data) { window.location.href = '/build/download'; }
	});
}

function downloadHtmlLayout(){
	$.ajax({  
		type: "POST",  
		url: "/build/downloadLayout",  
		data: { layout: $('#download-layout').html() },  
		success: function(data) { window.location.href = '/build/downloadHtml'; }
	});
}

function undoLayout() {
	var data = layouthistory;
	//console.log(data);
	if (data) {
		if (data.count<2) return false;
		window.demoHtml = data.list[data.count-2];
		data.count--;
		$('.demo').html(window.demoHtml);
		if (supportstorage()) {
			localStorage.setItem("layoutdata",JSON.stringify(data));
		}
		return true;
	}
	return false;
	/*$.ajax({  
		type: "POST",  
		url: "/build/getPreviousLayout",  
		data: { },  
		success: function(data) {
			undoOperation(data);
		}
	});*/
}

function redoLayout() {
	var data = layouthistory;
	if (data) {
		if (data.list[data.count]) {
			window.demoHtml = data.list[data.count];
			data.count++;
			$('.demo').html(window.demoHtml);
			if (supportstorage()) {
				localStorage.setItem("layoutdata",JSON.stringify(data));
			}
			return true;
		}
	}
	return false;
	/*
	$.ajax({  
		type: "POST",  
		url: "/build/getPreviousLayout",  
		data: { },  
		success: function(data) {
			redoOperation(data);
		}
	});*/
}

function handleJsIds() {
	handleModalIds();
	handleAccordionIds();
	handleCarouselIds();
	handleTabsIds();
}

function handleAccordionIds() {
	var e = $(".demo #myAccordion");
	var t = randomNumber();
	var n = "accordion-" + t;
	var r;
	e.attr("id", n);
	e.find(".accordion-group").each(function(e, t) {
		r = "accordion-element-" + randomNumber();
		$(t).find(".accordion-toggle").each(function(e, t) {
			$(t).attr("data-parent", "#" + n);
			$(t).attr("href", "#" + r)
		});
		$(t).find(".accordion-body").each(function(e, t) {
			$(t).attr("id", r)
		})
	})
}
function handleCarouselIds() {
	var e = $(".demo #myCarousel");
	var t = randomNumber();
	var n = "carousel-" + t;
	e.attr("id", n);
	e.find(".carousel-indicators li").each(function(e, t) {
		$(t).attr("data-target", "#" + n)
	});
	e.find(".left").attr("href", "#" + n);
	e.find(".right").attr("href", "#" + n)
}
function handleModalIds() {
	var e = $(".demo #myModalLink");
	var t = randomNumber();
	var n = "modal-container-" + t;
	var r = "modal-" + t;
	e.attr("id", r);
	e.attr("href", "#" + n);
	e.next().attr("id", n)
}
function handleTabsIds() {
	var e = $(".demo #myTabs");
	var t = randomNumber();
	var n = "tabs-" + t;
	e.attr("id", n);
	e.find(".tab-pane").each(function(e, t) {
		var n = $(t).attr("id");
		var r = "panel-" + randomNumber();
		$(t).attr("id", r);
		$(t).parent().parent().find("a[href=#" + n + "]").attr("href", "#" + r)
	})
}
function randomNumber() {
	return randomFromInterval(1, 1e6)
}
function randomFromInterval(e, t) {
	return Math.floor(Math.random() * (t - e + 1) + e)
}
function randomNumber1(){
	return (new Date()).getTime()+parseInt(Math.random()*100000);
}
function gridSystemGenerator() {
	$(".lyrow .preview input").bind("keyup", function() {
		var e = 0;
		var t = "";
		var n = $(this).val().split(" ", 12);
		$.each(n, function(n, r) {
			e = e + parseInt(r);
			t += '<div class="span' + r + ' column"></div>'
		});
		if (e == 12) {
			$(this).parent().next().children().html(t);
			$(this).parent().prev().show()
		} else {
			$(this).parent().prev().hide()
		}
	})
}
function configurationElm(e, t) {
	$(".demo").delegate(".configuration > a", "click", function(e) {
		e.preventDefault();
		var t = $(this).parent().next().next().children();
		$(this).toggleClass("active");
		t.toggleClass($(this).attr("rel"))
	});
	$(".demo").delegate(".configuration .dropdown-menu a", "click", function(e) {
		e.preventDefault();
		var t = $(this).parent().parent();
		var n = t.parent().parent().next().next().children();
		t.find("li").removeClass("active");
		$(this).parent().addClass("active");
		var r = ""; 	
		t.find("a").each(function() {
			r += $(this).attr("rel") + " "
		});
		t.parent().removeClass("open");
		n.removeClass(r);
		n.addClass($(this).attr("rel"))
	})
}
function removeElm() {
	$(".demo").delegate(".remove", "click", function(e) {
		var uid = $(this).parent().find('.view').children().attr("id");
		if(typeof(uid)!='undefined' && (uid.indexOf("ui") >= 0 || uid.indexOf("fs") >= 0 || uid.indexOf("hc") >= 0)){//控件中的<div id>属性是否存在 
			layoutconfig.remove(uid);
			localStorage.setItem("layoutconfig",layoutconfig);
		}
		e.preventDefault();
		$(this).parent().remove();
		if (!$(".demo .lyrow").length > 0) {
			clearDemo()
		}
	})
}
function clearDemo() {
	$(".demo").empty();
	layouthistory = null;
	if (supportstorage()){
		layoutconfig = new Map();
		localStorage.removeItem("layoutconfig");
		localStorage.removeItem("layoutdata");
	}
		
}
function removeMenuClasses() {
	$("#menu-layoutit li button").removeClass("active")
}
function changeStructure(e, t) {
	$("#download-layout ." + e).removeClass(e).addClass(t)
}
function cleanHtml(e) {
	$(e).parent().append($(e).children().html())
}
function downloadLayoutSrc() {
	var e = "";
	$("#download-layout").children().html($(".demo").html());
	var t = $("#download-layout").children();
	t.find(".preview, .configuration, .drag, .remove").remove();
	t.find(".lyrow").addClass("removeClean");
	t.find(".box-element").addClass("removeClean");
	t.find(".lyrow .lyrow .lyrow .lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".lyrow .lyrow .lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".lyrow .lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".removeClean").remove();
	$("#download-layout .column").removeClass("ui-sortable");
	$("#download-layout .row-fluid").removeClass("clearfix").children().removeClass("column");
	if ($("#download-layout .container").length > 0) {
		changeStructure("row-fluid", "row")
	}
	formatSrc = $.htmlClean($("#download-layout").html(), {
		format: true,
		allowedAttributes: [
			["id"],
			["class"],
			["data-toggle"],
			["data-target"],
			["data-parent"],
			["role"],
			["data-dismiss"],
			["aria-labelledby"],
			["aria-hidden"],
			["data-slide-to"],
			["data-slide"]
		]
	});
	$("#download-layout").html(formatSrc);
	$("#downloadModal textarea").empty();
	$("#downloadModal textarea").val(formatSrc)
}

var currentDocument = null;
var timerSave = 1000;
var stopsave = 0;
var startdrag = 0;
var demoHtml = $(".demo").html();
var currenteditor = null;
$(window).resize(function() {
	$("body").css("min-height", $(window).height() - 90);
	$(".demo").css("min-height", $(window).height() - 160)
});

/**将编辑页面内容中的image部分清空**/
function removeImage(){
	$("#tmpID").html($(".demo").html());//将编辑页面内容添加到临时编辑区域
	var data = localStorage.getItem("layoutconfig");
	data = JSON.parse(data);
	for(var i=0;i<data.arr.length;i++){
		var uid = data.arr[i].key;
		$("#tmpID #"+uid).html("");//将image清空
	}
	return $("#tmpID").html();
}

/**读取配置文件重新渲染静态页面*/
function renderUI(){
	var data = localStorage.getItem("layoutconfig");
	data = JSON.parse(data);
	for(var i=0;i<data.arr.length;i++){
		var uid = data.arr[i].key;
		var property = data.arr[i].value;
		uid = uid.substring(0,uid.lastIndexOf("_"));
		var ui = gUiObject[uid].getUI(property);
		ui.render();
	}
}

function restoreData(){
	if (supportstorage()) {//data可能的值为：null,{"arr":[]}
		var data = localStorage.getItem("layoutconfig");
		console.log("localStorage.layoutconfig:"+data);
		if(data){
			try{//data可能为"[object,object]"
				data = JSON.parse(data);
				if(data.arr.length > 0){
					// console.log("localStorage.layoutconfig不为空");
					layoutconfig = parseJSONtoMap(data);
				}else{
					// console.log("localStorage.layoutconfig为空");
					layoutconfig = new Map();
				}
			}catch(e){
				layoutconfig = new Map();
			}
		}else{
			// console.log("localStorage.layoutconfig为空");
			layoutconfig = new Map();
		}		
		layouthistory = JSON.parse(localStorage.getItem("layoutdata"));
		if (!layouthistory) return false;
		window.demoHtml = layouthistory.list[layouthistory.count-1];
		if (window.demoHtml) $(".demo").html(window.demoHtml);
	}
}

function initContainer(){
	$(".demo, .demo .column").sortable({
		connectWith: ".column",
		opacity: .35,
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		stop: function(e,t) {
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	configurationElm();
}
<!--定义全局变量 key:object--> 
var gUiObject = {
	"ui_test" : ui_test,
	"fs_temperature": fs_temperature,
	"hc_dial": hc_dial,
	"fs_dial": fs_dial
};
<!--自定义UI配置全局变量--> 
var layoutconfig;
$(document).ready(function() {
	var tabContent = "";
	for(var p in gUiObject){
		tabContent = gUiObject[p].html + tabContent;
	}
	$("#elmComponents").html(tabContent + $("#elmComponents").html());	
	CKEDITOR.disableAutoInline = true;
	restoreData();
	var contenthandle = CKEDITOR.replace( 'contenteditor' ,{
		language: 'zh-cn',
		contentsCss: ['css/bootstrap-combined.min.css'],
		allowedContent: true
	});
	$("body").css("min-height", $(window).height() - 90);
	$(".demo").css("min-height", $(window).height() - 130);
	$(".sidebar-nav .lyrow").draggable({
		connectToSortable: ".demo",
		helper: "clone",
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		drag: function(e, t) {
			t.helper.width(400)
		},
		stop: function(e, t) {
			$(".demo .column").sortable({
				opacity: .35,
				connectWith: ".column",
				start: function(e,t) {
					if (!startdrag) stopsave++;
					startdrag = 1;
				},
				stop: function(e,t) {
					if(stopsave>0) stopsave--;
					startdrag = 0;
				}
			});
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	$(".sidebar-nav .box").draggable({
		connectToSortable: ".column",
		helper: "clone",
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		drag: function(e, t) {
			t.helper.width(400)
		},
		stop: function(e, t) {
			handleJsIds();
			var uid = t.helper.children(".view").children().attr("id");
			if(typeof(uid)!='undefined'){//控件中的<div id>属性是否存在 
				if(uid.indexOf("ui") >= 0 || uid.indexOf("fs") >= 0 || uid.indexOf("hc") >= 0){//自定义ui控件
					var ui = gUiObject[uid].create();//根据拖动的控件创建对象
					layoutconfig.put(ui.properties.tid,ui.properties);//将拖动后创建的控件ID、属性进行缓存
					localStorage.setItem("layoutconfig",layoutconfig);
					// console.log("upperlimit:"+ui.getProperty("upperlimit"));
					// console.log("lowerlimit:"+ui.getProperty("lowerlimit"));
					// console.log("ui:"+ui);
					// ui.setValue(67);
					// ui.setProperty("lowerlimit",);
					// ui.setProperty("upperlimit",200);
					// ui.setValue(60);
					// console.log("upperlimit:"+ui.getProperty("upperlimit"));
				}
			}
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	initContainer();
	
	$('body.edit .demo').on("click","[data-target=#editorModal]",function(e) {
		e.preventDefault();
		currenteditor = $(this).parent().parent().find('.view');
		var eText = currenteditor.html();
		contenthandle.setData(eText);
	});

	<!--控件属性编辑--> 
	$('body.edit .demo').on("click","[data-target=#attrEditorModal]",function(e) {
		console.log("attrEditorModal");
		console.log($("#attrModal").html());
		var uid = $(this).parent().parent().find('.view').children().attr("id");
		console.log(uid);

		//从缓存中取出控件的属性列表
		var data = JSON.parse(localStorage.getItem("layoutconfig"));
		//"{"arr":[{"key":"fs_temperature_323397","value":{"tid":"fs_temperature_323397","width":240,"height":200,"upperLimit":100,"lowerLimit":0,"numberSuffix":"℃","bgcolor":"#f3f5f7","gaugeFillColor":"#ffc420"}}]}"
		console.log("arr:"+data.arr);
		var property;
		for(var i=0; i<data.arr.length; i++){
			if(data.arr[i].key == uid){
				property = data.arr[i].value;
				console.log("property:"+property);
			}
		}
		if(property){
			var widgetIndex = uid.substring(0,uid.lastIndexOf("_"));
			console.log(widgetIndex);
			//var ui = gUiObject[widgetIndex].getUI(property);
			var configHtml = gUiObject[widgetIndex].configHtml;//编辑代码
			$("#attrModal").html(configHtml);
			gUiObject[widgetIndex].showAttr(property);//显示控件属性值
			/*
			uid = uid.substring(0,uid.lastIndexOf("_"));
			console.log(uid);
			var ui = gUiObject[uid].getUI(property);
			var configHtml = gUiObject[uid].configHtml;//编辑代码
			$("#attrModal").html(configHtml);
			$("#attrModal").fadeIn(500);
			var faHeigh = $("#attrModal").outerHeight(true);
			$("body").animate({paddingBottom: faHeigh + 20},500);
			$(".demo").animate({minHeight: $(window).height() - 130 - faHeigh},500);
			$("body").css("min-height", $(window).height() - 90 - faHeigh);

        	console.log("ui:"+ui);
        	console.log("upperlimit:"+ui.getProperty("upperlimit"));
        	console.log("lowerlimit:"+ui.getProperty("lowerlimit"));
        	console.log("ui:"+ui);
        	ui.setProperty("lowerlimit",2);
        	ui.setProperty("upperlimit",200);
        	ui.setValue(56);
        	console.log("upperlimit:"+ui.getProperty("upperlimit"));
        	console.log("child:"+$(this).parent().parent().find('.view').children().html(""));
        	ui.render();*/
		}

		//根据新属性更新控件样式
		$("#widget_update").click(function(){
			gUiObject[widgetIndex].updateAttr(uid);//显示控件属性值
		});	
	});

	<!--属性窗口关闭-->
	$('#attrModal').on("click","[data-target=#close]",function(e) {
		$('#attrModal').fadeOut(500);
		setTimeout(function() {$('#attrModal').empty()}, 500);
		$("body").css("padding-bottom","20px");
		$(".demo").animate({minHeight: $(window).height() - 130},500);
		$("body").css("min-height", $(window).height() - 90);
	});
	$("#savecontent").click(function(e) {
		e.preventDefault();
		currenteditor.html(contenthandle.getData());
	});
	$("[data-target=#downloadModal]").click(function(e) {
		e.preventDefault();
		downloadLayoutSrc();
	});
	$("[data-target=#shareModal]").click(function(e) {
		e.preventDefault();
		handleSaveLayout();
	});
	$("#download").click(function() {
		downloadLayout();
		return false
	});
	$("#downloadhtml").click(function() {
		downloadHtmlLayout();
		return false
	});
	$("#edit").click(function() {
		$("body").removeClass("devpreview sourcepreview");
		$("body").addClass("edit");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	$("#clear").click(function(e) {
		e.preventDefault();
		clearDemo()
	});
	$("#devpreview").click(function() {
		$("body").removeClass("edit sourcepreview");
		$("body").addClass("devpreview");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	$("#sourcepreview").click(function() {
		$("body").removeClass("edit");
		$("body").addClass("devpreview sourcepreview");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	$("#fluidPage").click(function(e) {
		e.preventDefault();
		changeStructure("container", "container-fluid");
		$("#fixedPage").removeClass("active");
		$(this).addClass("active");
		downloadLayoutSrc()
	});
	$("#fixedPage").click(function(e) {
		e.preventDefault();
		changeStructure("container-fluid", "container");
		$("#fluidPage").removeClass("active");
		$(this).addClass("active");
		downloadLayoutSrc()
	});
	$(".nav-header").click(function() {
		$(".sidebar-nav .boxes, .sidebar-nav .rows").hide();
		$(this).next().slideDown()
	});
	$('#undo').click(function(){
		stopsave++;
		if (undoLayout()) initContainer();
		stopsave--;
	});
	$('#redo').click(function(){
		stopsave++;
		if (redoLayout()) initContainer();
		stopsave--;
	})
	removeElm();
	gridSystemGenerator();
	setInterval(function() {
		handleSaveLayout()
	}, timerSave)
})