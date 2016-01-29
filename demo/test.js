// console.log('run test');
define(['hbs!LayoutTpl'], function(LayoutTpl) {
    // console.log('tpl:', LayoutTpl())

    // XTag.connectToFish(fish);
    // XTag.connectToFish(fish, { enableView: true });
    // console.log(XTag);

    fish.View.configure({ manage: true });
    var DemoView = fish.View.extend({
        el: $('#pageRoot'),
        template: LayoutTpl,
        initialize: function() {
            // this.setView('#icheck', new XTag.Checkbox());
        },
        getTableOption: function() {
            return {
                head: [
                    { text: '- A -' },
                    { text: '- B -' },
                    { text: '- C -' }
                ],
                body: [
                    [
                        { text: 'AAA' },
                        { text: 'BBB' },
                        { text: 'CCC' }
                    ], [
                        { text: 'A-1' },
                        { text: 'B-1' },
                        { text: 'C-1' }
                    ], [
                        { text: 'A-2' },
                        { text: 'B-2' },
                        { text: 'C-2' }
                    ]
                ]
            };
        },
        afterRender: function() {
            var self = this;
            console.log('after render', this);
            window.switcher = this.switcher;
            window.checkbox = this.checkbox;
            window.select = this.select;
            window.picker = this.picker;
            window.tab = this.tab;
            window.table = this.table;
            window.tabSwitcher = this.tabSwitcher;

            // 绑定 change 事件
            // this.switcher.onChange(function(event) {
            //     // 在 onChange 的回调函数中，this 指向 switcher 实例
            //     console.log('%cswitcher:', 'color:green', this.isChecked());
            // });
            // this.checkbox.onChange(function() {
            //     console.log('%ccheckbox:', 'color:blue', self.checkbox.isChecked());
            // });

            // tabSwitcher.onChange(function() { table.$el.toggle(this.value) });
            // switcher.onChange(function() { tab.activeTab = (tab.activeTab + 1)%3 });
            // checkbox.onChange(function() { switcher.value = this.value });
        }
    });

    var demo = window.demo = new DemoView();
    demo.render();

});
