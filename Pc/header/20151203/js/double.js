;(function(){
  $(function(){    
    // 获取服务器时间回调
    getServerTimeStamp(function(e){        
        FStardouble(e,'2015/12/12 00:00:00','2015/12/12 23:59:59');       
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
  var stc = '<a href="http://www.panli.com/Special/taobao20151212.aspx" class="double-a" target="_blank"><div class="i-double-eleven" data="'+ DayEnd +'">'+
            '<span class="time-hour double-time-h">00</span>'+
            '<span class="time-minute double-time-m">00</span>'+
            '<span class="time-second double-time-s">00</span>'+
            '</div></a>';

  var imgW = '650px',
      imgH = '467px';
  PL.open({
    type: 1,
    title: false,
    area: [imgW, imgH],
    closeBtn: true,
    shadeClose: false,
    skin: 'i-double-eleven-wp',
    content: stc 
  });

  $("head").append("<style type='text/css'>.double-a{cursor:pointer }.layui-layer-setwin{ right:218px;top:57px; }.i-double-eleven-wp{width:"+ imgW +";height:"+ imgH +";background:url(http://sf.panli.com/Ued/Pc/header/20151203/images/dobuleDay1212.png) center center no-repeat}.i-double-eleven{position:relative;width:"+ imgW +";height:"+ imgH +";font-size:30px;color:#292929}.layui-layer-close2{filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity:0;opacity:0}.double-time-h,.double-time-m,.double-time-s{position:absolute;bottom:81px;font-size:30px;font-weight:400;width:44px;}.double-time-h{left:235px}.double-time-m{left:314px}.double-time-s{left:393px}</style>");

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
      $(".time-hour").html(doubleElevenLayer.pZ(h));
      $(".time-minute").html(doubleElevenLayer.pZ(m));
      $(".time-second").html(doubleElevenLayer.pZ(s));

    }
  }
  var doubleElevenTime = setInterval(function(){
    doubleElevenLayer.GetRTime()
  },1000);
}

})();





