// console.log('run test');
define(function(LayoutTpl) {
    // console.log('tpl:', LayoutTpl())


    XTag.connectToFish(fish);
    // console.log(XTag);

    var tpl =
        '<section class="page-section">'+
            '<h3>Switch Button</h3>'+
            '<x-switcher name="switcher" checked="checked"></x-switcher>'+
            '<x-checkbox name="checkbox" checked="checked"></x-checkbox>'+
        '</section>'+
        '<section class="page-section">'+
            '<h3>Shadow Switcher</h3>'+
            '<s-switcher name="switcher" checked="checked"></s-switcher>'+
        '</section>';

    function LayoutTpl() {return tpl}

    fish.View.configure({ manage: true });
    var DemoView = fish.View.extend({
        el: $('#pageRoot'),
        template: LayoutTpl,
        afterRender: function() {
            var self = this;
            console.log('after render', this);
            window.checkbox = this.checkbox;
            window.switcher = this.switcher;

            this.checkbox.onChange(function() {
                console.log('checkbox:', this.isChecked());
            });
            this.switcher.onChange(function() {
                console.log('switcher:', this.isChecked());
            });
        }
    });

    var demo = window.demo = new DemoView();
    demo.render();

});
