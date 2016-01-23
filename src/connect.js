;(function(root, Framework){
    'use strict';

    function connectToFish(fish) {
        var fish = fish || root.fish;
        if (!fish) return;
        // console.log('connect to fish', fish);

        // 调用此函数后，可以将组件视为 fish.View 的子视图
        // 可以通过 setView() 加入父组件中，而且可以自动渲染
        extendAsFishView(fish.View);

        var originalRender = fish.View.prototype.__render;

        _.extend(fish.View.prototype, {

            // 将自定义标签的编译过程插入到 fish 默认的渲染流程中
            __render: function() {
                var res = originalRender.apply(this, arguments);
                Framework.compile(this);
                return res;
            }

        });
    }

    // 可以像 fish.View 那样渲染
    function extendAsFishView(View) {
        _.each(UED.tags, function(tag) {
            var Type = UED[tag];
            if (_.isFunction(Type)) {
                UED[tag] = function(options, configs) {
                    var view = new Type(options, configs);
                    View.setupView(view, {});
                    return view;
                }
                Type.prototype.render = function() {
                    if (this.__manager__) {
                        var parent = this.__manager__.parent;
                        var selector = this.__manager__.selector;
                        if (parent instanceof fish.View) {
                            parent.$(selector).html(this.$el);
                        }
                    }
                    return this;
                }
            }
        })
    }

    Framework.connectToFish = connectToFish;
})(window, window.UED)
