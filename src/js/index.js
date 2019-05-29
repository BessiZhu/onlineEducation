(function () {

    function bindEvent() {
        // 点击li跳转到详情页
        $('.ui-list, .ui-tiled, .ui-href').on('click', function (e) {
            if ($(e.target).parents('li').data('href')) {
                location.href = $(e.target).parents('li').data('href');
            }
        })

        // 显示隐藏全部菜单界面
        $("#navbtn").click(function () {
            $("#allNav").addClass("show");
        });
        $(".close-btn").click(function () {
            $("#allNav").removeClass("show");
        });

        /* 点击考试列表a标签跳转到考试详情页面 */
        $('.start-btn').on('click', function () {
            location.href = 'examinationInfo.html';
        })

        /* 初始化index页面内容的宽度 */
        var navLen = $('.ui-tab-content > li').length;
        $('.ui-tab-content').css('width', navLen + '00%');

        $('.ui-tab-nav').eq(0).find('li').on('click', function () {
            $(this).parent().find('li').removeClass('current');
            $(this).addClass('current');
            $('.ui-tab-content').eq(0).css({
                'transform': 'translate3d(-' + ($(this).index() * $('.ui-tab-content li').offset().width) + 'px,0,0)',
                'transition': 'transform 0.5s linear'
            })
        });
    }

    // 实现顶部菜单的滑动功能
    var leftWidth = $(".nav-box").width();
    var ulBoxWidth = $(".nav-box ul").width();
    /*获取用来滑动的列表*/
    var ulBox = $(".nav-box ul");
    /*记录当前元素滑动到的距离*/
    var currentX = 0;
    /*设置静止状态下的最大left值*/
    var maxLeft = 0;
    /*设置静止状态下的最小的left值*/
    var minLeft = leftWidth - ulBoxWidth;

    function topNavScroll() {

        /*设置滑动状态下的最大的left值*/
        var maxBounceLeft = maxLeft;
        /*设置滑动状态下的最小left值*/
        var minBounceLeft = minLeft;
        /*实现滑动*/
        var startX = 0;
        var moveX = 0;
        var distanceX = 0;
        /*添加滑动事件*/
        ulBox.on("touchstart", function (e) {
            /*获取手指的起始坐标*/
            startX = e.targetTouches[0].clientX;
        });
        ulBox.on("touchmove", function (e) {
            moveX = e.targetTouches[0].clientX;
            /*计算距离的差异*/
            distanceX = moveX - startX;
            /*判断滑动的时候是否超出当前指定的滑动区间*/
            if (currentX + distanceX > maxBounceLeft || currentX + distanceX < minBounceLeft) {
                return;
            }
            /*先将之前可能添加的过渡效果清除*/
            ulBox.css({ "transition": "none", "left": (currentX + distanceX) + "px" });
        });
        ulBox.on("touchend", function (e) {
            /*判断当前滑动的距离是否在静止状态和滑动状态下的最小Left值之间*/
            if (currentX + distanceX < minLeft) {
                currentX = minLeft;
                /*回到minLeft位置*/
                ulBox.css({ "left": minLeft + "px" })
            }
            else if (currentX + distanceX > maxLeft) {
                currentX = maxLeft;
                /*回到maxLeft位置*/
                ulBox.css({ "left": maxLeft + "px" })
            }
            else {
                /*记录当前滑动的距离*/
                currentX += distanceX;
            }
        });
    }

    /* 点击全部菜单中的列表项，加载对应的视频数据 */
    $('#allNav .ui-col').on('click', function (e) {
        var dWidth = $(window).width();
        // 1.头部列表对应的标签高亮
        $('.ui-tab-nav li').each(function (index, ele) {
            // 遍历顶部菜单列表
            if ($(ele).attr('data-id') == $(e.target).parent().attr('data-id')) {
                // 将对应的菜单设置样式
                $(ele).addClass('current');
                // 显示对应的数据
                $('.ui-tab-content').animate({
                    transform: 'translate3d(' + - (index * dWidth) + 'px, 0px, 0px)'
                })
                // 隐藏所有菜单界面
                $('#allNav').removeClass('show');

                // 设置顶部菜单焦点位置
                var liWidth = 0, ulWidth = ulBox.width();
                for (var i = 0; i < index - 1; i++) {
                    liWidth += $('.ui-tab-nav li').eq(i).width()
                }
                if (ulWidth - liWidth < dWidth) {
                    /*只能偏移到不超出ul宽度的位置*/
                    ulBox.css({ "left": -(ulWidth - dWidth) + "px" })
                    currentX = minLeft;
                }
                else if (index == 0) {
                    currentX = 0;
                    ulBox.css({ "left": 0 + "px" })
                }
                else {
                    ulBox.css({ "left": -liWidth + "px" })
                    currentX += -liWidth;
                }
            } else {
                $(ele).removeClass('current');
            }
        })
    })


    // 初始化调用方法
    $(function () {
        FastClick.attach(document.body);
        topNavScroll();
        bindEvent();
    })

})(window, undefined)
