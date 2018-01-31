// tags.html

jQuery(document).ready(function($) {
	var storage=window.localStorage;
	var book_id = storage.book_id;
	var chapter_id = storage.chapter_id;
	var tags;
	// 获取关键词标签
	$.ajax({
		url: 'select_tags',
		type: 'POST',
		dataType: 'json',
		async:false,
		data: {'book_id': book_id,'chapter_id':chapter_id},
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
	
	// 插入书签
	$.each(tags, function(index, val) {
		var htmlStr = '<a href="#" class="mou">'+ val['text'] +'</a>';
		$('#tag_box').append(htmlStr);
	});


// ////////////////////////////////////

;window.tagcloud = (function(win, doc) { // ns
    // 判断对象
    function isObject (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    // 构造函数
    function TagCloud (options) {
        var self = this;

        self.config = TagCloud._getConfig(options);
        self.box = self.config.element;   //组件元素
        self.fontsize = self.config.fontsize; //平均字体大小
        self.radius = self.config.radius; //滚动半径
        self.depth = 1.5 * self.radius;   //滚动深度
        self.size = 1.5 * self.radius;    //随鼠标滚动变速作用区域

        self.mspeed = TagCloud._getMsSpeed(self.config.mspeed);
        self.ispeed = TagCloud._getIsSpeed(self.config.ispeed);
        self.items = self._getItems();

        self.direction = self.config.direction;   //初始滚动方向
        self.keep = self.config.keep; //鼠标移出后是否保持之前滚动

        //初始化
        self.active = false;   //是否为激活状态
        self.lasta = 1;
        self.lastb = 1;
        self.mouseX0 = self.ispeed * Math.sin(self.direction * Math.PI / 180);    //鼠标与滚动圆心x轴初始距离
        self.mouseY0 = -self.ispeed * Math.cos(self.direction * Math.PI / 180);   //鼠标与滚动圆心y轴初始距离
        self.mouseX = self.mouseX0;   //鼠标与滚动圆心x轴距离
        self.mouseY = self.mouseY0;   //鼠标与滚动圆心y轴距离

        //鼠标移入
        TagCloud._on(self.box, 'mouseover', function () {
            self.active = true;
            clearInterval(self.up);
        });
        //鼠标移出
        TagCloud._on(self.box, 'mouseout', function () {
            self.active = false;
            self.up = setInterval(function() {
                self.update(self);
            }, 30);
        });
        //鼠标在内移动
        TagCloud._on(self.keep ? win : self.box, 'mousemove', function (ev) {
            var oEvent = win.event || ev;
            var boxPosition = self.box.getBoundingClientRect();
            self.mouseX = (oEvent.clientX - (boxPosition.left + self.box.offsetWidth / 2)) / 5;
            self.mouseY = (oEvent.clientY - (boxPosition.top + self.box.offsetHeight / 2)) / 5;
        });

        //定时更新
        TagCloud.boxs.push(self.box);
        self.update(self);    //初始更新
        self.box.style.visibility = "visible";
        self.box.style.position = "relative";
        self.box.style.minHeight = 2 * self.size + "px";
        self.box.style.minWidth = 2 * self.size + "px";
        for (var j = 0, len = self.items.length; j < len; j++) {
            self.items[j].element.style.position = "absolute";
            self.items[j].element.style.zIndex = j + 1;
        }
        self.up = setInterval(function() {
            self.update(self);
        }, 30);
    }

    //实例
    TagCloud.boxs = []; //实例元素数组
    // 静态方法们
    TagCloud._set = function (element) {
        if (TagCloud.boxs.indexOf(element) == -1) {
            return true;
        }
    };
    TagCloud._getConfig = function (config) {
        var defaultConfig = {      //默认值
            fontsize: 16,       //基本字体大小, 单位px
            radius: 160,         //滚动半径, 单位px
            mspeed: "normal",   //滚动最大速度, 取值: slow, normal(默认), fast
            ispeed: "normal",   //滚动初速度, 取值: slow, normal(默认), fast
            direction: 135,     //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
            keep: true          //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
        };

        if(isObject(config)) {
            for(var i in config) {
                if(config.hasOwnProperty(i)) {
                    defaultConfig[i] = config[i]; //用户配置
                }
            }
        }

        return defaultConfig;// 配置 Merge
    };
    TagCloud._getMsSpeed = function (mspeed) {    //滚动最大速度
        var speedMap = {
            slow: 1.5,
            normal: 3,
            fast: 5
        };
        return speedMap[mspeed] || 3;
    };
    TagCloud._getIsSpeed = function (ispeed) {    //滚动初速度
        var speedMap = {
            slow: 10,
            normal: 25,
            fast: 50
        };
        return speedMap[ispeed] || 25;
    };
    TagCloud._getSc = function(a, b) {
        var l = Math.PI / 180;
        //数组顺序0,1,2,3表示asin,acos,bsin,bcos
        return [
            Math.sin(a * l),
            Math.cos(a * l),
            Math.sin(b * l),
            Math.cos(b * l)
        ];
    };
    TagCloud._on = function (ele, eve, handler, cap) {
        if (ele.addEventListener) {
            ele.addEventListener(eve, handler, cap);
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + eve, handler);
        } else {
            ele['on' + eve] = handler;
        }
    };

    // 原型方法
    TagCloud.prototype = {
        constructor: TagCloud, // 反向引用构造器

        update: function () {
            var self = this, a, b;

            if (!self.active && !self.keep) {
                self.mouseX = Math.abs(self.mouseX - self.mouseX0) < 1 ? self.mouseX0 : (self.mouseX + self.mouseX0) / 2;   //重置鼠标与滚动圆心x轴距离
                self.mouseY = Math.abs(self.mouseY - self.mouseY0) < 1 ? self.mouseY0 : (self.mouseY + self.mouseY0) / 2;   //重置鼠标与滚动圆心y轴距离
            }

            a = -(Math.min(Math.max(-self.mouseY, -self.size), self.size) / self.radius ) * self.mspeed;
            b = (Math.min(Math.max(-self.mouseX, -self.size), self.size) / self.radius ) * self.mspeed;

            if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
                return;
            }

            self.lasta = a;
            self.lastb = b;

            var sc = TagCloud._getSc(a, b);

            for (var j = 0, len = self.items.length; j < len; j++) {
                var rx1 = self.items[j].x,
                    ry1 = self.items[j].y*sc[1] + self.items[j].z*(-sc[0]),
                    rz1 = self.items[j].y*sc[0] + self.items[j].z*sc[1];

                var rx2 = rx1 * sc[3] + rz1 * sc[2],
                    ry2 = ry1,
                    rz2 = rz1 * sc[3] - rx1 * sc[2];

                var per = self.depth / (self.depth + rz2);

                self.items[j].x = rx2;
                self.items[j].y = ry2;
                self.items[j].z = rz2;
                self.items[j].scale = per; //取值范围0.6 ~ 3
                self.items[j].fontsize = Math.ceil(per * 3) + self.fontsize - 6;
                self.items[j].alpha = 1.5 * per - 0.5;

                self.items[j].element.style.left = self.items[j].x + (self.box.offsetWidth - self.items[j].offsetWidth) / 2 + "px";
                self.items[j].element.style.top = self.items[j].y + (self.box.offsetHeight - self.items[j].offsetHeight) / 2 + "px";
                self.items[j].element.style.fontSize = self.items[j].fontsize + "px";
                self.items[j].element.style.filter = "alpha(opacity=" + 100 * self.items[j].alpha + ")";
                self.items[j].element.style.opacity = self.items[j].alpha;
            }
        },

        _getItems: function () {
            var self = this,
                items = [],
                element = self.box.children, // children 全部是Element
                length = element.length,
                item;

            for (var i = 0; i < length; i++) {
                item = {};
                item.angle = {};
                item.angle.phi = Math.acos(-1 + (2 * i + 1) / length);
                item.angle.theta = Math.sqrt((length + 1) * Math.PI) * item.angle.phi;
                item.element = element[i];
                item.offsetWidth = item.element.offsetWidth;
                item.offsetHeight = item.element.offsetHeight;
                item.x = self.radius * Math.cos(item.angle.theta) * Math.sin(item.angle.phi);
                item.y = self.radius * Math.sin(item.angle.theta) * Math.sin(item.angle.phi);
                item.z = self.radius * Math.cos(item.angle.phi);
                item.element.style.left = item.x + (self.box.offsetWidth - item.offsetWidth) / 2 + "px";
                item.element.style.top = item.y + (self.box.offsetHeight - item.offsetHeight) / 2 + "px";
                items.push(item);
            }

            return items;   //单元素数组
        }
    };

    return function (options) { // factory
        options = options || {}; // 短路语法
        var selector = options.selector || '.tagcloud', //默认选择class为tagcloud的元素
            elements = doc.querySelectorAll(selector),
            instance = [];
        for (var index = 0, len = elements.length; index < len; index++) {
            options.element = elements[index];
            if (!!TagCloud._set(options.element)) {
                instance.push(new TagCloud(options));
            }
        }
        return instance;
    };
})(window, document);

tagcloud();

//////////////////////////////////////







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