;(function(root){
    'use strict';

    // 日期选择插件的构造函数
    function SwitchButton(options) {
        this.$input = $('<input type="checkbox">').prop('checked', !!options.checked);
        this.$el = $('<label class="switch">')
            .append(this.$input)
            .append('<span></span>');
    }

    _.extend(SwitchButton.prototype, {
        on: function() {
            this.$input.on.apply(this.$input, arguments);
            return this;
        },
        onChange: function(callback) {
            if (!_.isFunction(callback)) return this;
            this.$input.on('change', _.bind(callback, this));
            return this;
        },
        enable: function() {
            this.$el.addClass('enabled').removeClass('disabled');
            this.$input.prop('disabled', false);
            return this;
        },
        disable: function() {
            this.$el.addClass('disabled').removeClass('enabled');
            this.$input.prop('disabled', true);
            return this;
        },
        isEnabled: function() {
            return this.$input.is(':enabled');
        },
        isChecked: function() {
            return this.$input.is(':checked');
        },
        setValue: function(value) {
            this.$input.prop('checked', !!value);
            return this;
        },
        check: function() {
            return this.setValue(true);
        },
        uncheck: function() {
            return this.setValue(false);
        },
        toggle: function() {
            return this.setValue(!this.isChecked());
        },
    });

    root.SwitchButton = SwitchButton;
})(window)
