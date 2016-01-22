;(function(root){
    'use strict';

    var customTags = ['H-Table', 'H-Datetimepicker'];

    function compile(env) {
        if (!env) env = root;
        _.each(customTags, function(tag) {
            var arr = tag.split('-');
            var namespace = arr[0];
            var tagName = arr[1];
            env.$(tag).each(function(index, elem) {
                // console.log('compile each', tagName);
                var res = elem;
                var name = elem.getAttribute('name');
                switch (tagName.toLowerCase()) {
                    case 'table': res = compileTable(elem, env); break;
                    case 'datetimepicker': res = compileDatetimepicker(elem, env); break;
                }
                $(elem).replaceWith(res.$el);

                if (name && _.isString(name)) {
                    env[name] = res;
                    env['$' + name] = res.$el;
                }
            });
        });
    }

    // 编译 Table 组件
    function compileDatetimepicker(elem, env) {
        // console.log('will compile Datetimepicker', elem);
        var $picker = $('<div class="input-group">datetimepicker</div>');
        var $input = $('<input type="text" class="form-control" data-today-btn="true">')

        return {$el: $picker.html($input)};
    }

    // 编译 Table 组件
    function compileTable(elem, env) {
        // console.log('will compile Table', elem);

        var body = elem.getAttribute('body');
        if (_.isString(body) && env[body]) {
            body = env[body]();
        }

        var head = elem.getAttribute('head');
        if (_.isString(head) && env[head]) {
            head = env[head]();
        }

        var table = new Table({head: head, body: body});
        return table;
    }

    root.compileCustomTag = compile;
})(window)
