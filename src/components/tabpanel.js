;(function(root, Framework){
    'use strict';

    // Tab 页签
    function TabPanel(options) {
        this.$el = $('<div class="tabs-panel"></div>');
    }

    _.extend(TabPanel.prototype, {
        afterMount: function() {
        }
    });

    Framework.TabPanel = TabPanel;
})(window, window.UED)
