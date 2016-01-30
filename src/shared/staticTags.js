var TAG_PREFIX = 'X-';

// 静态的编译函数
var staticTags = {
    header: function (elem) {
        return '<header class="page-header">' + elem.innerHTML + '</header>';
    },
    footer: function (elem) {
        return '<footer class="page-footer">' + elem.innerHTML + '</footer>';
    },
}

export function preCompile(template) {
    var $tpl = $('<code>' + template + '</code>');
    _.each(staticTags, function(tpl, tagName) {
        _.each($tpl.find(TAG_PREFIX + tagName), function(elem) {
            if (_.isFunction(tpl)) tpl = tpl(elem);
            $(elem).replaceWith(tpl);
        });
    });
    return $tpl.html();
}

export function registerTag(tagName, template) {
    if (!_.isString(tagName)) throw new TypeError('`tagName` must be a string.');
    if (!_.isString(template) || _.isFunction(template)) {
        throw new TypeError('`template` must be a string or a function.');
    }
    staticTags[tagName] = template;
}

export function unregisterTag(tagName) {
    if (!_.isString(tagName)) throw new TypeError('`tagName` must be a string.');
    if (staticTags[tagName]) {
        delete staticTags[tagName];
    }
}
