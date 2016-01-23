;(function(root, Framework){
    'use strict';

    // 日期选择插件的构造函数
    function Select(options) {
        var self = this;
        this.$root = $('body');

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
                    .attr('value', value)
                    .html(child.innerHTML)
            );
        });

        // this.$el.append(this.$options);
        this.bingEvents();
    }

    _.extend(Select.prototype, {
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
                self.$input.val($li.text());
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
        getValue: function() {
            var val = this.$input.val();
            return _.reduce(this._options, function(res, opt) {
                if (opt.name === val) return opt.value;
                return res;
            }, null);
        },
        setValue: function(value) {
            this.$input.val(_.reduce(this._options, function(res, opt) {
                if (opt.value === value) return opt.name;
                return res;
            }, null));
            return this;
        },
    });

    // 添加启用和禁用功能
    _.extend(Select.prototype, Framework.mixins.availableMixin);

    Select.prototype.value = Select.prototype.getValue;

    Framework.Select = Select;
})(window, window.UED)
