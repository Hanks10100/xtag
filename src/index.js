import utils from './shared/utils';
import mixins from './shared/mixins';
import { preCompile, registerTag, unregisterTag } from './shared/staticTags';

import { Switcher, Checkbox } from './components/switcher';
import { Datetimepicker } from './components/datetimepicker';
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
    Datetimepicker,
};
console.log(XTag);

window.XTag = XTag;
