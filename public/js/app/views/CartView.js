define( ['Mansard', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/cart'],
    function(Mansard, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            model: null,
            // View Event Handlers
            events: {

            },
            initialize: function() {
            },
            onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
				this.$el = this.$el.children();
				this.setElement(this.$el);
                $('.main-menu-button, #right-area-container').removeClass('close-main-nav active');
                $('#main-nav-container, #right-area-container').animate({'left': '0%'});
			}
        });
    });