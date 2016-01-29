;(function(root, Framework){
    'use strict';

    // 日期选择插件的构造函数
    function Datetimepicker(options) {
        this.options = options || {};
        this.$el = $('<div class="input-group"></div>').attr('data-type', this.type);
        this.$input = $('<input type="text" class="form-control">');
        this.$el.html(this.$input);
        this.el = this.$el[0];
        this.mapMethods();
    }

    _.extend(Datetimepicker.prototype, {
        type: 'Datetimepicker',
        mapMethods: function() {
            var self = this;
            var $picker = this.$input;
            var methods = [
                'destroy', 'disable', 'enable', 'getDate', 'setDate', 'hide', 'show',
                'value', 'setEndDate', 'setStartDate', 'option', 'setDatesDisabled',
                'widget', 'setDaysOfWeekDisabled', 'setDaysOfWeekHighlighted'
            ];
            _.each(methods, function(method) {
                self[method] = _.bind($picker.datetimepicker, $picker, method);
            });
        },
        afterMount: function() {
            this.$input.datetimepicker(this.options);
        }
    });

    Framework.Datetimepicker = Datetimepicker;
})(window, window.XTag)
