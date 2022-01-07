
var parentFolder = "app";
var subFolder = "Scene0";
var currentIdx = 0;

var widthCrop = 300;
var heightCrop = 300;

var folder = parentFolder + "/" + subFolder;

var images = [
	[{"name": "HDR Ours", "url": "ours.png", "select": true},
	{"name": "Input low exposure: 8ms", "url": "low.png", "select": true},
	{"name": "Input high exposure: 32ms", "url": "high.png", "select": true}
	],
	[{"name": "HDR Ours", "url": "ours.png", "select": true},
	{"name": "Input low exposure: 4ms", "url": "low.png", "select": true},
	{"name": "Input high exposure: 16ms", "url": "high.png", "select": true}
	],
	[{"name": "HDR Ours", "url": "ours.png", "select": true},
	{"name": "Input low exposure: 2ms", "url": "low.png", "select": true},
	{"name": "Input high exposure: 8ms", "url": "high.png", "select": true}
	],
	[{"name": "HDR Ours", "url": "ours.png", "select": true},
	{"name": "Input low exposure: 4ms", "url": "low.png", "select": true},
	{"name": "Input high exposure: 16ms", "url": "high.png", "select": true}
	],
	[{"name": "HDR Ours", "url": "ours.png", "select": true},
	{"name": "Input low exposure: 8ms", "url": "low.png", "select": true},
	{"name": "Input high exposure: 32ms", "url": "high.png", "select": true}
	],
	[{"name": "HDR Ours", "url": "ours.png", "select": true},
	{"name": "Input low exposure: 64ms", "url": "low.png", "select": true},
	{"name": "Input high exposure: 256ms", "url": "high.png", "select": true}
	],
	[{"name": "HDR Ours", "url": "ours.png", "select": true},
	{"name": "Input low exposure: 4ms", "url": "low.png", "select": true},
	{"name": "Input high exposure: 16ms", "url": "high.png", "select": true}
	],
	[{"name": "HDR Ours", "url": "ours.png", "select": true},
	{"name": "Input low exposure: 1ms", "url": "low.png", "select": true},
	{"name": "Input high exposure: 16ms", "url": "high.png", "select": true}
	],
	[{"name": "HDR Ours", "url": "ours.png", "select": true},
	{"name": "Input low exposure: 1ms", "url": "low.png", "select": true},
	{"name": "Input high exposure: 8ms", "url": "high.png", "select": true}
	]
];

