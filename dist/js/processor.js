(function($,root){
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var lastPersent = 0;
    var startTime;
    function format(duration) { 
        duration = Math.round(duration);
        var minutes = Math.floor(duration / 60);
        var seconds = duration % 60;
        if(minutes<10){
            minutes = "0" + minutes;
        }
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    }
    function renderAllTime(duration){
        curDuration = duration;
        lastPersent = 0;
        var allTime = format(duration);
        $scope.find(".all-time").text(allTime);
    }
    function renderPro(percent){
        var percentage = (percent-1)*100+"%";
        $scope.find(".pro-top").css({
            transform: "translateX("+percentage+")"
        })
    }
    function update(percent){
        var currentTime = percent*curDuration;
        currentTime = format(currentTime);
        $scope.find(".current-time").text(currentTime);
        renderPro(percent);
    }
    function start(percentage){
        lastPersent = percentage == undefined ? lastPersent : percentage;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();//开始时时间
        function frame(){
            var curTime = new Date().getTime();//当前时间
            var percent = lastPersent + (curTime - startTime) / (curDuration*1000);
            if(percent<1){
                frameId = requestAnimationFrame(frame);
                update(percent);
            }else{
                cancelAnimationFrame(frameId);
            }
        } 
        frame();
    }
    function stop(){
        var stopTime = new Date().getTime();
        lastPersent = lastPersent + (stopTime - startTime) / (curDuration*1000);
        cancelAnimationFrame(frameId);
    }
    root.processor = {
        renderAllTime : renderAllTime,
        start: start,
        stop : stop,
        update : update
    }
}(window.Zepto,window.player))