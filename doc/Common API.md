# 通用约定

 > 多一些约定，少一些代码。

## 组件

### 组件类名要和自定义的标签名一致
如： `Select` 这个类对应的就是 `<x-select>` 这个标签。标签名不区分大小写，`x-` 前缀可以通过配置修改。

### 构造函数的参数
所有组件类的构造函数都接受（且只接受）两个参数：`options` 和 `configs` 。

 - `options` : 组件的初始化配置项，从原标签的属性中获取
 - `configs` : 额外的配置项，用于传递当前组件的运行环境等动态信息 （不常用，作为预留接口）

### 方法返回值
组件的每个方法，除非是明确的取值方法，否则全部返回 `this` ，方便链式调用。

### `type` 属性
静态属性，不可修改，用于描述组件的类型。

### `$el` 属性
为了兼容 Backbone.View ，每个组件实例都有 `$el` 属性，表示了组件（最外层）DOM 结构的 jQuery 对象。

### `value` 方法/属性
每个组件都应该提供 `value` 方法来获取自身的当前值。若浏览器支持 `getter/setter` 则将其定义为取值和设值方法。

### `afterMount` 方法
若定义了 `afterMount` 方法，则将会在组件节点加入 DOM 中后被调用，适用于必须依赖真实 DOM 结构的组件。

因为将标签转换成 `Element` 是在内存中进行的，无法获取真实 DOM 节点的宽高等数据，因此可以将现有组件的初始化放在此方法中。

### `bindEvents` 方法
用于绑定内部监听的事件。

### `initElement` 方法
用于生成 `this.$el` 的结构，接受和构造函数一样的参数，返回 `this.$el`。

### `adjustLayout` 方法
用于调整布局。会依赖外层标签的结构和宽高，所有应当在 `afterMount` 中被调用。


## 标签

### `name` 属性
**标签都应该有 `name` 属性。** 表示其在 `View` 中的唯一名字，行为类似于 `id` 选择器。若定义了 `name` 则会在相应的 `View` 实例中挂载相应的组件对象。
```html
<!-- 在 DemoView 的模板文件中 -->
<x-select name="select"></x-select>
```

```js
// 创建 DemoView 的实例
var view = new DemoView();
view.select instanceof Framework.Select; // true

view.select.getValue(); // 获取当前选择框的值
```


### 可以把同名函数名当作属性值
### 标签上的属性都会传递给相应组件的构造函数


## 样式

 - 基础样式命名采用小写字母加 `-` 的方式。
 - 尽量避免类名嵌套
 - 表示状态的类名单独使用无效，如：`selected` `active` `disabled` `readonly`


## 常用功能
将常用功能写成 `mixin` ，用扩展原型链的方式复用其逻辑。

 > 组合优于继承。

若要使 `mixin` 通用，则要求各个组件必须有通用的约定。行为相似的属性要有相同的属性名，使得 `mixin` 可以不关心具体结构和实现方法。（鸭子类型）

### 自定义事件
使用 `Backbone.Events` 。


### “启用” 和 “禁用”
`availableMixin` 可用于实现 “启用” 和 “禁用” 功能。用法如下：
```js
// 添加启用和禁用功能
_.extend(Component.prototype, Framework.mixins.authorize);
```

#### 使用要求
*选中的为强制要求，未选中的为可选项。*
 - [x] 组件要有 `$el` 属性。
 - [ ] 组件要有 `$input` 属性，表示其中的表单元素。

#### 添加的方法

 - `setAvailable` : 设定是否启用组件，参数为布尔值，默认 false，返回 this
 - `isEnabled`: 判断是否可用，无参数，返回布尔值
 - `enable`: 启用组件，无参数，返回 this
 - `disable`: 禁用组件，无参数，返回 this
 - `toggleEnable`: 切换启用和禁用状态，无参数，返回 this


### 自动数据绑定功能
基于 `getter/setter` 。

### 自动监听 DOM 节点变化的功能
基于 `MutationObserver` 。

