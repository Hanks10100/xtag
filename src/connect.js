import { compile } from './compile';
import { preCompile } from './shared/staticTags';

export function connectToFish(fish = window.fish) {
    if (!fish) return;

    // 可以渲染静态的自定义标签
    customHandlebarsCompile();

    // 将自定义标签的编译过程插入到 fish 默认的渲染流程中
    const originalRender = fish.View.prototype.__render;
    fish.View.prototype.__render = function() {
        var res = originalRender.apply(this, arguments);
        compile(this);
        return res;
    }
}

// 自定义 Handlebars 的编译函数
function customHandlebarsCompile() {
    const HandlebarsCompile = Handlebars.compile;
    Handlebars.compile = function(template, options) {
        var tpl = preCompile(template);
        return HandlebarsCompile(tpl, options);
    }
}
