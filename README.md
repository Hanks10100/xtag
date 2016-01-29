# 支持标签化的组件
实现编译自定义标签的功能，向 `HTML6` 和 `WebComponent` 看齐。

## About

 > `x-tag` 中的组件并不是完整的组件，而是“未封装的”，仅用来转义自定义的标签。

`x-tag` 中的组件所关注的只是 **把 `HTMLUnknownElement` 按照其标签名和属性值转换成相应的组件。** 可以任意和其他框架配合，在恰当的时机转义标签。

### compile | 转义过程

提供了一个 `compile(env)` 函数，可以编译标签。通过 `env.$(selector)` 的方式找到需要转义的标签，组件初始化所需要的数据也都是从 `env` 中取出来的，最终也是生成一个组件实例挂在 `env` 上，这个过程不依赖 `document` 对象，可以看作基于 `jQuery` 的 `Virtual DOM` 。

组件编译完成后，会用其 `el` 属性替换原有的 DOM 节点。


### afterMount | 节点挂载到 DOM 之后的额外操作 
由于转义过程不依赖 `document` 对象，也无法获取组件真实的宽高等属性，若有此类依赖真实 DOM 的操作（如自适应布局，添加滚动条等），可以放入 `afterMount` 方法之中。


## 组件类别

 - Switcher
 - Checkbox
 - Tabs
 - Select
 - Table
 - Datetimepicker

## 通用约定

参考 [Common API](doc/Common%20API.md) 。
