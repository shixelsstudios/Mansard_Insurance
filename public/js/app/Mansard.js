define([
    'jquery', 
    'backbone', 
    'marionette', 
    'underscore', 
    'handlebars',
    'models/MansardAPI',
    'models/MansardCart'
    ],
    function (
    $, 
    Backbone, 
    Marionette, 
    _, 
    Handlebars,
    MansardAPI,
    MansardCart
    ){
        var Mansard = window.Mansard = new Backbone.Marionette.Application();

        function isMobile() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
        }

        Mansard.api = new MansardAPI();
        Mansard.cart = new MansardCart();
        Mansard.discovery_questions = Mansard.api.discovery_quesions();
        Mansard.cart.items = [{name: 'product1', qty:1, price: 5000, customer: '3100001536'}, {name: 'product2', qty: 2, price: 1000000, customer:'3100001536'}];
        Mansard.env = "dev";
        Mansard.customer = null;

        if (localStorage.getItem("session") === null) {
            Mansard.isLoggedIn = false;
            Mansard.currentUser = null;
        } else {
            Mansard.isLoggedIn = true;
            Mansard.currentUser = JSON.parse(JSON.parse(JSON.parse(localStorage.getItem("session")).agent)).username;
        }


        //Organize Application into regions corresponding to DOM elements
        //Regions can contain views, Layouts, or subregions nested as necessary
        Mansard.addRegions({
            headerRegion:"#header-container",
            profileRegion:"#user-profile-container",
            mainAppRegion:"#right-area-container",
            fullAppRegion: "#page",
            navRegion: "#main-nav-container"
        });

        Mansard.addInitializer(function () {
            Backbone.history.start();
        });

        Mansard.mobile = isMobile();

        return Mansard;
    });