
(function () {
    $('.ui-list li,.ui-tiled li, .ui-href li').click(function () {
        if ($(this).data('href')) {
            location.href = $(this).data('href');
        }
    });
    $('.ui-header .ui-btn').click(function () {
        location.href = 'index.html';
    });
    
    var navLen = $('.ui-tab-nav li').length;
    $('.ui-tab-content').css('width',navLen+'00%');
    
    $('.ui-tab-nav').eq(0).find('li').on('click', function () {
        $(this).parent().find('li').removeClass('current');
        $(this).addClass('current');
        $('.ui-tab-content').eq(0).css({
            'transform': 'translate3d(-' + ($(this).index() * $('.ui-tab-content li').offset().width) + 'px,0,0)',
            'transition': 'transform 0.5s linear'
        })
    });
	
    //初始化滚动实例
    var slideContent = document.getElementById('slide');
    var scroll = new BScroll(slideContent, {
        scrollX: true,
        scrollY: false,
        disableTouch: true
    })

    //设置每一个li初始宽度
    var ul = document.getElementsByClassName('slide-zone')[0];
    var initW = window.screen.width;
    var liArr = Array.prototype.slice.call(ul.children, 0);
    ul.style.width = liArr.length * initW +'px';
    liArr.forEach(function (elem) {
        elem.style.width = '100vw';
    })

    //点击按钮切换li
    var curIndex = 0;
    $('.next').on('click', function () {
        if (curIndex === 9) {
            return;
        }
        curIndex++;
        scroll.scrollTo(-curIndex * initW, 0, 500, 'bounce')
        $('.showCount').html(curIndex + 1)
        curIndex === 9 ? $(this).html('提 交') : '';
    })

    $('.prev').on('click', function () {
        if (curIndex === 0) {
            return;
        }
        curIndex--;
        scroll.scrollTo(-curIndex * initW, 0, 500, 'bounce')
        $('.showCount').html(curIndex + 1)
        $('.next').html('下一题').css('backgroundColor','#e04e3c')
    })

    //倒计时
    countTime()
    function countTime () {
        var startTime = new Date();
        var endTime = new Date().setHours(startTime.getHours() + 1);
        var timer = setInterval(function () {
            var curTime = new Date();
            if (curTime.getTime() > endTime) {
                clearInterval(timer);
            }
            var seconds = (curTime.getTime() - startTime.getTime())/1000;
            var minutes = parseInt(60 - seconds/60);
            var sec = parseInt(60 - seconds%60);
            var mStr = minutes < 10 ? '0' + minutes  : minutes;
            var sStr = sec < 10 ? '0' + sec  : sec;
            $('.clock').html(mStr + ':' + sStr)
        },1000)
    }
})(window, undefined)
