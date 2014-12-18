define( ['Mansard', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/search', 'views/SearchResultView'],
    function(Mansard, Backbone, Marionette, $, Model, template, SearchResultView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,

            defaults: {
                model: null,
                searchStore: null
            },
            // View Event Handlers
            events: {
                'keyup .customer-search': 'searchHandler'
            },
            onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
                this.$el = this.$el.children();
                this.setElement(this.$el);
            },
            searchHandler: function (e) {
                var query = e.currentTarget.value; 
                var selector = '.search-results-container';
                this.$el.find(selector).html('');               
                if (query.length > 2) {
                    this.searchStore = null;
                    
                    this.searchStore = Mansard.api.search(query);

                    for (var i = 0; i < this.searchStore.length; i++) {
                        var search_result = this.searchStore[i];
                        var result = new SearchResultView({result: search_result});
                        this.renderResult(result,this.searchStore.length);

                    }
                    var result_count_selector = '.results-num';
                    this.$el.find(result_count_selector).html(this.searchStore.length);
                }
                
            },
            renderResult: function(result) {
               var selector = '.search-results-container';
               this.$el.find(selector).prepend(result.render().el);
               
            }
        });
    });