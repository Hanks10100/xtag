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
        setAvailable: function(value) {
            this.$el.toggleClass('disabled', !value);
            this.$input.prop('disabled', !value);
            return this;
        },
        setValue: function(value) {
            this.isEnabled() && this.$input.prop('checked', !!value);
            return this;
        },
        isEnabled:    function() { return this.$input.is(':enabled'); },
        isChecked:    function() { return this.$input.is(':checked'); },
        enable:       function() { return this.setAvailable(true); },
        disable:      function() { return this.setAvailable(false); },
        check:        function() { return this.setValue(true);  },
        uncheck:      function() { return this.setValue(false); },
        toggle:       function() { return this.setValue(!this.isChecked()); },
        toggleEnable: function() { return this.setAvailable(!this.isEnabled()); },
    }

    _.extend(SwitchButton.prototype, protoMixin);
    _.extend(Checkbox.prototype, protoMixin);

    SwitchButton.prototype.value =Checkbox.prototype.value =  protoMixin.isChecked;

    root.Checkbox = Checkbox;
    root.SwitchButton = SwitchButton;
})(window)
