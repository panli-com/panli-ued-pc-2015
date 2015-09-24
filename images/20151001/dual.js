$(function(){

  var duaEndTime = '2015-10-15 23:59:59';
  function count_down(endTime,timeData){

        function p(s) {
            return s < 10 ? '0' + s: s;
        }

        var Time_Rule=/^[\d]{4}-[\d]{1,2}-[\d]{1,2}( [\d]{1,2}:[\d]{1,2}(:[\d]{1,2})?)?$/ig,str='',conn,s;
        if(!endTime.match(Time_Rule)){
            return false;
        }


        var sec=(new Date(endTime.replace(/-/ig,'/')).getTime() - timeData)/1000;


        var timeDay = sec/24/3600;
        var timeJson = {
            'Hour':sec/3600%24,
            'Minute':sec/60%60,
            'Second':sec%60
        }


        var textTime = '';

        for(i in timeJson){
           var i = p(Math.floor(timeJson[i])).toString()+":";
           textTime += i;
        }

        textTime = textTime.substring(0,textTime.length-1);


        if(Math.floor(sec)<0){ textTime='00:00:00'; }

        var _timeBox = $("#dual-october-time");

        /* 还剩一天的时候 */
        if(timeDay < 1){
            _timeBox.addClass("dual-october-time-2");
            $("#dual-text-time").html(textTime);
            setTimeout(function(){
                timeData = timeData-1000;
                count_down(duaEndTime,timeData);
            },1000);
        }else{
            var _day = (Math.floor(timeDay)).toString(),
                datImgSrc  = '<img src="http://sf.panli.com/Ued/images/20151001/day.png" >';
              _timeBox.addClass("dual-october-time-1");
              $("#dual-text-time").html(_day+datImgSrc);
        }

        return timeJson;
    }


    dualDong();
    function dualDong(){
      var _dbox =$(".dual-october-wrap");
      if(_dbox.length<1){
        console.log("不在时间范围");
        return;
      }
      getTimeInfo(function(timeData){
         count_down(duaEndTime,timeData);
      })
    };

});


function getTimeInfo(callback){
     $.ajax({
       type: "POST",
       url: "/App_Services/wsDefault.asmx/GetDateTime",
       dataType: "json",
       contentType: "application/json;utf-8",
       timeout: 10000,
        error: function () { },
        success: function (data) {
              callback(parseInt(data.d));
        }
    });
  };
