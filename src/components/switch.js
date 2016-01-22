;(function(root){
    'use strict';

    // 日期选择插件的构造函数
    function SwitchButton(options) {
        this.$el = $('<label class="switch">')
            .append($('<input type="checkbox" checked="checked">'))
            .append($('<span></span>'));
    }

    root.SwitchButton = SwitchButton;
})(window)
