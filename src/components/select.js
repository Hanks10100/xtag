;(function(root, Framework){
    'use strict';

    // 日期选择插件的构造函数
    function Select(options) {
        var self = this;
        this.$select = $('<select></select>');
        this.$option = [];

        _.each(options.children, function(child) {
            // console.dir(child);
            self.$option.push(
                $('<option></option>')
                    .attr('value', child.getAttribute('value'))
                    .html(child.innerHTML)
            );
        });

        this.$select.append(this.$option);
        this.$el = this.$select;
    }

    Framework.Select = Select;
})(window, window.UED)
