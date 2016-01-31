
// 判断 View 是不是 Backbone 的视图
function isBackboneView(View) {
    return _.isFunction(View)
        && window.Backbone
        && View.prototype === window.Backbone.View
        || View.prototype instanceof window.Backbone.View
}

// 判断 View 是不是 Backbone 视图创建的实例
function isBackboneInstance(view) {
    return _.isObject(view)
        && window.Backbone
        && view instanceof window.Backbone.View
}

function isReactComponent(Component) {
    return _.isFunction(Component)
        && window.React
        && Component.prototype instanceof window.React.Component
}

function isReactElement(element) {
    return window.React && window.React.isValidElement(element)
}

// 判断元素是否需要编译
function shouldCompile(element) {
    return /^[xv][\-\:]\w+$/i.test(element.tagName);
}

// 将字符串首字母改成大写
function capitalize(string) {
    if (!_.isString) return string;
    return string.replace(/^\S/, s => s.toUpperCase());
}

export default {
    isBackboneView,
    isBackboneInstance,
    isReactComponent,
    isReactElement,
    shouldCompile,
    capitalize,
}
