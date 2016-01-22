;(function(root){
    'use strict';

    // Toggle 按钮
    function SwitchButton(options) {
        this.$input = $('<input type="checkbox">').prop('checked', !!options.checked);
        this.$el = $('<label class="switch">')
            .append(this.$input)
            .append('<span></span>');
    }

    function Checkbox(options) {
        this.$input = $('<input type="checkbox">').prop('checked', !!options.checked);
        this.$el = $('<label class="i-checks">')
            .append(this.$input)
            .append('<span></span>');
    }

    var protoMixin = {
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
        setValue: function(value) {
            this.$input.prop('checked', !!value);
            return this;
        },

        isEnabled: function() { return this.$input.is(':enabled'); },
        isChecked: function() { return this.$input.is(':checked'); },
        check:     function() { return this.setValue(true);  },
        uncheck:   function() { return this.setValue(false); },
        toggle:    function() { return this.setValue(!this.isChecked()); },
    }

    _.extend(SwitchButton.prototype, protoMixin);
    _.extend(Checkbox.prototype, protoMixin);

    root.Checkbox = Checkbox;
    root.SwitchButton = SwitchButton;
})(window)
