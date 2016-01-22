;(function(root){
    'use strict';

    // 日期选择插件的构造函数
    function SwitchButton(options) {
        this.$el = $('<div class="switch-container"></div>');
        var $label = $('<label class="switch-label"></label>');

        this.$el.html($label);
    }

    root.SwitchButton = SwitchButton;
})(window)
