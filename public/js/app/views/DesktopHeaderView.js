define(['jquery', 'hbs!templates/desktopHeader', 'backbone','models/Model', 'marionette'],
    function ($, template, Backbone, Model) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            model: null,
            initialize: function(options) {
                
                this.model = new Model({title: options.title});
            },
            onRender: function () {
             // get rid of that pesky wrapping-div
            // assumes 1 child element.
                this.$el = this.$el.children();
                this.setElement(this.$el);
            }
        });
    });