$(function () {
  //   发送ajax获取用户的基本信息

  // 要用 form  layer 等方法  要从layui 引入进来
  let form = layui.form;
  let layer = layui.layer;



  getInfo();
  function getInfo() {
    $.ajax({
      url: '/my/userinfo',
      success: function (res) {
        console.log(res);

        if (res.status !== 0) {
          return layer.msg('获取用户基本信息失败');
        }

        /* 
         获取信息成功 吧响应回来的数据填充到form中
         给表单赋值 语法   form.val('filter',object)
         userForm 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        */

        form.val('userForm', res.data);
        //  注意点  给表单赋值  是按照name属性来 一 一 对应的 
      }
    });
  }

  // 重置功能
  $('#resetBtn').click(function (e) {
    e.preventDefault();
    // 再次发送ajax获取数据   填充到form中 
    getInfo();
  });



  // 提交表单数据  修改用户信息
  $('#userForm').submit(function (e
    ) {
    // 阻止默认行为
    e.preventDefault();

    //  serialize  收集表单信息
    let data = $(this).serialize();

    // 发送ajax请求
    $.ajax({
      url: '/my/userinfo',
      type: 'POST',
      // ES6   名字一样可以简写
      data,
      // 响应成功时  回调函数
      success: function (res) {
        // console.log(res);
        if(res.status !== 0) {
          return layer.msg('修改用户信息失败');
        }
          
        layer.msg('修改用户信息成功');

        // 通过window.parent 来获取到父页面  

        window.parent.getAvatarAndName();
      },  
    });
  });
  

  // verify  layui  提供的表单校验功能
  form.verify({
      // 昵称长度限制

      nickname:function (value) {
           if ( value.length > 6 ) {
             return '昵称长度必须在1-6字符之间';
           }

      }


  })


})