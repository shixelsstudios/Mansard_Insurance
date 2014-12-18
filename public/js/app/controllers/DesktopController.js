define([
    'Mansard', 
    'backbone', 
    'marionette', 
    'views/SearchView', 
    'views/DesktopHeaderView',
    'views/ProfileView',
    'views/LoginView',
    'views/ProductsView'
    ],
    function (
    Mansard, 
    Backbone, 
    Marionette, 
    SearchView, 
    DesktopHeaderView,
    ProfileView,
    LoginView,
    ProductsView
    ){
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            
            
        },
        //gets mapped to in AppRouter's appRoutes
        index:function () {
            
        },
        login: function() {
            if (!Mansard.isLoggedIn) {
             Mansard.fullAppRegion.show(new LoginView());
            } else {
                this.dashboard();
            }
        },
        dashboard: function() {
            if (Mansard.isLoggedIn) {
                Mansard.headerRegion.show(new DesktopHeaderView({title: 'Customer Search'}));
                Mansard.profileRegion.show(new ProfileView());
                Mansard.mainAppRegion.show(new SearchView()); 
            } else {
                this.login();
            }
           
        },
        products: function() {
            if (Mansard.isLoggedIn) {
                Mansard.headerRegion.show(new DesktopHeaderView({title: 'Products Search'}));
                Mansard.profileRegion.show(new ProfileView());
                Mansard.mainAppRegion.show(new ProductsView());
            } else {
                this.login();
            }
        }
    });
});