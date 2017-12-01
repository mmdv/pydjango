jQuery(document).ready(function($) {
  // 获取课程信息
  // var course0  = {
  //   id:'',
  //   name:'',
  //   brief:'',
  //   imgurl:'',
  // };|
  var course0;
  // 写一个克隆course
  $.ajax({
    url: '/select',
    type: 'post',
    dataType: 'json',
    async:false,
  })
  .done(function(data) {
    console.log(typeof(data));
    course0 = data[0];
    // console.log(data[0].imgurl);        //1
    // console.log("success"+data[0]);
    // $.each(data[0], function(index, val) {
    //     iterate through array or object 
    //    // alert('index'+index,+','+'val'+val);
    //    course0.index =  val;
    // });
    // console.log(course0.id);
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
      course0: course0,
      imgUrl1: 'static/img/service_icon_02.png',
      imgUrl2: 'static/img/service_icon_03.png',
      imgUrl3: 'static/img/service_icon_04.png',
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

        // 提交事件
        $('.btn-primary').bind('click',function(event) {
             event.stopPropagation();
          /* Act on the event */
          var valArr = $('input[name=textfield2]').map(function(){return $(this).val()}).get();
          console.log(typeof(valArr))
          console.log(valArr);
          // 向后台发出请求
          //--------------------------
           $.post('/insert', {'data': JSON.stringify(valArr)}, function(res){
               if(res){
                   $('#myModal').hide();
                   alert('报名成功')
               }
            });
            //----------------------------------
        });

        // 监听文本输入

        $("input").bind("input propertychange change",function(event){
          console.log(9999)
          mesCheck($(this))
        });

        function mesCheck(el){
          console.log(el.val())
          if (el.val() == '' ) {
            el.css("border","1px #000 solid");
          }
        }
























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
