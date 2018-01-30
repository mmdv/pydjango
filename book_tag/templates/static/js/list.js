jQuery(document).ready(function($) {
	var bookInfo ;
	// 获取书名简介
	$.ajax({
		url: 'select_book',
		type: 'get',
		dataType: 'json',
		async:false,
	})
	.done(function(data) {
		bookInfo = data;
		console.log(bookInfo);
		// 生成书名
		$.each(data, function(index, val) {
			var htmlStr = '<li><a href="#" id="'+ val['id'] +'">'+ val['name'] +'</a></li>';
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
	
	// 点击书名获取章节
	$('.file-tree > li >a').click(function(event) {
		/* Act on the event */
		var book_id = $(this).attr('id');
	$.ajax({
		url: '/select_chapter',
		type: 'POST',
		dataType: 'json',
		async:false,
		data: {'book_id': book_id},
	})
	.done(function(data) {
		console.log(data);
		$.each(data, function(index, val) {
			
		});
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	});

});