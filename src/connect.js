;(function(root, Framework){
    'use strict';

    function connectToFish(fish, config) {
        var fish = fish || root.fish;
        var config = config || {};
        if (!fish) return;
        // console.log('connect to fish', fish);

        // 调用此函数后，可以将组件视为 fish.View 的子视图
        // 可以通过 setView() 加入父组件中，而且可以自动渲染
        config.enableView && extendAsFishView(fish.View);

        // 可以渲染静态的自定义标签
        customHandlebarsCompile();

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
        _.each(Framework.tags, function(tag) {
            var Type = Framework[tag];
            if (_.isFunction(Type)) {
                Framework[tag] = function(options, configs) {
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

    // 自定义 Handlebars 的编译函数
    function customHandlebarsCompile() {
        var HandlebarsCompile = Handlebars.compile;
        Handlebars.compile = function(template, options) {
            var tpl = Framework.preCompile(template);
            return HandlebarsCompile(tpl, options);
        }
    }


    Framework.connectToFish = connectToFish;
})(window, window.XXX)
