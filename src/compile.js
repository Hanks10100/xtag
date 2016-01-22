;(function(root){
    'use strict';

    var TAG_PREFIX = 'H-';
    var CUSTOM_TAGS = ['Table', 'Datetimepicker'];

    function compile(env) {
        if (!env) env = root;
        _.each(CUSTOM_TAGS, function(tagName) {
            _.each(env.$(TAG_PREFIX + tagName), function(elem) {
                var widget = { $el: $(elem) };
                var option = parseOption(elem, env);

                switch (tagName.toLowerCase()) {
                    case 'table': widget = new Table(option); break;
                    case 'datetimepicker': widget = new Datetimepicker(option); break;
                }

                $(elem).replaceWith(widget.$el);

                var name = option.name;
                if (name && _.isString(name)) {
                    env[name] = widget;
                    env['$' + name] = widget.$el;
                }
            });
        });
    }

    function parseOption(elem, env) {
        var options = {};
        _.each(elem.attributes, function(attr) {
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

    root.compileCustomTag = compile;
})(window)
