define( ['Mansard', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/kyc'],
    function(Mansard, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            questions: null,
            model: null,
            // View Event Handlers
            events: {
                'click .choose-ind': 'showIndForm',
                'click .choose-corp': 'showCorpForm',
                'click .submit-corp': 'submitCorpForm',
                'click .submit-ind' : 'submitIndForm'
            },
            initialize: function() {
                //this.questions = Mansard.api.kyc();

                //console.log(this.questions);
            },
            onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
				this.$el = this.$el.children();
				this.setElement(this.$el);
			},
            showCorpForm: function(e) {
                e.preventDefault();

                $('.ind-form').hide();
                
                $('.temp-search-result').hide();
                
                $('.choose-ind').removeClass('active');
                
                $(e.currentTarget).addClass('active');
               
                $('.corp-form').show();
            },
            showIndForm: function(e) {
                e.preventDefault();
                
                $('.corp-form').hide();
                
                $('.temp-search-result').hide();
                
                $('.choose-corp').removeClass('active');
                
                $(e.currentTarget).addClass('active'); 
                
                $('.ind-form').show();
            },
            submitIndForm: function(e) {
                e.preventDefault();
            },
            submitCorpForm: function(e) {
                e.preventDefault();
            }
        });
    });