(function($,root){
    var $scope = $(document.body);
    var controlManager;
    var $playList = $("<div class='play-list'>"+
    "<div class='list-header'>播放列表</div>"+
    "<ul class='list-wrapper'></ul>"+
    "<div class='list-close'>关闭</div>"+
    "</div>");
    function renderList(data){
        var html = "";
        for(var i = 0 ; i<data.length;i++){
            html += "<li><h3>"+data[i].song+"-<span>"+data[i].singer+"</span>"+"</h3></li>"
        }
        $playList.find(".list-wrapper").html(html);
        $scope.append($playList);
        bindEvent();
    }
    function signIndex(index){
        $playList.find("li").removeClass("playing");
        $playList.find("li").eq(index).addClass("playing");
    }
    function bindEvent(){
        $playList.find(".list-close").on("click",function(){
            $playList.removeClass("show");
        })
        $playList.find("li").on("click",function(){
            var index = $(this).index();
            // console.log(index);
            controlManager.index = index;
            signIndex(index);
            $scope.trigger("play:change",[index,true]);
            setTimeout(function(){
                $playList.removeClass("show");
            },500)
        })
    }
    function show(control){
        $playList.addClass("show");
        controlManager = control;
        var index = controlManager.index;
        signIndex(index);
    }
    root.playList = {
        renderList : renderList,
        show : show
    }
}(window.Zepto,window.player))