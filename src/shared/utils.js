
// 判断 View 是不是 Backbone 的视图
function isBackboneView(View) {
    return _.isFunction(View)
        && window.Backbone
        && View.prototype === window.Backbone.View
        || View.prototype instanceof window.Backbone.View
}

// 判断元素是否需要编译
function shouldCompile(element) {
    return /^[xv][\-\:]\w+$/i.test(element.tagName);
}

export default {
    isBackboneView,
    shouldCompile,
}
