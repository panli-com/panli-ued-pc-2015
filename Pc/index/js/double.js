;(function(){
  $(function(){    
    // 获取服务器时间回调
    getServerTimeStamp(function(e){        
        FStardouble(e,'2015/11/11 00:00:00','2015/12/12 23:59:59');       
    })   

  });

  // 二次封装 no = 现在时间 ，sta = 开始时间，end = 结束时间
  function FStardouble(no,sta,end){
    var NowDay  = new Date(no),
            NowTime = NowDay.getTime(),
            StaTime = (new Date(sta)).getTime()
            EndTime = (new Date(end)).getTime(),
            NowH    = NowDay.getHours(),    
            dobCookie = get_Cookie('doubleEleven');    
      
        if(NowTime< StaTime || NowTime > EndTime){
             return;
        }

        if(dobCookie == 2){
            return;
        }
        if(dobCookie == 1 && NowH < 23){
            return;
        }
        if(NowH >= 22){
            FndoubleElevenLayer(NowTime,EndTime,2); 
            return;
        }            
        if(dobCookie == null){
            FndoubleElevenLayer(NowTime,EndTime,1);       
        }    
  }

  function FndoubleElevenLayer(FNowTime,FendTime,cooki){
  //今日结束时间
    var taDayend = getDateEnd(FNowTime);
    set_Cookie('doubleEleven',cooki,taDayend,'/');

  var DayNow = parseInt(FNowTime);
  var DayEnd = parseInt(FendTime);
  var stc = '<div class="i-double-eleven" data="'+ DayEnd +'">'+
            '<span class="double-time-h">00</span>'+
            '<span class="double-time-m">00</span>'+
            '<span class="double-time-s">00</span>'+
            '</div>';
  PL.open({
    type: 1,
    title: false,
    area: ['380px', '372px'],
    closeBtn: true,
    shadeClose: false,
    skin: 'i-double-eleven-wp',
    content: stc
  });

  $("head").append("<style type='text/css'>.i-double-eleven-wp{width:380px;height:372px;background:url(http://sf.panli.com/Ued/Pc/index/images/doing_002.png) center center no-repeat}.i-double-eleven{position:relative;width:380px;height:372px;font-size:33px;color:#ffea00}.layui-layer-close2{filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity:0;opacity:0}.double-time-h,.double-time-m,.double-time-s{position:absolute;bottom:10px}.double-time-h{left:54px}.double-time-m{left:150px}.double-time-s{left:244px}</style>");

  var doubleElevenLayer = {
    pZ:function(s){
      return s < 10 ? '0' + s: s;
    },
    DId:function(id){
      return document.getElementById(id);
    },
    less:function(n){
      return n < 0 ? '0': n;
    },
    GetRTime:function(){
      var t = parseInt(DayEnd) - parseInt(DayNow) - 1000;
      var d=Math.floor(t/1000/60/60/24);
      var h=Math.floor(t/1000/60/60%24);
      var m=Math.floor(t/1000/60%60);
      var s=Math.floor(t/1000%60);
      DayNow += 1000;
     //  t < 0 ?  clearInterval(Time) : '';
      if(t < 0){
        d = h = m = s = '0';
        clearInterval(doubleElevenTime);
      }
      $(".double-time-h").html(doubleElevenLayer.pZ(h));
      $(".double-time-m").html(doubleElevenLayer.pZ(m));
      $(".double-time-s").html(doubleElevenLayer.pZ(s));

    }
  }
  var doubleElevenTime = setInterval(function(){
    doubleElevenLayer.GetRTime()
  },1000);
}

})();





