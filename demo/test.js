define(['hbs!LayoutTpl'], function(LayoutTpl) {
    // console.log('tpl:', LayoutTpl())
    // console.log(XTag);

    // fish.View.configure({ manage: true });
    // var DemoView = fish.View.extend({
    //     el: $('#pageRoot'),
    //     template: LayoutTpl,
    //     afterRender: function() {
    //         console.log('after render', this);
    //         window.switcher = this.switcher;
    //         window.checkbox = this.checkbox;
    //         window.select = this.select;
    //         window.picker = this.picker;
    //         window.tab = this.tab;
    //         window.table = this.table;
    //         window.tabSwitcher = this.tabSwitcher;

    //         // 绑定 change 事件
    //         this.switcher.onChange(function(event) {
    //             // 在 onChange 的回调函数中，this 指向 switcher 实例
    //             console.log('%cswitcher:', 'color:green', this.value);
    //         });
    //         this.checkbox.onChange(function() {
    //             console.log('%ccheckbox:', 'color:blue', this.isChecked());
    //         });
    //     }
    // });

    // var demo = window.demo = new DemoView();
    // demo.render();

});
