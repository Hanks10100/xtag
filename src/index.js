import utils from './shared/utils';
import mixins from './shared/mixins';
import components from './components/index';
import { preCompile, registerTag, unregisterTag } from './shared/staticTags';
import { compile, compileElement } from './compile';
import { connectToFish } from './connect';


connectToFish(fish);

const XTag = {
    utils,
    mixins,
    components,
    preCompile,
    registerTag,
    unregisterTag,
    compile,
    compileElement,
    connectToFish,
};

window.XTag = XTag;

export default XTag;
