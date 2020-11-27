$(function() {
   
  let layer = layui.layer;

//   1.1  获取裁剪区域的DOM 元素
let $image = $('#image');

// 1.2 配置选项
const options = {
    // 纵横比 
    aspectRatio:1,
    preview:'.img-preview',
};

// 1.3  创建裁剪区域
$image.cropper(options);
// 结构已有 文件结构 可以直接点击上传  为了美化隐藏原有的文件 结构  让其他按钮实现 上传文件的功能  找到并点击上传按钮  模拟点击文件域
$('#uploadBtn').click(function() {
    // 找到文件域  点击
    $('#file').click();
});


// 监听文件域的选择文件的变化
$('#file').on('change',function() {
    /* 
    当选择文件改变了  该事件就会触发 
    files 属性是文件域的DOM对象的属性 记录所有用户选择的文件
    一下代码获取到用户选择的文件（头像）
    */

    let file = this.files[0];
    // console.log( file );

    // 吧选择的文件得到对应的url地址
    let newImgURL = URL.createObjectURL(file);

    // console.log( newImgURL );

    $image
     .cropper('destroy')//销毁旧的裁剪区域
     .attr('src',newImgURL)//重新设置图片的路径
     .cropper(options);//重新初始化裁剪区域
    //  console.log( $image );
    // k.fn.init [img#image] 打印的结果
});

// 上传头像
$('#sureBtn').click(function() {
    let dataURL = $image 
    .cropper('getCroppedCanvas',{
        // 创建一个画布
        width:100,
        height:100,
    })
    .toDataURL('image/png'); //canvas 画布上的内容  转化为base64 格式的字符串

    // 发送ajxa 请i去
    $.ajax({
        type:'POST',
        url:'/my/update/avatar',
        data: {
            avatar:dataURL,
        },
        success:function(res) {
         console.log( res );

         if ( res.status !== 0 ) {
             return layer.msg('更换头像失败');
         }

            layer.msg('更换头像成功');

            // 调用父页面（index）函数  从而更新导航和侧边栏头像
            window.parent.getAvatarAndName();
      },
    });
  });
});











