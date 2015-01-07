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
    'views/CustomerProfileView',
    'views/DiscoveryQuestionsView',
    'views/KYCView',
    'views/NavView',
    'views/CartView',
    'views/SavePolicyView',
    'views/ESMSView'
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
    CustomerProfileView,
    DiscoveryQuestionsView,
    KYCView,
    NavView,
    CartView,
    SavePolicyView,
    ESMSView
    ){
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            Mansard.navRegion.show(new NavView());
            Mansard.profileRegion.show(new ProfileView());
        },
        //gets mapped to in AppRouter's appRoutes
        index:function () {
            if (!Mansard.isLoggedIn) {
             Mansard.fullAppRegion.show(new LoginView());
            } else {
                this.dashboard();
            }
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
                Mansard.mainAppRegion.show(new SearchView()); 
           } else {
               this.login();
           }
           
        },
        products: function() {
            if (Mansard.isLoggedIn) {
                Mansard.headerRegion.show(new DesktopHeaderView({title: 'Products Search', button: 'fa fa-shopping-cart', menu: 'cart-button', isCart: true, nav: 'fa fa-chevron-left', nav_button: 'back-menu-button'}));
                Mansard.mainAppRegion.show(new ProductsView());
            } else {
                this.login();
            }
        },
        contactAdd: function() {
            if (Mansard.isLoggedIn) {
                Mansard.headerRegion.show(new DesktopHeaderView({title: 'Add a Contact', button: 'fa fa-plus', menu: 'add-contact-button', isCart: false, nav: 'fa fa-chevron-left', nav_button: 'back-menu-button'}));
                Mansard.mainAppRegion.show(new ContactAddView());
            } else {
                this.login();
            }
        },
        customer: function(user) {
            user = Mansard.api.parseQueryString(user);
            if (Mansard.isLoggedIn) {
                Mansard.headerRegion.show(new DesktopHeaderView({title: 'Customer Porfile', button: 'fa fa-shopping-cart', menu: 'cart-button', isCart: true, nav: 'fa fa-chevron-left', nav_button: 'back-menu-button'}));
                Mansard.mainAppRegion.show(new CustomerProfileView({user: user}));
            } else {
                this.login();
            }
        },
        discovery: function() {
            if (Mansard.isLoggedIn) {
                Mansard.headerRegion.show(new DesktopHeaderView({title: 'Discovery Questions', button: 'fa fa-shopping-cart', menu: 'cart-button', isCart: true, nav: 'fa fa-chevron-left', nav_button: 'back-menu-button'}));
                Mansard.mainAppRegion.show(new DiscoveryQuestionsView());
            } else {
                this.login();
            }
        },
        kyc: function() {
            if (Mansard.isLoggedIn) {
                Mansard.headerRegion.show(new DesktopHeaderView({title: 'Know Your Customer', button: 'fa fa-shopping-cart', menu: 'cart-button', isCart: true, nav: 'fa fa-chevron-left', nav_button: 'back-menu-button'}));
                Mansard.mainAppRegion.show(new KYCView());
            } else {
                this.login();
            }
        },
        cart: function() {
            if (Mansard.isLoggedIn) {
                Mansard.headerRegion.show(new DesktopHeaderView({title: 'Cart', button: 'fa fa-shopping-cart', menu: 'cart-button', isCart: true, nav: 'fa fa-chevron-left', nav_button: 'back-menu-button'}));
                Mansard.mainAppRegion.show(new CartView());
            } else {
                this.login();
            }
        },
        policy: function(type) {
            if (Mansard.isLoggedIn) {
                if (type === 'motor') {
                    Mansard.headerRegion.show(new DesktopHeaderView({title: 'Save Policy - Motor', button: 'fa fa-shopping-cart', menu: 'cart-button', isCart: true, nav: 'fa fa-chevron-left', nav_button: 'back-menu-button'}));
                } else if (type === 'life') {
                    Mansard.headerRegion.show(new DesktopHeaderView({title: 'Save Policy - Life', button: 'fa fa-shopping-cart', menu: 'cart-button', isCart: true, nav: 'fa fa-chevron-left', nav_button: 'back-menu-button'}));
                }
                Mansard.mainAppRegion.show(new SavePolicyView({type: type}));
            } else {
                this.login();
            }
        },
        esms: function() {
            if (Mansard.isLoggedIn) {
                Mansard.headerRegion.show(new DesktopHeaderView({title: 'Environmental and Social Risk Management System (ESMS)', button: 'fa fa-shopping-cart', menu: 'cart-button', isCart: true, nav: 'fa fa-chevron-left', nav_button: 'back-menu-button'}));
                Mansard.mainAppRegion.show(new ESMSView());
            } else {
                this.login();
            }
        }
    });
});