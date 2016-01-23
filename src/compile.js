;(function(root, Framework){
    'use strict';

    var TAG_PREFIX = 'H-';
    var CUSTOM_TAGS = ['Table', 'Datetimepicker', 'Switch', 'Checkbox', 'Select'];

    function compile(env) {
        if (!env) env = root;
        _.each(CUSTOM_TAGS, function(tagName) {
            _.each(env.$(TAG_PREFIX + tagName), function(elem) {
                var widget = { $el: $(elem) };
                var option = parseOption(elem, env);

                switch (tagName.toLowerCase()) {
                    case 'table': widget = new Framework.Table(option); break;
                    case 'switch': widget = new Framework.SwitchButton(option); break;
                    case 'select': widget = new Framework.Select(option); break;
                    case 'checkbox': widget = new Framework.Checkbox(option); break;
                    case 'datetimepicker': widget = new Framework.Datetimepicker(option); break;
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
        options.children = _.toArray(elem.children);
        return options;
    }

    Framework.tags = CUSTOM_TAGS;
    if (Object.freeze) Object.freeze(Framework.tags);

    Framework.compileCustomTag = compile;
})(window, window.UED)
