define( ['Mansard', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/profile'],
    function(Mansard, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            agent: null,
            session_token: null,
            model: null,
            // View Event Handlers
            events: {

            },
            initialize: function() {
                var jsonObject = JSON.parse(localStorage.getItem("session"));
                this.session_token = jsonObject.session_token;
                this.agent = JSON.parse(JSON.parse(jsonObject.agent)); 
                console.log(this.agent);
                this.model = new Model({agent: this.agent});
            },
            onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
				this.$el = this.$el.children();
				this.setElement(this.$el);
			}
        });
    });