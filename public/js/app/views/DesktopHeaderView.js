define(['jquery', 'hbs!templates/desktopHeader', 'backbone','models/Model', 'marionette'],
    function ($, template, Backbone, Model) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            model: null,
            initialize: function(options) {
                this.model = new Model({title: options.title, button: options.button, menu: options.menu, cart_num: Mansard.cart.count(), isCart: options.isCart, nav: options.nav, nav_button: options.nav_button});
            },
            onRender: function () {
             // get rid of that pesky wrapping-div
            // assumes 1 child element.
                this.$el = this.$el.children();
                this.setElement(this.$el);
            }
        });
    });