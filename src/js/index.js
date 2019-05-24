


(function () {

    // 点击li跳转到详情页
    $('.ui-list, .ui-tiled, .ui-href').on('click', function(e){
        console.log(e)
        if ($(e.target).parents('li').data('href')) {
            location.href = $(e.target).parents('li').data('href');
        }
    })
    
    $('.ui-header .ui-btn').click(function () {
        location.href = 'index.html';
    });

    var navLen = $('.ui-tab-content > li').length;
    $('.ui-tab-content').css('width',navLen+'00%');
    
    $('.ui-tab-nav').eq(0).find('li').on('click', function () {
        $(this).parent().find('li').removeClass('current');
        $(this).addClass('current');
        $('.ui-tab-content').eq(0).css({
            'transform': 'translate3d(-' + ($(this).index() * $('.ui-tab-content li').offset().width) + 'px,0,0)',
            'transition': 'transform 0.5s linear'
        })
    });

 /* // 点击li跳转到详情页
    $('.ui-list, .ui-tiled, .ui-href').on('tap', function(e){
        console.log(e)
        if ($(e.target).parents('li').data('href')) {
            location.href = $(e.target).parents('li').data('href');
        }
    })
    function tap(dom, callback){
        if(!dom || typeof dom != "object"){
            return;
        }
        var startTime,startX,startY;
        dom.on('touchstart',function (e) {
            // 判断是否只有一根手指
            if(e.targetTouches.length > 1){
                return;
            }
            startTime = Date.now();
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
        });
        dom.on('touchend',function (e) {
            // 判断是否只有一根手指
            if(e.changedTouches.length > 1){
                return;
            }
            // 判断时间差异
            if(Date.now() - startTime >150){
                return;
            }
            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            if(Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6){
                callback && callback(e);
            }
        });
    } */
	
})(window, undefined)
