const TAG_PREFIX = 'H-';

// 静态的编译函数
const staticTags = {
    header: elem => `<header class="page-header">${elem.innerHTML}</header>`,
    footer: elem => `<footer class="page-footer">${elem.innerHTML}</footer>`,
}

export function preCompile(template) {
    const $tpl = $(`<code>${template}</code>`);
    _.each(staticTags, (tpl, tagName) => {
        $tpl.find(TAG_PREFIX + tagName).each((i, elem) => {
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
