import utils from './shared/utils';
import mixins from './shared/mixins';
import { preCompile, registerTag, unregisterTag } from './shared/staticTags';

import { Switcher, Checkbox } from './components/switcher';
import { Select } from './components/select';

const XTag = {
    utils,
    mixins,
    preCompile,
    registerTag,
    unregisterTag,
    Switcher,
    Checkbox,
    Select,
};
console.log(XTag);

window.XTag = XTag;
