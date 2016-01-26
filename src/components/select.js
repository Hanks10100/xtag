;(function(root, Framework){
    'use strict';

    // 日期选择插件的构造函数
    function Select() {
        this.$root = $('body');

        this.defineShadowValue('value', {
            get: function() { return this.getValue(); },
            set: function(value) { this.setValue(value); return value; }
        });

        this.initElement.apply(this, arguments);
        this.bingEvents();
    }

    _.extend(Select.prototype, {
        type: 'Select',
        initElement: function(options) {
            var self = this;

            // 模拟 Fish Combobox 组件的 DOM 结构
            this.$el = $('<div class="input-group ui-combobox"></div>');
            this.$input = $('<input type="text" autocomplete="off" class="form-control">');
            this.$button = $('<span class="input-group-addon clear-input-icon-right"></span>')
                    .append('<span class="glyphicon glyphicon-triangle-bottom"></span>');
            this.$el.append(this.$input, this.$button);

            this._options = [];
            this.$options = $('<ul class="dropdown-list"></ul>');
            _.each(options.children, function(child, index) {
                // console.dir(child);
                var value = child.getAttribute('value');
                self._options.push({ value: value, name: child.innerHTML });
                self.$options.append(
                    $('<li></li>').attr('index', index)
                        .data('value', value)
                        .html(child.innerHTML)
                );
            });

            return this.$el;
        },
        bingEvents: function() {
            var self = this;
            this.$el.on('click', '.input-group-addon', function(event) {
                event.stopPropagation();
                if (self.isEnabled()) {
                    self.toggleOptions();
                }
            });
            this.$root.on('click', function() {
                self.$options.detach();
                self._optionsIsOpen = false;
            });
            this.$options.on('click', 'li', function(event) {
                var $li = $(event.currentTarget);
                $li.addClass('selected').siblings().removeClass('selected');
                self.setValue($li.data('value'));
            });
            return this;
        },
        toggleOptions: function(event) {
            if (this._optionsIsOpen) {
                this.$options.detach();
                this._optionsIsOpen = false;
            } else {
                var offset = this.$el.offset();

                this.$options.css('top', offset.top + this.$el.height() - 1)
                    .css('left', offset.left)
                    .width(this.$el.width())

                this.$options.appendTo(this.$root);
                this._optionsIsOpen = true;
            }
            return this;
        },

        // TODO: 手动输入时也应当触发 onChange
        onChange: function(callback) {
            if (!_.isFunction(callback)) return this;
            this.on('change', _.bind(callback, this));
            return this;
        },

        getValue: function() {
            var val = this.$input.val();
            return _.reduce(this._options, function(res, opt) {
                if (opt.name === val) return opt.value;
                return res;
            }, null);
        },
        setValue: function(value) {
            var original = this.$input.val();
            var newValue = _.reduce(this._options, function(res, opt) {
                if (opt.value === value) return opt.name;
                return res;
            }, original);
            if (newValue !== original) {
                this.$input.val(newValue);
                this.trigger('change');
            }
            return this;
        },
    });

    // 添加启用和禁用功能
    _.extend(Select.prototype, Framework.mixins.authorize);

    // 添加 getter/setter 相关功能
    _.extend(Select.prototype, Framework.mixins.shadow);

    // 添加自定义事件的功能
    _.extend(Select.prototype, Backbone.Events);

    Framework.Select = Select;
})(window, window.XXX)
