import mixins from '../shared/mixins';
import { compileElement } from '../compile';

function isValidateDirection(direction) {
    if (!direction || !_.isString(direction)) return false;
    const dir = direction.toLowerCase();
    if (_.indexOf(['left', 'right', 'top', 'bottom'], dir) === -1) return false;
    return dir;
}

// Tab 页签
export class Tabs {
    constructor() {
        this.initialize(...arguments);
        this.initElement(...arguments);
        this.bindEvents();
    }

    initialize(options = {}, configs = {}) {

        this._scope = configs.scope;

        // 定义影子变量，可在 getter/setter 中绑定额外操作
        this.defineShadowValues({
            value:     { get: ()  => this.tabs[this.activeTab]    },
            align:     { set: dir => this.alignTo(dir).align      },
            activeTab: { set: idx => this.switchTo(idx).activeTab }
        });

        this.tabs = _.map(options.children, (group, index) => {
            if (group.getAttribute('active')) {
                this.setShadowValue('activeTab', index);
            }
            return {
                index,
                trigger: _.first(group.getElementsByTagName('trigger')),
                target: _.first(group.getElementsByTagName('target')),
            }
        });

        return this;
    }

    initElement(options = {}, configs = {}) {
        this.$el = $('<div class="ued-tabs"></div>').attr('data-type', this.type);
        this.el = this.$el[0];

        this.$navList = $('<ul class="tabs-nav-list"></ul>');
        this.$contents = $('<div class="tabs-content"></div>');
        _.each(this.tabs, (group, index) => {
            group.title = group.trigger.innerHTML;
            group.trigger = $('<li class="tabs-nav-cell"></li>')
                .data('index', index)
                .attr('title', group.title)
                .toggleClass('active', this.activeTab === index)
                .append(`<span>${group.title}</span>`)

            group.panel = group.target.innerHTML;
            group.target = $('<section class="tabs-panel"></section>')
                .data('index', index)
                .toggle(this.activeTab === index)
                .html(group.panel)

            this.$navList.append(group.trigger);
            this.$contents.append(group.target);
        });
        this.$navs = $('<nav class="tabs-nav"></nav>').append(this.$navList);

        this.alignTo(options.align || 'top');
        return this.$el;
    }

    bindEvents() {
        this.$navs.on('click', '.tabs-nav-cell', event => {
            this.switchTo($(event.currentTarget).data('index'));
        });

        // 创建属性监听函数，自动更新 align 的值
        this.observeAttributes(['align'], (attr, { target }, oldValue) => {
            const dir = isValidateDirection(target.align);
            dir ? this.alignTo(dir) : (target.align = oldValue);
        });

        return this;
    }

    alignTo(direction) {
        const dir = isValidateDirection(direction);
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
    }

    switchTo(index) {
        if (!_.isNumber(index)) return this;
        index = parseInt(index + this.tabs.length, 10) % this.tabs.length;

        if (this.isEnabled() && (this.activeTab !== index)) {
            this.$navs.find(`.tabs-nav-cell:nth-child(${index+1})`)
                .addClass('active').siblings().removeClass('active');

            this.$contents.find(`.tabs-panel:nth-child(${index+1})`)
                .show().siblings().hide();

            this.setShadowValue('activeTab', index);
            this.trigger('change');
        }
        return this;
    }

    afterMount() {
        const count = this.$el.parents('.ued-tabs').length + 1;
        this.$el.attr('level', count).data('level', count);
        switch (count) {
            case 1: this.$el.addClass('root-tab');   break;
            case 2: this.$el.addClass('second-tab');  break;
            case 3: this.$el.addClass('third-tab');   break;
            case 4: this.$el.addClass('fourth-tab');  break;
            case 5: this.$el.addClass('fifth-tab');   break;
            case 6: this.$el.addClass('sixth-tab');   break;
            case 7: this.$el.addClass('seventh-tab'); break;
            case 8: this.$el.addClass('eighth-tab');  break;
            case 9: this.$el.addClass('ninth-tab');   break;
        }

        // 编译 Tabs 面板中的内容
        compileElement(this.$contents, this._scope);
        this.adjustLayout();
    }

    adjustLayout() {
        if (!this.$el.is(':visible')) return this;

        const el = {
            width: this.$el.outerWidth(),
            height: this.$el.outerHeight()
        };
        const nav = {
            width: this.$navs.outerWidth(),
            height: this.$navs.outerHeight()
        };
        const panel = {
            width: this.$contents.outerWidth(),
            height: this.$contents.outerHeight()
        };
        if (this.tabStyle === 'vertical') {
            const maxHeight = Math.max(el.height, nav.height, panel.height);
            this.$el.height(maxHeight);
        }
        return this;
    }

    getCurrentTab() {
        return this.tabs[this.activeTab];
    }
}

Tabs.prototype.type = 'Tabs';

// 添加启用和禁用功能
_.extend(Tabs.prototype, mixins.authorize);

// 添加 getter/setter 相关功能
_.extend(Tabs.prototype, mixins.shadow);

// 添加 observer 相关功能
_.extend(Tabs.prototype, mixins.observer);

// 添加自定义事件的功能
_.extend(Tabs.prototype, mixins.events);
