// console.log('run test');
define(function(LayoutTpl) {
    // console.log('tpl:', LayoutTpl())

    document.createElement('x-select');
    document.createElement('ued-select');


    XXX.connectToFish(fish);
    // console.log(XXX);

    var tpl =
        '<section class="page-section">'+
            '<h3>Tabs</h3>'+
            '<x-tabs name="tab" align="left">'+
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

    function LayoutTpl() {return tpl}

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

            this.tab.onChange(function() {
                console.log('change To:', this.getCurrentTab().index);
            });
            this.switcher.onChange(function() {
                console.log('switcher:', this.isChecked());
            });

            $(window).on('resize', function() {
                if (window.innerWidth < 500) {
                    tab.alignTo('top');
                }
                if (window.innerWidth > 500) {
                    tab.alignTo('left');
                }
            })
        }
    });

    var demo = window.demo = new DemoView();
    demo.render();

});
