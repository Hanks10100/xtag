import mixins from '../shared/mixins';

// 日期选择插件的构造函数
export class Select {
    constructor() {
        this.defineShadowValue('value', {
            get: () => this.getValue(),
            set: value => { this.setValue(value); return value; }
        });

        this.initElement(...arguments);
        this.bindEvents();
    }

    initElement(options) {
        this.$root = $('body');

        // 模拟 Fish Combobox 组件的 DOM 结构
        this.$el = $('<div class="input-group ui-combobox"></div>').attr('data-type', this.type);
        this.$input = $('<input type="text" autocomplete="off" class="form-control">');
        this.$button = $('<span class="input-group-addon clear-input-icon-right"></span>')
                .append('<span class="glyphicon glyphicon-triangle-bottom"></span>');
        this.$el.append(this.$input, this.$button);

        this._options = [];
        this.$options = $('<ul class="dropdown-list"></ul>');
        options.children.forEach((child, index) => {
            const value = child.getAttribute('value');
            this._options.push({ value, name: child.innerHTML });
            this.$options.append(
                $(`<li>${child.innerHTML}</li>`).attr('index', index) .data('value', value)
            );
        });

        this.el = this.$el[0];
        return this.$el;
    }

    bindEvents() {

        this.$el.on('click', '.input-group-addon', event => {
            event.stopPropagation();
            this.isEnabled() && this.toggleDropdown();
        });

        this.$root.on('click', event => {
            this.$options.detach();
            this._optionsIsOpen = false;
        });

        this.$options.on('click', 'li', event => {
            const $li = $(event.currentTarget);
            $li.addClass('selected').siblings().removeClass('selected');
            this.setValue($li.data('value'));
        });

        return this;
    }

    toggleDropdown() {
        if (this._optionsIsOpen) {
            this.$options.detach();
            this._optionsIsOpen = false;
        } else {
            const offset = this.$el.offset();

            this.$options.css('left', offset.left)
                .css('top', offset.top + this.$el.height() - 1)
                .width(this.$el.width())
                .appendTo(this.$root)

            this._optionsIsOpen = true;
        }
        return this;
    }

    getValue() {
        const original = this.$input.val();
        return this._options.reduce((res, opt) => (opt.name === original) ? opt.value : res, null);
    }

    setValue(value) {
        const original = this.$input.val();
        const newValue = this._options.reduce((res, opt) => (opt.value === value) ? opt.name : res, original);

        if (newValue !== original) {
            this.$input.val(newValue);
            this.trigger('change');
        }
        return this;
    }
}
Select.prototype.type = 'Select';


// 添加启用和禁用功能
_.extend(Select.prototype, mixins.authorize);

// 添加 getter/setter 相关功能
_.extend(Select.prototype, mixins.shadow);

// 添加自定义事件的功能
_.extend(Select.prototype, mixins.events);
