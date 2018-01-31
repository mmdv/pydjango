jQuery(document).ready(function($) {
	var bookInfo ;
	// 获取书目列表
	$.ajax({
		url: 'select_book',
		type: 'get',
		dataType: 'json',
		async:false,
	})
	.done(function(data) {
		bookInfo = data;
		// console.log(bookInfo);
		// 生成书名列表
		$.each(data, function(index, val) {
			var htmlStr = '<li class="bookName" id="'+ val['id'] +'"><a href="#">'+ val['name'] +'</a></li>';
			// 添加书名
			$('.file-tree').append(htmlStr);
		});
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

	// 点击书名获取章节&更改页面标题
	$('.file-tree > li > a').click(function(event) {
		event.stopPropagation();
		var book_id = $(this).parent().attr('id');
		var that = $(this).parent();
		// 获取书名&简介
		$.ajax({
			url: 'select_info',
			type: 'POST',
			dataType: 'json',
			async:false,
			data: {book_id: book_id},
		})
		.done(function(data) {
			// 更改页面信息
			var str = '<h1>'+ data[0]['name'] +'<span>'+ data[0]['brief'] +'</span></h1>';
			$('header').html(str);

		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		// console.log(book_id);
		// 获取章节
		if(that.children().length > 1)//判断是否获取过
			return
		$.ajax({
			url: '/select_chapter',
			type: 'POST',
			dataType: 'json',
			async:false,
			data: {'book_id': book_id},
		})
		.done(function(data) {
			if(data.length == 0){
				alert('暂未添加章节!');
				return;
			}
			// 添加章节
			$.each(data, function(index, val) {
				var chapter = Arabia_to_Chinese(val['chapter_number']);
				var str = '<ul><li><a id="' + val['chapter_number'] + '" href="#">'+ '第' + chapter + '章:'+ val['name'] +'' +'</a></li></ul>';
				that.append(str);
			});
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});

	// 点击章节跳转标签云
	$('.container').on('click', '.file-tree li ul li a', function(event) {
		event.preventDefault();
		// 标签写入本地存储
		var storage=window.localStorage;
        //写入书目id/章节id
        var chapter_id = $(this).attr('id');
        var book_id = $(this).parents('.bookName').attr('id');
        storage["book_id"] = book_id;
        storage["chapter_id"] = chapter_id;
		// 页面跳转
		window.location.href= "tags";

	});

	// 数字转大写数字
	function Arabia_to_Chinese(Num) {
		// 本金额转大写函数
		Num = String(Num);
	    for (i = Num.length - 1; i >= 0; i--) {
	        Num = Num.replace(",", ""); //替换tomoney()中的“,”
	        Num = Num.replace(" ", ""); //替换tomoney()中的空格
	    }
	    Num = Num.replace("￥", ""); //替换掉可能出现的￥字符
	    if (isNaN(Num)) { //验证输入的字符是否为数字
	        console.log("请检查小写金额是否正确");
	        return;
	    }
	    //字符处理完毕后开始转换，采用前后两部分分别转换
	    part = String(Num).split(".");
	    newchar = "";
	    //小数点前进行转化
	    for (i = part[0].length - 1; i >= 0; i--) {
	        if (part[0].length > 10) {
	            alert("位数过大，无法计算");
	            return "";
	        } //若数量超过拾亿单位，提示
	        tmpnewchar = ""
	        perchar = part[0].charAt(i);
	        switch (perchar) {
	            case "0":
	                tmpnewchar = "零" + tmpnewchar;
	                break;
	            case "1":
	                tmpnewchar = "一" + tmpnewchar;
	                break;
	            case "2":
	                tmpnewchar = "二" + tmpnewchar;
	                break;
	            case "3":
	                tmpnewchar = "三" + tmpnewchar;
	                break;
	            case "4":
	                tmpnewchar = "四" + tmpnewchar;
	                break;
	            case "5":
	                tmpnewchar = "五" + tmpnewchar;
	                break;
	            case "6":
	                tmpnewchar = "六" + tmpnewchar;
	                break;
	            case "7":
	                tmpnewchar = "七" + tmpnewchar;
	                break;
	            case "8":
	                tmpnewchar = "八" + tmpnewchar;
	                break;
	            case "9":
	                tmpnewchar = "九" + tmpnewchar;
	                break;
	        }
	        switch (part[0].length - i - 1) {
	            case 0:
	                // tmpnewchar = tmpnewchar + "元";
	                tmpnewchar = tmpnewchar + "";
	                break;
	            case 1:
	                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
	                break;
	            case 2:
	                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
	                break;
	            case 3:
	                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
	                break;
	            case 4:
	                tmpnewchar = tmpnewchar + "万";
	                break;
	            case 5:
	                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
	                break;
	            case 6:
	                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
	                break;
	            case 7:
	                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
	                break;
	            case 8:
	                tmpnewchar = tmpnewchar + "亿";
	                break;
	            case 9:
	                tmpnewchar = tmpnewchar + "拾";
	                break;
	        }
	        newchar = tmpnewchar + newchar;
	    }
	    //小数点之后进行转化
	    if (Num.indexOf(".") != -1) {
	        if (part[1].length > 2) {
	            alert("小数点之后只能保留两位,系统将自动截断");
	            part[1] = part[1].substr(0, 2)
	        }
	        for (i = 0; i < part[1].length; i++) {
	            tmpnewchar = ""
	            perchar = part[1].charAt(i)
	            switch (perchar) {
	                case "0":
	                    tmpnewchar = "零" + tmpnewchar;
	                    break;
	                case "1":
	                    tmpnewchar = "壹" + tmpnewchar;
	                    break;
	                case "2":
	                    tmpnewchar = "贰" + tmpnewchar;
	                    break;
	                case "3":
	                    tmpnewchar = "叁" + tmpnewchar;
	                    break;
	                case "4":
	                    tmpnewchar = "肆" + tmpnewchar;
	                    break;
	                case "5":
	                    tmpnewchar = "伍" + tmpnewchar;
	                    break;
	                case "6":
	                    tmpnewchar = "陆" + tmpnewchar;
	                    break;
	                case "7":
	                    tmpnewchar = "柒" + tmpnewchar;
	                    break;
	                case "8":
	                    tmpnewchar = "捌" + tmpnewchar;
	                    break;
	                case "9":
	                    tmpnewchar = "玖" + tmpnewchar;
	                    break;
	            }
	            if (i == 0) tmpnewchar = tmpnewchar + "角";
	            if (i == 1) tmpnewchar = tmpnewchar + "分";
	            newchar = newchar + tmpnewchar;
	        }
	    }
	    //替换所有无用汉字
	    while (newchar.search("零零") != -1)
	        newchar = newchar.replace("零零", "零");
	    newchar = newchar.replace("零亿", "亿");
	    newchar = newchar.replace("亿万", "亿");
	    newchar = newchar.replace("零万", "万");
	    newchar = newchar.replace("零元", "元");
	    newchar = newchar.replace("零角", "");
	    newchar = newchar.replace("零分", "");
	    if (newchar.charAt(newchar.length - 1) == "元" || newchar.charAt(newchar.length - 1) == "角")
	        newchar = newchar + ""
	        // newchar = newchar + "整"
	    return newchar;
	}

});