define( ['Mansard', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/quickResult'],
    function(Mansard, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            model: null,
            // View Event Handlers
            events: {

            },
            initialize: function(options) {
                this.model = new Model({quickResult: options.quickResult});
            },
            onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
				this.$el = this.$el.children();
				this.setElement(this.$el);
			}
        });
    });