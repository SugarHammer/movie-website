// 1. 获取元素
var box = document.querySelector('.box');
var mask = document.querySelector('.box-bg');
var link = document.querySelector('#link');
var closeBtn = document.querySelector('#closeBtn');
var title = document.querySelector('#title');
// 2. 点击弹出层这个链接 link  让mask 和login 显示出来
link.addEventListener('click', function () {
    mask.style.display = 'block';
    box.style.display = 'block';
})
// 3. 点击 closeBtn 就隐藏 mask 和 login
closeBtn.addEventListener('click', function () {
    mask.style.display = 'none';
    box.style.display = 'none';
})
// 4. 开始拖拽
// (1) 当我们鼠标按下， 就获得鼠标在盒子内的坐标
title.addEventListener('mousedown', function (e) {
    var x = e.pageX - box.offsetLeft;
    var y = e.pageY - box.offsetTop;
    // (2) 鼠标移动的时候，把鼠标在页面中的坐标，减去 鼠标在盒子内的坐标就是模态框的left和top值
    document.addEventListener('mousemove', move)

    function move(e) {
        box.style.left = e.pageX - x + 'px';
        box.style.top = e.pageY - y + 'px';
        console.log(box.style.left);

    }

    // (3) 鼠标弹起，就让鼠标移动事件移除
    document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', move);
    })
})
var toParentData = '';
$(window).on("load", function () {
    var options = {
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: ''
    }
    var cropper = $('.imageBox').cropbox(options);
    $('#upload-file').on('change', function () {
        var reader = new FileReader();
        reader.onload = function (e) {
            options.imgSrc = e.target.result;
            cropper = $('.imageBox').cropbox(options);
        }
        reader.readAsDataURL(this.files[0]);
        this.files = [];
        // this.files = emptyFileUpload($('#upload-file'));
    })

    // 清空文件上传控件
// 不能直接用js修改input type=file的value，但可以通过form的reset()清空它的值
// 解决：将input type=file放进一个临时form，清空value,再将它移到原来位置

// 以下为methods中的方法
    function emptyFileUpload(selector) {
        var fi;
        var sourceParent;
        if (selector) {
            fi = $(selector);
            sourceParent = fi.parent();
        } else {
            return;
        }
        $('<form class="action" action="uploadFile" method="post" enctype="multipartform-data"></form>').appendTo(".container");
        var tempForm = $("#upload-file");
        tempForm.append(fi);
        if (tempForm != "") {
            tempForm.get(0).reset();
        }
        sourceParent.append(fi);
        tempForm.remove();
    }

    $('#btnCrop').on('click', function () {
        var img = cropper.getDataURL();
        toParentData = cropper.getDataURL();
        $('.cropped').html('');
        $('.cropped').append('<img src="' + img +
            '" align="middle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>'
        );
        // $("#avatar_img").attr("src", img);
    })
    $('#btnZoomIn').on('click', function () {
        cropper.zoomIn();
    })
    $('#btnZoomOut').on('click', function () {
        cropper.zoomOut();
    })
});

function getBase64() {
    return toParentData;
}