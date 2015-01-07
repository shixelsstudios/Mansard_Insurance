define( ['Mansard', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/savePolicy'],
    function(Mansard, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            policy_type: null,
            model: null,
            SubAgentCode: null,
            payFreq: null,
            // View Event Handlers
            events: {
                'change .save-policy-product': 'populatePeriods',
                'change .save-policy-payment-period': 'matchPeriodsToPay',
                'change .save-policy-insurance-period': 'matchPeriodsToIns'
            },
            initialize: function(options) {

                this.policy_type = options.type;
                this.SubAgentCode = Mansard.currentUser_SubAgentCode;
                var lifeProducts = Mansard.api.products('life');
                if (this.policy_type === 'motor') {
                    var motor = {};
                    motor.manYears = Mansard.api.policy_dropdowns('manYear');
                    motor.places = Mansard.api.policy_dropdowns('places');
                    motor.uses = Mansard.api.policy_dropdowns('uses');
                    motor.plates = Mansard.api.policy_dropdowns('plates');
                    this.model = new Model ({isMotor: true, motor: motor});
                } else if (this.policy_type === 'life'){
                    this.payFreq = Mansard.api.policy_dropdowns('payFreq');
                    this.model = new Model({isMotor: false, lifeProducts: lifeProducts, payFreq: this.payFreq});
                }
            },
            onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
				this.$el = this.$el.children();
				this.setElement(this.$el);
			},
            populatePeriods: function() {
                var productCode = $('.save-policy-product').val();
                var periods = {};
                var insOption = null;
                var payOption = null;

                periods.ins = Mansard.api.policy_dropdowns('insPeriod', productCode);
                periods.pay = Mansard.api.policy_dropdowns('payPeriod', productCode);
                $('.save-policy-insurance-period').html('');
                $('.save-policy-payment-period').html('');
                for (var i = 0; i < periods.ins.length; i++) {
                    insOption = '<option value="'+ periods.ins[i].Value + '">' + periods.ins[i].Description + '</option>';
                    $('.save-policy-insurance-period').prepend(insOption);
                }

                for (var j = 0; j < periods.pay.length; j++) {
                    console.log(payOption);
                    payOption = '<option value="'+ periods.pay[j].Value + '">' + periods.pay[j].Description + '</option>';
                    $('.save-policy-payment-period').prepend(payOption);
                }
                
                console.log(periods);
            },
            matchPeriodsToPay: function() {
                var matchVal = $('.save-policy-payment-period').val();

                $('.save-policy-insurance-period').val(matchVal);
            },
            matchPeriodsToIns: function() {
                var matchVal = $('.save-policy-insurance-period').val();

                $('.save-policy-payment-period').val(matchVal);
            }
        });
    });