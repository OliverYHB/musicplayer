var $ = window.Zepto;
var $scope = $(document.body);
var root = window.player;
var render = root.render;
var songList;
var controlmanager;
var audiomanager = new root.audioManager();
var processor = root.processor;
var playList = root.playList;
function bindClick() {
    $scope.on("play:change",function(e,index,flag){
        render(songList[index]);
        audiomanager.setAudioSource(songList[index].audio)
        if(audiomanager.status == "play" || flag == true){
            audiomanager.play();
            $scope.find(".play-btn").addClass("playing");
            processor.start();
        }
        processor.renderAllTime(songList[index].duration);
        processor.update(0);
    })
    $scope.find(".next-btn").on("click",function(){
       var index = controlmanager.next();
        $scope.trigger("play:change",index);
    })
    $scope.find(".prev-btn").on("click",function(){
        var index = controlmanager.prev();
        $scope.trigger("play:change",index);
    })
    $scope.find(".play-btn").on("click",function(){
        if(audiomanager.status == "pause"){
            audiomanager.play();
            $(this).addClass("playing");
            processor.start();
        }else{
            audiomanager.pause();
            $(this).removeClass("playing");
            processor.stop();
        }
    })
    $scope.find(".list-btn").on("click",function(){
        playList.show(controlmanager);
    })
 }
 function bindTouch(){
     var $sliderPoint = $scope.find(".slider-point");
     var offset = $scope.find(".processor").offset();
     var left = offset.left;
     var width = offset.width;
     $sliderPoint.on("touchstart",function(){
         processor.stop();
     }).on("touchmove",function(e){
         var x = e.changedTouches[0].clientX;
         var percent = (x - left) / width;
         if(percent<0){
             percent = 0 ;
         }else if(percent > 1){
             percent = 1;
         }
         processor.update(percent);
     }).on("touchend",function(e){
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        var curDuration = songList[controlmanager.index].duration * percent;
        audiomanager.jumpToPlay(curDuration);
        processor.start(percent);
        $scope.find(".play-btn").addClass("playing");
     })
 }
function getDate(url){
    $.ajax({
        url:url,
        type:"GET",
        success:function (data) {
            playList.renderList(data);
            controlmanager = new root.controlManager(data.length);
            bindClick();
            bindTouch();
            songList = data;
            $scope.trigger("play:change",0);
        },
        fail:function () {
            
        }
    })
}

getDate("/data/data.json");
