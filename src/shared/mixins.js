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

    var observerMixin = {
        createObserver: function(dom, config, manager) {
            if ($ && dom instanceof $) dom = dom[0];
            if (!manager || !_.isFunction(manager)) {
                throw new TypeError('`manager` must be a function');
            }

            try {
                var MutationObserver = MutationObserver || WebKitMutationObserver || MozMutationObserver;
                if (!MutationObserver) return null;
                var observer = new MutationObserver(manager);
                observer.observe(dom, config);

                this._observers = this._observers || [];
                this._observers.push(observer);
            } catch (e) {
                return null;
            }
        },

        // 仅监听 attributes 的变化
        observeAttributes: function(dom, manager) {
            var self = this;
            this.createObserver(dom, { attributes: true, attributeOldValue: true }, function(mutations) {
                _.each(mutations, function(record) {
                    if (record.type === 'attributes') {
                        return manager.call(self, record.attributeName, record, record.oldValue);
                    }
                });
            })
        },
    };

    Framework.mixins = {
        availableMixin: availableMixin,
        shadowMixin: shadowMixin,
        observerMixin: observerMixin,
    };

})(window, window.XXX)
