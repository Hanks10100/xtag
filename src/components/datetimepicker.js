import mixins from '../shared/mixins';


// 日期选择插件的构造函数
export class Datetimepicker {
    constructor(options = {}) {
        this._options = options;
        this.$el = $('<div class="input-group"></div>').attr('data-type', this.type);
        this.$input = $('<input type="text" class="form-control">');
        this.$el.html(this.$input);
        this.el = this.$el[0];
        this.mapMethods();
    }

    mapMethods() {
        const $picker = this.$input;
        const methods = [
            'destroy', 'disable', 'enable', 'getDate', 'setDate', 'hide', 'show',
            'value', 'setEndDate', 'setStartDate', 'option', 'setDatesDisabled',
            'widget', 'setDaysOfWeekDisabled', 'setDaysOfWeekHighlighted'
        ];
        _.each(methods, method => this[method] = $picker.datetimepicker.bind($picker, method));
    }

    afterMount() {
        this.$input.datetimepicker(this._options);
    }
}

Datetimepicker.prototype.type = 'Datetimepicker';
