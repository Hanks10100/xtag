import utils from './shared/utils';
import mixins from './shared/mixins';
import components from './components/index';

export function compile(scope = {}) {
    var elements = scope.el || document.getElementsByTagName('body');
    compileElement(elements, scope);
    scope.el = elements;
    return scope;
}

function shouldCompile(element) {
    return /^[xv][\-\:]\w+$/i.test(element.tagName);
}

export function compileElement(element, scope) {
    const elements = _.isElement(element) ? [element] : _.toArray(element);

    elements.forEach(elem => {
        if (!_.isElement(elem)) return;

        if (shouldCompile(elem)) {
            let widget = convert(parse(elem, scope));

            if (widget) {
                widget.$el.attr('data-via', 'compiled');
                let name = elem.getAttribute('name');
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
export function convert({ type, options, configs }) {
    // TODO: 判断 vdom 格式，支持 React/Deku 等框架
    if (_.isString(type)) {
        if (_.isFunction(components[type])) {
            return new components[type](options, configs);
        }
    } else if (_.isFunction(type)) {
        if (utils.isBackboneView(type)) {
            return new type(options, configs);
        }
    }
}

// 将组件实例挂载到 DOM 节点上
export function mount(element, widget = {}) {
    if (_.isElement(element) && _.isElement(widget.el)) {
        element.parentNode.replaceChild(widget.el, element);

        if (window.Backbone && widget instanceof window.Backbone.View) {
            widget.render();
        } else if (_.isFunction(widget.afterMount)) {
            widget.afterMount();
        }
    }
}

// 解析标签元素，转为 vdom
export function parse(element, scope = {}) {
    const res = element.tagName.toLowerCase().match(/(\w+)[\-\:](\w+)/i);
    const namespace = res[1];
    let type = res[2];

    switch (namespace) {
        case 'v': if (scope.viewTags) type = scope.viewTags[type];  break;
        case 'x': type = type.replace(/^\S/, s => s.toUpperCase()); break;
        default : type = '?' + type;
    }

    return {
        type,
        options: parseOption(element, scope),
        configs: { scope }
    };
}

function parseOption(element, scope = {}) {
    const options = {};
    if (!_.isElement(element)) return options;

    _.each(element.attributes, attr => {
        if (attr.nodeType !== 2) return;

        let value = attr.nodeValue;
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
