import { registerTag, unregisterTag } from './shared/staticTags';
import { compile } from './compile';
import { connectToFish } from './connect';

connectToFish(fish);

const XTag = {
    registerTag,
    unregisterTag,
    compile,
    connectToFish,
};

window.XTag = XTag;

export default XTag;
