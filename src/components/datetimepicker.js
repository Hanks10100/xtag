;(function(root, Framework){
    'use strict';

    // 日期选择插件的构造函数
    function Datetimepicker(options) {
        this.$el = $('<div class="input-group"></div>');
        var $input = $('<input type="text" class="form-control">');

        this.$el.html($input);
    }

    Framework.Datetimepicker = Datetimepicker;
})(window, window.UED)
