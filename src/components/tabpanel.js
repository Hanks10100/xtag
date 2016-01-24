;(function(root, Framework){
    'use strict';

    // Tab 页签
    function TabPanel(options) {
        options || (options = {});
        var self = this;
        this.activeTab = 0;
        this.tabs = _.map(options.children, function(group, index) {
            if (group.getAttribute('default')) self.activeTab = index;
            return {
                trigger: _.first(group.getElementsByTagName('trigger')),
                target: _.first(group.getElementsByTagName('target')),
            }
        });
        this.initElement();
    }



    _.extend(TabPanel.prototype, {
        initElement: function() {
            var self = this;
            this.$trigger = $('<ul class="tabs-nav"></ul>');
            this.$targets = $('<div class="tabs-content"></div>');
            _.each(this.tabs, function(group, index) {
                self.$trigger.append(
                    $('<li class="tabs-nav-cell"></li>')
                        .toggleClass('active', self.activeTab === index)
                        .append($('<span></span>').html(group.trigger.innerHTML))
                    );
                self.$targets.append(
                    $('<div class="tabs-panel"></div>')
                        .toggle(self.activeTab === index)
                        .html(group.target.innerHTML)
                );
            });
            this.$el = $('<div class="ued-tabs"></div>').append(this.$trigger, this.$targets);
            return this.$el;
        },
        afterMount: function() {
        }
    });

    Framework.TabPanel = TabPanel;
})(window, window.UED)
