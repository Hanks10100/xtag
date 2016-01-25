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
                } catch (e) {
                    this[key] = {};
                }
            }
        },
        defineShadowValue: function(name, option) {
            // TODO: 校验参数
            var opt = _.pick(option, 'get', 'set');

            this[KEY][name] = opt.get.call(this);

            try {
                Object.defineProperty(this, name, {
                    get: function() {
                        if (_.isFunction(opt.get)) {
                            return opt.get.call(this);
                        } else {
                            return this[KEY][name];
                        }
                    },
                    set: function() {
                        this[KEY][name] = opt.set.apply(this, arguments);
                    }
                });
            } catch (e) {}
        },
        setShadowValue: function(name, value) {
            if (this.hasShadowObject()) {
                this[KEY][name] = value;
            } else {
                this[name] = value;
            }
        },
    }

    Framework.mixins = {
        availableMixin: availableMixin,
        shadowMixin: shadowMixin,
    };

})(window, window.UED)
