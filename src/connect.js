;(function(root){
    'use strict';

    function connectToFish(fish) {
        var fish = fish || root.fish;
        if (!fish) return;
        // console.log('connect to fish', fish);

        _.extend(fish.View.prototype, {
            _afterRender: function() {
                compileCustomTag(this);
                return this;
            }
        });
    }

    root.connectToFish = connectToFish;
})(window)