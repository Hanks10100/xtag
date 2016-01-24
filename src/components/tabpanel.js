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
        this.bindEvents();
    }

    _.extend(TabPanel.prototype, {
        initElement: function() {
            var self = this;
            this.$trigger = $('<ul class="tabs-nav"></ul>');
            this.$targets = $('<div class="tabs-content"></div>');
            _.each(this.tabs, function(group, index) {
                self.$trigger.append(
                    $('<li class="tabs-nav-cell"></li>')
                        .data('index', index)
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
        bindEvents: function() {
            var self = this;
            this.$el.on('click', '.tabs-nav-cell', function(event) {
                if (self.isEnabled()) {
                    var $cell = $(event.currentTarget);
                    var index = $cell.data('index');
                    $cell.addClass('active').siblings().removeClass('active');
                    self.$targets.find(':nth-child('+(index+1)+')').show().siblings().hide();
                    if (self.activeTab !== index) {
                        self.trigger('change');
                        self.activeTab = index;
                    }
                }
            });
        },
        afterMount: function() {
        },
        value: function() {
            return this.activeTab;
        },
    });

    // 添加启用和禁用功能
    _.extend(TabPanel.prototype, Framework.mixins.availableMixin);

    // 添加自定义事件的功能
    _.extend(TabPanel.prototype, Backbone.Events);

    Framework.TabPanel = TabPanel;
})(window, window.UED)
