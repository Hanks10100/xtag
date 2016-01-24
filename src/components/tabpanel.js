;(function(root, Framework){
    'use strict';

    // Tab 页签
    function TabPanel(options) {
        options || (options = {});
        var self = this;
        this.activeTab = 0;
        this.tabs = _.map(options.children, function(group, index) {
            if (group.getAttribute('active')) self.activeTab = index;
            return {
                index: index,
                trigger: _.first(group.getElementsByTagName('trigger')),
                target: _.first(group.getElementsByTagName('target')),
            }
        });
        this.initElement(options);
        this.bindEvents();
    }

    _.extend(TabPanel.prototype, {
        initElement: function(options) {
            var self = this;
            this.$el = $('<div class="ued-tabs"></div>');
            this.tabStyle = 'horizontal';
            this.align = options.align || 'top';
            if (this.align === 'left' || this.align === 'right') {
                this.tabStyle = 'vertical';
            }
            this.$el.addClass('tabs-' + this.tabStyle);
            if (this.align) this.$el.addClass('align-' + this.align);

            this.$navs = $('<ul class="tabs-nav"></ul>');
            this.$contents = $('<div class="tabs-content"></div>');
            _.each(this.tabs, function(group, index) {
                group.title = group.trigger.innerHTML;
                group.trigger = $('<li class="tabs-nav-cell"></li>')
                    .data('index', index)
                    .toggleClass('active', self.activeTab === index)
                    .append($('<span></span>').html(group.title))

                // TODO: 编译 panel 中的内容，使其可以嵌套自定义的组件
                group.panel = group.target.innerHTML;
                group.target = $('<div class="tabs-panel"></div>')
                    .toggle(self.activeTab === index)
                    .html(group.panel)

                self.$navs.append(group.trigger);
                self.$contents.append(group.target);
            });

            if (this.align === 'bottom') {
                this.$el.append(this.$contents, this.$navs);
            } else {
                this.$el.append(this.$navs, this.$contents);
            }
            return this.$el;
        },
        bindEvents: function() {
            var self = this;
            this.$el.on('click', '.tabs-nav-cell', function(event) {
                if (self.isEnabled()) {
                    var $cell = $(event.currentTarget);
                    var index = $cell.data('index');
                    if (self.activeTab !== index) {
                        $cell.addClass('active').siblings().removeClass('active');
                        self.$contents.find(':nth-child('+(index+1)+')').show().siblings().hide();
                        self.activeTab = index;
                        self.trigger('change');
                    }
                }
            });
        },
        onChange: function(callback) {
            if (!_.isFunction(callback)) return this;
            this.on('change', _.bind(callback, this));
            return this;
        },
        afterMount: function() {
        },
        getCurrentTab: function() {
            return this.tabs[this.activeTab];
        },
        getCurrentTabIndex: function() {
            return this.activeTab;
        },
    });

    // 添加启用和禁用功能
    _.extend(TabPanel.prototype, Framework.mixins.availableMixin);

    // 添加自定义事件的功能
    _.extend(TabPanel.prototype, Backbone.Events);

    TabPanel.prototype.value = TabPanel.prototype.getCurrentTab;

    Framework.TabPanel = TabPanel;
})(window, window.UED)
