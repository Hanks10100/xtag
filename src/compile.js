;(function(root, Framework){
    'use strict';

    var TAG_PREFIX = 'X-';
    var CUSTOM_TAGS = ['Tabs', 'Select', 'Table', 'Datetimepicker', 'Switcher', 'Checkbox'];

    function compile(env) {
        if (!env) env = root;
        _.each(CUSTOM_TAGS, function(tagName) {
            _.each(env.$(TAG_PREFIX + tagName), function(elem) {
                if (_.isFunction(Framework[tagName])) {

                    var widget = convert({
                        type: tagName,
                        options: parseOption(elem, env)
                    });

                    widget.$el.attr('data-via', 'compiled');
                    var name = elem.getAttribute('name');
                    if (name && _.isString(name)) {
                        env[name] = widget;
                        env['$' + name] = widget.$el;
                    }

                    mount(elem, widget);
                }
            });
        });
    }

    // 将虚拟 DOM 转换成组件对象
    function convert(vdom) {
        // TODO: 判断 vdom 格式，支持 React/Deku 等框架
        return new Framework[vdom.type](vdom.options, vdom.configs);
    }

    // 将组件实例挂载到 DOM 节点上
    function mount(element, widget) {
        if (_.isElement(element) && _.isElement(widget.el)) {
            element.parentNode.replaceChild(widget.el, element);
            _.isFunction(widget.afterMount) && widget.afterMount();
        }
    }

    function parseOption(elem, env) {
        var options = {};
        _.each(elem.attributes, function(attr) {
            if (attr.nodeType !== 2) return;

            var value = attr.nodeValue;
            if (_.isFunction(env[value])) value = env[value]();

            if (attr.nodeName === 'options') {
                _.extend(options, value);
            } else {
                options[attr.nodeName] = value;
            }
        });
        options.children = _.toArray(elem.children);
        return options;
    }

    Framework.tags = CUSTOM_TAGS;
    if (Object.freeze) Object.freeze(Framework.tags);

    Framework.compile = compile;
})(window, window.XXX)
