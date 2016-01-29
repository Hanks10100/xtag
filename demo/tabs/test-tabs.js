// console.log('run test');
define(function(LayoutTpl) {
    // console.log('tpl:', LayoutTpl())

    document.createElement('x-select');
    document.createElement('ued-select');


    XTag.connectToFish(fish);
    // console.log(XTag);

    var tpl =
        '<section class="page-section">'+
            '<h3>Tabs</h3>'+
            '<x-tabs name="tab">'+
                '<group>'+
                    '<trigger>AA</trigger>'+
                    '<target>'+
                        '<h4>AAA Panel</h4>'+
                        '<p>there is something of A.</p>'+
                    '</target>'+
                '</group>'+
                '<group active="active">'+
                    '<trigger>BB</trigger>'+
                    '<target>'+
                        '<h4>BBB Panel</h4>'+
                        '<p><x-switcher name="switcher" checked="checked"></x-switcher><b>switcher</b></p>'+
                    '</target>'+
                '</group>'+
                '<group>'+
                    '<trigger>CC</trigger>'+
                    '<target><h4>CCC Panel</h4></target>'+
                '</group>'+
            '</x-tabs>'+
        '</section>';



    fish.View.configure({ manage: true });
    var DemoView = fish.View.extend({
        el: $('#pageRoot'),
        template: function() { return tpl },
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
