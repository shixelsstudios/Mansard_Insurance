define( ['Mansard', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/savePolicy'],
    function(Mansard, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            policy_type: null,
            model: null,
            // View Event Handlers
            events: {
            },
            initialize: function(options) {

                this.policy_type = options.type;

                if (this.policy_type === 'motor') {
                    this.model = null;
                } else if (this.policy_type === 'life'){
                    this.model = null;
                }
            },
            onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
				this.$el = this.$el.children();
				this.setElement(this.$el);
			},
            logout: function() {
            }
        });
    });