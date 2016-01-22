;(function(root){
    'use strict';

    function connectToFish(fish) {
        var fish = fish || root.fish;
        if (!fish) return;
        // console.log('connect to fish', fish);

        var originalRender = fish.View.prototype.__render;

        _.extend(fish.View.prototype, {

            // 将自定义标签的编译过程插入到 fish 默认的渲染流程中
            __render: function() {
                var res = originalRender.apply(this, arguments);
                compileCustomTag(this);
                return res;
            }

        });
    }

    root.connectToFish = connectToFish;
})(window)
