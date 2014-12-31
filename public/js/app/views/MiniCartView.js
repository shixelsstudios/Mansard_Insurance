define( ['Mansard', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/miniCart'],
    function(Mansard, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            model: null,
            items: null,
            total: null,
            // View Event Handlers
            events: {

            },
            initialize: function() {

                if (Mansard.cart.count() > 2) {
                    this.items = [Mansard.cart.items[0], Mansard.cart.items[1],Mansard.cart.items[2]];
                } else {
                    this.items = Mansard.cart.items;
                } 

                for (var i = 0; i < this.items.length; i++) {
                    this.items[i].pos = i;
                    this.items[i].img = 'default_product.png';
                    this.total += this.items[i].price;
                    this.items[i].price = this.items[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                this.total = this.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.model = new Model({items: this.items, total: this.total});
            },
            onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
				this.$el = this.$el.children();
				this.setElement(this.$el);
			}
        });
    });