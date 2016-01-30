
// 判断 View 是不是 Backbone 的视图
export function isBackboneView(View) {
    return _.isFunction(View)
        && root.Backbone
        && View.prototype === root.Backbone.View
        || View.prototype instanceof root.Backbone.View
}
