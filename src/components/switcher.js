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
    initialize: function(options = {}) {
        this.defineShadowValue('value', {
            get: function() { return this.isChecked(); },
            set: function(value) { this.setValue(value); return value; }
        });
        return this;
    },

    initElement: function(options = {}) {
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

    onChange: function(callback) {
        if (!_.isFunction(callback)) return this;
        this.$input.on('change', _.bind(callback, this));
        return this;
    },

    // 若 silent 为 true ，则不会触发 onChange 事件
    setValue: function(value, silent = false) {
        if (!this.isEnabled()) return this;

        var oldValue = this.isChecked();
        if (!!value !== oldValue) {
            this.$input.prop('checked', !!value);
            silent || this.$input.trigger('change');
        }
        return this;
    },

    check:     function() { return this.setValue(true);  },
    uncheck:   function() { return this.setValue(false); },
    toggle:    function() { return this.setValue(!this.isChecked()); },
    isChecked: function() { return this.$input.is(':checked'); },

    // 使当前组件可以和其他组件保持一致
    consistentWith: function(twin, silent = false) {
        if ((twin instanceof Switcher) || (twin instanceof Checkbox)) {
            var self = this;
            this.onChange(function() { twin.setValue(self.value, !!silent) });
            twin.onChange(function() { self.setValue(twin.value, !!silent) });
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

