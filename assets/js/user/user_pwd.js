$(function() {
   let form = layui.form ;
   let layer = layui.layer;

    // layui  提供的form表单校验  verify（核实 校验）
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ], 

        // 校验新密码和原密码是否一致
        newPwd:function(value,item) {
            // 获取原密码的内容  value 内容（即表单的值）  item （DOM对象）     
            let oldPwd = $('[name=oldPwd]').val();
            // console.log( value , item , oldPwd);
            if ( value === oldPwd ) {
                return '新密码不能和原密码一样';
            }
        },
        
        // 校验确认密码 和 新密码 是否一致
        samePwd :function (value) {
            // 获取新密码框的内容   value 内容（即表单的值）
            let newPwd = $('[name=newPwd]').val();

            if (value !== newPwd) {
                return '两次输入的新密码不一致' ;
            }
        },
      }); 
      
    //   提交form表单 ==》  密码重置
    let $form = $('#pwdForm');
    $form.on('submit',function(e) {
        //    阻止提交的默认行为
        e.preventDefault();

        // serialize  收集表单数据
        let data = $(this).serialize ();

        $.ajax({
            url:'/my/updatepwd',
            type:'POST',
            // 名字一样可以只写一个（ES6）
            data,
            success:function(res) {
                console.log( res );


                if ( res.status !== 0 ) {
                    return layer.msg('重置密码失败' + res.message);
                }
                layer.msg('重置密码成功');
                // 重置表单中的密码框内容
                  $form.get(0).reset();
            }

        })
    })






})