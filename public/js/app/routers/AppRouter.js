define(['backbone', 'marionette'], function(Backbone, Marionette) {
   return Backbone.Marionette.AppRouter.extend({
       //"index" must be a method in AppRouter's controller
       appRoutes: {
           "": "index",
           "login": "login",
           "dashboard/:type": "dashboard",
           "products": "products",
           "products/:customer": "products",
           "contact/add": "contactAdd",
           "customer?*user": "customer",
           "discovery": "discovery",
           "kyc": "kyc",
           "cart": "cart",
           "policy/save/:type": 'policy',
           "esms": "esms"
       }
   });
});