;(function(root, Framework){
    'use strict';

    function isBackboneView(View) {
        return _.isFunction(View)
            && root.Backbone
            && View.prototype === root.Backbone.View
            || View.prototype instanceof root.Backbone.View
    }

    Framework.utils = {
        isBackboneView: isBackboneView,
    };

})(window, window.XTag)
