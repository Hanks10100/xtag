;(function(root, Framework){
    'use strict';

    function compile(context) {
        var scope = context || {};
        var elements = scope.el || document.getElementsByTagName('body');
        compileElement(elements, scope);
        scope.el = elements;
        return scope;
    }

    function shouldCompile(element) {
        return /^[xv][\-\:]\w+$/i.test(element.tagName);
    }

    function compileElement(element, scope) {
        var elements = _.isElement(element) ? [element] : _.toArray(element);

        _.each(elements, function(elem) {
            if (!_.isElement(elem)) return;

            if (shouldCompile(elem)) {
                var widget = convert(parse(elem, scope));

                if (widget) {
                    widget.$el.attr('data-via', 'compiled');
                    var name = elem.getAttribute('name');
                    if (name && _.isString(name)) {
                        scope[name] = widget;
                        scope['$' + name] = widget.$el;
                    }

                    mount(elem, widget);
                }
            } else {
                compileElement(elem.children, scope);
            }
        });

        return elements;
    }

    // 将虚拟 DOM 转换成组件对象
    function convert(vdom) {
        // TODO: 判断 vdom 格式，支持 React/Deku 等框架
        var type = vdom.type;
        if (_.isString(type)) {
            if (_.isFunction(Framework[type])) {
                return new Framework[type](vdom.options, vdom.configs);
            }
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
        var res = element.tagName.toLowerCase().match(/(\w+)[\-\:](\w+)/i);
        var namespace = res[1];
        var type = res[2];

        if (namespace === 'v' && scope.viewTags) {
            // TODO: 在 scope 中找到相应的视图构造函数，使其支持 Backbone 的 View
            type = scope.viewTags[type];
        } else if (namespace === 'x') {
            // 将首字母转成大写，其他字母均为小写（待修改）
            type = type.replace(/^\S/, function(s){return s.toUpperCase()});
        } else {
            type = '?' + type;
        }

        return {
            type: type,
            options: parseOption(element, scope),
            configs: { scope: scope }
        };
    }

    function parseOption(element, scope) {
        var options = {};
        _.each(element.attributes, function(attr) {
            if (attr.nodeType !== 2) return;

            var value = attr.nodeValue;
            if (_.isFunction(scope[value])) value = scope[value]();

            if (attr.nodeName === 'options') {
                _.extend(options, value);
            } else {
                options[attr.nodeName] = value;
            }
        });
        options.children = _.toArray(element.children);
        return options;
    }

    Framework.compile = compile;
    Framework.compileElement = compileElement;
})(window, window.XTag)
