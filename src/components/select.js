;(function(root, Framework){
    'use strict';

    // 日期选择插件的构造函数
    function Select(options) {
        this.$el = $('<select></select>');
    }

    Framework.Select = Select;
})(window, window.UED)
