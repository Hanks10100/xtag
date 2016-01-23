;(function(root, Framework){
    'use strict';

    // 与“启用”、“禁用” 相关的 函数
    var availableMixin = {
        setAvailable: function(value) {
            this.$el.toggleClass('disabled', !value);
            this.$input.prop('disabled', !value);
            return this;
        },
        isEnabled:    function() { return this.$input.is(':enabled'); },
        enable:       function() { return this.setAvailable(true); },
        disable:      function() { return this.setAvailable(false); },
        toggleEnable: function() { return this.setAvailable(!this.isEnabled()); },
    };

    Framework.mixins = {
        availableMixin: availableMixin,
    };

})(window, window.UED)
