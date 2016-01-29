;(function(root, Framework){
    'use strict';

    // Tab 页签
    function Tabs(options) {
        this.initialize.apply(this, arguments);
        this.initElement.apply(this, arguments);
        this.bindEvents();
    }

    function isValidateDirection(direction) {
        if (!direction || !_.isString(direction)) return false;
        var dir = direction.toLowerCase();
        if (_.indexOf(['left', 'right', 'top', 'bottom'], dir) === -1) return false;
        return dir;
    }

    _.extend(Tabs.prototype, {
        type: 'Tabs',

        initialize: function(options) {
            options || (options = {});
            var self = this;

            // 定义影子变量，可在 getter/setter 中绑定额外操作
            this.defineShadowValues({
                value:     { get: function()    { return this.tabs[this.activeTab] } },
                align:     { set: function(dir) { return this.alignTo(dir).align } },
                activeTab: { set: function(idx) { return this.switchTo(idx).activeTab } }
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

            return this;
        },

        initElement: function(options) {
            var self = this;
            this.$el = $('<div class="ued-tabs"></div>').attr('data-type', this.type);
            this.el = this.$el[0];

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

            // 创建属性监听函数，自动更新 align 的值
            this.observeAttributes(['align'], function(attr, mutation, oldValue) {
                var dir = isValidateDirection(mutation.target.align);
                dir ? this.alignTo(dir) : (mutation.target.align = oldValue);
            });

            return this;
        },

        alignTo: function(direction) {
            var dir = isValidateDirection(direction);

            if (!dir || (dir === this.align)) return this;

            switch (dir) {
                case 'left': case 'right': this.tabStyle = 'vertical';   break;
                case 'top': case 'bottom': this.tabStyle = 'horizontal'; break;
                default: this.tabStyle = 'unknown';
            }

            this.$navs.detach();
            this.$contents.detach();
            this.$el.empty()
                .removeClass('tabs-vertical tabs-horizontal tabs-unknown')
                .addClass('tabs-' + this.tabStyle).attr('align', dir);

            if (dir === 'bottom') {
                this.$el.append(this.$contents, this.$navs);
            } else {
                this.$el.append(this.$navs, this.$contents);
            }

            this.setShadowValue('align', dir);
            this.adjustLayout();
            return this;
        },

        switchTo: function(index) {
            if (!_.isNumber(index) || (index < 0) || (index >= this.tabs.length)) return this;
            if (this.isEnabled()) {

                if (this.activeTab !== index) {
                    var $cell = this.$navs.find('.tabs-nav-cell:nth-child('+(index+1)+')');
                    var $target = this.$contents.find('.tabs-panel:nth-child('+(index+1)+')');
                    $cell.addClass('active').siblings().removeClass('active');
                    $target.show().siblings().hide();

                    this.setShadowValue('activeTab', index);

                    this.trigger('change');
                }
            }
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
    });

    // 添加启用和禁用功能
    _.extend(Tabs.prototype, Framework.mixins.authorize);

    // 添加 getter/setter 相关功能
    _.extend(Tabs.prototype, Framework.mixins.shadow);

    // 添加 observer 相关功能
    _.extend(Tabs.prototype, Framework.mixins.observer);

    // 添加自定义事件的功能
    _.extend(Tabs.prototype, Framework.mixins.events);

    Framework.Tabs = Tabs;
})(window, window.XXX)
