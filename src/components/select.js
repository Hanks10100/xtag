;(function(root, Framework){
    'use strict';

    // 日期选择插件的构造函数
    function Select(options) {
        var self = this;
        this.$root = $('body');
        this.$el = $('<div class="input-group ui-combobox"></div>');
        this.$option = $('<ul class="dropdown-list"></ul>');

        _.each(options.children, function(child) {
            // console.dir(child);
            self.$option.append(
                $('<li></li>')
                    .attr('value', child.getAttribute('value'))
                    .html(child.innerHTML)
            );
        });


        // 模拟 Fish Combobox 组件的 DOM 结构
        this.$el.append(
            $('<input type="text" autocomplete="off" class="form-control">'),
            $('<span class="input-group-addon clear-input-icon-right"></span>')
                .append('<span class="glyphicon glyphicon-triangle-bottom"></span>')
        );
        // this.$el.append(this.$option);
        this.bingEvents();
    }

    _.extend(Select.prototype, {
        bingEvents: function() {
            var self = this;
            this.$el.on('click', '.input-group-addon', function(event) {
                event.stopPropagation();
                self.toggleOptions();
            });
            this.$root.on('click', function() {
                self.$option.detach();
                self._optionsIsOpen = false;
            });
        },
        toggleOptions: function(event) {
            if (this._optionsIsOpen) {
                this.$option.detach();
                this._optionsIsOpen = false;
            } else {
                var offset = this.$el.offset();

                this.$option.css('top', offset.top + this.$el.height() - 1)
                    .css('left', offset.left)
                    .width(this.$el.width())

                this.$option.appendTo(this.$root);
                this._optionsIsOpen = true;
            }
        },
    });


    Framework.Select = Select;
})(window, window.UED)
