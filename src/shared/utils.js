
// 判断 View 是不是 Backbone 的视图
function isBackboneView(View) {
    return _.isFunction(View)
        && window.Backbone
        && View.prototype === window.Backbone.View
        || View.prototype instanceof window.Backbone.View
}

export default {
    isBackboneView
}
