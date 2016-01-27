// console.log('run test');
define(function(LayoutTpl) {
    // console.log('tpl:', LayoutTpl())

    XXX.connectToFish(fish);
    // console.log(XXX);

    var tpl =
        '<section class="page-section">'+
            '<h3>Select</h3>'+
            '<x-select name="select">'+
                '<x-option value="A">--- A ---</x-option>'+
                '<x-option value="B">--- B ---</x-option>'+
                '<x-option value="C">--- C ---</x-option>'+
                '<x-option value="D">--- D ---</x-option>'+
            '</x-select>'+
        '</section>';

    function LayoutTpl() {return tpl}

    fish.View.configure({ manage: true });
    var DemoView = fish.View.extend({
        el: $('#pageRoot'),
        template: LayoutTpl,
        afterRender: function() {
            var self = this;
            console.log('after render', this);
            console.log(this.select);
            window.select = this.select;

            this.select.onChange(function() {
                console.log('change To: %c%s', 'color:blue', this.getValue());
            });
        }
    });

    var demo = new DemoView();
    demo.render();

});