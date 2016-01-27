// console.log('run test');
define(['hbs!LayoutTpl'], function(LayoutTpl) {
    // console.log('tpl:', LayoutTpl())

    // XXX.connectToFish(fish);
    // XXX.connectToFish(fish, { enableView: true });
    // console.log(XXX);

    fish.View.configure({ manage: true });
    var DemoView = fish.View.extend({
        el: $('#pageRoot'),
        template: LayoutTpl,
        initialize: function() {
            // this.setView('#icheck', new XXX.Checkbox());
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
        }
    });

    var demo = window.demo = new DemoView();
    demo.render();

});
