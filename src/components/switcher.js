import mixins from '../shared/mixins';

// Switcher 按钮
export class Switcher {
    constructor() {
        this.className = 'switch';
        this.initialize(...arguments);
        this.initElement(...arguments);
    }
}

// 复选框
export class Checkbox {
    constructor() {
        this.className = 'i-checks';
        this.initialize(...arguments);
        this.initElement(...arguments);
    }
}

// Switcher 和 Checkbox 公用的原型
const proto = {
    initialize(options = {}) {
        this.defineShadowValue('value', {
            get: () => this.isChecked(),
            set: value => { this.setValue(value); return value; }
        });
        return this;
    },

    initElement(options = {}) {
        this.setShadowValue('value', !!options.checked);
        this.$input = $('<input type="checkbox">').prop('checked', !!options.checked);
        this.$el = $('<label></label>')
            .attr('data-type', this.type)
            .addClass(this.className)
            .append(this.$input)
            .append('<span></span>');

        this.el = this.$el[0];
        return this.$el;
    },

    onChange(callback) {
        _.isFunction(callback) && this.$input.on('change', callback.bind(this));
        return this;
    },

    // 若 silent 为 true ，则不会触发 onChange 事件
    setValue(value, silent = false) {
        if (!this.isEnabled()) return this;

        const oldValue = this.isChecked();
        if (!!value !== oldValue) {
            this.$input.prop('checked', !!value);
            silent || this.$input.trigger('change');
        }
        return this;
    },

    check()     { return this.setValue(true);  },
    uncheck()   { return this.setValue(false); },
    toggle()    { return this.setValue(!this.isChecked()); },
    isChecked() { return this.$input.is(':checked'); },

    // 使当前组件可以和其他组件保持一致
    consistentWith(twin, silent = false) {
        if ((twin instanceof Switcher) || (twin instanceof Checkbox)) {
            this.onChange(() => twin.setValue(this.value, !!silent));
            twin.onChange(() => this.setValue(twin.value, !!silent));
        }
        return this;
    },
};

// 添加启用和禁用功能
_.extend(proto, mixins.authorize);

// 添加 getter/setter 相关功能
_.extend(proto, mixins.shadow);

_.extend(Switcher.prototype, proto, { type: 'Switcher' });
_.extend(Checkbox.prototype, proto, { type: 'Checkbox' });

