import utils from './shared/utils';
import mixins from './shared/mixins';
import { preCompile, registerTag, unregisterTag } from './shared/staticTags';

const XTag = {
    utils,
    mixins,
    preCompile,
    registerTag,
    unregisterTag,
};
console.log(XTag);

window.XTag = XTag;
