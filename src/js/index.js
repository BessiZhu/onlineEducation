(function () {

    // 点击li跳转到详情页
    $('.ui-list, .ui-tiled, .ui-href').on('click', function (e) {
        if ($(e.target).parents('li').data('href')) {
            location.href = $(e.target).parents('li').data('href');
        }
    })

    $('.ui-header .ui-btn').click(function () {
        location.href = 'index.html';
    });

    // 点击全部菜单中的列表项，加载对应的视频数据
    $('#allNav .ui-col').on('click', function (e) {
        var dWidth = $(window).width();
        // 1.头部列表对应的标签高亮
        $('.ui-tab-nav li').each(function (index, ele) {

            // console.log($(e.target))
            if ($(ele).attr('data-id') == $(e.target).parent().attr('data-id')) {
                $(ele).addClass('current');
                $('.ui-tab-content').animate({
                    transform: 'translate3d(' + index * dWidth + 'px, 0px, 0px)'
                })
                $('#allNav').removeClass('show');
                // 设置顶部菜单焦点位置
                var liWidth;
                for (var i = 0; i <= index; i++) {
                    liWidth += $('.ui-tab-nav li').eq(i).width()
                }
                console.log(liWidth)
                $(".nav-box ul").animate({
                    transform: 'translate3d(' + liWidth + 'px, 0px, 0px)'
                })

            } else {
                $(ele).removeClass('current');
            }
        })



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


    })(window, undefined)
