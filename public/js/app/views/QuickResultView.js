define( ['Mansard', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/quickResult'],
    function(Mansard, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            quickResult: null,
            model: null,
            // View Event Handlers
            events: {
                'click .view-full-profile': 'viewProfile'
            },
            initialize: function(options) {
                this.quickResult = options.quickResult;
                this.model = new Model({quickResult: this.quickResult});
            },
            onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
				this.$el = this.$el.children();
				this.setElement(this.$el);
			},
            viewProfile: function() {
                console.log(Mansard, Backbone, Marionette, $, Model, template);
              //  Mansard.customer =  this.quickResult;
            }
        });
    });