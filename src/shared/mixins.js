
// 自定义事件的 mixin
const events = _.extend({
    onChange(callback) {
        _.isFunction(callback) && this.on('change', callback.bind(this));
        return this;
    },
}, Backbone.Events);


// 与“启用”、“禁用” 相关的 函数
const authorize = {
    setAvailable(value) {
        this.$el.toggleClass('disabled', !value);
        this.$input && this.$input.prop('disabled', !value);
        return this;
    },
    isEnabled() {
        if (this.$input) return this.$input.is(':enabled');
        return !this.$el.hasClass('disabled');
    },
    enable()       { return this.setAvailable(true);  },
    disable()      { return this.setAvailable(false); },
    toggleEnable() { return this.setAvailable(!this.isEnabled()); },
}

// 实现 getter/setter 相关的功能
const KEY = '[[__SHADOW_OBJECT__]]';
const shadow = {
    hasShadowObject() {
        return !!this[KEY];
    },
    createShadowObject() {
        if (!this.hasShadowObject()) {
            try {
                Object.defineProperty(this, KEY, { value: Object.create(null) });
            } catch (e) {}
        }
        return this;
    },
    defineShadowValues(options = []) {
        _.each(options, (option, name) => this.defineShadowValue(name, option));
        return this;
    },
    defineShadowValue(name, option = {}) {
        var opt = _.pick(option, 'get', 'set', 'defaultValue');

        if (!_.isFunction(opt.get)) {
            opt.get = () => this[KEY][name];
        }
        if (!_.isFunction(opt.set)) {
            opt.set = value => this[KEY][name] = value;
        }

        this.createShadowObject();

        try {
            this[KEY][name] = opt.defaultValue || null;
            Object.defineProperty(this, name, {
                get: opt.get.bind(this),
                set() { this[KEY][name] = opt.set(...arguments) }
            });
        } catch (e) {
            this[name] = opt.defaultValue || null;
        }
        return this;
    },
    setShadowValue(name, value) {
        if (this.hasShadowObject()) {
            this[KEY][name] = value;
        } else {
            this[name] = value;
        }
        return this;
    },
}

const observer = {
    createObserver(dom, config, manager) {
        if ($ && dom instanceof $) dom = dom[0];
        if (!manager || !_.isFunction(manager)) {
            throw new TypeError('`manager` must be a function');
        }

        try {
            const MutationObserver = window.MutationObserver
                || window.WebKitMutationObserver
                || window.MozMutationObserver;
            if (!MutationObserver) return null;

            const ob = new MutationObserver(manager);
            ob.observe(dom, config);

            if (!this._observers) {
                Object.defineProperty(this, '_observers', { value: [] });
            }

            this._observers.push(ob);
        } catch (e) {
            return null;
        }
    },

    // 仅监听 attributes 的变化
    observeAttributes(dom, filter, manager) {
        const args = _.toArray(arguments);

        // 使支持缺省参数值
        // 参数长度 1: manager
        // 参数长度 2: dom 或 filter, manager
        // 参数长度 3: dom, filter, manager
        if (!_.isElement(args[0]) && !(args[0] instanceof $)) dom = this.$el[0];

        if (_.isFunction(args[0])) {
            manager = args[0];
        } else if (_.isFunction(args[1])) {
            _.isArray(args[0]) ? (filter = args[0]) : (dom = args[0]);
            manager = args[1];
        }

        const config = {
            attributes: true,
            attributeOldValue: true,
            attributeFilter: filter
        }
        this.createObserver(dom, config, mutations => {
            _.each(mutations, record => {
                if (record.type !== 'attributes') return;
                manager.call(this, record.attributeName, record, record.oldValue);
            });
        });
        return this;
    },

    // 仅监听子节点的变化
    observeChildList(dom, manager) {
        if (_.isFunction(arguments[0])) {
            dom = this.$el[0];
            manager = arguments[0];
        }

        this.createObserver(dom, { childList: true }, mutations => {
            _.each(mutations, record => {
                if (record.type !== 'childList') return;
                manager.call(this, record);
            });
        });
        return this;
    },

    disconnectObserver() {
        _.each(this._observers, ob => ob.disconnect());
        return this;
    },
}

export default {
    events,
    authorize,
    shadow,
    observer,
}
