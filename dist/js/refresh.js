
var listWrapper = document.querySelector('.list-wrapper-hook'),
  listContent = document.querySelector('.list-content-hook'),
  alert = document.querySelector('.alert-hook'),
  topTip = document.querySelector('.refresh-hook'),
  bottomTip = document.querySelector('.loading-hook');
/*
 * 此处可优化,定义一个变量,记录用户滑动的状态,初始值为0,滑动中为1,滑动结束、数据请求成功重置为0
 * 防止用户刷新列表http请求过多
*/

function initScroll(myId) {
  var scroll = new window.BScroll(listWrapper, {
    probeType: 1,
    myId: myId
  });
  // 滑动中
  scroll.on('scroll', function (position) {
    if (position.y > 30) {
      topTip.innerText = '释放立即刷新';
    }
  });
  /*
   * @ touchend:滑动结束的状态
   * @ maxScrollY:屏幕最大滚动高度
  */
  // 滑动结束
  scroll.on('touchend', function (position) {
    if (position.y > 30) {

      setTimeout(function () {
        /*
         * 这里发送ajax刷新数据
         * 刷新后,后台只返回第1页的数据,无论用户是否已经上拉加载了更多
        */
        // 恢复文本值
        topTip.innerText = '下拉刷新';
        // 刷新成功后的提示
        refreshAlert('刷新成功');
        // 刷新列表后,重新计算滚动区域高度
        scroll.refresh();
      }, 1000);
    } else if (position.y < (this.maxScrollY - 30)) {
      bottomTip.innerText = '加载中...';
      var that = this;
      setTimeout(function () {
        // 恢复文本值 
        bottomTip.innerText = '上拉加载更多';
        // 向列表添加数据
        reloadData.apply(that);
        // 加载更多后,重新计算滚动区域高度
        scroll.refresh();
      }, 1000);
    }
  });
}
// initScroll();

// 加载更多方法
function reloadData() {
  var template1 = '<li class="ui-col ui-col-50" data-href="vedioInfo.html">\
                    <div class="ui-list-img-square">\
                        <span style="background-image:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556512244163&di=a4352855f183ac6551dc1fd3ef46770b&imgtype=0&src=http%3A%2F%2Ffile.tyun.71360.com%2FUpLoadFile%2F2019%2F1%2F4%2F14%2F636822092231385142_xsjy_1081376.jpg)"></span>\
                        <label>42:56</label>\
                    </div>\
                    <p>经济管理</p>\
                  </li>'

  var template2 = '<div class="list-content">\
                    <div class="title">经济管理考试</div>\
                    <div class="content">\
                        <div class="content-left">\
                            <p>限时60分钟10道题</p>\
                            <p>2019-04-26</p>\
                        </div>\
                        <div class="content-right">\
                            <a href="examinationInfo.html" class="">开始答题</a>\
                        </div>\
                    </div>\
                  </div>'
  // 向ul容器中添加内容
  if (this.options.myId == 0) {
    listContent.innerHTML = listContent.innerHTML + template1;
  } else if (this.options.myId == 1) {
    listContent.innerHTML = listContent.innerHTML + template2;
  }
}

// 刷新成功提示方法
function refreshAlert(text) {
  text = text || '操作成功';
  alert.innerHtml = text;
  alert.style.display = 'block';
  setTimeout(function () {
    alert.style.display = 'none';
  }, 1000);
}


