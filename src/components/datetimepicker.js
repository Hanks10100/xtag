;(function(root, Framework){
    'use strict';

    // 日期选择插件的构造函数
    function Datetimepicker(options) {
        this.$el = $('<div class="input-group"></div>').attr('data-type', this.type);
        this.$input = $('<input type="text" class="form-control">');
        this.$el.html(this.$input);
        this.el = this.$el[0];
    }

    _.extend(Datetimepicker.prototype, {
        type: 'Datetimepicker',
        afterMount: function() {
            this.$input.datetimepicker();
        }
    });

    Framework.Datetimepicker = Datetimepicker;
})(window, window.XTag)