jQuery(function($) {
	
	// Generate list of method options
	function generateMethodList() {
		
		$(".selectList").empty();
		
		for(var i = 0; i < images[currentIdx].length; i += 1) {
			var tag_name = images[currentIdx][i].name;
			if(i == 0)
				tag_name = tag_name + ":";

			var $span = $("<span class='clickBox'>"+tag_name.substr(0, tag_name.indexOf(':'))+"</span>").data({"id": i, "active": images[currentIdx][i].select}).click(function() {
				var active = $(this).data("active");
				
				if($(".selectList").children(".active").length > 3 && !active)
					$(".selectList").children(".active").first().data({"active": false}).removeClass("active");
			
				$(this).data("active", !active).removeClass("active");
				if($(this).data("active"))
					$(this).addClass("active");
					
				init();
			}).addClass("active");
			
			if(!images[currentIdx][i].select)
				$span.removeClass("active");
			$(".selectList").append($span);
			$(".selectList").append("<br>");

			//$(".selectList").append("<img id='"+images[currentIdx][i].name+"' src='"+folder+"/"+images[currentIdx][i].url+"' width='100' height='100'>");
			$(".selectList").append("<div  class='img-zoom-result' id='"+images[currentIdx][i].name+"'></div>");


			$(".selectList").append("<br>");
			$(".selectList").append("<br>");
			$(".selectList").append("<br>");
			$(".selectList").append("<br>");
			$(".selectList").append("<br>");
			$(".selectList").append("<br>");
			$(".selectList").append("<br>");
			$(".selectList").append("<br>");
			$(".selectList").append("<br>");


		}
	}

	generateMethodList();
	
	function init() {		
		
		$(".compare").empty();
		
		$(".selectList").children(".active").each(function() {
			var idx = $(this).data("id");
			$(".compare").append('<img src="'+folder+'/'+images[currentIdx][idx].url+'" title="'+images[currentIdx][idx].name+' ">');
		});
		
		$(".compare").each(function() {
			var htmlStr = "";
			$(this).children("img").each(function(idx) {
				var topBottom = Math.floor(idx/2) ? "bottom" : "top";
				var leftRight = idx % 2 ? "right" : "left";
				htmlStr += "<div class='inner' style='position: absolute; "+topBottom+": 0px; "+leftRight+": 0px;'><img id='"+idx+"' src='"+$(this).attr("src")+"'  style='position:relative;'></div><div class='text' style='position: absolute; "+topBottom+": 0px; "+leftRight+": 0px;z-index: "+(500+i)+"'>"+$(this).attr("title")+"</div>";
			});
			$(this).html(htmlStr);
		}).append('<div class="line vertical"></div>').append('<div class="line horizontal"></div>');
		
		show(400, 400, $(".compare").first());
		
		$("#comparison").empty();
		for(var i = 0; i < images[currentIdx].length; i += 1) {
			$("#comparison").append("<div class='summaryBox'><img src='"+folder+"/"+images[currentIdx][i].url+"'><br>"+images[currentIdx][i].name+"</div>");
		}
	}
	
	$(".scenes").on("click", "*", function() {
		$(".scenes").children().removeClass("scene-active");
		$(".scenes").children().addClass("scene-inactive");
		$(this).removeClass("scene-active");
		$(this).addClass("scene-active");
		
		var idx = $(".scenes").children().index(this);
		switchScene(idx);
	})
	
	var params = location.search.split('scene=');
	if (params.length <= 1) {
		var scene = 0;
	} else {
		var scene = params[1];
	}
	
	$('#scene' + scene).removeClass("scene-active");
	$('#scene' + scene).addClass("scene-active");
	
	subFolder = "Scene" + scene;
	folder = parentFolder + "/" + subFolder;
	folder_to = parentFolder + "/" + subFolder + "/";
	
	init();
	
	// Below controls the box
	
	$(".compare").mousemove(function(e) {
		var parentOffset = $(this).offset(); 
		var relX = Math.round(e.pageX - parentOffset.left);
		var relY = Math.round(e.pageY - parentOffset.top);
						
		show(relX, relY, $(this));
		cropImage(relX, relY, $(this)); 
			
	});
	
	function cropImage(relX, relY, $elem) {
		
		
		
		
       // window.alert(startX)
		var img = document.getElementById("0");
		var cx = 4
		
		//var idx = $(".scenes").children().index(this);;
		//subFolder = "Scene" + idx;
		//folder_to = parentFolder + "/" + subFolder + "/";
		
		var crop_imagesource = document.getElementById(images[currentIdx][0].name);	

		var lens_x = 150/cx
		var lens_y = 150/cx

	    var startX = Math.round((relX - (lens_x/2)));
		var startY = Math.round((relY - (lens_y/2)));
		
		var crop_imagesource = document.getElementById(images[currentIdx][0].name);	
		crop_imagesource.style.backgroundImage = "url('" + folder_to + images[currentIdx][0].url + "')";
		crop_imagesource.style.backgroundSize = (img.width * cx) + "px " + (img.height * cx) + "px";
		crop_imagesource.style.backgroundPosition = "-" + (startX*cx) + "px -" + (startY*cx) + "px";

		var crop_imagesource1 = document.getElementById(images[currentIdx][1].name);	
		crop_imagesource1.style.backgroundImage = "url('" + folder_to + images[currentIdx][1].url + "')";
		crop_imagesource1.style.backgroundSize = (img.width * cx) + "px " + (img.height * cx) + "px";
		crop_imagesource1.style.backgroundPosition = "-" + (startX*cx) + "px -" + (startY*cx) + "px";

		var crop_imagesource2 = document.getElementById(images[currentIdx][2].name);	
		crop_imagesource2.style.backgroundImage = "url('" + folder_to + images[currentIdx][2].url + "')";
		crop_imagesource2.style.backgroundSize = (img.width * cx) + "px " + (img.height * cx) + "px";
		crop_imagesource2.style.backgroundPosition = "-" + (startX*cx) + "px -" + (startY*cx) + "px";

		

		
	}
	
	
	
	function show(relX, relY, $elem) {
		var width = $($elem).innerWidth();
		var height = $($elem).innerHeight();
		
		var imgCount = $($elem).children(".inner").length;
		
		var lineWidth = $($elem).children(".vertical").width();
		
		$($elem).children(".vertical").css({"left": relX - lineWidth / 2, "visibility": (imgCount < 2) ? "hidden" : "visible", "height": (imgCount == 3) ? relY : "100%"});
		$($elem).children(".horizontal").css({"top": relY - lineWidth / 2, "visibility": (imgCount < 3) ? "hidden" : "visible"});

		$($elem).children(".inner").each(function(idx) {
			if(imgCount < 2)
				return;
			if(idx % 2) {
				$(this).css({"width": width - relX});
				$(this).children("img").css({"left": -relX});
			} else if(idx < imgCount - 1)
				$(this).css({"width": relX});
				
			if(imgCount > 2) {
				if(Math.floor(idx/2)) {
					$(this).css({"height": height - relY});
					$(this).children("img").css({"top": -relY});
				} else
					$(this).css({"height": relY});
			}
		});
	}
	
	function switchScene(newIdx) {		
		
		currentIdx = newIdx;
		subFolder = "Scene" + newIdx;
		folder = parentFolder + "/" + subFolder;
		folder_to = parentFolder + "/" + subFolder + "/";
		
		generateMethodList();
		init();
		
	}
	
});
