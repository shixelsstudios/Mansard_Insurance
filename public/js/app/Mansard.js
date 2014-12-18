define([
    'jquery', 
    'backbone', 
    'marionette', 
    'underscore', 
    'handlebars',
    'models/MansardAPI'
    ],
    function (
    $, 
    Backbone, 
    Marionette, 
    _, 
    Handlebars,
    MansardAPI
    ){
        var Mansard = window.Mansard = new Backbone.Marionette.Application();

        function isMobile() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
        }

        Mansard.api = new MansardAPI();
        Mansard.env = "dev";
        

        if (localStorage.getItem("session") === null) {
            Mansard.isLoggedIn = false;
        } else {
            Mansard.isLoggedIn = true;
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