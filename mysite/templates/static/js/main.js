jQuery(document).ready(function($) {
  
  // 写一个克隆course
  // 课程报名的请求
  
  var course_recommend;
  var company_name = [];//
  var history = [];//往期回顾
  var pics; //往期回顾,点击切换图片
  var course_default;//首次默认课程名
  var feedback; //客户留言
  var lecturer; //讲师
  var course_select_id;

  // 获取推荐报名课程
  $.ajax({
    url: '/select_course',
    type: 'post',
    dataType: 'json',
    async:false,
  })
  .done(function(data) {
    console.log(typeof(data));
    course_recommend = data;
    // course1 = data[1];
    // course2 = data[2];
    // course3 = data[3];
    console.log(data)
  });

  // 最近5期回顾公司名称
  $.ajax({
    url: 'select_company',
    type:'post',
    dataType: 'json',
    async:false,
  })
  .done(function(data) {
    history = data;
  });
  

  // 请求往期回顾默认图片列
  $.ajax({
    url: 'select_pic',
    type:'post',
    dataType: 'json',
    async:false,
  })
  .done(function(data){
    console.log(data);
    course_default = data[0]['name'];
    pics = getImgUrl(data[0]['imgurl']);
  })
  .fail(function() {
    console.log("error");
  });

  function getImgUrl(imgurl){
    var temp  = [];
    temp = imgurl.split(';');
    console.log(temp)
    return temp;
  }

  // 客户评论
  $.ajax({
    url: 'select_message',
    type: 'post',
    dataType: 'json',
    async:false,
  })
  .done(function(data) {
    feedback = data;
    console.log(feedback);
    console.log("success");
  });

  // 讲师风采
  $.ajax({
    url: '/select_lec',
    type: 'POST',
    dataType: 'json',
    async:false,
  })
  .done(function(data) {
    $.each(data, function(index, val) {
       /* iterate through array or object */
       data[index]['id'] = 'tab' + (index + 1);
       data[index]['motto'] = '"' + data[index]['motto'] + '"';
    });
    lecturer = data;
    console.log(data)
    console.log(lecturer[0]['motto']);
  })
  .fail(function() {
    console.log("error");
  });
  
  

  // VUE
  var ll = '课程11';
    new Vue({
    el: '#app',
    data: {
      // { 
      //   imgUrl:'static/img/service_icon_01.png',
      //   courseName:ll,
      //   brief:'Integer hendrerit vehicula mauris, sed pellentesque sem facilisis at. Aliquam vel arcu metus. Nam sem lectus, mattis non tellus et, tincidunt condimentum eros.',
      // }
      // imgUrl: 'static/img/portfolio_item_01.jpg'
      course_recommend: course_recommend,
      history: history,
      pics:pics,
      course_default:course_default,
      feedback:feedback,
      lecturer:lecturer,

    }
  })

  'use strict';

      var owl = $("#owl-testimonials");

        owl.owlCarousel({
          
          pagination : true,
          paginationNumbers: false,
          autoPlay: 6000, //Set AutoPlay to 3 seconds
          items : 1, //10 items above 1000px browser width
          itemsDesktop : [1000,1], //5 items between 1000px and 901px
          itemsDesktopSmall : [900,1], // betweem 900px and 601px
          itemsTablet: [600,1], //2 items between 600 and 0
          itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
          
      });

        // 改动新增

        // 点击报名获取对应课程id
        $('a[name=course_select]').click(function(event) {
          /* Act on the event */
          course_select_id = $(this).parent().parent().attr('id');
          // 取消位移问题
          console.log(course_select_id);
        });



        // 监听文本输入

        $("input").bind("input propertychange change",function(event){
        //   console.log(9999)
             $(this).css("border","1px #cad2db solid");
        });

        // 空值检测
        function mesCheck(el){
          console.log(el.val())
          if (el.val() == '' ) {
            el.css("border","1px red solid");
          }
        }
        // 电话验证
        function checkPhone(el){
           var re = /^1\d{10}$/;
          if(!re.test(el.val())){
            el.css("border","1px red solid");
            return false;
          } else {
            return true;
          }
        }
        // 邮箱验证
        function checkEmail(el){
          re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
          if(!re.test(el.val())){
            el.css("border","1px red solid");
            return false;
          } else {
            return true;
          }
        }
        // 报名验证
        // 失去焦点为空
        $('input').blur(function(event) {
          /* Act on the event */
          // alert(999);
          mesCheck($(this));
        });
        // 电话验证
        $('#userPhone').bind("input propertychange change",function(event) {
          /* Act on the event */
            flagPhoneSign = checkPhone($(this));
        });
        // 邮箱验证
        $('#userEmail').bind("input propertychange change",function(event) {
          /* Act on the event */
          flagEmailSign = checkEmail($(this));
        });

        // 选课报名事件
        $('.btn-primary').bind('click', function(event) {
            event.stopPropagation();
            /* Act on the event */

            var valArr = $('input[name=textfield2]').map(function() { return $(this).val() }).get();
            $.each(valArr, function(index, val) {
                    /* iterate through array or object */
                    if (val == '') {
                        $('input[name=textfield2]').eq(index).css("border", "1px red solid");
                        $('input[name=textfield2]').eq(index).focus();
                        alert('请完善填写信息');
                        return false;
                    }
            });
            if (!flagEmailSign) {
                $('#userEmail').css("border", "1px red solid");
                $('#userEmail').focus();
                  alert('请检查邮箱格式是否正确');
                  return;
               }
            if (!flagPhoneSign) {
                $('#userPhone').css("border", "1px red solid");
                $('#userPhone').focus(); 
                alert('请检查电话信息');
                return;
            }

            // 加入课程id
            valArr.push(course_select_id);
          // 向后台发出请求

          valArr = JSON.stringify(valArr);
           $.post('/insert', {'data': valArr}, function(res){
               if(res){
                   $('#myModal').hide();
                   // alert('报名成功');
               }
            });
        });

        // 公司筛选事件
        $('.company_list').on('click', function(event) {
          event.preventDefault();
          // 删除样式
          $('.project-filter li li').removeClass('active');
          $(this).parent().addClass('active');
          $.ajax({
            url: '/select_click',
            type: 'POST',
            dataType: 'json',
            async:false,
            data: {id: $(this).attr('id')},
          })
          .done(function(data) {
            // 删除原元素
               var temp,temp_pic;
               temp = $('.col-md-8 .projects-holder .row');
               // 删除元素
               temp.empty();
            // 修改课程信息
            $('#course_id').text(data[0]['name']);

            $.each(getImgUrl(data[0]['imgurl']), function(index, val) {

               /* iterate through array or object */
                strhtml = '<div class="col-md-6 col-sm-6 project-item mix ' + data[0]['filtertype'] + '" >';
                strhtml += '<div class="thumb">';
                strhtml += '<div class="image">';
                strhtml += '<a href="static/img/portfolio_big_item_02.jpg" data-lightbox="image-1"><img src="' + val + '"></a>';
                strhtml += '</div>';
                strhtml += '</div>';
                strhtml += '</div>';
                temp.append(strhtml);
                // 增加样式
                temp.children().fadeIn('slow');
            });
            console.log("success");
          })
          .fail(function(XMLHttpRequest, textStatus, errorThrown) {
             console.log(XMLHttpRequest.status);
             console.log(XMLHttpRequest.readyState);
             console.log(textStatus);
            console.log("error");
          });
        });

          // 更改讲师姓名列锚点,绑定单击事件
          $.each($('.wrapper div div ul li a'), function(index, val) {
             /* iterate through array or object */
             $(this).attr('href', '#tab' + (index + 1));
             $(this).click(function(event) {
               /* Act on the event */
               // 对应motto
               $('#motto').text(lecturer[index]['motto']);
             });
          });

          // 留言验证
          // 电话验证
          $('#phone').bind("input propertychange change",function(event) {
            /* Act on the event */
              flagPhoneLeave = checkPhone($(this));
          });
          // 邮箱验证
          $('#email').bind("input propertychange change",function(event) {
            /* Act on the event */
            flagEmailLeave = checkEmail($(this));
          });
          // 留言事件
          $('#leave_message').click(function(event) {
            /* Act on the event */
            var leave_mess;
            leave_mess = $('input[class=form-control]').map(function(){return $(this).val()}).get();
            leave_mess.push($('#message').val());
            $.each(leave_mess, function(index, val) {
                    /* iterate through array or object */
                    if (val == '') {
                        $('input[class=form-control]').eq(index).css("border", "1px red solid");
                        $('input[class=form-control]').eq(index).focus();
                        alert('请完善填写信息');
                        return false;
                    }
            });
            if (!flagEmailLeave) {
                $('#email').css("border", "1px red solid");
                $('#email').focus();
                  alert('请检查邮箱格式是否正确');
                  return;
               }
            if (!flagPhoneLeave) {
                $('#phone').css("border", "1px red solid");
                $('#phone').focus();
                alert('请检查电话信息');
                return;
            }
            alert('提交成功');
            leave_mess = JSON.stringify(leave_mess);
            console.log(leave_mess);
            // 验证

            // 存储信息
            $.ajax({
              url: 'insert_message',
              type: 'POST',
              dataType: 'json',
              data: {leave_mess: leave_mess},
            })
            .done(function() {
              console.log("success");
            });
          });
















        // 改动新增


        var top_header = $('.parallax-content');
        top_header.css({'background-position':'center center'}); // better use CSS

        $(window).scroll(function () {
        var st = $(this).scrollTop();
        top_header.css({'background-position':'center calc(50% + '+(st*.5)+'px)'});
        });


        $('.counter').each(function() {
          var $this = $(this),
              countTo = $this.attr('data-count');
          
          $({ countNum: $this.text()}).animate({
            countNum: countTo
          },

          {

            duration: 8000,
            easing:'linear',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
              //alert('finished');
            }

          });  
          
        });


        $('.tabgroup > div').hide();
        $('.tabgroup > div:first-of-type').show();
        $('.tabs a').click(function(e){
          e.preventDefault();
            var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
      
        })



        $(".pop-button").click(function () {
            $(".pop").fadeIn(300);
            
        });

        $(".pop > span").click(function () {
            $(".pop").fadeOut(300);
        });


        $(window).on("scroll", function() {
            if($(window).scrollTop() > 100) {
                $(".header").addClass("active");
            } else {
                //remove the background property so it comes transparent again (defined in your css)
               $(".header").removeClass("active");
            }
        });


  /************** Mixitup (Filter Projects) *********************/
      $('.projects-holder').mixitup({
            effects: ['fade','grayscale'],
            easing: 'snap',
            transitionSpeed: 400
        });



});
