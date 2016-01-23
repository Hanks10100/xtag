;(function(root, Framework){
    'use strict';

    // 日期选择插件的构造函数
    function Select(options) {
        var self = this;
        this.$el = $('<div class="input-group ui-combobox"></div>');
        this.$select = $('<select></select>');
        this.$option = $('<ul class="dropdown-list"></ul>');

        _.each(options.children, function(child) {
            // console.dir(child);
            self.$option.append(
                $('<li></li>')
                    .attr('value', child.getAttribute('value'))
                    .html(child.innerHTML)
            );
        });


        // 模拟 Fish Combobox 组件的 DOM 结构
        this.$el.append(
            $('<input type="text" autocomplete="off" class="form-control">'),
            $('<span class="input-group-addon clear-input-icon-right"></span>')
                .append('<span class="glyphicon glyphicon-triangle-bottom"></span>')
        );
        this.$el.append(this.$option);
    }

    Framework.Select = Select;
})(window, window.UED)
