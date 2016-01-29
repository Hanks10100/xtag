// console.log('run test');
define(['hbs!multi-tabs'], function(LayoutTpl) {
    // console.log('tpl:', LayoutTpl())

    XXX.connectToFish(fish);
    // console.log(XXX);


    fish.View.configure({ manage: true });
    var DemoView = fish.View.extend({
        el: $('#pageRoot'),
        template: LayoutTpl,
        afterRender: function() {
            var self = this;
            console.log('after render', this);
            window.tab = this.tab;
            window.$tab = this.$tab;
            window.switcher = this.switcher;
            window.$switcher = this.$switcher;

            // this.tab.onChange(function() {
            //     console.log('change To:', this.getCurrentTab().index);
            // });
            // this.switcher.onChange(function() {
            //     console.log('switcher:', this.isChecked());
            // });
        }
    });

    var demo = window.demo = new DemoView();
    demo.render();

});
