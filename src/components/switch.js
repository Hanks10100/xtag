;(function(root){
    'use strict';

    // 日期选择插件的构造函数
    function SwitchButton(options) {
        this.$input = $('<input type="checkbox">');
        this.$el = $('<label class="switch">')
            .append(this.$input)
            .append($('<span></span>'));
    }

    _.extend(SwitchButton.prototype, {
        isChecked: function() {
            return this.$input.is(':checked');
        },
    });

    root.SwitchButton = SwitchButton;
})(window)
