;(function(root, Framework){
    'use strict';

    // 静态的编译函数
    Framework.staticTags = {
        header: function (elem) {
            return '<header class="page-header">' + elem.innerHTML + '</header>';
        },
        footer: function (elem) {
            return '<footer class="page-footer">' + elem.innerHTML + '</footer>';
        },
    }

})(window, window.UED)
