;(function(root, Framework){
    'use strict';

    function connectToFish(fish) {
        var fish = fish || root.fish;
        if (!fish) return;

        // 可以渲染静态的自定义标签
        customHandlebarsCompile();

        // 将自定义标签的编译过程插入到 fish 默认的渲染流程中
        var originalRender = fish.View.prototype.__render;
        _.extend(fish.View.prototype, {
            __render: function() {
                var res = originalRender.apply(this, arguments);
                Framework.compile(this);
                return res;
            }
        });
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
})(window, window.XTag)
