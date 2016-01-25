;(function(root, Framework){
    'use strict';

    // 与“启用”、“禁用” 相关的 函数
    var availableMixin = {
        setAvailable: function(value) {
            this.$el.toggleClass('disabled', !value);
            this.$input && this.$input.prop('disabled', !value);
            return this;
        },
        isEnabled: function() {
            if (this.$input) return this.$input.is(':enabled');
            return !this.$el.hasClass('disabled');
        },
        enable:       function() { return this.setAvailable(true); },
        disable:      function() { return this.setAvailable(false); },
        toggleEnable: function() { return this.setAvailable(!this.isEnabled()); },
    };

    // 实现 getter/setter 相关的功能
    var KEY = '[[__SHADOW_OBJECT__]]';
    var shadowMixin = {
        hasShadowObject: function() {
            return !!this[KEY];
        },
        createShadowObject: function() {
            if (!this.hasShadowObject()) {
                try {
                    Object.defineProperty(this, KEY, {
                        writable: true,
                        value: Object.create(null),
                    });
                } catch (e) {}
            }
            return this;
        },
        defineShadowValues: function(options) {
            // TODO: 校验参数
            var self = this;
            _.each(options, function(option, name) {
                self.defineShadowValue(name, option)
            });
            return this;
        },
        defineShadowValue: function(name, option) {
            var opt = _.pick(option, 'get', 'set', 'defaultValue');

            if (!_.isFunction(opt.get)) {
                opt.get = function() { return this[KEY][name]; }
            }
            if (!_.isFunction(opt.set)) {
                opt.set = function(value) { return this[KEY][name] = value; }
            }

            this.createShadowObject();

            try {
                this[KEY][name] = opt.defaultValue || null;
                Object.defineProperty(this, name, {
                    get: _.bind(opt.get, this),
                    set: function() {
                        this[KEY][name] = opt.set.apply(this, arguments);
                    }
                });
            } catch (e) {
                this[name] = opt.defaultValue || null;
            }
            return this;
        },
        setShadowValue: function(name, value) {
            if (this.hasShadowObject()) {
                this[KEY][name] = value;
            } else {
                this[name] = value;
            }
            return this;
        },
    }

    Framework.mixins = {
        availableMixin: availableMixin,
        shadowMixin: shadowMixin,
    };

})(window, window.UED)
