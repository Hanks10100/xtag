;(function(root, Framework){
    'use strict';

    // Switcher 按钮
    function Switcher() {
        this.className = 'switch';
        this.initialize.apply(this, arguments);
        this.initElement.apply(this, arguments);
    }

    // 复选框
    function Checkbox() {
        this.className = 'i-checks';
        this.initialize.apply(this, arguments);
        this.initElement.apply(this, arguments);
    }

    // Switcher 和 Checkbox 公用的原型
    var proto = {
        initialize: function(options) {
            this.defineShadowValue('value', {
                get: function() { return this.isChecked(); },
                set: function(value) { this.setValue(value); return value; }
            });
            return this;
        },

        initElement: function(options) {
            options || (options = {});
            this.setShadowValue('value', !!options.checked);
            this.$input = $('<input type="checkbox">').prop('checked', !!options.checked);
            this.$el = $('<label></label>')
                .addClass(this.className)
                .append(this.$input)
                .append('<span></span>');
            return this.$el;
        },

        onChange: function(callback) {
            if (!_.isFunction(callback)) return this;
            this.$input.on('change', _.bind(callback, this));
            return this;
        },

        // 若 silent 为 true ，则不会触发 onChange 事件
        setValue: function(value, silent) {
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
    };

    // 添加启用和禁用功能
    _.extend(proto, Framework.mixins.authorize);

    // 添加 getter/setter 相关功能
    _.extend(proto, Framework.mixins.shadow);

    _.extend(Switcher.prototype, proto, { type: 'Switcher' });
    _.extend(Checkbox.prototype, proto, { type: 'Checkbox' });

    Framework.Checkbox = Checkbox;
    Framework.Switcher = Switcher;
})(window, window.XXX)
