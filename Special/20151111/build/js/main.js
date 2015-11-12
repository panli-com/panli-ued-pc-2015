(function() {
  function adjustHeight(textareaElement, minHeight) {
      var outerHeight = parseInt(window.getComputedStyle(el).height, 10);
      var diff = outerHeight - el.clientHeight;
      el.style.height = 0;
      el.style.height = Math.max(minHeight, el.scrollHeight + diff) + 'px';
  }
  var textAreas = document.querySelectorAll('textarea[data-adaptheight]');
  for (var i = 0, l = textAreas.length; i < l; i++) {
      var el = textAreas[i];
      el.style.boxSizing = el.style.mozBoxSizing = 'border-box';
      el.style.overflowY = 'hidden';
      var minHeight = el.scrollHeight;
      el.addEventListener('input', function() {
          adjustHeight(el, minHeight);
      });
      window.addEventListener('resize', function() {
          adjustHeight(el, minHeight);
      });
      adjustHeight(el, minHeight);
  }
}());

;(function(){
  $(function(){
    $(".num-jia").on("click",function(){
      var _tN = $(".num-input"),
          _tNV = parseInt(_tN.val()),
          proN = parseInt($("#pro-number").text());
          if(_tNV == proN){
            return;
          }
          _tN.val(_tNV+1);
          vidataNum();
    })
    $(".num-jian").on("click",function(){
      var _tN = $(".num-input"),
          _tNV = parseInt(_tN.val()),
          proN = parseInt($("#pro-number").text());
          if(_tNV == 1){
            return;
          }
          _tN.val(_tNV-1);
          vidataNum();
    })

    $(".num-input").on('input change',function(){
      var _t = $(this),
          _tV = parseInt(_t.val()),
          proN = parseInt($("#pro-number").text());
      if(_tV > proN){
        _t.val(proN);
      }
      if(_tV < 1){
          _t.val(1);
      }
      vidataNum();
    })
    vidataNum();
  });  

})();

;(function(){
  $(function(){

    $("#Form1").submit(function(e){
       if(!vidataNum()){
         PL.msg('您的余额不足, 请充值后再下单');
          return false;
       }
    });

  });
})();

function vidataNum(){
  var proPrice = Number($("#product-price").text()),
      _tNV = parseInt($(".num-input").val()),
      over = Number($("#user-over").text()),
      playPrice = proPrice * _tNV;
  $("#playPrice").html(playPrice.toFixed(2));
  if(playPrice > over){
    $(".goto-paly-a").show();
    return false;
  } else {
    $(".goto-paly-a").hide();
    return true;
  }
}

;(function(){

  $(function(){
    $('.back-Top').on("click",function(){
      $('html,body').animate({ scrollTop: 0 }, 800);
    })

    // img show
    $(".product-sml-u li").on("hover",function(){
      var _t = $(this),
          _img = _t.attr("data-img");
          $(".product-sml-u li").removeClass('on');
          _t.addClass("on");
          $(".product-big-box img").attr('src',_img);
    });

    $(".text-placeholder").on('click',function(){
        $(this).next().focus();
    });

    $(".text-placeholder-input").on("focus",function(){
      $(this).prev().css('display','none');
    })
    $(".text-placeholder-input").on("blur",function(){
      var _t = $(this);
      if(_t.val() == ''){
          $(this).prev().css('display','block');
      }
    })
  });


  $(document).scroll(function(){
  	var  scrollTop =  $(document).scrollTop(),bodyHeight = $(window).height();
    	if(scrollTop > bodyHeight/2){
    		$('.back-Top').fadeIn("slow");
    	}else{
    		$('.back-Top').fadeOut("slow");
    	}
  })

})();
