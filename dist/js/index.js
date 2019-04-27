
(function () {
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

})(window, undefined)
