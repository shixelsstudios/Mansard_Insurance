define( ['Mansard', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/searchResult', 'views/QuickResultView'],
    function(Mansard, Backbone, Marionette, $, Model, template, QuickResultView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            model: null,
            result: null,
            quickResult: null,

            // View Event Handlers
            events: {
                'click .quick-open': 'showQuickResult'
            },
            initialize: function(options) {
                this.result = options.result;

                this.model = new Model ({result: this.result});
            },
            onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
				this.$el = this.$el.children();
				this.setElement(this.$el);
			},
            showQuickResult: function(e) {
                e.preventDefault();
                this.quickResult = this.result;
                var quick_result = new QuickResultView({quickResult: this.quickResult});
                this.renderQuickResult(quick_result);

            },
            renderQuickResult: function(quickResult) {
               var selector = '.search-quick-result-container';
               console.log(quickResult, selector);
               $(selector).html(quickResult.render().el);
               
            }
        });
    });