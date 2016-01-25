;(function(root, Framework){
    'use strict';

    // Tab 页签
    function TabPanel(options) {
        options || (options = {});
        var self = this;

        // 定义影子变量，可在 getter/setter 中绑定额外操作
        this.defineShadowValues({
            align: {
                set: function(dir) {
                    dir = dir.toLowerCase();
                    if (_.indexOf(['left', 'right', 'top', 'bottom'], dir) === -1) return this.align;
                    this.alignTo(dir); return dir;
                }
            },
            activeTab: {
                set: function(index) {
                    if (!_.isNumber(index) || (index < 0) || (index >= this.tabs.length)) return this.activeTab;
                    this.switchTo(index); return index;
                }
            }
        });

        this.tabs = _.map(options.children, function(group, index) {
            if (group.getAttribute('active')) {
                self.setShadowValue('activeTab', index);
            }
            return {
                index: index,
                trigger: _.first(group.getElementsByTagName('trigger')),
                target: _.first(group.getElementsByTagName('target')),
            }
        });

        this.initElement.apply(this, arguments);
        this.bindEvents();
    }

    _.extend(TabPanel.prototype, {
        type: 'Tabs',
        initElement: function(options) {
            var self = this;
            this.$el = $('<div class="ued-tabs"></div>');

            this.$navList = $('<ul class="tabs-nav-list"></ul>');
            this.$contents = $('<div class="tabs-content"></div>');
            _.each(this.tabs, function(group, index) {
                group.title = group.trigger.innerHTML;
                group.trigger = $('<li class="tabs-nav-cell"></li>')
                    .data('index', index)
                    .attr('title', group.title)
                    .toggleClass('active', self.activeTab === index)
                    .append($('<span></span>').html(group.title))

                group.panel = group.target.innerHTML;
                group.target = $('<section class="tabs-panel"></section>')
                    .data('index', index)
                    .toggle(self.activeTab === index)
                    .html(group.panel)

                self.$navList.append(group.trigger);
                self.$contents.append(group.target);
            });
            this.$navs = $('<nav class="tabs-nav"></nav>').append(this.$navList);

            this.alignTo(options.align || 'top');
            return this.$el;
        },
        bindEvents: function() {
            var self = this;
            this.$el.on('click', '.tabs-nav-cell', function(event) {
                self.switchTo($(event.currentTarget).data('index'));
            });
        },
        alignTo: function(direction) {
            if (!direction || !_.isString(direction)) return this;
            var originalAlign = this.align;
            this.setShadowValue('align', direction);

            if (originalAlign === this.align) return this;

            switch (this.align) {
                case 'left': case 'right': this.tabStyle = 'vertical';   break;
                case 'top': case 'bottom': this.tabStyle = 'horizontal'; break;
                default: this.tabStyle = 'unknown';
            }

            this.$navs.detach();
            this.$contents.detach();
            this.$el.empty()
                .removeClass('tabs-vertical tabs-horizontal tabs-unknown')
                .addClass('tabs-' + this.tabStyle).attr('align', this.align);

            if (this.align === 'bottom') {
                this.$el.append(this.$contents, this.$navs);
            } else {
                this.$el.append(this.$navs, this.$contents);
            }

            this.adjustLayout();
            return this;
        },
        switchTo: function(index) {
            if (this.isEnabled()) {
                var originalIndex = this.activeTab;
                this.setShadowValue('activeTab', index);

                if (this.activeTab !== originalIndex) {
                    var $cell = this.$navs.find('.tabs-nav-cell:nth-child('+(index+1)+')');
                    var $target = this.$contents.find('.tabs-panel:nth-child('+(index+1)+')');
                    $cell.addClass('active').siblings().removeClass('active');
                    $target.show().siblings().hide();
                    this.trigger('change');
                }
            }
            return this;
        },
        onChange: function(callback) {
            if (!_.isFunction(callback)) return this;
            this.on('change', _.bind(callback, this));
            return this;
        },
        afterMount: function() {
            this.adjustLayout();
        },
        adjustLayout: function() {
            if (!this.$el.is(':visible')) return this;

            var el = {
                width: this.$el.outerWidth(),
                height: this.$el.outerHeight()
            };
            var nav = {
                width: this.$navs.outerWidth(),
                height: this.$navs.outerHeight()
            };
            var panel = {
                width: this.$contents.outerWidth(),
                height: this.$contents.outerHeight()
            };
            if (this.tabStyle === 'vertical') {
                var maxHeight = Math.max(el.height, nav.height, panel.height);
                this.$el.height(maxHeight);
            }
            return this;
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

    // 添加 getter/setter 相关功能
    _.extend(TabPanel.prototype, Framework.mixins.shadowMixin);

    // 添加自定义事件的功能
    _.extend(TabPanel.prototype, Backbone.Events);

    TabPanel.prototype.value = TabPanel.prototype.getCurrentTab;

    Framework.TabPanel = TabPanel;
})(window, window.UED)
