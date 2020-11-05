$(function () {


  //调用 getUserInfo 获取用户基本信息
  getUserInfo()


  var layer = layui.layer
  // 退出按钮绑定点击事件
  $('#btnLogout').on('click', function () {
    // console.log('ok')
    //提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something
      // console.log('ok')
      // 1、清空本地存储中的 token
      localStorage.removeItem('token')
      // 2、重新跳转到登录页面
      location.href = '/login.html'
      //关闭 confirm 的询问框
      layer.close(index);
    });
  })
})


//利用发起ajax请求，获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    //headers 就是请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''

    // },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('获取失败！')
      }
      // console.log(res)
      // console.log(res.data)
      //调用renderAvatar  渲染用户头像信息
      renderAvatar(res.data)
    },
    //无论成功还是失败，最终都会调用complete 回调函数
    // complete: function (res) {
    //   // console.log('执行了complete回调函数')
    //   // console.log(res)
    //   //在complete 回调函数中，可以使用res.responseJSON 拿到服务器响应回来额数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 1、清空本地存储中的 token
    //     localStorage.removeItem('token')
    //     // 2、重新跳转到登录页面
    //     location.href = '/login.html'

    //   }

    // }

  })
}

//渲染用户头像信息
function renderAvatar(user) {
  // 1、获取用户的名称
  var name = user.nickname || user.username
  // 2、设置欢迎的文本
  $('#welcome').html('欢迎 &nbsp;&nbsp;' + name)
  // 3、按需渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 3.2渲染文本头像
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
    $('.layui-nav-img').hide()


  }

}
