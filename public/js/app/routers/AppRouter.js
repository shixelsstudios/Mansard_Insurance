define(['backbone', 'marionette'], function(Backbone, Marionette) {
   return Backbone.Marionette.AppRouter.extend({
       //"index" must be a method in AppRouter's controller
       appRoutes: {
           "": "login",
           "login": "login",
           "dashboard": "dashboard",
           "products": "products",
           "contact/add": "contactAdd",
           "customer": "customer",
           "discovery": "discovery",
           "kyc": "kyc",
           "cart": "cart",
           "policy/save/:type": 'policy'
       }
   });
});