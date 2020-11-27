$(function () {
  let layer = layui.layer;
  // 获取用户头像和昵称基本信息  发送ajax请求   老师用了封装 方便复用
  // 来获取头像和信息的
  getAvatarAndName();
  // 退出功能
  $('#logoutBtn').on('click', function () {
    // 当用户点击退出了  使用layer  弹框提示
    layer.confirm(
      '确定要走嘛!!!🐎',
      { icon: 3, title: '提示' },
      
      function (index) {
        // console.log( index );
        /* 
        该函数 在点击确认的时候执行  
        退出登录应该要做的事件   吧储存在本地的token  信心删除掉  localStorage.removeItem(token);
        页面 跳转回到login  登录页面
        */
       
        localStorage.removeItem('token');

        location.href = 'login.html';

        // 关闭当前询问框
        layer.close(index);
      }
    )
  })
})

// 要 是全局的函数 其他页面才能拿到    可以通过window获取到 
  function getAvatarAndName() {
    $.ajax({
      url: '/my/userinfo',
  
      //   设置请求头信息   储存在了localStorage  可以用getitem方法拿到 
      // headers: {
      //   Authorization: localStorage.getItem('token'),
      // },
  
      // 响应成功的回调函数 
      success: function (res) {
        console.log(res);//获取到了响应回来的数据
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败');
  
        }
  
        //  需要处理头像和昵称 
  
        // 1 先处理名字 (优先展示昵称  如果没有昵称在是展示用户名)
  
        let name = res.data.nickname || res.data.username;
        //  用户名首字母大写  console.log( name, name[0].toUpperCase() );
  
        let first = name[0].toUpperCase();
  
        $('#welcome').text('欢迎' + name);
  
        // 处理头像
        // 根据res的data的user_pic来做不同处理  如果有用户头像则展示用户的头像  隐藏文字头像
        if (res.data.user_pic) {
          $('.layui-nav-img').show().attr('src', res.data.user_pic);
          $('.text-avatar').hide();
        } else {
          //   没有用户头像，隐藏用户头像，展示文字头像 ==> 文字头像的文字来源于name的第一个字符（大写的）
          $('.layui-nav-img').hide();
          $('.text-avatar').text(first).show();
  
        }
      },
      // complete:function(xhr) {
      //   // console.log( xhr ); 形参获取到xhr对象 
      //   if ( xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败!') {
      //     // 如果有这两项  则回到登录页面   吧token 也清除掉
      //     localStorage.removeItem('token');
  
      //     location.href = 'login.html';
      //   }
  
      // }
  
  
    });
  }