;(function(root){
    'use strict';

    var TAG_PREFIX = 'H-';
    var CUSTOM_TAGS = ['Table', 'Datetimepicker'];

    function compile(env) {
        if (!env) env = root;
        _.each(CUSTOM_TAGS, function(tagName) {
            env.$(TAG_PREFIX + tagName).each(function(index, elem) {
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

    function parseOption(elem, env) {
        // console.log(elem.attributes);
        var options = {};
        _.each(elem.attributes, function(attr, key) {
            if (attr.nodeType !== 2) return;

            var value = attr.nodeValue;
            if (_.isFunction(env[value])) value = env[value]();

            if (attr.nodeName === 'options') {
                _.extend(options, value);
            } else {
                options[attr.nodeName] = value;
            }
        });
        return options;
    }

    // 编译 Datetimepicker 组件
    function compileDatetimepicker(elem, env) {
        return new Datetimepicker(parseOption(elem, env));
    }

    // 编译 Table 组件
    function compileTable(elem, env) {
        var table = new Table(parseOption(elem, env));
        return table;
    }

    root.compileCustomTag = compile;
})(window)
