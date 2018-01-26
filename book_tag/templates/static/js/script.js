jQuery(document).ready(function($) {

	var tags;
	// 获取关键词标签
	$.ajax({
		url: 'select_tags',
		type: 'POST',
		dataType: 'json',
		async:false,
		data: {'book_id': '1'},
	})
	.done(function(data) {
		tags = data;
		console.log(tags);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

	// vue
	new Vue({
    el: '#tag_box',
    data: {
      tags : '666',
	    },
	  });

	// 鼠标以上高亮
	$('#tag_box').on('mouseover', '.mou', function(event) {
		event.preventDefault();
		// console.log(this);
		opacity = $(this).css('opacity');
		index = $(this).css('z-index');
		fontsize = $(this).css('font-size');
		// console.log(opacity,index,fontsize);

		$(this).animate({
			'opacity': '1',
			'z-index': '99',
			'font-size':'24px',},
			300, function() {
			/* stuff to do after animation is complete */
		});
	});

	// 鼠标离开
	$('#tag_box').on('mouseleave', '.mou', function(event) {
		event.preventDefault();
		// console.log($(this)[0]);
		$(this).stop().animate({
			'opacity': opacity,
			'z-index': index,
			'font-size':fontsize},
			100, function() {
			/* stuff to do after animation is complete */
		});
	});

});