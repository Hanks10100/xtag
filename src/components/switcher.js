;(function(root, Framework){
    'use strict';

    // Toggle 按钮
    function Switcher(options) {
        options || (options = {});
        this.$input = $('<input type="checkbox">').prop('checked', !!options.checked);
        this.$el = $('<label class="switch">')
            .append(this.$input)
            .append('<span></span>');

        try {
            Object.defineProperty(this, 'value', {
                get: function() { return this.isChecked(); },
                set: function(value) { this.setValue(value); }
            });
        } catch (e) {}
    }

    function Checkbox(options) {
        options || (options = {});
        this.$input = $('<input type="checkbox">').prop('checked', !!options.checked);
        this.$el = $('<label class="i-checks">')
            .append(this.$input)
            .append('<span></span>');

        try {
            Object.defineProperty(this, 'value', {
                get: function() { return this.isChecked(); },
                set: function(value) { this.setValue(value); }
            });
        } catch (e) {}
    }

    var protoMixin = {
        onChange: function(callback) {
            if (!_.isFunction(callback)) return this;
            this.$input.on('change', _.bind(callback, this));
            return this;
        },
        setValue: function(value) {
            if (!this.isEnabled()) return this;
            var oldValue = this.isChecked();
            if (!!value !== oldValue) {
                this.$input.prop('checked', !!value);
                this.$input.trigger('change');
            }
            return this;
        },
        isChecked:    function() { return this.$input.is(':checked'); },
        check:        function() { return this.setValue(true);  },
        uncheck:      function() { return this.setValue(false); },
        toggle:       function() { return this.setValue(!this.isChecked()); },
    }

    _.extend(Switcher.prototype, protoMixin, {
        type: 'Switcher',
    }, Framework.mixins.availableMixin);

    _.extend(Checkbox.prototype, protoMixin, {
        type: 'Checkbox',
    }, Framework.mixins.availableMixin);

    Switcher.prototype.value = Checkbox.prototype.value = protoMixin.isChecked;

    Framework.Checkbox = Checkbox;
    Framework.Switcher = Switcher;
})(window, window.UED)
