define( ['Mansard', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/profile'],
    function(Mansard, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            agent: null,
            session_token: null,
            graphs: null,
            model: null,
            // View Event Handlers
            events: {

            },
            initialize: function() {

                if (localStorage.getItem("session")) {
                    var jsonObject = JSON.parse(localStorage.getItem("session"));

                    this.session_token = jsonObject.session_token;

                    this.agent = JSON.parse(JSON.parse(jsonObject.agent)); 

                    this.graphs = Mansard.api.dashboard(this.agent.AgentCode);
                    
                    var nonlifeperc = (this.graphs.nonlife.YTD / this.graphs.nonlife.Target) * 100;
                    var lifeperc = (this.graphs.life.YTD / this.graphs.life.Target) * 100;

                    this.graphs.nonlifeperc = nonlifeperc;
                    this.graphs.lifeperc = lifeperc;

                    this.graphs.claims.Target = Mansard.api.digits(this.graphs.claims.Target);
                    this.graphs.life.Target = Mansard.api.digits(this.graphs.life.Target);
                    this.graphs.nonlife.Target = Mansard.api.digits(this.graphs.nonlife.Target);

                    this.graphs.nonlife.YTD = Mansard.api.digits(this.graphs.nonlife.YTD);
                    this.graphs.life.YTD = Mansard.api.digits(this.graphs.life.YTD);


                    console.log(this.graphs);

                    this.model = new Model({agent: this.agent, graphs: this.graphs});
                }

                
            },
            onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
				this.$el = this.$el.children();
				this.setElement(this.$el);
			}
        });
    });