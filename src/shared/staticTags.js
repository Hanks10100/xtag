;(function(root, Framework){
    'use strict';

    // 静态的编译函数
    Framework.staticTags = {
        header: function (elem) {
            return '<header class="page-header">' + elem.innerHTML + '</header>';
        },
        footer: function (elem) {
            return '<footer class="page-footer">' + elem.innerHTML + '</footer>';
        },
    }

    Framework.registerTag = function(tagName, template) {
        if (!_.isString(tagName)) throw new TypeError('`tagName` must be a string.');
        if (!_.isString(template) || _.isFunction(template)) {
            throw new TypeError('`template` must be a string or a function.');
        }
        Framework.staticTags[tagName] = template;
    }

    Framework.unregisterTag = function(tagName) {
        if (!_.isString(tagName)) throw new TypeError('`tagName` must be a string.');
        if (Framework.staticTags[tagName]) {
            delete Framework.staticTags[tagName];
        }
    }

})(window, window.UED)
