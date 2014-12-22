define([
    'Mansard', 
    'backbone', 
    'marionette', 
    'views/SearchView', 
    'views/DesktopHeaderView',
    'views/ProfileView',
    'views/LoginView',
    'views/ProductsView',
    'views/ContactAddView',
    'views/CustomerProfileView'
    ],
    function (
    Mansard, 
    Backbone, 
    Marionette, 
    SearchView, 
    DesktopHeaderView,
    ProfileView,
    LoginView,
    ProductsView,
    ContactAddView,
    CustomerProfileView
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
                Mansard.headerRegion.show(new DesktopHeaderView({title: 'Customer Search', button: 'fa fa-plus', menu: 'add-contact-button', isCart: false, nav: 'fa fa-bars', nav_button: 'main-menu-button'}));
                Mansard.profileRegion.show(new ProfileView());
                Mansard.mainAppRegion.show(new SearchView()); 
           } else {
               this.login();
           }
           
        },
        products: function() {
            if (Mansard.isLoggedIn) {
                Mansard.headerRegion.show(new DesktopHeaderView({title: 'Products Search', button: 'fa fa-shopping-cart', menu: 'cart-button', isCart: true, nav: 'fa fa-chevron-left', nav_button: 'back-menu-button'}));
                Mansard.profileRegion.show(new ProfileView());
                Mansard.mainAppRegion.show(new ProductsView());
            } else {
                this.login();
            }
        },
        contactAdd: function() {
            if (Mansard.isLoggedIn) {
                Mansard.headerRegion.show(new DesktopHeaderView({title: 'Add a Contact', button: 'fa fa-plus', menu: 'add-contact-button', isCart: false, nav: 'fa fa-chevron-left', nav_button: 'back-menu-button'}));
                Mansard.profileRegion.show(new ProfileView());
                Mansard.mainAppRegion.show(new ContactAddView());
            } else {
                this.login();
            }
        },
        customer: function() {
            if (Mansard.isLoggedIn) {
            Mansard.headerRegion.show(new DesktopHeaderView({title: 'Customer Porfile', button: 'fa fa-shopping-cart', menu: 'cart-button', isCart: true, nav: 'fa fa-chevron-left', nav_button: 'back-menu-button'}));
                Mansard.profileRegion.show(new ProfileView());
                Mansard.mainAppRegion.show(new CustomerProfileView());
            } else {
                this.login();
            }
        }
    });
});