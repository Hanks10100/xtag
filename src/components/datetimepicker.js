import mixins from '../shared/mixins';


// 日期选择插件的构造函数
export class Datetimepicker {
    constructor(options) {
        this.options = options || {};
        this.$el = $('<div class="input-group"></div>').attr('data-type', this.type);
        this.$input = $('<input type="text" class="form-control">');
        this.$el.html(this.$input);
        this.el = this.$el[0];
        this.mapMethods();
    }

    mapMethods() {
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
    }

    afterMount() {
        this.$input.datetimepicker(this.options);
    }
}

Datetimepicker.prototype.type = 'Datetimepicker';
