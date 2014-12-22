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
        Mansard.cart.items = [{name: 'product1', qty:1}, {name: 'product2', qty: 2}]
        Mansard.env = "dev";
        Mansard.customer = {
            CustomerNo: "3100001536",
            Fullname: "AKINDELE ADEBAYO ADESIJI",
            PhoneNo: null,
            addy: "178 Awolowo Road Ikoyi Lagos",
            bdate: "1/21/1977 12:00:00 AM",
            email: "adebayo.akindele@gtbank.com",
            label: "AKINDELE ADEBAYO ADESIJI",
            tel2: "08035892501",
            value: "3100001536"
        };

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
            fullAppRegion: "#page"
        });

        Mansard.addInitializer(function () {
            Backbone.history.start();
        });

        Mansard.mobile = isMobile();

        return Mansard;
    });