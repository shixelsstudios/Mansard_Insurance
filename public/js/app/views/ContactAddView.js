define( ['Mansard', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/contactAdd'],
    function(Mansard, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            // View Event Handlers
            events: {
                'click .submit-contact-button': 'saveContact'
            },
            initialize: function() {
            },
            onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
				this.$el = this.$el.children();
				this.setElement(this.$el);
			},
            saveContact: function(e) {
                e.preventDefault();

                if ($('.contact-add-FirstName').val() && $('.contact-add-LastName').val() && $('.contact-add-MobileNo').val() && $('.contact-add-Email').val() && $('.contact-add-PlaceOfWork').val() && ($('.contact-add-Gender').val() !== '0')) {
                    $('.submit-contact-button').html('<i class="fa fa-spinner fa-spin"></i>');
                    $('.submit-contact-button').attr('disabled', 'disabled');
                    var contact = {
                        FirstName: $('.contact-add-FirstName').val(),
                        LastName: $('.contact-add-LastName').val(),
                        MobileNo: $('.contact-add-MobileNo').val(),
                        Email: $('.contact-add-Email').val(),
                        OwnerUsername: Mansard.currentUser,
                        PlaceOfWork: $('.contact-add-PlaceOfWork').val(),
                        Gender: $('.contact-add-Gender').val()
                    }
                    Mansard.api.save_contact(contact);
                } else {
                    $('.contact-add-form-error').html('<div class="alert alert-warning" role="alert">Please fill out all fields!</div>')
                }

                
            }
        });
    });