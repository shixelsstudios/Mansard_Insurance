/*
    MansardAPI
    - Does all API calls and returns JSON objects for use
*/
define([
    "jquery",
    "underscore",
    "backbone"
    ],
    function(
    $,
    _,
    Backbone
    ){
    // Creates a new Backbone Model class object
    var MansardAPI = Backbone.Model.extend({

        initialize: function() {
            _.bindAll(this);

        },
        login: function (credentials) {    
            var self = this;
            $('.login-load').show();
            $('.login-overlay').fadeIn();
            var loginTimeout = setTimeout(function () {
                $.ajax({
                    url: 'https://online.mansardinsurance.com/MansardSalesWebApi/api/MobileLogin/atu?CustomerNo=0&passcode=0&Username=' + credentials.username + '&Password=' + credentials.password,
                    type: 'POST',
                    success: function (rData) {

                        if (rData.username) {
                            self.session(JSON.stringify(rData));
                            Mansard.appRouter.navigate('#dashboard', {trigger: true}); 
                        }
                        else {
                            $('.login-load').hide();
                            $('.login-error').html('<div class="alert alert-warning" role="alert">Incorrect Username and/or Password!</div>')
                            $('.login-overlay').fadeOut();

                            clearTimeout(loginTimeout);
                        }
                    },
                    complete: function() {
                        clearTimeout(loginTimeout);
                    }
                });
            }, 10000);
        },
        logout: function() {
            localStorage.removeItem('session');
            Mansard.appRouter.navigate('#login', {trigger: true});
            Mansard.isLoggedIn = false;
        },
        search: function(query) {
            var send = null;
            $.ajax({
                url:'https://online.mansardinsurance.com/MansardSalesWebApi/api/Customer/Post_GetCustomerByName/' + query,
                async: false,
                success: function (rData) {
                    send = rData;
                }
            });

            return(send);
        },
        isFA: function(agent_code) {
            $.ajax({
                    url: 'https://online.mansardinsurance.com/MansardSalesWebApi/api/Agent/Get?agentCode=' + agent_code,
                    type: 'GET',
                    success: function (rData) {
                    console.log(rData.NeedsSalesDiary);
                }
            });
        },
        quote: function(type, data) {
            var url = null;
            var send = null;
            if (type === 'motor') {
                url = 'https://online.mansardinsurance.com/MansardSalesWebApi/api/Quote/jComputePremium_Motor';
            } else if (type === 'life') {
                url = 'https://online.mansardinsurance.com/MansardSalesWebApi/api/Riders/Post_GetLifeRiders';
            }

            $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                    async: false,
                    success: function (rData) {
                        send = rData;
                }
            });

            return send;
        },
        products: function(type) {
            var url = null;
            var send = null;
            if (type === 'motor') {
                url = 'https://online.mansardinsurance.com/MansardSalesWebApi/api/Products/GetProducts_Motor';
            } else if (type === 'life') {
                url = 'https://online.mansardinsurance.com/MansardSalesWebApi/api/Products/GetProducts_Life';
            }

            $.ajax({
                url: url,
                type: 'GET',
                async: false,
                success: function (rData) {
                   send = rData;
                }
            });

            return send;
        },
        contact: function(name) {

            $.ajax({
                url: 'https://online.mansardinsurance.com/MansardSalesWebApi/api/Contacts/getContactByName?contactname=' + name,
                type: 'GET',                     
                success: function (rData) {
                    console.log(rData);
                }
            });

        },
        save_contact: function(data) {
            $.ajax({
                url: 'https://online.mansardinsurance.com/MansardSalesWebApi/api/Contacts/Post_SaveContactInfo',
                type: 'post',
                data: data,
                success: function(res) {
                    $('.contact-add-form')[0].reset();
                    $('.submit-contact-button').removeAttr('disabled');
                    $('.submit-contact-button').html('Save Contact');
                    $('.contact-message').html(res.Message);
            }

            });
        },
        customer: function(credentials) {
            var send = null;
            $.ajax({
                url: 'https://online.mansardinsurance.com/MansardSalesWebApi/api/Customer/getCustomerPolicies?customerNo=' + credentials.customerNo +'&email=' + credentials.email,
                async: false,
                success: function(rData) {
                   send = rData;
                }
            });

            return send;
        },
        session: function(agent) {
            var token = 'MA_' + this.generateToken(70);
            var current_session = {agent: JSON.stringify(agent), session_token: token};
            localStorage.setItem('session', JSON.stringify(current_session));
        },
        token: function() {
            var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
            return chars.substr( this.getRandomNumber(62), 1 );
        },
        getRandomNumber: function(range) {
            return Math.floor(Math.random() * range);
        },
        generateToken: function(size)
        {
            var str = "";
            for(var i = 0; i < size; i++)
            {
                str += this.token();
            }
            return str;
        },
        discovery_quesions: function() {
             $.ajax({
                url: 'https://online.mansardinsurance.com/MansardSalesWebApi/api/Discovery/Post_GetAllDiscoveryInterviewQuestions',
                type: 'POST',
                success: function(res){
                    console.log(res);
                }
            });
        }
        });

    // Returns the Model class
    return  MansardAPI;

}

);
