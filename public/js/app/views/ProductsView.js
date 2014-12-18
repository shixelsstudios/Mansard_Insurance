define( ['Mansard', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/products'],
    function(Mansard, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            model: null,
            motor_products: null,
            life_products: null,
            // View Event Handlers
            events: {

            },
            initialize: function() {
                this.motor_products = Mansard.api.products('motor');
                this.life_products = Mansard.api.products('life');

                this.model = new Model({motor: this.motor_products, life: this.life_products});
            },
            onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
				this.$el = this.$el.children();
				this.setElement(this.$el);
			}
        });
    });