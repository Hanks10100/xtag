;(function(root, Framework){
    'use strict';

    var TAG_PREFIX = 'X-';
    var CUSTOM_TAGS = ['Tabs', 'Select', 'Table', 'Datetimepicker', 'Switcher', 'Checkbox'];

    function compile(env) {
        var scope = env || {};
        var elements = scope.el || document.getElementsByTagName('body')[0];
        compileElement(elements, scope);
        return scope;
    }

    function shouldCompile(element) {
        return /[xv][\-\:]/i.test(element.tagName);
    }

    function compileElement(element, scope) {
        var elements = [];
        if (_.isElement(element)) {
            elements.push(element);
        } else {
            elements = _.toArray(element);
        }

        _.each(elements, function(elem) {
            if (!_.isElement(elem)) return;

            if (shouldCompile(elem)) {
                var widget = convert(parse(elem, scope));

                widget.$el.attr('data-via', 'compiled');
                var name = elem.getAttribute('name');
                if (name && _.isString(name)) {
                    scope[name] = widget;
                    scope['$' + name] = widget.$el;
                }

                mount(elem, widget);
            } else {
                compileElement(_.toArray(elem.children), scope);
            }
        });

        return elements;
    }

    // 将虚拟 DOM 转换成组件对象
    function convert(vdom) {
        // TODO: 判断 vdom 格式，支持 React/Deku 等框架
        var type = vdom.type;
        if (_.isString(type)) {
            return new Framework[vdom.type](vdom.options, vdom.configs);
        } else if (_.isFunction(type)) {
            if (root.Backbone && type.prototype instanceof root.Backbone.View) {
                return new type(vdom.options, vdom.configs);
            }
        }
    }

    // 将组件实例挂载到 DOM 节点上
    function mount(element, widget) {
        if (_.isElement(element) && _.isElement(widget.el)) {
            element.parentNode.replaceChild(widget.el, element);

            if (root.Backbone && widget instanceof root.Backbone.View) {
                widget.render();
            } else if (_.isFunction(widget.afterMount)) {
                widget.afterMount();
            }
        }
    }

    // 解析标签元素，转为 vdom
    function parse(element, scope) {
        var tagName = element.tagName.toLowerCase();
        var tags = tagName.split('-');
        var namespace = _.first(tags);
        var type = _.last(tags);

        if (namespace === 'v' && scope.viewTags) {
            // TODO: 在 scope 中找到相应的视图构造函数，使其支持 Backbone 的 View
            type = scope.viewTags[type];
        } else if (namespace === 'x') {
            // 将首字母转成大写，其他字母均为小写（待修改）
            type = type.replace(/^\S/, function(s){return s.toUpperCase()});
        }

        return {
            type: type,
            options: parseOption(element, scope),
            configs: { scope: scope }
        };
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
    Framework.compileElement = compileElement;
})(window, window.XXX)
