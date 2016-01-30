import utils from './shared/utils';
import mixins from './shared/mixins';
import { preCompile, registerTag, unregisterTag } from './shared/staticTags';

import { Switcher, Checkbox } from './components/switcher';
import { Datetimepicker } from './components/datetimepicker';
import { Select } from './components/select';
import { Table } from './components/Table';
import { Tabs } from './components/Tabs';

import { compile, compileElement } from './compile';
import { connectToFish } from './connect';

connectToFish(fish);

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
    Table,
    Tabs,
    compile,
    compileElement,
    connectToFish,
};

window.XTag = XTag;

export default XTag;
