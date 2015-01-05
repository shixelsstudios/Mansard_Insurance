define( ['Mansard', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/products'],
    function(Mansard, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            model: null,
            motor_products: null,
            life_products: null,
            product_type : null,
            product: null,
            // View Event Handlers
            events: {
                'click .choose-motor': 'showMotorProducts',
                'click .choose-life': 'showLifeProducts',
                'click .quote-motor': 'startMotorQuote',
                'click .quote-life': 'startLifeQuote',
                'click .quote-motor-button-btn': 'getMotorQuote',
                'click .quote-life-button-btn': 'getLifeQuote',
                'click .add-to-cart-button': 'addToCart',
                'click .back-menu-button': 'handleBack'
            },
            initialize: function() {
                this.motor_products = Mansard.api.products('motor');
                this.life_products = Mansard.api.products('life');

                for (var i =0; i < this.motor_products.length; i++) {
                    if (this.motor_products[i].IsWholeLife) {
                        this.motor_products[i].IsWholeLife = '1';
                    } else {
                        this.motor_products[i].IsWholeLife = '0';
                    }
                }
                for (var j =0; j < this.life_products.length; j++) {
                    if (this.life_products[j].IsWholeLife) {
                        this.life_products[j].IsWholeLife = '1';
                    } else {
                        this.life_products[j].IsWholeLife = '0';
                    }
                }
                this.product = {};
                this.model = new Model({motor: this.motor_products, life: this.life_products});
            },
            onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
				this.$el = this.$el.children();
				this.setElement(this.$el);
			},
            showMotorProducts: function() {
                $('.life-dropdown').slideUp();
                $('.motor-dropdown').slideDown();
            },
            showLifeProducts: function() {
                $('.life-dropdown').slideDown();
                $('.motor-dropdown').slideUp();
            },
            startMotorQuote: function(e){
                e.preventDefault();

                var quote_against = $('.motor-drop').find('option:selected');

                $('.temp-search-result').hide()
                $('.quote-title').html(quote_against.val());
                $('.quote-question-1').html('<label class="quote-question-1-label">Current value of vehicle(Sum Assured):</label><input class="quote-question-1-q" type="text" placeholder="e.g. 100,000">');
                $('.quote-question-2').html('<label class="quote-question-2-label">Vehicle Category:</label><select class="quote-question-2-q"><option value="0">--Select Vehicle Category--</option><option value="1">Saloon</option><option value="95">SUV</option></select>');
                $('.quote-button').html('<button class="btn btn-primary quote-motor-button-btn">Get Quote</button>');

                this.product.product_type = quote_against.data('productcode');
                this.product.name = quote_against.val();
                this.product.product_id = quote_against.data('productid');
                this.product.product_class = quote_against.data('productclassid');
                this.product.wholelife = quote_against.data('iswholelife');
            },
            startLifeQuote: function(e) {
                e.preventDefault();

                var quote_against = $('.life-drop').find('option:selected');

                $('.temp-search-result').hide()
                this.product.product_type = quote_against.data('productcode');
                this.product.name = quote_against.val();
                this.product.product_id = quote_against.data('productid');
                this.product.product_class = quote_against.data('productclassid');
                this.product.wholelife = quote_against.data('iswholelife');

                this.getLifeQuote(this.product.productid);
            },
            getMotorQuote: function(e) {
                e.preventDefault();

                if ($('.quote-question-2-q').val() === '0' || !$('.quote-question-1-q').val()) {
                    $('.quote-error').html('<div class="alert alert-warning" role="alert">Please fill out all fields!</div>');
                } else if (isNaN($('.quote-question-1-q').val())) {
                    $('.quote-error').html('<div class="alert alert-warning" role="alert">Please enter value amount!</div>');
                } else {
                    $('.quote-error').fadeOut();
                    var policy_type = this.product.product_id;
                    var data = {
                        sumassured: $('.quote-question-1-q').val(),
                        policy: policy_type,
                        bodyTypeCode: $('.quote-question-2-q').val()
                    };
                    this.product.sumassured = data.sumassured;
                    this.product.bodytype = data.bodyTypeCode;
                    var quote_result = Mansard.api.quote('motor', data);
                    this.product.quote = quote_result;
                    this.product.qty = 1;
                    $('.quote_amount').html(quote_result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    $('.quote_value').slideDown();
                    $('.quote-form').slideUp();
                }
            },
            getLifeQuote: function() {

                var policy_type = this.product.product_id;
                var data = {
                    policy: policy_type,
                };
                var quote_result = Mansard.api.quote('life', data);
                this.product.quote = quote_result;
                this.product.qty = 1;
                if (!quote_result.summassured) {
                    quote_result.summassured = '0';
                }
                $('.quote_amount').html(quote_result.summassured.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                $('.quote_value').slideDown();
                $('.quote-form').slideUp();
            },
            addToCart: function() {
                Mansard.cart.add(this.product);
                $('.cart-num').html(Mansard.cart.count());
            },
            handleBack: function() {
                console.log('back');
                Backbone.history.back();
            }
        });
    });